
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut, session } = useAuth();
  const { toast } = useToast();

  const isLoggedIn = !!user && !!session;
  const isHotelOwner = profile?.is_hotel_owner === true;

  const handleLogout = async () => {
    try {
      // Close the mobile menu if it's open
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
      
      if (!session) {
        console.log("No active session found, cannot logout properly");
        toast({
          title: "Error",
          description: "No session found. Please refresh the page and try again.",
          variant: "destructive",
        });
        return;
      }
      
      await signOut();
    } catch (error) {
      console.error("Error during logout:", error);
      toast({
        title: "Error",
        description: "Could not complete logout. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#860477] backdrop-blur-xl border-b border-[#c266af]">
      <div className="container px-4 sm:px-6 py-1 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <Link 
                to={isHotelOwner ? "/hotel-dashboard" : "/user-dashboard"} 
                className="text-white font-bold hover:text-white/80 text-sm"
              >
                DASHBOARD
              </Link>
              <button 
                onClick={handleLogout} 
                className="text-white font-bold hover:text-white/80 text-sm"
              >
                LOGOUT
              </button>
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
            </>
          )}
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
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <Menu className="w-5 h-5 text-white" />
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 top-10 bg-[#860477]/95 backdrop-blur-lg z-40 flex flex-col p-4 gap-3 transition-all duration-300 ease-in-out transform md:hidden",
        isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}>
        <nav className="flex flex-col space-y-4">
          {isLoggedIn ? (
            <>
              <Link 
                to={isHotelOwner ? "/hotel-dashboard" : "/user-dashboard"} 
                onClick={() => setIsMenuOpen(false)} 
                className="text-white font-bold hover:text-white/80 text-center text-sm"
              >
                DASHBOARD
              </Link>
              <button 
                onClick={handleLogout} 
                className="text-white font-bold hover:text-white/80 text-center text-sm"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/signup" 
                onClick={() => setIsMenuOpen(false)} 
                className="text-white font-bold hover:text-white/80 text-center text-sm"
              >
                REGISTER
              </Link>
              <Link 
                to="/login" 
                onClick={() => setIsMenuOpen(false)} 
                className="text-white font-bold hover:text-white/80 text-center text-sm"
              >
                LOGIN
              </Link>
            </>
          )}
          <Link to="/faq" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 text-center text-sm">FAQ</Link>
          <Link to="/hoteles" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 text-center text-sm">HOTELS</Link>
        </nav>
      </div>
    </header>
  );
}
