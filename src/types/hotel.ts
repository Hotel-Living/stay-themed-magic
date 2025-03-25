
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
  description: string | null;
  city: string;
  country: string;
  category: number | null;
  price_per_month: number;
  main_image_url: string | null;
  average_rating?: number;
  amenities?: string[];
  available_months?: string[];
  hotel_images: HotelImage[];
  hotel_themes: {
    theme_id: string;
    themes: HotelTheme;
  }[];
}

export interface HotelAmenitiesProps {
  amenities: string[];
}

export interface HotelAvailableMonthsProps {
  months: string[];
}

export interface HotelDescriptionProps {
  description: string;
}

export interface HotelGalleryProps {
  images: string[];
  hotelName: string;
}

export interface HotelHeaderProps {
  name: string;
  stars: number;
  city: string;
  country: string;
  availableMonthsCount: number;
  themes: HotelTheme[];
}

export interface HotelReviewsProps {
  hotelId: string;
  averageRating?: number;
}

export interface HotelDetailContentProps {
  hotel: HotelDetailProps;
}
