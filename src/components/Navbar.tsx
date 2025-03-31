
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
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

  return <header className="fixed top-0 left-0 right-0 z-50 bg-[#9B019C] shadow-md">
      <div className="container px-4 sm:px-6 py-4 flex items-center justify-between">
        <Logo />
        
        <div className="hidden md:flex items-center gap-8">
          {isLoggedIn ? <>
              <Link to={isHotelOwner ? "/hotel-dashboard" : "/user-dashboard"} className="text-white font-medium hover:text-white/80 text-base uppercase">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="text-white font-medium hover:text-white/80 text-base uppercase">
                Logout
              </button>
            </> : <>
              <Link to="/signup" className="text-white font-medium hover:text-white/80 text-base uppercase">
                Register
              </Link>
              <Link to="/login" className="text-white font-medium hover:text-white/80 text-base uppercase">
                Login
              </Link>
            </>}
          <Link to="/faq" className="text-white font-medium hover:text-white/80 text-base uppercase">
            FAQ
          </Link>
          <Link to="/hoteles" className="text-white font-medium hover:text-white/80 text-base uppercase">
            Hotels
          </Link>
        </div>
        
        <button className="md:hidden flex items-center" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>
      </div>
      
      <div className={cn("fixed inset-0 top-[56px] bg-[#9B019C] z-40 flex flex-col p-4 gap-3 transition-all duration-300 ease-in-out transform md:hidden", isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0")}>
        <nav className="flex flex-col space-y-4">
          {isLoggedIn ? <>
              <Link to={isHotelOwner ? "/hotel-dashboard" : "/user-dashboard"} onClick={() => setIsMenuOpen(false)} className="text-white font-medium hover:text-white/80 text-center text-base uppercase">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="text-white font-medium hover:text-white/80 text-center text-base uppercase">
                Logout
              </button>
            </> : <>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="text-white font-medium hover:text-white/80 text-center text-base uppercase">
                Register
              </Link>
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-white font-medium hover:text-white/80 text-center text-base uppercase">
                Login
              </Link>
            </>}
          <Link to="/faq" onClick={() => setIsMenuOpen(false)} className="text-white font-medium hover:text-white/80 text-center text-base uppercase">FAQ</Link>
          <Link to="/hoteles" onClick={() => setIsMenuOpen(false)} className="text-white font-medium hover:text-white/80 text-center text-base uppercase">Hotels</Link>
        </nav>
      </div>
    </header>;
}
