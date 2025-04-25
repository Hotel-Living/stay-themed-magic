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
  features_hotel?: any;
  features_room?: any;
  stay_lengths?: number[];
  room_types?: any[];
  meal_plans?: string[];
  preferredWeekday?: string;
  terms?: string | null;
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
  amenities?: string[];
  available_months?: string[];
  activities?: string[];
  hotel_images: HotelImage[];
  hotel_themes: {
    theme_id: string;
    themes: HotelTheme;
  }[];
  latitude?: number | string | null;
  longitude?: number | string | null;
  address?: string | null;
  terms?: string | null;
}

export interface HotelAmenitiesProps {
  amenities: string[];
  isLoading?: boolean;
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
