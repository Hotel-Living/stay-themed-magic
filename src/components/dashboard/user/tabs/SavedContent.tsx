
import React, { useState, useEffect } from "react";
import { Building, Loader2, Star, MapPin, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export default function SavedContent() {
  const [savedHotels, setSavedHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchSavedHotels = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('favorites')
          .select(`
            id, 
            created_at,
            hotels (
              id, 
              name, 
              description, 
              city, 
              country, 
              price_per_month,
              main_image_url
            )
          `)
          .eq('user_id', user.id);
        
        if (error) throw error;
        
        setSavedHotels(data || []);
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
    
    fetchSavedHotels();
  }, [user, toast]);
  
  const handleRemoveSaved = async (favoriteId) => {
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
  
  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-6">Saved Hotels</h2>
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-6 h-6 animate-spin text-fuchsia-500" />
          <span className="ml-2">Loading your saved hotels...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-6">Saved Hotels</h2>
      
      {savedHotels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedHotels.map((item) => (
            <div key={item.id} className="border border-fuchsia-900/20 rounded-lg overflow-hidden bg-fuchsia-500/5">
              <div className="aspect-[4/3]">
                <img 
                  src={item.hotels?.main_image_url || "/placeholder.svg"} 
                  alt={item.hotels?.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{item.hotels?.name || 'Unknown Hotel'}</h3>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>
                    {item.hotels ? `${item.hotels.city}, ${item.hotels.country}` : 'Unknown Location'}
                  </span>
                </div>
                <div className="flex mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm line-clamp-2 text-muted-foreground mb-3">
                  {item.hotels?.description || 'No description available'}
                </p>
                
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <span className="block text-lg font-bold">
                      ${item.hotels?.price_per_month || 0}
                    </span>
                    <span className="text-xs text-muted-foreground">per month</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleRemoveSaved(item.id)}
                      className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-200 text-sm rounded"
                    >
                      Remove
                    </button>
                    
                    <Link 
                      to={`/hotel/${item.hotels?.id}`} 
                      className="px-3 py-1 bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-200 text-sm rounded flex items-center"
                    >
                      View <ExternalLink className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-fuchsia-950/30 flex items-center justify-center">
            <Building className="w-8 h-8 text-fuchsia-400" />
          </div>
          <h3 className="text-lg font-bold mb-2">No saved hotels</h3>
          <p className="text-muted-foreground mb-6">You haven't saved any hotels yet.</p>
          <a href="/" className="inline-block py-2 px-4 rounded-lg bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-200 text-sm font-medium transition-colors">
            Browse Hotels
          </a>
        </div>
      )}
    </div>
  );
}
