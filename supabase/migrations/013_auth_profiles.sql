-- Migration 013: Auth profiles — role column, triggers, enhanced RLS
-- Created: 2026-05-27
-- Description: Add role-based auth with Google OAuth support
-- NOTE: Apply via Supabase Dashboard SQL Editor (CLI segfaults on Windows)

-- ============================================
-- ADD ROLE AND DISPLAY_NAME TO PROFILES
-- ============================================
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'doctor' CHECK (role IN ('doctor', 'admin'));
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS display_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_sign_in_at TIMESTAMPTZ;

-- ============================================
-- AUTO-CREATE PROFILE ON AUTH USER CREATION
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (auth_user_id, email, full_name, display_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists (idempotent)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- FIRST USER AUTO-PROMOTED TO ADMIN
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_first_user_admin()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE role = 'admin') THEN
    NEW.role := 'admin';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_profile_created_set_admin ON public.profiles;
CREATE TRIGGER on_profile_created_set_admin
  BEFORE INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_first_user_admin();

-- ============================================
-- PREVENT NON-ADMIN ROLE SELF-MODIFICATION
-- ============================================
CREATE OR REPLACE FUNCTION public.prevent_role_self_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.role IS DISTINCT FROM NEW.role THEN
    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE auth_user_id = auth.uid() AND role = 'admin') THEN
      NEW.role := OLD.role;
    END IF;
  END IF;
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_profile_update_prevent_role ON public.profiles;
CREATE TRIGGER on_profile_update_prevent_role
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.prevent_role_self_change();

-- ============================================
-- UPDATE RLS POLICIES — ADD ADMIN ACCESS
-- ============================================

-- Profiles: admins can read all
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE auth_user_id = auth.uid() AND role = 'admin')
  );

-- Patients: admins can see all
DROP POLICY IF EXISTS "Admins can view all patients" ON public.patients;
CREATE POLICY "Admins can view all patients"
  ON public.patients FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE auth_user_id = auth.uid() AND role = 'admin')
  );

DROP POLICY IF EXISTS "Admins can manage all patients" ON public.patients;
CREATE POLICY "Admins can manage all patients"
  ON public.patients FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE auth_user_id = auth.uid() AND role = 'admin')
  );

-- Cases: admins can see all
DROP POLICY IF EXISTS "Admins can view all cases" ON public.cases;
CREATE POLICY "Admins can view all cases"
  ON public.cases FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE auth_user_id = auth.uid() AND role = 'admin')
  );

DROP POLICY IF EXISTS "Admins can manage all cases" ON public.cases;
CREATE POLICY "Admins can manage all cases"
  ON public.cases FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE auth_user_id = auth.uid() AND role = 'admin')
  );

-- Conversations: admins can see all
DROP POLICY IF EXISTS "Admins can view all conversations" ON public.conversations;
CREATE POLICY "Admins can view all conversations"
  ON public.conversations FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE auth_user_id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- BACKFILL EXISTING DATA
-- ============================================
-- Assign any unassigned patients to the first admin (after first admin signs in)
-- Run manually after first admin login:
-- UPDATE public.patients SET doctor_id = (SELECT id FROM public.profiles WHERE role = 'admin' LIMIT 1) WHERE doctor_id IS NULL;
