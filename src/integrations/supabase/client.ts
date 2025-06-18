
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = "https://pgdzrvdwgoomjnnegkcn.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnZHpydmR3Z29vbWpubmVna2NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4Mjk0NzIsImV4cCI6MjA1ODQwNTQ3Mn0.VWcjjovrdsV7czPVaYJ219GzycoeYisMUpPhyHkvRZ0"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    debug: true
  },
  realtime: {
    params: {
      eventsPerSecond: 2,
    },
  },
})

// Enhanced debug logging for authentication events
if (typeof window !== 'undefined') {
  supabase.auth.onAuthStateChange((event, session) => {
    console.log(`=== AUTH STATE CHANGE EVENT ===`);
    console.log(`Event: ${event}`);
    console.log(`Session exists: ${!!session}`);
    console.log(`User email: ${session?.user?.email || 'No user'}`);
    console.log(`Access token present: ${!!session?.access_token}`);
    console.log(`Refresh token present: ${!!session?.refresh_token}`);
    console.log(`Session expires at: ${session?.expires_at || 'N/A'}`);
    console.log(`Current URL: ${window.location.href}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    
    // Check localStorage for session data
    try {
      const storedSession = localStorage.getItem('sb-pgdzrvdwgoomjnnegkcn-auth-token');
      console.log(`Stored session in localStorage: ${!!storedSession}`);
      if (storedSession) {
        const parsed = JSON.parse(storedSession);
        console.log(`Stored session user: ${parsed?.user?.email || 'No user in stored session'}`);
      }
    } catch (e) {
      console.log('Error reading stored session:', e);
    }
  });
}
