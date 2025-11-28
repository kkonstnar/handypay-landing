-- Add device_type column to existing waitlist table
-- Run this if you already have the waitlist table created

-- Add the column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
      AND table_name = 'waitlist' 
      AND column_name = 'device_type'
  ) THEN
    ALTER TABLE public.waitlist ADD COLUMN device_type TEXT;
    
    -- Optionally, update existing records to detect device type from user_agent
    UPDATE public.waitlist 
    SET device_type = CASE
      WHEN user_agent IS NULL THEN 'unknown'
      WHEN user_agent ~* 'mobile|android|iphone|ipod|blackberry|iemobile|opera mini' 
        AND NOT user_agent ~* 'ipad|tablet' THEN 'mobile'
      WHEN user_agent ~* 'ipad|tablet|kindle|playbook|silk' THEN 'tablet'
      ELSE 'desktop'
    END
    WHERE device_type IS NULL;
    
    RAISE NOTICE 'device_type column added successfully';
  ELSE
    RAISE NOTICE 'device_type column already exists';
  END IF;
END $$;

