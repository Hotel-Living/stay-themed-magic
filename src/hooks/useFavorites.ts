
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

// Fetch user's favorite hotels
const fetchFavorites = async (userId: string) => {
  const { data, error } = await supabase
    .from('favorites')
    .select('hotel_id')
    .eq('user_id', userId);

  if (error) throw error;
  return data.map(item => item.hotel_id);
};

// Toggle a hotel as favorite/unfavorite
const toggleFavorite = async (userId: string, hotelId: string, isFavorite: boolean) => {
  if (isFavorite) {
    // Remove from favorites
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('hotel_id', hotelId);
    
    if (error) throw error;
    return false;
  } else {
    // Add to favorites
    const { error } = await supabase
      .from('favorites')
      .insert([{ user_id: userId, hotel_id: hotelId }]);
    
    if (error) throw error;
    return true;
  }
};

export function useFavorites() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const userId = user?.id;

  // Query to fetch favorites
  const favoritesQuery = useQuery({
    queryKey: ['favorites', userId],
    queryFn: () => userId ? fetchFavorites(userId) : [],
    enabled: !!userId,
  });

  // Mutation to toggle favorite status
  const toggleFavoriteMutation = useMutation({
    mutationFn: ({ hotelId, isFavorite }: { hotelId: string, isFavorite: boolean }) => {
      if (!userId) throw new Error('User not authenticated');
      return toggleFavorite(userId, hotelId, isFavorite);
    },
    onSuccess: (newIsFavorite, { hotelId }) => {
      // Update favorites cache
      queryClient.setQueryData(
        ['favorites', userId], 
        (oldData: string[] = []) => {
          if (newIsFavorite) {
            return [...oldData, hotelId];
          } else {
            return oldData.filter(id => id !== hotelId);
          }
        }
      );

      toast({
        title: newIsFavorite ? "Added to favorites" : "Removed from favorites",
        description: newIsFavorite 
          ? "This hotel has been added to your favorites." 
          : "This hotel has been removed from your favorites.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating favorites",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Check if a hotel is favorited
  const isFavorite = (hotelId: string): boolean => {
    return favoritesQuery.data?.includes(hotelId) || false;
  };

  // Toggle favorite status for a hotel
  const toggleFavoriteStatus = (hotelId: string) => {
    toggleFavoriteMutation.mutate({
      hotelId,
      isFavorite: isFavorite(hotelId)
    });
  };

  return {
    favorites: favoritesQuery.data || [],
    isLoading: favoritesQuery.isLoading,
    isFavorite,
    toggleFavorite: toggleFavoriteStatus
  };
}
