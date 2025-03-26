
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch user's favorites on mount and when user changes
  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setIsLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('favorites')
          .select('hotel_id')
          .eq('user_id', user.id);

        if (error) throw error;
        
        setFavorites(data.map(fav => fav.hotel_id));
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  // Check if a hotel is in favorites
  const isFavorite = (hotelId: string): boolean => {
    return favorites.includes(hotelId);
  };

  // Toggle favorite status
  const toggleFavorite = async (hotelId: string) => {
    if (!user) return;

    try {
      if (isFavorite(hotelId)) {
        // Remove from favorites
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('hotel_id', hotelId);

        if (error) throw error;
        
        setFavorites(favorites.filter(id => id !== hotelId));
        
        toast({
          title: "Removed from favorites",
          description: "Hotel has been removed from your favorites",
        });
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('favorites')
          .insert([{ user_id: user.id, hotel_id: hotelId }]);

        if (error) throw error;
        
        setFavorites([...favorites, hotelId]);
        
        toast({
          title: "Added to favorites",
          description: "Hotel has been added to your favorites",
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    isLoading
  };
}
