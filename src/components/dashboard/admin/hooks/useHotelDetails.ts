
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AdminHotelDetail } from "@/types/hotel";

export function useHotelDetails(id: string | undefined) {
  const [hotel, setHotel] = useState<AdminHotelDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [themes, setThemes] = useState<AdminHotelDetail['hotel_themes']>([]);
  const [activities, setActivities] = useState<AdminHotelDetail['hotel_activities']>([]);
  const [images, setImages] = useState<AdminHotelDetail['hotel_images']>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchHotelDetails = async () => {
      setLoading(true);
      
      if (!id) {
        setLoading(false);
        return;
      }
      
      try {
        console.log("Fetching hotel with ID:", id);
        
        // Use maybeSingle() instead of single() to handle cases where the hotel might not exist
        const { data: hotelData, error: hotelError } = await supabase
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
          .maybeSingle();

        if (hotelError) {
          console.error("Error fetching hotel details:", hotelError);
          throw hotelError;
        }

        if (!hotelData) {
          console.log("No hotel found with ID:", id);
          setLoading(false);
          return;
        }

        console.log("Fetched hotel data:", hotelData);
        
        // Process room_types if it exists
        const processedHotelData = {
          ...hotelData,
          // Ensure room_types is properly structured if it exists
          room_types: Array.isArray(hotelData.room_types) ? hotelData.room_types.map((room: any) => ({
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
          })) : [],
          // Ensure features_hotel and features_room are objects
          features_hotel: hotelData.features_hotel || {},
          features_room: hotelData.features_room || {}
        };
        
        setHotel(processedHotelData as AdminHotelDetail);
        
        // Ensure we have valid arrays for each related data type
        setImages(processedHotelData.hotel_images || []);
        setThemes(processedHotelData.hotel_themes || []);
        setActivities(processedHotelData.hotel_activities || []);
        
        console.log("Processed hotel data:", processedHotelData);
        console.log("Hotel features:", processedHotelData.features_hotel);
        console.log("Room features:", processedHotelData.features_room);
        console.log("Hotel themes:", processedHotelData.hotel_themes);
        console.log("Hotel activities:", processedHotelData.hotel_activities);
      } catch (error: any) {
        console.error("Error fetching hotel details:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to fetch hotel details",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchHotelDetails();
    }
  }, [id, toast]);

  return { hotel, loading, themes, activities, images };
}
