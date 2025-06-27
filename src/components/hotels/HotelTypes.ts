
export interface Hotel {
  id: string;
  name: string;
  description?: string;
  city?: string;
  country?: string;
  theme_id?: string;
  price_per_month?: number;
  min_stay_length?: number;
  activities?: string;
  stars?: number;
  category?: number;
  available_months?: string[];
  available_days?: string;
  meal_plan?: string;
  meal_plans?: string[];
  room_types?: any[]; // Changed from string to any[] to match database Json[]
  hotel_services?: string;
  room_services?: string;
  property_type?: string;
  property_style?: string;
  style?: string;
  main_image_url?: string;
  atmosphere?: string;
  stay_lengths?: number[];
  features_hotel?: Record<string, boolean>;
  features_room?: Record<string, boolean>;
  hotel_images?: Array<{ image_url: string, is_main?: boolean }>;
  hotel_themes?: Array<{ themes?: { name: string } }>;
  hotel_activities?: Array<{ activities?: { name: string } }>;
}
