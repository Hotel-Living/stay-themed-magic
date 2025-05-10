
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AdminHotelDetail } from "@/types/hotel";

export function useHotelBasicDetails(id: string | undefined) {
  const [hotel, setHotel] = useState<AdminHotelDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchHotelDetails = async () => {
    setLoading(true);
    
    if (!id) {
      setLoading(false);
      return;
    }
    
    try {
      console.log("Fetching hotel with ID:", id);
      
      const { data: hotelData, error: hotelError } = await supabase
        .from("hotels")
        .select(`
          *,
          pending_changes
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
      
      // Ensure required structures exist
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
        features_room: hotelData.features_room || {},
        // Ensure pending_changes is initialized as an object if it doesn't exist
        pending_changes: hotelData.pending_changes || {}
      };
      
      setHotel(processedHotelData as AdminHotelDetail);
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

  useEffect(() => {
    if (id) {
      fetchHotelDetails();
    }
  }, [id, toast]);

  const refetch = async () => {
    await fetchHotelDetails();
  };

  return { hotel, loading, refetch };
}
