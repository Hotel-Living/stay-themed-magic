
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { UserNavigation } from "./UserNavigation";

interface DesktopNavigationProps {
  getInitials: () => string;
  signOut: () => Promise<void>;
}

export function DesktopNavigation({ getInitials, signOut }: DesktopNavigationProps) {
  const { user, profile } = useAuth();
  const { isHotelOwner } = useAuthStatus();

  return (
    <div className="hidden md:flex items-center gap-6">
      {user ? (
        <>
          <Link 
            to="/" 
            className="text-white font-bold hover:text-white/80 text-sm"
          >
            HOME
          </Link>
          
          <Link 
            to="/search" 
            className="text-white font-bold hover:text-white/80 text-sm"
          >
            EXPLORE
          </Link>
          
          <Link 
            to="/faq" 
            className="text-white font-bold hover:text-white/80 text-sm"
          >
            FAQ
          </Link>
          
          {isHotelOwner && (
            <Link 
              to="/hotel-dashboard" 
              className="text-white font-bold hover:text-white/80 text-sm"
            >
              MY HOTELS
            </Link>
          )}
          
          <UserNavigation 
            profile={profile} 
            getInitials={getInitials} 
            signOut={signOut} 
          />
        </>
      ) : (
        <>
          <Link 
            to="/signup" 
            className="text-white font-bold hover:text-white/80 text-sm"
          >
            REGISTER
          </Link>
          <Link 
            to="/login" 
            className="text-white font-bold hover:text-white/80 text-sm"
          >
            LOGIN
          </Link>
          <Link 
            to="/faq" 
            className="text-white font-bold hover:text-white/80 text-sm"
          >
            FAQ
          </Link>
          <Link 
            to="/hoteles" 
            className="text-white font-bold hover:text-white/80 text-sm"
          >
            HOTELS
          </Link>
        </>
      )}
    </div>
  );
}
