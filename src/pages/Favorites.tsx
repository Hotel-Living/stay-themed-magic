
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useFavorites } from "@/hooks/useFavorites";
import { useHotels } from "@/hooks/useHotels";
import { useAuth } from "@/context/AuthContext";
import { SearchResultsList } from "@/components/search/SearchResultsList";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Favorites() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { favorites, isLoading: isFavoritesLoading } = useFavorites();
  const { data: hotels = [], isLoading: isHotelsLoading } = useHotels({}, !isAuthLoading);
  
  // Filter hotels to only include favorited ones
  const favoriteHotels = hotels.filter(hotel => favorites.includes(hotel.id));
  const isLoading = isAuthLoading || isFavoritesLoading || isHotelsLoading;

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-2 text-white">Your Favorites</h1>
          <p className="text-white/70 mb-8">Hotels you've saved for later</p>
          
          {!isLoading && (!user || favoriteHotels.length === 0) ? (
            <div className="glass-card rounded-xl p-8 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-fuchsia-900/20 flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-fuchsia-400" />
              </div>
              
              {!user ? (
                <>
                  <h2 className="text-xl font-bold mb-2 text-white">Sign in to see your favorites</h2>
                  <p className="text-white/70 mb-6">Create an account or sign in to save your favorite hotels</p>
                  <div className="flex justify-center gap-4">
                    <Button asChild>
                      <Link to="/login">Sign In</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/signup">Create Account</Link>
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-2 text-white">No favorites yet</h2>
                  <p className="text-white/70 mb-6">Save hotels you like by clicking the heart icon</p>
                  <Button asChild>
                    <Link to="/">Browse Hotels</Link>
                  </Button>
                </>
              )}
            </div>
          ) : (
            <SearchResultsList 
              filteredHotels={favoriteHotels} 
              isLoading={isLoading} 
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
