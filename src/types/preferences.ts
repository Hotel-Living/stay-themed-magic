
export interface UserPreferences {
  id: string;
  user_id: string;
  favorite_themes: string[];
  preferred_countries: string[];
  price_range_min: number;
  price_range_max: number;
  created_at: string;
  updated_at: string;
}

export interface PreferencesFormData {
  favorite_themes: string[];
  preferred_countries: string[];
  price_range_min: number;
  price_range_max: number;
}
