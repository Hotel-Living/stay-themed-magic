import { createClient } from '@supabase/supabase-js';

// Supabase client configuration with fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xyzcompany.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emNvbXBhbnkiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjE1MzgwMCwiZXhwIjoxOTMxNzI5ODAwfQ.D20GUyFLohCsg49fvqoOvfJ2PaYI5WulQLlUHQbkHHw';

// Mock data generator
const generateFallbackData = () => {
  // Create some basic mock data that can be used when offline
  return {
    themes: [
      { id: 1, name: 'Beach', description: 'Sunny beaches and ocean views', icon: '🏖️' },
      { id: 2, name: 'Mountain', description: 'Majestic mountain landscapes', icon: '⛰️' },
      { id: 3, name: 'Urban', description: 'City living and culture', icon: '🏙️' },
      { id: 4, name: 'Rural', description: 'Countryside and nature', icon: '🌄' },
      { id: 5, name: 'Desert', description: 'Hot and dry landscapes', icon: '🏜️' },
    ],
    hotels: [
      {
        id: '1',
        name: 'Beach Paradise Hotel',
        description: 'Beautiful beachfront hotel with stunning views',
        country: 'Mexico',
        city: 'Cancun',
        price_per_month: 1200,
        category: 4,
        is_featured: true,
        available_months: ['January', 'February', 'March', 'April', 'May'],
        hotel_images: [{ is_main: true, image_url: '/placeholder.svg' }],
        hotel_themes: [{ themes: { id: 1, name: 'Beach' } }]
      },
      {
        id: '2',
        name: 'Mountain Retreat',
        description: 'Cozy cabin in the mountains',
        country: 'Switzerland',
        city: 'Zermatt',
        price_per_month: 2200,
        category: 5,
        is_featured: true,
        available_months: ['June', 'July', 'August', 'September'],
        hotel_images: [{ is_main: true, image_url: '/placeholder.svg' }],
        hotel_themes: [{ themes: { id: 2, name: 'Mountain' } }]
      },
      {
        id: '3',
        name: 'City Center Loft',
        description: 'Modern loft in the heart of the city',
        country: 'United States',
        city: 'New York',
        price_per_month: 3000,
        category: 4,
        is_featured: true,
        available_months: ['January', 'February', 'October', 'November', 'December'],
        hotel_images: [{ is_main: true, image_url: '/placeholder.svg' }],
        hotel_themes: [{ themes: { id: 3, name: 'Urban' } }]
      },
    ]
  };
};

// Global mock data store
const mockData = generateFallbackData();

// Network status helper
const isOnline = () => {
  // Simply use navigator.onLine
  return typeof window !== 'undefined' && navigator.onLine;
};

// Offline-first Supabase client configuration
const offlineOptions = {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    fetch: async (url: string, options?: RequestInit) => {
      try {
        // If we're offline, return a mock response immediately
        if (!isOnline()) {
          console.warn('Network is offline. Using mock data for:', url);
          return mockResponse(url);
        }
        
        // Add a shorter timeout to fetch requests to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout (shorter)
        
        // Add the abort signal to the options
        const fetchOptions = options ? { ...options, signal: controller.signal } : { signal: controller.signal };
        
        // Add a retry mechanism
        let retries = 0;
        const MAX_RETRIES = 2; // Fewer retries to fail faster
        
        while (retries <= MAX_RETRIES) {
          try {
            const response = await fetch(url, fetchOptions);
            clearTimeout(timeoutId);
            
            if (!response.ok && (response.status >= 500 || response.status === 0)) {
              throw new Error(`Server error: ${response.status}`);
            }
            
            return response;
          } catch (err) {
            retries++;
            if (retries > MAX_RETRIES) {
              console.error('Supabase fetch failed after retries:', err);
              // Return mock data on final failure
              return mockResponse(url);
            }
            
            // Wait before retrying (short backoff)
            await new Promise(resolve => setTimeout(resolve, 500 * retries));
          }
        }
        
        // Should never reach here, but just in case
        return mockResponse(url);
      } catch (err) {
        console.error('Supabase fetch error:', err);
        // Return a mock response that won't break the app
        return mockResponse(url);
      }
    }
  },
  db: {
    schema: 'public'
  },
  realtime: {
    timeout: 5000, // 5 seconds for realtime (shorter)
    params: {
      eventsPerSecond: 5
    }
  }
};

// Helper to generate mock responses based on the requested URL
function mockResponse(url: string): Response {
  let responseData: any = { data: [] };
  
  // Parse the URL to determine what data was requested
  if (url.includes('/themes')) {
    responseData = { data: mockData.themes };
  } else if (url.includes('/hotels')) {
    responseData = { data: mockData.hotels };
  } else if (url.includes('/recommendations')) {
    // Return a subset of hotels as recommendations
    responseData = { 
      recommendations: mockData.hotels.slice(0, 2).map(hotel => ({
        hotel,
        confidence: 0.8
      }))
    };
  }
  
  return new Response(JSON.stringify(responseData), {
    headers: { 'content-type': 'application/json' },
    status: 200
  });
}

// Create a single supabase client for the entire app with resilient configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, offlineOptions);

// Add helper function for functions calls that automatically falls back to mock data
export const invokeFunctionWithFallback = async <T>(
  functionName: string,
  options: any = {},
  fallbackData: T
): Promise<T> => {
  try {
    // If offline, return fallback immediately
    if (!isOnline()) {
      console.warn(`Network is offline, using fallback data for function: ${functionName}`);
      return fallbackData;
    }
    
    // Set a timeout for the entire operation
    const timeoutPromise = new Promise<{ data: null; error: Error }>((_, reject) => {
      setTimeout(() => reject({ data: null, error: new Error('Function timeout') }), 3000);
    });
    
    // Attempt to call the function with a racing timeout
    const { data, error } = await Promise.race([
      supabase.functions.invoke(functionName, options),
      timeoutPromise
    ]);
    
    if (error) {
      console.error(`Function error (${functionName}):`, error);
      return fallbackData;
    }
    
    return data || fallbackData;
  } catch (err) {
    console.error(`Function error (${functionName}):`, err);
    return fallbackData;
  }
};

// More efficient fetch with fallback that won't block the app
export const fetchWithFallback = async <T>(
  queryFn: () => Promise<{ data: T | null; error: any }>,
  fallbackData: T
): Promise<T> => {
  try {
    // If offline, return fallback immediately
    if (!isOnline()) {
      console.warn('Network is offline, using fallback data for query');
      return fallbackData;
    }
    
    // Set a timeout for the entire operation
    const timeoutPromise = new Promise<{ data: null; error: Error }>((_, reject) => {
      setTimeout(() => reject({ data: null, error: new Error('Query timeout') }), 3000);
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

// Add a function to check network status that returns immediately
export const checkSupabaseConnection = async (): Promise<boolean> => {
  if (!isOnline()) {
    return false;
  }
  
  try {
    // Use a very short timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000);
    
    // Simple HEAD request to check connection
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'HEAD',
      signal: controller.signal,
      headers: {
        'apikey': supabaseAnonKey
      }
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (err) {
    console.warn('Supabase connection check failed:', err);
    return false;
  }
};
