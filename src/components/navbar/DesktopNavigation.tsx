
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { UserNavigation } from "./UserNavigation";
import { useFavorites } from "@/hooks/useFavorites";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface DesktopNavigationProps {
  getInitials: () => string;
  signOut: () => Promise<void>;
}

export function DesktopNavigation({ getInitials, signOut }: DesktopNavigationProps) {
  const { user, profile } = useAuth();
  const { favorites } = useFavorites();
  
  return (
    <nav className="hidden md:flex items-center space-x-6">
      <div className="flex items-center space-x-6">
        <Link to="/search" className="text-white hover:text-fuchsia-200 transition">Browse</Link>
        <Link to="/services" className="text-white hover:text-fuchsia-200 transition">Services</Link>
        <Link to="/values" className="text-white hover:text-fuchsia-200 transition">Values</Link>
        <Link to="/customer-service" className="text-white hover:text-fuchsia-200 transition">Support</Link>
        
        {user && (
          <Link 
            to="/favorites" 
            className="text-white hover:text-fuchsia-200 transition flex items-center gap-1 relative"
          >
            <Heart className="w-4 h-4" />
            <span>Favorites</span>
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-fuchsia-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {favorites.length > 9 ? '9+' : favorites.length}
              </span>
            )}
          </Link>
        )}
      </div>
      
      {user ? (
        <UserNavigation profile={profile} getInitials={getInitials} signOut={signOut} />
      ) : (
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-white hover:text-fuchsia-200 transition">
            Sign in
          </Link>
          <Button asChild>
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
