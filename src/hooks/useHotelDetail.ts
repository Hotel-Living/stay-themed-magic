
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
    
    if (!data) {
      console.log("No hotel found with ID:", id);
      return null;
    }
    
    console.log("Fetched hotel data:", data);
    
    // Extract hotel features from features_hotel object - handle null safely
    const hotelFeatures = data.features_hotel && typeof data.features_hotel === 'object'
      ? Object.entries(data.features_hotel)
          .filter(([_, isSelected]) => isSelected)
          .map(([feature]) => feature)
      : [];
      
    // Extract room features from features_room object - handle null safely
    const roomFeatures = data.features_room && typeof data.features_room === 'object'
      ? Object.entries(data.features_room)
          .filter(([_, isSelected]) => isSelected)
          .map(([feature]) => feature)
      : [];
    
    // Extract themes - handle null safely
    const themes = data.hotel_themes && Array.isArray(data.hotel_themes)
      ? data.hotel_themes
          .filter(themeData => themeData && themeData.themes)
          .map(themeData => themeData.themes)
      : [];

    // Extract activities - handle null safely
    const activities = data.hotel_activities && Array.isArray(data.hotel_activities)
      ? data.hotel_activities
          .filter(item => item && item.activities && item.activities.name)
          .map(item => item.activities.name)
      : [];
    
    // Process room_types to ensure they match the RoomType interface - handle null safely
    const processedRoomTypes = data.room_types && Array.isArray(data.room_types)
      ? data.room_types.map((room: any) => ({
          id: room?.id || `room-${Math.random().toString(36).substr(2, 9)}`,
          name: room?.name || 'Unnamed Room',
          description: room?.description || '',
          maxOccupancy: room?.maxOccupancy || 1,
          size: room?.size || 0,
          roomCount: room?.roomCount || 0,
          baseRate: room?.baseRate || room?.basePrice || 0,
          basePrice: room?.basePrice || room?.baseRate || 0,
          rates: room?.rates || {},
          images: room?.images || [],
          availabilityDates: room?.availabilityDates || []
        }))
      : [];
    
    // Safely handle dynamic pricing fields with proper fallbacks
    const enablePriceIncrease = Boolean(data.enablepriceincrease || data.enable_price_increase || false);
    const priceIncreaseCap = Number(data.priceincreasecap || data.price_increase_cap || 20);
    
    const result = {
      ...data,
      hotelFeatures,
      roomFeatures,
      activities,
      themes,
      room_types: processedRoomTypes,
      // Ensure these fields are always present with safe defaults
      enablePriceIncrease,
      priceIncreaseCap,
      enable_price_increase: enablePriceIncrease,
      price_increase_cap: priceIncreaseCap,
      // Ensure other fields have safe defaults
      available_months: data.available_months || [],
      stay_lengths: data.stay_lengths || [],
      meal_plans: data.meal_plans || [],
      rates: data.rates || {},
      hotel_images: data.hotel_images || [],
      description: data.description || '',
      atmosphere: data.atmosphere || '',
      ideal_guests: data.ideal_guests || '',
      perfect_location: data.perfect_location || ''
    } as HotelDetailProps;
    
    console.log("Successfully processed hotel data for:", data.name);
    
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
