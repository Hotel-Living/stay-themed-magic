import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useToast, toast } from "@/hooks/use-toast";
import { Logo } from "./Logo";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    user,
    profile,
    signOut,
    session
  } = useAuth();
  const { toast: useToastRef } = useToast();
  const isLoggedIn = !!user && !!session;
  const isHotelOwner = profile?.is_hotel_owner === true;
  const isDevelopment = process.env.NODE_ENV === 'development';

  const handleLogout = async () => {
    try {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
      if (!session) {
        console.log("No active session found, cannot logout properly");
        toast.error("No session found. Please refresh the page and try again.");
        return;
      }
      console.log("Attempting to sign out from Navbar...");
      await signOut();
      setTimeout(() => {
        if (window.location.pathname !== '/login') {
          console.log("Forcing redirect to login page");
          window.location.href = "/login";
        }
      }, 500);
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Could not complete logout. Please try again.");
    }
  };

  return <header className="shadow-md" style={{ 
      backgroundColor: "#996515",
    }}>
      <div className="container px-2 sm:px-3 py-2 flex items-center justify-between">
        <div className="flex-shrink-0">
          <Logo />
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <Link to="/faq" className="text-white font-bold hover:text-white/80 text-[0.66rem] uppercase">
            FAQ
          </Link>
          
          <Link to="/affinity-stays" className="text-white font-bold hover:text-white/80 text-[0.66rem] uppercase">
            Affinity Stays?
          </Link>
          <Link to="/hotels" className="text-white font-bold hover:text-white/80 text-[0.66rem] uppercase">
            Hotel?
          </Link>
          <Link to="/videos" className="text-white font-bold hover:text-white/80 text-[0.66rem] uppercase">
            Videos
          </Link>
          <Link to="/featured-hotels" className="text-white font-bold hover:text-white/80 text-[0.66rem] uppercase">
            Featured Hotels
          </Link>
          
          {(isLoggedIn || isDevelopment) && !isHotelOwner && (
            <Link to="/user-dashboard" className="text-white font-bold hover:text-white/80 text-[0.66rem] uppercase flex items-center gap-1">
              <User className="w-3 h-3" />
              My Account
            </Link>
          )}
          
          {(isHotelOwner || isDevelopment) && (
            <Link to="/hotel-dashboard" className="text-white font-bold hover:text-white/80 text-[0.66rem] uppercase">
              Hotel Dashboard
            </Link>
          )}
          
          {/* Admin Dashboard link - will check admin role dynamically */}
          {isLoggedIn && (
            <Link to="/admin/hotels" className="text-white font-bold hover:text-white/80 text-[0.66rem] uppercase">
              Admin Dashboard
            </Link>
          )}
          
          {!isLoggedIn && !isDevelopment && (
            <>
              <Link to="/signup" className="text-white font-bold hover:text-white/80 text-[0.66rem] uppercase">
                Register
              </Link>
              <Link to="/login" className="text-white font-bold hover:text-white/80 text-[0.66rem] uppercase">
                Login
              </Link>
            </>
          )}
          
          {isLoggedIn && !isDevelopment && (
            <button onClick={handleLogout} className="text-white font-bold hover:text-white/80 text-[0.66rem] uppercase">
              Logout
            </button>
          )}
        </div>
        
        <button className="md:hidden flex items-center" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>
      </div>
      
      <div className={cn("fixed inset-0 top-[48px] z-40 flex flex-col p-4 gap-3 transition-all duration-300 ease-in-out transform md:hidden", isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0")} style={{ 
          backgroundColor: "#996515",
        }}>
        <nav className="flex flex-col space-y-4">
          <Link to="/faq" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 text-center text-base uppercase">
            FAQ
          </Link>
          
          <Link to="/affinity-stays" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 text-center text-base uppercase">
            Affinity Stays?
          </Link>
          <Link to="/hotels" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 text-center text-base uppercase">
            Hotel?
          </Link>
          <Link to="/videos" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 text-center text-base uppercase">
            Videos
          </Link>
          <Link to="/featured-hotels" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 text-center text-base uppercase">
            Featured Hotels
          </Link>
          
          {(isLoggedIn || isDevelopment) && !isHotelOwner && (
            <Link to="/user-dashboard" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 text-center text-base uppercase flex items-center justify-center gap-1">
              <User className="w-4 h-4" />
              My Account
            </Link>
          )}
          
          {(isHotelOwner || isDevelopment) && (
            <Link to="/hotel-dashboard" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 text-center text-base uppercase">
              Hotel Dashboard
            </Link>
          )}
          
          {!isLoggedIn && !isDevelopment && (
            <>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 text-center text-base uppercase">
                Register
              </Link>
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 text-center text-base uppercase">
                Login
              </Link>
            </>
          )}
          
          {isLoggedIn && !isDevelopment && (
            <button onClick={handleLogout} className="text-white font-bold hover:text-white/80 text-center text-base uppercase">
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>;
}
