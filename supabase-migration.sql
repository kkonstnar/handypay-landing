-- Create waitlist table for HandyPay landing page
-- Ensure we're in the public schema
CREATE TABLE IF NOT EXISTS public.waitlist (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'website',
  user_agent TEXT,
  device_type TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Grant necessary permissions
GRANT ALL ON public.waitlist TO postgres, anon, authenticated, service_role;
GRANT USAGE, SELECT ON SEQUENCE waitlist_id_seq TO postgres, anon, authenticated, service_role;

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);

-- IMPORTANT: Since we're using service_role key, RLS is bypassed automatically
-- However, if you want to allow anonymous access later, you can enable RLS
-- For now, we'll disable RLS since service_role bypasses it anyway
ALTER TABLE waitlist DISABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to allow re-running the migration)
DROP POLICY IF EXISTS "Allow public inserts" ON waitlist;
DROP POLICY IF EXISTS "Allow service role reads" ON waitlist;
DROP POLICY IF EXISTS "Allow service role writes" ON waitlist;
DROP POLICY IF EXISTS "Allow service role access" ON waitlist;
DROP POLICY IF EXISTS "Allow public selects" ON waitlist;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop trigger if it exists (to allow re-running the migration)
DROP TRIGGER IF EXISTS update_waitlist_updated_at ON public.waitlist;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_waitlist_updated_at
  BEFORE UPDATE ON public.waitlist
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Ensure the table is in the public schema (should already be there, but just in case)
-- ALTER TABLE public.waitlist SET SCHEMA public; -- This line causes error if already in public schema

-- Grant permissions to ensure PostgREST can access it
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON public.waitlist TO postgres, anon, authenticated, service_role;
GRANT USAGE, SELECT ON SEQUENCE public.waitlist_id_seq TO postgres, anon, authenticated, service_role;

-- Verify table exists (this will show an error if it doesn't)
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'waitlist') THEN
    RAISE EXCEPTION 'Table waitlist does not exist in public schema';
  END IF;
END $$;

-- Note: After running this migration, PostgREST should automatically pick up the table
-- If you still get 404 errors, try:
-- 1. Wait 30-60 seconds for PostgREST to refresh
-- 2. Or restart your Supabase project (Settings > General > Restart project)
