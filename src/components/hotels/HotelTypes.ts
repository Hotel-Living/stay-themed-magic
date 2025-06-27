
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
  available_months?: string; // Changed from string to match database format
  available_days?: string;
  meal_plan?: string;
  room_types?: string;
  hotel_services?: string;
  room_services?: string;
  property_type?: string;
  property_style?: string;
}
