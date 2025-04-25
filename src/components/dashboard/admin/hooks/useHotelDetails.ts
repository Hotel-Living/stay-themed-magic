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
        console.log("Themes data:", hotelData.hotel_themes);
        console.log("Activities data:", hotelData.hotel_activities);
        
        const typedHotelData = hotelData as AdminHotelDetail;
        setHotel(typedHotelData);
        
        // Ensure we have valid arrays for each related data type
        setImages(typedHotelData.hotel_images || []);
        setThemes(typedHotelData.hotel_themes || []);
        setActivities(typedHotelData.hotel_activities || []);
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
