
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
    // First check if the ideal_guests column exists in the hotels table
    const { data: columns, error: columnsError } = await supabase
      .from('hotels')
      .select('*')
      .limit(1);
    
    if (columnsError) {
      console.error("Error checking hotel columns:", columnsError);
      return [];
    }
    
    // Construct the query based on available columns
    let query = supabase
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
        postal_code,
        hotel_images (id, hotel_id, image_url, is_main, created_at),
        hotel_themes (theme_id, themes:themes(id, name)),
        hotel_activities (activity_id, activities:activities(id, name))
      `);
    
    // Add additional columns if they exist
    const firstHotel = columns && columns.length > 0 ? columns[0] : {};
    if ('ideal_guests' in firstHotel) {
      query = query.select(`*, ideal_guests`);
    }
    if ('atmosphere' in firstHotel) {
      query = query.select(`*, atmosphere`);
    }
    if ('perfect_location' in firstHotel) {
      query = query.select(`*, perfect_location`);
    }
    if ('contact_name' in firstHotel) {
      query = query.select(`*, contact_name`);
    }
    if ('contact_email' in firstHotel) {
      query = query.select(`*, contact_email`);
    }
    if ('contact_phone' in firstHotel) {
      query = query.select(`*, contact_phone`);
    }
    if ('meal_plans' in firstHotel) {
      query = query.select(`*, meal_plans`);
    }
    if ('room_types' in firstHotel) {
      query = query.select(`*, room_types`);
    }
    if ('faqs' in firstHotel) {
      query = query.select(`*, faqs`);
    }
    if ('terms' in firstHotel) {
      query = query.select(`*, terms`);
    }
    if ('preferredWeekday' in firstHotel) {
      query = query.select(`*, preferredWeekday`);
    }
    
    // Execute the final query with owner filter
    const { data, error } = await query.eq("owner_id", ownerId);

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
        // Create default room types with proper fallback for hotel id
        const safeHotelId = (hotel.id as string) || 'default';
        const defaultRoomTypes = [
          {
            id: `rt-${safeHotelId}-1`,
            name: "Standard Room",
            description: "Comfortable room with all basic amenities",
            baseRate: 150,
            basePrice: 150,
            roomCount: 5
          },
          {
            id: `rt-${safeHotelId}-2`,
            name: "Deluxe Suite",
            description: "Spacious suite with separate living area",
            baseRate: 250,
            basePrice: 250,
            roomCount: 2
          }
        ];
        
        // Create the processed hotel object with type assertion to force TypeScript to accept our structure
        const processedHotel: MyHotel = {
          id: (hotel.id as string) || "",
          name: (hotel.name as string) || "",
          city: (hotel.city as string) || "",
          country: (hotel.country as string) || "",
          main_image_url: (hotel.main_image_url as string | null) || null,
          price_per_month: (hotel.price_per_month as number) || 0,
          category: (hotel.category as number | null) || null,
          description: (hotel.description as string | null) || null,
          property_type: (hotel.property_type as string | null) || null,
          style: (hotel.style as string | null) || null,
          ideal_guests: (hotel.ideal_guests as string | null) || null,
          atmosphere: (hotel.atmosphere as string | null) || null,
          perfect_location: (hotel.perfect_location as string | null) || null,
          address: (hotel.address as string | null) || null,
          postal_code: (hotel.postal_code as string | null) || null,
          contact_name: (hotel.contact_name as string | null) || null,
          contact_email: (hotel.contact_email as string | null) || null,
          contact_phone: (hotel.contact_phone as string | null) || null,
          meal_plans: Array.isArray(hotel.meal_plans) ? hotel.meal_plans : [],
          room_types: Array.isArray(hotel.room_types) ? hotel.room_types : [],
          faqs: Array.isArray(hotel.faqs) ? hotel.faqs : [],
          terms: (hotel.terms as string | null) || null,
          preferredWeekday: (hotel.preferredWeekday as string | null) || "Monday",
          available_months: Array.isArray(hotel.available_months) ? hotel.available_months : [],
          hotel_images: Array.isArray(hotel.hotel_images) ? hotel.hotel_images : [],
          hotel_themes: Array.isArray(hotel.hotel_themes) ? hotel.hotel_themes : [],
          hotel_activities: Array.isArray(hotel.hotel_activities) ? hotel.hotel_activities : [],
          // Add roomTypes property for compatibility
          roomTypes: Array.isArray(hotel.room_types) ? hotel.room_types : defaultRoomTypes
        };
        
        return processedHotel;
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
