
import { HotelImage } from "@/integrations/supabase/types-custom";

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
    themes: {
      id: string;
      name: string;
    }
  }[];
}

export interface HotelThemeProps {
  id: string;
  name: string;
}
