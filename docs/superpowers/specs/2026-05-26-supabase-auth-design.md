# Supabase Auth + Mobile UI/UX Redesign

**Date:** 2026-05-26
**Status:** Approved
**Scope:** Google OAuth authentication, multi-doctor with admin, data isolation via RLS, native-feel mobile UI/UX redesign

---

## 1. Overview

Two-part project:
1. **Auth:** Add Supabase Auth with Google OAuth. Multi-doctor with admin roles. Data isolation via RLS on patients/cases.
2. **Mobile UI/UX:** Complete redesign for a native-feel mobile experience. Dark theme refined. Branded login screen. Swipe gestures, bottom sheets, FAB, smooth transitions. Desktop layout preserved.

## 2. Mobile UI/UX Redesign

### 2.1 Design Principles

- **Mobile-first:** Every screen designed for 375px+ first, then scales up
- **Native feel:** Smooth 60fps transitions, gesture-driven navigation, iOS/Android conventions
- **Clinical grade:** Clean, professional, no fluff — this is a medical tool
- **Dark theme refined:** Keep current dark palette, improve contrast ratios, refine accent colors
- **Branded login:** Full-screen Ayurvedic branding — lotus/mandala motif, gradient, Google button centered

### 2.2 Mobile Layout Architecture

```
┌─────────────────────┐
│  Ayurved AI    [👤] │  ← slim 48px header with avatar
├─────────────────────┤
│                     │
│  [Chat]  [Canvas]   │  ← swipeable full-screen toggle
│  swipe ← → to swap  │
│                     │
│  Content fills      │
│  entire viewport    │
│                     │
├─────────────────────┤
│        [＋]         │  ← floating action button
│ 🗨️  📋  💊  📊    │  ← bottom tab bar (4 items)
└─────────────────────┘
```

**Key changes from current mobile:**
- Header reduced to 48px, no hamburger menu — profile avatar on right
- Chat and Canvas are **full-screen swipeable panels** (not stacked tabs)
- Bottom tab bar: Chat, Cases, Patients, Protocol (4 items, cleaner)
- **Floating Action Button (FAB):** Tap to start new case intake
- Bottom sheet for settings/profile (slides up from avatar tap)
- Pull-to-refresh on list screens (Cases, Patients)
- Haptic-ready transitions (CSS-only, no vibration API dependency)

### 2.3 Desktop Layout

Desktop stays largely unchanged (sidebar + resizable split) but with refinements:
- Sidebar gets subtle hover/active states
- Canvas toolbar gets cleaner grouping
- Header gets profile dropdown matching mobile

### 2.4 Swipe Navigation (Chat ↔ Canvas)

Implementation via CSS scroll-snap or lightweight gesture detection:
```css
.swipe-container {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}
.swipe-panel {
  flex: 0 0 100%;
  scroll-snap-align: start;
  height: 100%;
}
```

When new canvas content arrives while on chat view: subtle indicator dot on canvas tab + gentle auto-switch after 1s delay.

### 2.5 Branded Login Screen

```
┌─────────────────────┐
│                     │
│    [Lotus Icon]     │
│                     │
│    Ayurved AI       │
│    Clinical         │
│    Intelligence     │
│                     │
│  ┌───────────────┐  │
│  │  Sign in with │  │
│  │    Google     │  │  ← Google brand button
│  └───────────────┘  │
│                     │
│   Clinical-grade    │
│   Ayurvedic         │
│   intelligence      │
│                     │
│         v1.0        │
└─────────────────────┘
```

- Full-screen dark gradient background (deep green-black)
- SVG lotus/mandala motif (centered, subtle glow)
- App name in display font
- Google sign-in button (brand guidelines)
- Tagline: "Clinical-grade Ayurvedic intelligence"
- Mobile-first, looks great on desktop too

### 2.6 Bottom Sheet (Profile/Settings)

Triggered by tapping avatar in header:
- Slides up from bottom with drag handle
- Shows: avatar, name, email, role badge
- Settings: dark mode toggle (future), notifications (future)
- Sign out button
- Swipe down to dismiss

### 2.7 Component Changes

| Component | Change |
|---|---|
| `AppLayout.tsx` | New mobile layout: swipe container, FAB, bottom sheet trigger |
| `MobileNav.tsx` | Simplified to 4 tabs (Chat, Cases, Patients, Protocol) |
| `HeaderBar.tsx` | Slim header, avatar triggers bottom sheet |
| `CanvasPanel.tsx` | Becomes full-screen swipeable panel on mobile |
| `ChatPanel.tsx` | Becomes full-screen swipeable panel on mobile |
| `CaseCollectorChat.tsx` | FAB-triggered, full-screen overlay on mobile |
| New: `BottomSheet.tsx` | Draggable bottom sheet component |
| New: `SwipeableView.tsx` | Swipe container for chat/canvas toggle |
| New: `FloatingActionButton.tsx` | FAB component |
| New: `LoginScreen.tsx` | Branded login page component |

### 2.8 CSS/Tailwind Changes

- New design tokens for refined dark palette
- Swipe container utilities
- Bottom sheet animation classes
- FAB positioning and animation
- Touch-optimized spacing (44px minimum targets maintained)
- Smooth page transitions between modules

## 3. Database Schema

### 3.1 Profiles Table

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

### 3.2 Auto-Create Profile + First User Admin Trigger

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

### 3.3 Patients Table Update

```sql
ALTER TABLE public.patients ADD COLUMN doctor_id UUID REFERENCES public.profiles(id);
```

### 3.4 Backfill Existing Data

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

### 3.5 RLS Policies

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

## 4. Auth Flow

### 4.1 Google OAuth Flow

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

### 4.2 Session Management

Use `@supabase/ssr` for server-side session handling:

- **Server components + API routes:** `createServerClient()` from `@supabase/ssr` reads session from cookies
- **Client components:** Existing proxy client enhanced with auth state listener
- **Cookies:** httpOnly, secure, SameSite=Lax — set by `@supabase/ssr` automatically

### 4.3 Sign Out

```ts
await supabase.auth.signOut()
// Redirect to /login
```

## 5. Route Protection

### 5.1 Middleware Changes

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

### 5.2 API Route Auth

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

## 6. Auth UI Components

### 6.1 Login Page (`src/app/login/page.tsx`)

Branded splash login (see section 2.5 for layout). Full-screen dark gradient with lotus/mandala motif, app name, tagline, and Google sign-in button. Error states for failed auth. If already logged in, redirect to `/`.

### 6.2 Auth Callback (`src/app/auth/callback/route.ts`)

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

### 6.3 AuthGuard Component (`src/components/AuthGuard.tsx`)

Client-side wrapper for protected pages:
```tsx
'use client'
// Wraps children, shows loading spinner while checking auth
// Redirects to /login if not authenticated
// Optionally checks admin role for /admin pages
```

### 6.4 Doctor Profile in HeaderBar

- Avatar (from Google) + display name in HeaderBar
- Dropdown: Profile info, Role badge, Sign Out button
- Admin users see "Admin" badge

### 6.5 Admin Page (`src/app/admin/page.tsx`)

- Table of registered doctors
- Columns: Name, Email, Role, Specialization, Active, Joined
- Actions: Toggle active/inactive, Change role (admin only)
- Only accessible to admin role

## 7. File Changes Summary

### New Files — Auth:
| File | Purpose |
|---|---|
| `src/app/login/page.tsx` | Branded splash login page with Google OAuth |
| `src/app/auth/callback/route.ts` | OAuth callback handler |
| `src/lib/supabase/auth.ts` | Auth helpers (getUser, getProfile, signIn, signOut) |
| `src/components/AuthGuard.tsx` | Client-side auth wrapper |
| `src/app/admin/page.tsx` | Admin dashboard |
| `supabase/migrations/013_auth_profiles.sql` | Profiles table, triggers, RLS policies |

### New Files — Mobile UI/UX:
| File | Purpose |
|---|---|
| `src/components/BottomSheet.tsx` | Draggable bottom sheet (profile/settings) |
| `src/components/SwipeableView.tsx` | Swipe container for chat ↔ canvas toggle |
| `src/components/FloatingActionButton.tsx` | FAB for quick actions (new case) |

### Modified Files:
| File | Change |
|---|---|
| `src/middleware.ts` | Add auth checks for protected routes |
| `src/lib/supabase/client.ts` | Enhance with auth state management |
| `src/components/HeaderBar.tsx` | Slim 48px header, avatar triggers bottom sheet |
| `src/components/AppLayout.tsx` | Swipe container, FAB, bottom sheet, AuthGuard |
| `src/components/MobileNav.tsx` | Simplified 4-tab bar (Chat, Cases, Patients, Protocol) |
| `src/components/CanvasPanel.tsx` | Full-screen swipeable panel on mobile |
| `src/components/ChatPanel.tsx` | Full-screen swipeable panel on mobile |
| `src/components/CaseCollectorChat.tsx` | FAB-triggered overlay on mobile |
| `src/app/layout.tsx` | Add Supabase auth provider |
| `src/app/globals.css` | New tokens, swipe utilities, bottom sheet animations, FAB |
| `src/app/api/intake/route.ts` | Add user context |
| `src/app/api/treatment-protocol/route.ts` | Add user context |
| `src/app/api/chat/route.ts` | Add user context |
| `src/app/api/cases/route.ts` | Add doctor_id filtering |
| `src/app/api/patients/route.ts` | Add doctor_id filtering |

## 8. Environment Variables

Already set:
- `NEXT_PUBLIC_SUPABASE_URL` ✓
- `SUPABASE_SERVICE_ROLE_KEY` ✓

Need to add:
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — for client-side auth. The existing env var `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` appears to serve this purpose; confirm it's the anon/publishable key and rename if needed for clarity.

## 9. Supabase Dashboard Setup Required

1. Enable Google provider in Authentication > Providers
2. Set Google OAuth credentials (Client ID + Secret from Google Cloud Console)
3. Set redirect URL to `https://clinicalai.ayurvrittaayurveda.in/auth/callback` (and `http://localhost:3000/auth/callback` for dev)
4. Run migration 013 via SQL Editor

## 10. Security Considerations

- RLS ensures data isolation at the database level — even if API code has bugs, data can't leak
- Service role key used only in server-side API routes (never exposed to client)
- Admin role checked both in RLS policies AND in API route middleware
- First user auto-promoted to admin (secure by default — subsequent users are doctors)
- Profile role column cannot be self-modified (trigger `prevent_role_self_change` silently reverts non-admin role changes)
- Sessions managed by Supabase Auth (JWT with automatic refresh)

## 11. Migration Strategy for Existing Data

1. Deploy migration 013 (profiles table, triggers, RLS)
2. First admin signs in via Google → profile created with admin role
3. Run backfill SQL to assign existing patients to admin
4. Make `doctor_id` NOT NULL on patients
5. Enable RLS on patients and cases tables
6. All subsequent API routes enforce auth
