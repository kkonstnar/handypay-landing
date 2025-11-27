import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xghdkoxeilzmsjmmxetj.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnaGRrb3hlaWx6bXNqbW14ZXRqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTMzNTkzNywiZXhwIjoyMDY0OTExOTM3fQ.RAGh7_v41t9kbAi738I_MUPgt8a7xmxC02DyHfDE-zs'

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Database types
export interface WaitlistEntry {
  id: number
  email: string
  source: string
  created_at: string
  user_agent?: string
  ip_address?: string
}
