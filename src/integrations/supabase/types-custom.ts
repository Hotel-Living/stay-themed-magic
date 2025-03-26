
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
  hotel_images?: {
    id: string;
    hotel_id: string;
    image_url: string;
    is_main: boolean;
  }[];
  hotel_themes?: {
    id: string;
    hotel_id: string;
    theme_id: string;
    themes?: {
      id: string;
      name: string;
    };
  }[];
  reviews?: {
    id: string;
    hotel_id: string;
    user_id: string;
    rating: number;
    comment?: string;
    created_at: string;
  }[];
}
