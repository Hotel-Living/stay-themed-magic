
// Custom type definitions for Supabase data structures

// Theme data structure
export interface Theme {
  id: string;
  name: string;
  category: string;
  description?: string;
  created_at?: string;
}

// Hotel data structure
export interface Hotel {
  id: string;
  name: string;
  description?: string;
  city: string;
  country: string;
  address?: string;
  category?: number;
  price_per_month: number;
  created_at?: string;
  main_image_url?: string;
  latitude?: number;
  longitude?: number;
  available_months?: string[];
  amenities?: string[];
  hotel_images?: HotelImage[];
  hotel_themes?: HotelTheme[];
  reviews?: Review[];
}

// Hotel image structure
export interface HotelImage {
  id: string;
  hotel_id: string;
  image_url: string;
  is_main: boolean;
  created_at?: string;
}

// Hotel theme structure
export interface HotelTheme {
  id: string;
  hotel_id: string;
  theme_id: string;
  themes?: {
    id: string;
    name: string;
  };
}

// Review structure
export interface Review {
  id: string;
  hotel_id: string;
  user_id: string;
  rating: number;
  comment?: string;
  created_at: string;
  user_name?: string;
  profiles?: {
    full_name?: string;
  } | null;
}

// Booking structure
export interface Booking {
  id: string;
  user_id: string;
  hotel_id: string;
  check_in: string;
  check_out: string;
  total_price: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
}

// User profile structure
export interface Profile {
  id: string;
  first_name?: string;
  last_name?: string;
  role: 'guest' | 'hotel_owner' | 'admin';
  email_verified: boolean;
  avatar_url?: string | null;
  phone?: string | null;
  is_hotel_owner?: boolean;
  created_at: string;
  updated_at: string;
}
