
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
  const [amenities, setAmenities] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchHotelDetails = async () => {
      setLoading(true);
      try {
        // Improved query to ensure all related data is properly fetched
        const { data: hotelData, error: hotelError } = await supabase
          .from("hotels")
          .select(`
            *,
            hotel_images(*),
            hotel_themes!inner(theme_id, themes(*)),
            hotel_activities!inner(activity_id, activities(*))
          `)
          .eq("id", id)
          .single();

        if (hotelError) throw hotelError;

        console.log("Fetched hotel data:", hotelData);
        
        const typedHotelData = hotelData as AdminHotelDetail;
        setHotel(typedHotelData);
        
        // Ensure we have valid arrays for each related data type
        setImages(typedHotelData.hotel_images || []);
        setThemes(typedHotelData.hotel_themes || []);
        setActivities(typedHotelData.hotel_activities || []);

        // Generate amenities based on hotel category
        if (typedHotelData.category) {
          const categoryAmenities = generateAmenities(typedHotelData.category);
          setAmenities(categoryAmenities);
        }

      } catch (error: any) {
        console.error("Error fetching hotel details:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to fetch hotel details",
          variant: "destructive"
        });
        
        // If the error is from inner join but the hotel exists, try again without inner join
        if (error.message && error.message.includes("not found")) {
          try {
            const { data: basicHotelData } = await supabase
              .from("hotels")
              .select(`
                *,
                hotel_images(*),
                hotel_themes(theme_id, themes(*)),
                hotel_activities(activity_id, activities(*))
              `)
              .eq("id", id)
              .single();
              
            if (basicHotelData) {
              console.log("Fetched basic hotel data as fallback:", basicHotelData);
              const typedHotelData = basicHotelData as AdminHotelDetail;
              setHotel(typedHotelData);
              setImages(typedHotelData.hotel_images || []);
              setThemes(typedHotelData.hotel_themes || []);
              setActivities(typedHotelData.hotel_activities || []);
              
              if (typedHotelData.category) {
                setAmenities(generateAmenities(typedHotelData.category));
              }
            }
          } catch (fallbackError) {
            console.error("Fallback fetch also failed:", fallbackError);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchHotelDetails();
    }
  }, [id, toast]);

  return { hotel, loading, themes, activities, images, amenities };
}

function generateAmenities(category: number): string[] {
  const baseAmenities = ["Free WiFi", "Air Conditioning", "Daily Housekeeping"];
  
  if (category >= 3) {
    baseAmenities.push("Pool", "Gym");
  }
  
  if (category >= 4) {
    baseAmenities.push("Spa", "Room Service", "Restaurant");
  }
  
  if (category >= 5) {
    baseAmenities.push("Concierge Service", "Valet Parking", "Business Center");
  }
  
  return baseAmenities;
}
