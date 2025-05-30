
import { HotelImage, HotelTheme, RoomType } from './base';

export interface HotelDetailProps {
  id: string;
  name: string;
  description: string | null;
  idealGuests?: string | null;
  atmosphere?: string | null;
  perfectLocation?: string | null;
  // Add snake_case variants to match database fields
  ideal_guests?: string | null;
  perfect_location?: string | null;
  city: string;
  country: string;
  category: number | null;
  price_per_month: number;
  main_image_url: string | null;
  average_rating?: number;
  hotelFeatures?: string[];
  roomFeatures?: string[];
  available_months?: string[];
  activities?: string[];
  hotel_images: HotelImage[];
  hotel_themes: {
    theme_id: string;
    themes: HotelTheme;
  }[];
  themes?: HotelTheme[]; // Added this property to fix the first error
  room_types?: RoomType[] | any[];
  latitude?: number | string | null;
  longitude?: number | string | null;
  address?: string | null;
  property_type?: string | null;
  style?: string | null;
  meal_plans?: string[];
  stay_lengths?: number[];
  terms?: string | null;
  features_hotel?: Record<string, boolean>;
  features_room?: Record<string, boolean>;
  rates?: Record<string, number>;
  currency?: string;
  enable_price_increase?: boolean;
  price_increase_cap?: number;
  // ADD THE NEW CAMELCASE COLUMNS FROM THE DATABASE  
  enablePriceIncrease?: boolean;
  priceIncreaseCap?: number;
  preferredWeekday?: string;
  check_in_weekday?: string;
  pricingMatrix?: Array<{
    roomType: string;
    stayLength: string;
    mealPlan: string;
    price: number;
  }>;
}
