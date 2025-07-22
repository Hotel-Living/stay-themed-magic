import { HotelImage, HotelTheme, RoomType } from './base';

export interface BankingInfo {
  bank_name?: string | null;
  iban_account?: string | null;
  swift_bic?: string | null;
  bank_country?: string | null;
  account_holder?: string | null;
}

export interface LaundryService {
  available: boolean;
  self_service?: boolean;
  full_service?: boolean;
  external_redirect?: string | null;
  pricing?: string | null;
}

export interface HotelDetailProps {
  id: string;
  name: string;
  description: string | null;
  idealGuests?: string | null;
  atmosphere?: string | null;
  perfectLocation?: string | null;
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
  themes?: HotelTheme[];
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
  
  // New fields from updated JotForm
  banking_info?: BankingInfo;
  laundry_service?: LaundryService;
  additional_amenities?: string[];
  special_features?: string[];
  accessibility_features?: string[];
  check_in_instructions?: string | null;
  local_recommendations?: string | null;
  house_rules?: string[];
  cancellation_policy?: string | null;
  additional_data?: Record<string, any> | null;
}
