
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
  preferredWeekday?: string | null;
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
        ideal_guests,
        atmosphere,
        perfect_location,
        address,
        postal_code,
        contact_name,
        contact_email,
        contact_phone,
        meal_plans,
        room_types,
        faqs,
        terms,
        preferredWeekday,
        hotel_images (id, hotel_id, image_url, is_main, created_at),
        hotel_themes (theme_id, themes:themes(id, name)),
        hotel_activities (activity_id, activities:activities(id, name))
      `)
      .eq("owner_id", ownerId);

    if (error) {
      console.error("Error fetching properties by owner:", error);
      return [];
    }
    
    if (!data || !Array.isArray(data)) {
      console.error("No data returned or invalid data format");
      return [];
    }
    
    // Process the data to ensure all fields have appropriate values
    const processedHotels = data
      .filter(hotel => hotel !== null && typeof hotel === 'object')
      .map(hotel => {
        return {
          id: hotel.id || "",
          name: hotel.name || "",
          city: hotel.city || "",
          country: hotel.country || "",
          main_image_url: hotel.main_image_url,
          price_per_month: hotel.price_per_month || 0,
          category: hotel.category,
          description: hotel.description,
          property_type: hotel.property_type,
          style: hotel.style,
          ideal_guests: hotel.ideal_guests || null,
          atmosphere: hotel.atmosphere || null,
          perfect_location: hotel.perfect_location || null,
          address: hotel.address,
          postal_code: hotel.postal_code || null,
          contact_name: hotel.contact_name || null,
          contact_email: hotel.contact_email || null,
          contact_phone: hotel.contact_phone || null,
          meal_plans: hotel.meal_plans || [],
          room_types: hotel.room_types || [],
          faqs: hotel.faqs || [],
          terms: hotel.terms || null,
          preferredWeekday: hotel.preferredWeekday || "Monday",
          available_months: hotel.available_months || [],
          hotel_images: Array.isArray(hotel.hotel_images) ? hotel.hotel_images : [],
          hotel_themes: Array.isArray(hotel.hotel_themes) ? hotel.hotel_themes : [],
          hotel_activities: Array.isArray(hotel.hotel_activities) ? hotel.hotel_activities : [],
          // Add roomTypes property for compatibility
          roomTypes: hotel.room_types || [
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
    
    console.log("Returning hotels with complete data:", processedHotels);
    
    return processedHotels;
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
