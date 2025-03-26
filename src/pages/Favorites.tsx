
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HotelCard } from "@/components/HotelCard";
import { useFavorites } from "@/hooks/useFavorites";
import { supabase } from "@/integrations/supabase/client";
import { Hotel } from "@/integrations/supabase/types-custom";
import { Heart, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

// Extended type for hotel with themes data that's safely compatible with the actual structure
interface HotelWithThemes {
  id: string;
  name: string;
  city: string;
  country: string;
  description?: string;
  price_per_month: number;
  category?: number;
  main_image_url?: string;
  hotel_themes?: {
    themes: {
      id: string;
      name: string;
    }
  }[];
  hotel_images?: {
    id: string;
    hotel_id: string;
    image_url: string;
    is_main: boolean;
  }[];
}

export default function Favorites() {
  const { favorites, isLoading: isFavoritesLoading } = useFavorites();
  const [favoriteHotels, setFavoriteHotels] = useState<HotelWithThemes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Ensure user is authenticated
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchFavoriteHotels = async () => {
      if (favorites.length === 0) {
        setFavoriteHotels([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('hotels')
          .select(`
            *,
            hotel_images(id, hotel_id, image_url, is_main),
            hotel_themes(id, hotel_id, theme_id, themes:themes(id, name))
          `)
          .in('id', favorites);

        if (error) throw error;
        
        setFavoriteHotels(data || []);
      } catch (error) {
        console.error('Error fetching favorite hotels:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isFavoritesLoading) {
      fetchFavoriteHotels();
    }
  }, [favorites, isFavoritesLoading, navigate, user]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="glass-card rounded-xl p-6 mb-8">
          <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
            <Heart className="h-8 w-8 text-fuchsia-500" />
            Your Favorite Hotels
          </h1>
          <p className="text-white/70 mb-6">
            View and manage your saved hotels. Click on any hotel to view details or remove it from your favorites.
          </p>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="glass-card rounded-xl overflow-hidden animate-pulse">
                  <div className="h-48 bg-white/5"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-6 w-3/4 bg-white/10 rounded"></div>
                    <div className="flex gap-2">
                      <div className="h-5 w-16 bg-white/10 rounded-full"></div>
                      <div className="h-5 w-16 bg-white/10 rounded-full"></div>
                    </div>
                    <div className="flex justify-between pt-2">
                      <div className="h-5 w-20 bg-white/10 rounded"></div>
                      <div className="h-4 w-16 bg-white/10 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : favoriteHotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteHotels.map(hotel => (
                <HotelCard 
                  key={hotel.id}
                  id={hotel.id}
                  name={hotel.name}
                  city={hotel.city}
                  country={hotel.country}
                  stars={hotel.category || 0}
                  pricePerMonth={hotel.price_per_month}
                  themes={hotel.hotel_themes?.map(theme => theme.themes.name) || []}
                  image={hotel.main_image_url || ''}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-fuchsia-900/20 flex items-center justify-center">
                <Heart className="w-10 h-10 text-fuchsia-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">No favorites yet</h3>
              <p className="text-white/70 mb-6">You haven't saved any hotels to your favorites yet.</p>
              <Button 
                onClick={() => navigate('/search')} 
                className="flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Browse Hotels
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
