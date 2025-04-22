
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { HotelImage, HotelTheme } from "@/integrations/supabase/types-custom";

export interface MyHotel {
  id: string;
  name: string;
  city: string;
  country: string;
  main_image_url: string | null;
  price_per_month: number;
  category: number | null;
  hotel_images: HotelImage[];
  hotel_themes: {
    theme_id: string;
    themes: {
      id: string;
      name: string;
    };
  }[];
  available_months?: string[];
}

export async function fetchHotelsByOwner(ownerId: string): Promise<MyHotel[]> {
  if (!ownerId) return [];
  const { data, error } = await supabase
    .from("hotels")
    .select(`
      id,
      name,
      city,
      country,
      main_image_url,
      price_per_month,
      category,
      available_months,
      hotel_images (id, hotel_id, image_url, is_main, created_at),
      hotel_themes (theme_id, themes:themes(id, name))
    `)
    .eq("owner_id", ownerId)
    .eq("status", "approved");

  if (error) {
    console.error("Error fetching properties by owner:", error);
    return [];
  }
  return data as MyHotel[];
}

export function useMyProperties(ownerId: string | undefined) {
  return useQuery({
    queryKey: ["my-properties", ownerId],
    queryFn: () => (ownerId ? fetchHotelsByOwner(ownerId) : []),
    enabled: !!ownerId,
  });
}
