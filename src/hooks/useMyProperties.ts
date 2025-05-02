
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
  rates?: Record<string, number>; // Added rates field
}

export async function fetchHotelsByOwner(ownerId: string): Promise<MyHotel[]> {
  if (!ownerId) return [];
  
  console.log("Fetching hotels for owner:", ownerId);
  
  try {
    // Build base query with essential fields that should always exist
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
        description,
        property_type,
        style,
        address,
        available_months,
        rates,
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
        
        // Create the processed hotel object with safe type handling
        const processedHotel: MyHotel = {
          id: (hotel.id as string) || "",
          name: (hotel.name as string) || "",
          city: (hotel.city as string) || "",
          country: (hotel.country as string) || "",
          main_image_url: (hotel.main_image_url as string | null) || null,
          price_per_month: Number(hotel.price_per_month) || 0,
          category: (hotel.category as number | null) || null,
          description: (hotel.description as string | null) || null,
          property_type: (hotel.property_type as string | null) || null,
          style: (hotel.style as string | null) || null,
          address: (hotel.address as string | null) || null,
          available_months: Array.isArray(hotel.available_months) ? hotel.available_months : [],
          hotel_images: Array.isArray(hotel.hotel_images) ? hotel.hotel_images : [],
          hotel_themes: Array.isArray(hotel.hotel_themes) ? hotel.hotel_themes : [],
          hotel_activities: Array.isArray(hotel.hotel_activities) ? hotel.hotel_activities : [],
          rates: (hotel.rates as Record<string, number>) || {}, // Added rates
          // Additional fields with safe defaults
          ideal_guests: null,
          atmosphere: null,
          perfect_location: null,
          postal_code: null,
          contact_name: null,
          contact_email: null,
          contact_phone: null,
          meal_plans: [],
          room_types: [],
          faqs: [],
          terms: null,
          preferredWeekday: "Monday",
          // Add roomTypes property for compatibility
          roomTypes: defaultRoomTypes
        };
        
        // Try to get any additional fields if they are available in the response
        try {
          // Handle each field carefully with type checking
          if ('ideal_guests' in hotel) processedHotel.ideal_guests = hotel.ideal_guests as string | null;
          if ('atmosphere' in hotel) processedHotel.atmosphere = hotel.atmosphere as string | null;
          if ('perfect_location' in hotel) processedHotel.perfect_location = hotel.perfect_location as string | null;
          if ('postal_code' in hotel) processedHotel.postal_code = hotel.postal_code as string | null;
          if ('contact_name' in hotel) processedHotel.contact_name = hotel.contact_name as string | null;
          if ('contact_email' in hotel) processedHotel.contact_email = hotel.contact_email as string | null;
          if ('contact_phone' in hotel) processedHotel.contact_phone = hotel.contact_phone as string | null;
          if ('meal_plans' in hotel && Array.isArray(hotel.meal_plans)) processedHotel.meal_plans = hotel.meal_plans;
          if ('room_types' in hotel && Array.isArray(hotel.room_types)) {
            processedHotel.room_types = hotel.room_types;
            processedHotel.roomTypes = hotel.room_types;
          }
          if ('faqs' in hotel && Array.isArray(hotel.faqs)) processedHotel.faqs = hotel.faqs;
          if ('terms' in hotel) processedHotel.terms = hotel.terms as string | null;
          if ('preferredWeekday' in hotel) processedHotel.preferredWeekday = hotel.preferredWeekday as string | null;
          
          // Handle rates if present
          if ('rates' in hotel && typeof hotel.rates === 'object') {
            processedHotel.rates = hotel.rates as Record<string, number>;
          }
        } catch (err) {
          console.warn("Error processing extended hotel fields:", err);
        }
        
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
