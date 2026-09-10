-- =============================================================================
-- OBLIQUETECH: RUNTIME REAL-TIME USER SYNCHRONIZATION
-- Run this script once in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/dazicvghalnwfryokeyi/sql/new
-- =============================================================================

-- 1. Create public.profiles table if not exists
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  auth_user_id TEXT UNIQUE,
  full_name TEXT NOT NULL,
  profile_photo TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  country_code TEXT DEFAULT '+91',
  company_name TEXT,
  job_title TEXT,
  bio TEXT,
  country TEXT,
  city TEXT,
  linkedin TEXT,
  website TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'author', 'editor', 'admin', 'super_admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public full access profiles" ON public.profiles;
CREATE POLICY "Public full access profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);

-- 2. Create Real-Time RPC to fetch live auth.users directly
CREATE OR REPLACE FUNCTION public.get_registered_users()
RETURNS TABLE (
  id uuid,
  email text,
  full_name text,
  company_name text,
  job_title text,
  phone text,
  role text,
  created_at timestamptz,
  last_sign_in_at timestamptz
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    u.id,
    u.email::text,
    COALESCE(p.full_name, u.raw_user_meta_data->>'full_name', split_part(u.email, '@', 1))::text AS full_name,
    p.company_name,
    p.job_title,
    p.phone,
    COALESCE(p.role, 'user')::text AS role,
    u.created_at,
    u.last_sign_in_at
  FROM auth.users u
  LEFT JOIN public.profiles p ON p.auth_user_id = u.id::text OR p.email = u.email
  ORDER BY u.created_at DESC;
$$;

GRANT EXECUTE ON FUNCTION public.get_registered_users() TO anon, authenticated, service_role;

-- 3. Automatic Realtime Sync: Auto-insert into profiles when user registers in auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, auth_user_id, email, full_name, role)
  VALUES (
    NEW.id::text,
    NEW.id::text, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    'user'
  )
  ON CONFLICT (id) DO UPDATE SET
    auth_user_id = EXCLUDED.auth_user_id,
    email = EXCLUDED.email;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Automatic Realtime Sync: Auto-delete from profiles when user is deleted in auth.users
CREATE OR REPLACE FUNCTION public.handle_deleted_user()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM public.profiles WHERE auth_user_id = OLD.id::text OR email = OLD.email OR id = OLD.id::text;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_deleted ON auth.users;
CREATE TRIGGER on_auth_user_deleted
  AFTER DELETE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_deleted_user();

-- 5. Backfill existing live auth.users into profiles right now
INSERT INTO public.profiles (id, auth_user_id, email, full_name, role)
SELECT 
  u.id::text,
  u.id::text,
  u.email,
  COALESCE(u.raw_user_meta_data->>'full_name', split_part(u.email, '@', 1)),
  'user'
FROM auth.users u
ON CONFLICT (id) DO UPDATE SET
  auth_user_id = EXCLUDED.auth_user_id,
  email = EXCLUDED.email;
