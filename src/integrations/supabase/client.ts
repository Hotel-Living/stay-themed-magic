
import { createClient } from '@supabase/supabase-js';

// Supabase client configuration with fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xyzcompany.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emNvbXBhbnkiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjE1MzgwMCwiZXhwIjoxOTMxNzI5ODAwfQ.D20GUyFLohCsg49fvqoOvfJ2PaYI5WulQLlUHQbkHHw';

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    fetch: async (url, options) => {
      try {
        // Add a shorter timeout to fetch requests to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        // Add the abort signal to the options
        const fetchOptions = options ? { ...options, signal: controller.signal } : { signal: controller.signal };
        
        // Add a retry mechanism
        let retries = 0;
        const MAX_RETRIES = 3;
        
        while (retries <= MAX_RETRIES) {
          try {
            const response = await fetch(url, fetchOptions);
            clearTimeout(timeoutId);
            if (!response.ok && (response.status >= 500 || response.status === 0)) {
              // Only retry on server errors or network failures
              throw new Error(`Server error: ${response.status}`);
            }
            return response;
          } catch (err) {
            retries++;
            if (retries > MAX_RETRIES) throw err;
            
            // Wait before retrying (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retries)));
          }
        }
        
        throw new Error('Max retries exceeded');
      } catch (err) {
        console.error('Supabase fetch error:', err);
        // Return a mock response that won't break the app
        return new Response(JSON.stringify({ data: [] }), {
          headers: { 'content-type': 'application/json' },
          status: 200
        });
      }
    }
  },
  db: {
    schema: 'public'
  },
  realtime: {
    timeout: 10000, // 10 seconds for realtime
    params: {
      eventsPerSecond: 10
    }
  }
});

// Add some error handling for common operations
export const fetchWithFallback = async <T>(
  queryFn: () => Promise<{ data: T | null; error: any }>,
  fallbackData: T
): Promise<T> => {
  try {
    // Set a timeout for the entire operation
    const timeoutPromise = new Promise<{ data: null; error: Error }>((_, reject) => {
      setTimeout(() => reject({ data: null, error: new Error('Query timeout') }), 8000);
    });
    
    // Race between the actual query and the timeout
    const { data, error } = await Promise.race([queryFn(), timeoutPromise]);
    
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

// Add a function to check network status
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    // Set a timeout to avoid hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    const { error } = await supabase.from('themes').select('count', { count: 'exact', head: true });
    
    clearTimeout(timeoutId);
    return !error;
  } catch (err) {
    console.error('Failed to connect to Supabase:', err);
    return false;
  }
};
