
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
  roomTypes?: any[]; // Added roomTypes property
}

export async function fetchHotelsByOwner(ownerId: string): Promise<MyHotel[]> {
  if (!ownerId) return [];
  
  console.log("Fetching hotels for owner:", ownerId);
  
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
  
  // For testing purposes, add mock roomTypes to each hotel
  // In a production environment, this would come from the database
  const hotelsWithRoomTypes = (data as MyHotel[]).map(hotel => {
    return {
      ...hotel,
      roomTypes: [
        {
          id: `rt-${hotel.id}-1`,
          name: "Standard Room",
          description: "Comfortable room with all basic amenities",
          baseRate: 150,
          basePrice: 150,
          roomCount: 5
        },
        {
          id: `rt-${hotel.id}-2`,
          name: "Deluxe Suite",
          description: "Spacious suite with separate living area",
          baseRate: 250,
          basePrice: 250,
          roomCount: 2
        }
      ]
    };
  });
  
  console.log("Returning hotels with roomTypes:", hotelsWithRoomTypes);
  
  return hotelsWithRoomTypes;
}

export function useMyProperties(ownerId: string | undefined) {
  return useQuery({
    queryKey: ["my-properties", ownerId],
    queryFn: () => (ownerId ? fetchHotelsByOwner(ownerId) : []),
    enabled: !!ownerId,
  });
}
