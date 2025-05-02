
import { HotelImage as SupabaseHotelImage } from "@/integrations/supabase/types-custom";

export interface HotelTheme {
  id: string;
  name: string;
  description?: string | null;
  category?: string;
}

export interface HotelActivity {
  activity_id: string;
  activities?: {
    id: string;
    name: string;
    category?: string;
  };
}

export interface HotelImage {
  id: string;
  hotel_id: string;
  image_url: string;
  is_main: boolean;
  created_at: string;
}

export interface RoomType {
  id: string;
  name: string;
  description?: string;
  maxOccupancy?: number;
  size?: number;
  roomCount?: number;
  basePrice?: number;
  baseRate?: number;
  rates?: Record<number, number>;
  images?: string[];
  availabilityDates?: string[];
}

export interface AdminHotelDetail {
  id: string;
  name: string;
  description: string | null;
  city: string;
  country: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  category: number | null;
  price_per_month: number;
  main_image_url: string | null;
  property_type: string | null;
  style: string | null;
  status: 'approved' | 'pending' | 'rejected';
  rejection_reason?: string | null;
  is_featured: boolean;
  owner_id: string;
  created_at: string;
  updated_at: string;
  available_months?: string[];
  hotel_images: HotelImage[];
  hotel_themes: {
    theme_id: string;
    themes: HotelTheme;
  }[];
  hotel_activities: HotelActivity[];
  features_hotel?: Record<string, boolean>;
  features_room?: Record<string, boolean>;
  stay_lengths?: number[];
  room_types?: RoomType[] | any[];
  meal_plans?: string[];
  preferredWeekday?: string;
  atmosphere?: string | null;
  ideal_guests?: string | null;
  perfect_location?: string | null;
  terms?: string | null;
  rates?: Record<string, number>;
  currency?: string;
  enablePriceIncrease?: boolean;
  priceIncreaseCap?: number;
}

export interface HotelDetailProps {
  id: string;
  name: string;
  description: string | null;
  idealGuests?: string | null;
  atmosphere?: string | null;
  perfectLocation?: string | null;
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
  enablePriceIncrease?: boolean;
  priceIncreaseCap?: number;
}

// Update AmenitiesInfo to FeaturesInfo
export interface HotelFeaturesInfoProps {
  hotelFeatures: string[];
  roomFeatures: string[];
}

export interface HotelAvailableMonthsProps {
  months: string[];
  isLoading?: boolean;
}

export interface HotelDescriptionProps {
  description: string;
  idealGuests?: string;
  atmosphere?: string;
  perfectLocation?: string;
  isLoading?: boolean;
}

export interface HotelGalleryProps {
  images: string[];
  hotelName: string;
  isLoading?: boolean;
}

export interface HotelHeaderProps {
  name: string;
  stars: number;
  city: string;
  country: string;
  themes: HotelTheme[];
  isLoading?: boolean;
}

export interface HotelReviewsProps {
  hotelId: string;
  averageRating?: number;
  isLoading?: boolean;
}

export interface HotelDetailContentProps {
  hotel: HotelDetailProps;
  isLoading?: boolean;
}
