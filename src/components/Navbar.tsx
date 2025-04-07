import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "./Logo";
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    user,
    profile,
    signOut,
    session
  } = useAuth();
  const {
    toast
  } = useToast();
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
        toast({
          title: "Error",
          description: "No session found. Please refresh the page and try again.",
          variant: "destructive"
        });
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
      toast({
        title: "Error",
        description: "Could not complete logout. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Determine the My Account URL based on user type
  const getMyAccountUrl = () => {
    if (isHotelOwner) {
      return "/hotel-dashboard";
    }
    return "/user-dashboard";
  };
  return <header className="bg-[#860493] shadow-md">
      <div className="container px-4 sm:px-6 py-2 flex items-center justify-between">
        <Logo />
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/signup" className="text-white font-medium hover:text-white/80 text-[0.6rem] uppercase">
            Register
          </Link>
          <Link to="/login" className="text-white font-medium hover:text-white/80 text-[0.6rem] uppercase">
            Login
          </Link>
          {isLoggedIn || isDevelopment ? <>
              <Link to={getMyAccountUrl()} className="text-white font-medium hover:text-white/80 text-[0.6rem] uppercase flex items-center gap-1">
                <User className="w-3 h-3" />
                My Account
              </Link>
              {!isDevelopment && <button onClick={handleLogout} className="text-white font-medium hover:text-white/80 text-[0.6rem] uppercase">
                  Logout
                </button>}
            </> : null}
          <Link to="/faq" className="text-white font-medium hover:text-white/80 text-[0.6rem] uppercase">
            FAQ
          </Link>
          <Link to="/hotels" className="text-white font-medium hover:text-white/80 text-[0.6rem] uppercase">
            Hotels
          </Link>
          <Link to="/hotel-dashboard" className="text-white font-medium hover:text-white/80 text-[0.6rem] uppercase">
            Hotel Dashboard
          </Link>
        </div>
        
        <button className="md:hidden flex items-center" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>
      </div>
      
      <div className={cn("fixed inset-0 top-[48px] bg-[#860493] z-40 flex flex-col p-4 gap-3 transition-all duration-300 ease-in-out transform md:hidden", isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0")}>
        <nav className="flex flex-col space-y-4">
          <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="text-white font-medium hover:text-white/80 text-center text-base uppercase">
            Register
          </Link>
          <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-white font-medium hover:text-white/80 text-center text-base uppercase">
            Login
          </Link>
          {isLoggedIn || isDevelopment ? <>
              <Link to={getMyAccountUrl()} onClick={() => setIsMenuOpen(false)} className="text-white font-medium hover:text-white/80 text-center text-base uppercase flex items-center justify-center gap-1">
                <User className="w-4 h-4" />
                My Account
              </Link>
              {!isDevelopment && <button onClick={handleLogout} className="text-white font-medium hover:text-white/80 text-center text-base uppercase">
                  Logout
                </button>}
            </> : null}
          <Link to="/faq" onClick={() => setIsMenuOpen(false)} className="text-white font-medium hover:text-white/80 text-center text-base uppercase">FAQ</Link>
          <Link to="/hotels" onClick={() => setIsMenuOpen(false)} className="text-white font-medium hover:text-white/80 text-center text-base uppercase">Hotels</Link>
          
        </nav>
      </div>
    </header>;
}