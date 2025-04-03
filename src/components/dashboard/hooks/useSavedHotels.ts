
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface SavedHotel {
  id: string;
  created_at: string;
  hotels: {
    id: string;
    name: string;
    description: string | null;
    city: string;
    country: string;
    price_per_month: number;
    main_image_url: string | null;
  } | null;
}

export function useSavedHotels() {
  const [savedHotels, setSavedHotels] = useState<SavedHotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchSavedHotels = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // First get all favorites
      const { data: favoritesData, error: favoritesError } = await supabase
        .from('favorites')
        .select('id, created_at, hotel_id')
        .eq('user_id', user.id);
      
      if (favoritesError) throw favoritesError;
      
      // Then process each favorite to get hotel details
      const processedHotels: SavedHotel[] = [];
      
      for (const favorite of favoritesData || []) {
        // Fetch hotel details for each favorite
        const { data: hotelData, error: hotelError } = await supabase
          .from('hotels')
          .select('id, name, description, city, country, price_per_month, main_image_url')
          .eq('id', favorite.hotel_id)
          .single();
        
        if (!hotelError && hotelData) {
          processedHotels.push({
            id: favorite.id,
            created_at: favorite.created_at,
            hotels: hotelData
          });
        } else {
          // Add with null hotel if there was an error fetching hotel data
          processedHotels.push({
            id: favorite.id,
            created_at: favorite.created_at,
            hotels: null
          });
        }
      }
      
      setSavedHotels(processedHotels);
    } catch (error) {
      console.error("Error fetching saved hotels:", error);
      toast({
        title: "Error loading saved hotels",
        description: "We couldn't load your saved hotels. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeSavedHotel = async (favoriteId: string) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', favoriteId);
      
      if (error) throw error;
      
      // Update local state to remove the deleted hotel
      setSavedHotels(savedHotels.filter(item => item.id !== favoriteId));
      
      toast({
        title: "Hotel removed",
        description: "The hotel has been removed from your saved list."
      });
    } catch (error) {
      console.error("Error removing hotel:", error);
      toast({
        title: "Error",
        description: "We couldn't remove this hotel. Please try again.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchSavedHotels();
  }, [user]);

  return {
    savedHotels,
    isLoading,
    removeSavedHotel,
    refreshSavedHotels: fetchSavedHotels
  };
}
