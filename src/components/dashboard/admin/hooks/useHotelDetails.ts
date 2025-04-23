
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useHotelDetails(id: string | undefined) {
  const [hotel, setHotel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [themes, setThemes] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchHotelDetails = async () => {
      setLoading(true);
      try {
        // Fetch hotel data
        const { data: hotelData, error: hotelError } = await supabase
          .from("hotels")
          .select("*")
          .eq("id", id)
          .single();

        if (hotelError) throw hotelError;
        setHotel(hotelData);

        // Fetch hotel images
        const { data: imageData, error: imageError } = await supabase
          .from("hotel_images")
          .select("*")
          .eq("hotel_id", id);

        if (imageError) throw imageError;
        setImages(imageData || []);

        // Fetch hotel themes
        const { data: themeData, error: themeError } = await supabase
          .from("hotel_themes")
          .select(`
            theme_id,
            themes:theme_id(id, name, description, category)
          `)
          .eq("hotel_id", id);

        if (themeError) throw themeError;
        setThemes(themeData || []);

        // Fetch hotel activities
        const { data: activityData, error: activityError } = await supabase
          .from("hotel_activities")
          .select(`
            activity_id,
            activities:activity_id(id, name, category)
          `)
          .eq("hotel_id", id);

        if (activityError) throw activityError;
        setActivities(activityData || []);

        // Generate amenities based on hotel category
        if (hotelData.category) {
          const categoryAmenities = generateAmenities(hotelData.category);
          setAmenities(categoryAmenities);
        }

      } catch (error: any) {
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
