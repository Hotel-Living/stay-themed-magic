
import { HotelImage } from "@/integrations/supabase/types-custom";

export interface HotelTheme {
  id: string;
  name: string;
  description?: string | null;
  category?: string;
}

export interface HotelDetailProps {
  id: string;
  name: string;
  description: string;
  city: string;
  country: string;
  category: number;
  price_per_month: number;
  main_image_url: string;
  average_rating?: number;
  amenities?: string[];
  available_months?: string[];
  hotel_images: HotelImage[];
  hotel_themes: {
    theme_id: string;
    themes: HotelTheme;
  }[];
  owner_id?: string;
  latitude?: number | null;
  longitude?: number | null;
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
  availableMonthsCount: number;
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
