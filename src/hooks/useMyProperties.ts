
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
  hotel_activities: {
    activity_id: string;
    activities: {
      id: string;
      name: string;
    };
  }[];
  available_months?: string[];
  description?: string | null;
  property_type?: string | null;
  style?: string | null;
  ideal_guests?: string | null;
  atmosphere?: string | null;
  perfect_location?: string | null;
  address?: string | null;
  postal_code?: string | null;
  contact_name?: string | null;
  contact_email?: string | null;
  contact_phone?: string | null;
  meal_plans?: string[];
  room_types?: any[];
  faqs?: any[];
  terms?: string | null;
  roomTypes?: any[];
}

export async function fetchHotelsByOwner(ownerId: string): Promise<MyHotel[]> {
  if (!ownerId) return [];
  
  console.log("Fetching hotels for owner:", ownerId);
  
  try {
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
        description,
        property_type,
        style,
        address,
        hotel_images (id, hotel_id, image_url, is_main, created_at),
        hotel_themes (theme_id, themes:themes(id, name)),
        hotel_activities (activity_id, activities:activities(id, name))
      `)
      .eq("owner_id", ownerId);

    if (error) {
      console.error("Error fetching properties by owner:", error);
      return [];
    }
    
    // For testing purposes, add mock roomTypes to each hotel
    // In a production environment, this would come from the database
    const hotelsWithRoomTypes = (data as any[]).map(hotel => {
      // Use room_types from database if available, otherwise use mock data
      const roomTypes = hotel.room_types || [
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
      ];
      
      return {
        ...hotel,
        // Add the missing fields that aren't in the database query to prevent typescript errors
        ideal_guests: hotel.ideal_guests || null,
        atmosphere: hotel.atmosphere || null,
        perfect_location: hotel.perfect_location || null,
        postal_code: hotel.postal_code || null,
        contact_name: hotel.contact_name || null,
        contact_email: hotel.contact_email || null,
        contact_phone: hotel.contact_phone || null,
        meal_plans: hotel.meal_plans || [],
        room_types: hotel.room_types || [],
        faqs: hotel.faqs || [],
        terms: hotel.terms || null,
        roomTypes // Add the roomTypes property
      };
    });
    
    console.log("Returning hotels with complete data:", hotelsWithRoomTypes);
    
    return hotelsWithRoomTypes as MyHotel[];
  } catch (e) {
    console.error("Unexpected error in fetchHotelsByOwner:", e);
    return [];
  }
}

export function useMyProperties(ownerId: string | undefined) {
  return useQuery({
    queryKey: ["my-properties", ownerId],
    queryFn: () => (ownerId ? fetchHotelsByOwner(ownerId) : []),
    enabled: !!ownerId,
  });
}
