import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Create a mock client for static generation when env vars aren't available
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseServiceKey) {
    // During static generation or when env vars are missing, return a mock client
    // This prevents build failures while still allowing runtime functionality
    return {
      from: () => ({
        select: () => ({
          eq: () => ({
            single: () => Promise.resolve({ data: null, error: null })
          }),
          order: () => Promise.resolve({ data: [], error: null }),
          count: () => Promise.resolve({ count: 0, error: null })
        }),
        insert: () => ({
          select: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') })
        })
      })
    } as any;
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

export const supabase = createSupabaseClient();

// Database types
export interface WaitlistEntry {
  id: number;
  email: string;
  source: string;
  created_at: string;
  user_agent?: string;
  ip_address?: string;
}
