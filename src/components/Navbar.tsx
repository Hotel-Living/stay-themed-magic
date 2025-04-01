
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "./Logo";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "react-i18next";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
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

  return <header className="bg-[#860493] shadow-md">
      <div className="container px-4 sm:px-6 py-2 flex items-center justify-between">
        <Logo />
        
        <div className="hidden md:flex items-center gap-8">
          {isLoggedIn || isDevelopment ? <>
              <Link to="/hotel-dashboard" className="text-white font-medium hover:text-white/80 text-base uppercase">
                {t('navbar.hotelDashboard')}
              </Link>
              <Link to="/user-dashboard" className="text-white font-medium hover:text-white/80 text-base uppercase">
                {t('navbar.userDashboard')}
              </Link>
              {!isDevelopment && (
                <button onClick={handleLogout} className="text-white font-medium hover:text-white/80 text-base uppercase">
                  {t('navbar.logout')}
                </button>
              )}
            </> : <>
              <Link to="/signup" className="text-white font-medium hover:text-white/80 text-base uppercase">
                {t('navbar.register')}
              </Link>
              <Link to="/login" className="text-white font-medium hover:text-white/80 text-base uppercase">
                {t('navbar.login')}
              </Link>
            </>}
          <Link to="/add-property" className="text-white font-medium hover:text-white/80 text-base uppercase">
            {t('navbar.addProperty')}
          </Link>
          <Link to="/faq" className="text-white font-medium hover:text-white/80 text-base uppercase">
            {t('navbar.faq')}
          </Link>
          <Link to="/hoteles" className="text-white font-medium hover:text-white/80 text-base uppercase">
            {t('navbar.hotels')}
          </Link>
          <LanguageSelector />
        </div>
        
        <button className="md:hidden flex items-center" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>
      </div>
      
      <div className={cn("fixed inset-0 top-[48px] bg-[#860493] z-40 flex flex-col p-4 gap-3 transition-all duration-300 ease-in-out transform md:hidden", isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0")}>
        <nav className="flex flex-col space-y-4">
          {isLoggedIn || isDevelopment ? <>
              <Link to="/hotel-dashboard" onClick={() => setIsMenuOpen(false)} className="text-white font-medium hover:text-white/80 text-center text-base uppercase">
                {t('navbar.hotelDashboard')}
              </Link>
              <Link to="/user-dashboard" onClick={() => setIsMenuOpen(false)} className="text-white font-medium hover:text-white/80 text-center text-base uppercase">
                {t('navbar.userDashboard')}
              </Link>
              {!isDevelopment && (
                <button onClick={handleLogout} className="text-white font-medium hover:text-white/80 text-center text-base uppercase">
                  {t('navbar.logout')}
                </button>
              )}
            </> : <>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="text-white font-medium hover:text-white/80 text-center text-base uppercase">
                {t('navbar.register')}
              </Link>
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-white font-medium hover:text-white/80 text-center text-base uppercase">
                {t('navbar.login')}
              </Link>
            </>}
          <Link to="/add-property" onClick={() => setIsMenuOpen(false)} className="text-white font-medium hover:text-white/80 text-center text-base uppercase">
            {t('navbar.addProperty')}
          </Link>
          <Link to="/faq" onClick={() => setIsMenuOpen(false)} className="text-white font-medium hover:text-white/80 text-center text-base uppercase">
            {t('navbar.faq')}
          </Link>
          <Link to="/hoteles" onClick={() => setIsMenuOpen(false)} className="text-white font-medium hover:text-white/80 text-center text-base uppercase">
            {t('navbar.hotels')}
          </Link>
          <div className="flex justify-center pt-2">
            <LanguageSelector />
          </div>
        </nav>
      </div>
    </header>;
}
