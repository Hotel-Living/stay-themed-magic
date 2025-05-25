export type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  is_hotel_owner: boolean;
  created_at: string;
  updated_at: string;
}

export type Hotel = {
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  country: string;
  city: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  price_per_month: number;
  main_image_url: string | null;
  category: number | null;
  property_type: string | null;
  style: string | null;
  ideal_guests: string | null;
  atmosphere: string | null;
  perfect_location: string | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  status: 'approved' | 'pending' | 'rejected';
  rejection_reason?: string | null;
  available_months?: string[];
  postal_code?: string | null;
  contact_name?: string | null;
  contact_email?: string | null;
  contact_phone?: string | null;
  features_hotel?: Record<string, boolean>;
  features_room?: Record<string, boolean>;
  meal_plans?: string[];
  room_types?: any[];
  stay_lengths?: number[] | string[];
  faqs?: any[];
  terms?: string | null;
  preferredWeekday?: string | null;
  rates?: Record<string, number>;
  pending_changes?: Record<string, any>;
  // USE CORRECT SNAKE_CASE FIELD NAMES FOR DYNAMIC PRICING
  enable_price_increase?: boolean;
  price_increase_cap?: number;
  hotel_images?: {
    id: string;
    hotel_id: string;
    image_url: string;
    is_main: boolean;
    created_at: string;
  }[];
  hotel_themes?: {
    theme_id: string;
    themes?: {
      id: string;
      name: string;
      description?: string | null;
      category?: string;
    };
  }[];
  hotel_activities?: {
    activity_id: string;
    activities?: {
      id: string;
      name: string;
      category?: string;
    };
  }[];
}

export type Theme = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export type HotelTheme = {
  id: string;
  hotel_id: string;
  theme_id: string;
}

export type HotelImage = {
  id: string;
  hotel_id: string;
  image_url: string;
  is_main: boolean;
  created_at: string;
}

export type Booking = {
  id: string;
  user_id: string;
  hotel_id: string;
  check_in: string;
  check_out: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
}

export type Review = {
  id: string;
  user_id: string;
  hotel_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "created_at" | "updated_at">;
        Update: Partial<Omit<Profile, "id" | "created_at" | "updated_at">>;
      };
      hotels: {
        Row: Hotel;
        Insert: Omit<Hotel, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Hotel, "id" | "created_at" | "updated_at">>;
      };
      themes: {
        Row: Theme;
        Insert: Omit<Theme, "id" | "created_at">;
        Update: Partial<Omit<Theme, "id" | "created_at">>;
      };
      hotel_themes: {
        Row: HotelTheme;
        Insert: Omit<HotelTheme, "id">;
        Update: Partial<Omit<HotelTheme, "id">>;
      };
      hotel_images: {
        Row: HotelImage;
        Insert: Omit<HotelImage, "id" | "created_at">;
        Update: Partial<Omit<HotelImage, "id" | "created_at">>;
      };
      bookings: {
        Row: Booking;
        Insert: Omit<Booking, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Booking, "id" | "created_at" | "updated_at">>;
      };
      reviews: {
        Row: Review;
        Insert: Omit<Review, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Review, "id" | "created_at" | "updated_at">>;
      };
    };
  };
};
