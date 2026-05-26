# Supabase Auth + Doctor Isolation Design

**Date:** 2026-05-26
**Status:** Approved
**Scope:** Google OAuth authentication, multi-doctor with admin, data isolation via RLS

---

## 1. Overview

Add Supabase Auth with Google OAuth to the Ayurved Clinical AI app. Each doctor authenticates via Google, sees only their own patients/cases, and admins can manage all doctors and data. The app currently has zero auth — all data is accessed via service role key with no user context.

## 2. Database Schema

### 2.1 Profiles Table

```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'doctor' CHECK (role IN ('doctor', 'admin')),
  specialization TEXT DEFAULT 'Ayurveda',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### 2.2 Auto-Create Profile + First User Admin Trigger

A single trigger on `auth.users` creates a profile row. A separate `BEFORE INSERT` trigger on `profiles` promotes the first user to admin. Both triggers work together: the BEFORE trigger fires first during the INSERT, setting `role = 'admin'` before the row is written.

```sql
-- Create profile when auth user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- First user auto-promoted to admin
CREATE OR REPLACE FUNCTION public.handle_first_user_admin()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE role = 'admin') THEN
    NEW.role := 'admin';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_profile_created_set_admin
  BEFORE INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_first_user_admin();
```

### 2.3 Patients Table Update

```sql
ALTER TABLE public.patients ADD COLUMN doctor_id UUID REFERENCES public.profiles(id);
```

### 2.4 Backfill Existing Data

All existing patients (without `doctor_id`) are assigned to the first admin user. The first user to sign in gets the `admin` role automatically (via the `handle_first_user_admin` trigger defined in section 2.2).

After the first admin signs in, run a backfill:
```sql
UPDATE public.patients
SET doctor_id = (SELECT id FROM public.profiles WHERE role = 'admin' LIMIT 1)
WHERE doctor_id IS NULL;
```

Then make the column NOT NULL:
```sql
ALTER TABLE public.patients ALTER COLUMN doctor_id SET NOT NULL;
```

### 2.5 RLS Policies

**Profiles:**
```sql
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users read own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile (role changes blocked by trigger, see below)
CREATE POLICY "Users update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Trigger to prevent non-admin role self-modification
CREATE OR REPLACE FUNCTION public.prevent_role_self_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.role IS DISTINCT FROM NEW.role THEN
    -- Only allow role change if performed by an admin (not self)
    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') THEN
      NEW.role := OLD.role;
    END IF;
  END IF;
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_profile_update_prevent_role
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.prevent_role_self_change();

-- Admins can read all profiles
CREATE POLICY "Admins read all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can update all profiles
CREATE POLICY "Admins update all profiles" ON public.profiles
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

**Patients:**
```sql
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;

-- Doctors see own patients
CREATE POLICY "Doctors read own patients" ON public.patients
  FOR SELECT USING (doctor_id = auth.uid());

-- Admins see all patients
CREATE POLICY "Admins read all patients" ON public.patients
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Doctors insert patients (doctor_id auto-set)
CREATE POLICY "Doctors insert own patients" ON public.patients
  FOR INSERT WITH CHECK (doctor_id = auth.uid());

-- Doctors update own patients
CREATE POLICY "Doctors update own patients" ON public.patients
  FOR UPDATE USING (doctor_id = auth.uid());

-- Admins can update/delete all patients
CREATE POLICY "Admins manage all patients" ON public.patients
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

**Cases:**
```sql
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;

-- Doctors see cases for their patients
CREATE POLICY "Doctors read own cases" ON public.cases
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.patients WHERE id = patient_id AND doctor_id = auth.uid())
  );

-- Admins see all cases
CREATE POLICY "Admins read all cases" ON public.cases
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Doctors insert/update cases for their patients
CREATE POLICY "Doctors manage own cases" ON public.cases
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.patients WHERE id = patient_id AND doctor_id = auth.uid())
  );
```

**Other tables** (knowledge_embeddings, case_learnings, etc.): No RLS. Accessed only via service role in API routes — shared reference data.

## 3. Auth Flow

### 3.1 Google OAuth Flow

```
User visits /login
  → Clicks "Sign in with Google"
  → supabase.auth.signInWithOAuth({ provider: 'google' })
  → Redirects to Google consent screen
  → Google redirects to /auth/callback?code=...
  → /auth/callback exchanges code for session
  → Trigger creates profiles row (if new user)
  → First user auto-promoted to admin
  → Redirect to /
```

### 3.2 Session Management

Use `@supabase/ssr` for server-side session handling:

- **Server components + API routes:** `createServerClient()` from `@supabase/ssr` reads session from cookies
- **Client components:** Existing proxy client enhanced with auth state listener
- **Cookies:** httpOnly, secure, SameSite=Lax — set by `@supabase/ssr` automatically

### 3.3 Sign Out

```ts
await supabase.auth.signOut()
// Redirect to /login
```

## 4. Route Protection

### 4.1 Middleware Changes

Update `src/middleware.ts`:

```ts
// Protected routes (require auth)
const protectedRoutes = ['/', '/cases', '/patients', '/admin']
const authRoutes = ['/login']
const publicRoutes = ['/auth/callback']

// For protected routes:
// 1. Check for valid session via cookie
// 2. If no session → redirect to /login
// 3. For /admin routes → also check role = 'admin'

// For auth routes (/login):
// 1. If already logged in → redirect to /
```

### 4.2 API Route Auth

All `/api/*` routes get auth validation:

```ts
// New helper in src/lib/supabase/auth.ts
export async function getAuthUser(request: NextRequest) {
  const supabase = createServerClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null
  return user
}

export async function getUserProfile(userId: string) {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  return data
}
```

Every API route pattern becomes:
```ts
export async function POST(request: NextRequest) {
  const user = await getAuthUser(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const profile = await getUserProfile(user.id)
  // ... use profile.role, user.id as doctor_id
}
```

## 5. UI Components

### 5.1 Login Page (`src/app/login/page.tsx`)

- Centered card with logo + app name
- "Sign in with Google" button (Google brand guidelines)
- Dark theme, consistent with app design
- Mobile-first layout
- Shows error states for failed auth

### 5.2 Auth Callback (`src/app/auth/callback/route.ts`)

```ts
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  if (code) {
    const supabase = createServerClient()
    await supabase.auth.exchangeCodeForSession(code)
  }
  return NextResponse.redirect(new URL('/', request.url))
}
```

### 5.3 AuthGuard Component (`src/components/AuthGuard.tsx`)

Client-side wrapper for protected pages:
```tsx
'use client'
// Wraps children, shows loading spinner while checking auth
// Redirects to /login if not authenticated
// Optionally checks admin role for /admin pages
```

### 5.4 Doctor Profile in HeaderBar

- Avatar (from Google) + display name in HeaderBar
- Dropdown: Profile info, Role badge, Sign Out button
- Admin users see "Admin" badge

### 5.5 Admin Page (`src/app/admin/page.tsx`)

- Table of registered doctors
- Columns: Name, Email, Role, Specialization, Active, Joined
- Actions: Toggle active/inactive, Change role (admin only)
- Only accessible to admin role

## 6. File Changes Summary

### New Files:
| File | Purpose |
|---|---|
| `src/app/login/page.tsx` | Google OAuth login page |
| `src/app/auth/callback/route.ts` | OAuth callback handler |
| `src/lib/supabase/auth.ts` | Auth helpers (getUser, getProfile, signIn, signOut) |
| `src/components/AuthGuard.tsx` | Client-side auth wrapper |
| `src/app/admin/page.tsx` | Admin dashboard |
| `supabase/migrations/013_auth_profiles.sql` | Profiles table, triggers, RLS policies |

### Modified Files:
| File | Change |
|---|---|
| `src/middleware.ts` | Add auth checks for protected routes |
| `src/lib/supabase/client.ts` | Enhance with auth state management |
| `src/components/HeaderBar.tsx` | Add doctor profile dropdown |
| `src/components/AppLayout.tsx` | Wrap with AuthGuard |
| `src/app/layout.tsx` | Add Supabase auth provider |
| `src/app/api/intake/route.ts` | Add user context |
| `src/app/api/treatment-protocol/route.ts` | Add user context |
| `src/app/api/chat/route.ts` | Add user context |
| `src/app/api/cases/route.ts` | Add doctor_id filtering |
| `src/app/api/patients/route.ts` | Add doctor_id filtering |

## 7. Environment Variables

Already set:
- `NEXT_PUBLIC_SUPABASE_URL` ✓
- `SUPABASE_SERVICE_ROLE_KEY` ✓

Need to add:
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — for client-side auth. The existing env var `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` appears to serve this purpose; confirm it's the anon/publishable key and rename if needed for clarity.

## 8. Supabase Dashboard Setup Required

1. Enable Google provider in Authentication > Providers
2. Set Google OAuth credentials (Client ID + Secret from Google Cloud Console)
3. Set redirect URL to `https://clinicalai.ayurvrittaayurveda.in/auth/callback` (and `http://localhost:3000/auth/callback` for dev)
4. Run migration 013 via SQL Editor

## 9. Security Considerations

- RLS ensures data isolation at the database level — even if API code has bugs, data can't leak
- Service role key used only in server-side API routes (never exposed to client)
- Admin role checked both in RLS policies AND in API route middleware
- First user auto-promoted to admin (secure by default — subsequent users are doctors)
- Profile role column cannot be self-modified (trigger `prevent_role_self_change` silently reverts non-admin role changes)
- Sessions managed by Supabase Auth (JWT with automatic refresh)

## 10. Migration Strategy for Existing Data

1. Deploy migration 013 (profiles table, triggers, RLS)
2. First admin signs in via Google → profile created with admin role
3. Run backfill SQL to assign existing patients to admin
4. Make `doctor_id` NOT NULL on patients
5. Enable RLS on patients and cases tables
6. All subsequent API routes enforce auth
