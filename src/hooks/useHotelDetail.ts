
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { HotelDetailProps, RoomType } from "@/types/hotel";

const fetchHotelDetail = async (id: string | undefined): Promise<HotelDetailProps | null> => {
  if (!id) return null;
  
  try {
    const { data, error } = await supabase
      .from("hotels")
      .select(`
        *,
        hotel_images(*),
        hotel_themes!hotel_id(
          theme_id,
          themes(*)
        ),
        hotel_activities!hotel_id(
          activity_id,
          activities(*)
        )
      `)
      .eq("id", id)
      .single();
      
    if (error) throw error;
    
    console.log("Fetched hotel data:", data);
    console.log("Dynamic pricing fields from DB:", {
      enablepriceincrease: data.enablepriceincrease,
      priceincreasecap: data.priceincreasecap,
      enable_price_increase: data.enable_price_increase,
      price_increase_cap: data.price_increase_cap
    });
    
    // Extract hotel features from features_hotel object
    const hotelFeatures = data.features_hotel 
      ? Object.entries(data.features_hotel)
          .filter(([_, isSelected]) => isSelected)
          .map(([feature]) => feature)
      : [];
      
    // Extract room features from features_room object
    const roomFeatures = data.features_room
      ? Object.entries(data.features_room)
          .filter(([_, isSelected]) => isSelected)
          .map(([feature]) => feature)
      : [];
    
    // Extract themes
    const themes = data.hotel_themes
      ? data.hotel_themes.map(themeData => themeData.themes)
      : [];

    // Extract activities
    const activities = data.hotel_activities
      ? data.hotel_activities
          .map(item => item.activities?.name)
          .filter(Boolean)
      : [];
    
    // Process room_types to ensure they match the RoomType interface
    const processedRoomTypes = data.room_types 
      ? data.room_types.map((room: any) => ({
          id: room.id || `room-${Math.random().toString(36).substr(2, 9)}`,
          name: room.name || 'Unnamed Room',
          description: room.description,
          maxOccupancy: room.maxOccupancy,
          size: room.size,
          roomCount: room.roomCount,
          baseRate: room.baseRate || room.basePrice,
          basePrice: room.basePrice || room.baseRate,
          rates: room.rates || {},
          images: room.images || [],
          availabilityDates: room.availabilityDates || []
        }))
      : [];
    
    const result = {
      ...data,
      hotelFeatures,
      roomFeatures,
      activities,
      themes,
      room_types: processedRoomTypes,
      // Map dynamic pricing fields correctly - prioritize the camelCase versions
      enablePriceIncrease: data.enablepriceincrease ?? data.enable_price_increase ?? false,
      priceIncreaseCap: data.priceincreasecap ?? data.price_increase_cap ?? 20,
      enable_price_increase: data.enable_price_increase ?? data.enablepriceincrease ?? false,
      price_increase_cap: data.price_increase_cap ?? data.priceincreasecap ?? 20
    } as HotelDetailProps;
    
    console.log("Processed hotel data with dynamic pricing:", {
      enablePriceIncrease: result.enablePriceIncrease,
      priceIncreaseCap: result.priceIncreaseCap,
      enable_price_increase: result.enable_price_increase,
      price_increase_cap: result.price_increase_cap
    });
    
    return result;
  } catch (error) {
    console.error("Error fetching hotel details:", error);
    throw error;
  }
};

export function useHotelDetail(id: string | undefined) {
  return useQuery({
    queryKey: ["hotel", id],
    queryFn: () => fetchHotelDetail(id),
    enabled: !!id,
  });
}
