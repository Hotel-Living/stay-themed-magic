
import { createClient } from '@supabase/supabase-js';

// Supabase client configuration with fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xyzcompany.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emNvbXBhbnkiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjE1MzgwMCwiZXhwIjoxOTMxNzI5ODAwfQ.D20GUyFLohCsg49fvqoOvfJ2PaYI5WulQLlUHQbkHHw';

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  },
  global: {
    fetch: async (url: string, options?: RequestInit) => {
      try {
        return await fetch(url, options);
      } catch (err) {
        console.error('Supabase fetch error:', err);
        // Return a mock response that won't break the app
        return new Response(JSON.stringify([]), {
          headers: { 'content-type': 'application/json' },
          status: 200
        });
      }
    }
  }
});

// Add some error handling for common operations
export const fetchWithFallback = async <T>(
  queryFn: () => Promise<{ data: T | null; error: any }>,
  fallbackData: T
): Promise<T> => {
  try {
    const { data, error } = await queryFn();
    if (error) {
      console.error('Supabase query error:', error);
      return fallbackData;
    }
    return data || fallbackData;
  } catch (err) {
    console.error('Unexpected error in Supabase query:', err);
    return fallbackData;
  }
};
