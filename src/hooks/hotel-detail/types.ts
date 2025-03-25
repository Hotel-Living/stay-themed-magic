
import { Hotel, HotelImage } from "@/integrations/supabase/types-custom";

// Extended interface to include additional properties like average_rating, amenities, and available_months
export interface HotelWithDetails extends Hotel {
  hotel_images: HotelImage[];
  hotel_themes: {
    theme_id: string;
    themes: {
      id: string;
      name: string;
    }
  }[];
  average_rating?: number;
  amenities?: string[];
  available_months?: string[];
}

// Review type
export interface Review {
  id?: string;
  hotel_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at?: string;
  user_name?: string;
  profiles?: {
    full_name?: string;
  } | null;
}
