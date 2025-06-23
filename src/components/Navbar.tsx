import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/hooks/useTranslation";
import { Menu, X, ChevronDown, User, Settings, LogOut, Building, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const { user, profile } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const accountMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const checkAdminStatus = async () => {
    if (user) {
      const { data: isAdmin, error } = await supabase.rpc('has_role', { role_name: 'admin' });
      if (!error && isAdmin) {
        console.log("Admin user detected in navbar, redirecting to admin dashboard");
        navigate('/admin/hotels');
        return;
      } else {
        console.log("User is not an admin");
      }
    }
  };

  const handleLogout = async () => {
    try {
      console.log("Logout initiated");
      
      // Close any open menus
      setIsMenuOpen(false);
      setIsAccountMenuOpen(false);
      
      // Call signOut to clear the session
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Logout error:", error);
        toast({
          title: "Error",
          description: "No se pudo cerrar sesión. Inténtalo de nuevo.",
          variant: "destructive"
        });
        return;
      }
      
      console.log("Logout successful, redirecting to login");
      
      // Show success message
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión exitosamente."
      });
      
      // Redirect to login page
      navigate('/login');
      
    } catch (error: any) {
      console.error("Unexpected logout error:", error);
      toast({
        title: "Error",
        description: "Error inesperado al cerrar sesión.",
        variant: "destructive"
      });
    }
  };

  // Function to check if the user is an admin and redirect
  

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1A1F2C] to-[#2D1B69] border-b border-fuchsia-900/20 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex-shrink-0">
              <Logo />
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/faq" className="text-white hover:text-fuchsia-300 transition-colors">
                {t('mainNavigationContent.faq')}
              </Link>
              <Link to="/affinity-stays" className="text-white hover:text-fuchsia-300 transition-colors">
                {t('mainNavigationContent.affinityStays')}
              </Link>
              <Link to="/hotel-signup" className="text-white hover:text-fuchsia-300 transition-colors">
                {t('mainNavigationContent.hotel')}
              </Link>
              <Link to="/videos" className="text-white hover:text-fuchsia-300 transition-colors">
                {t('mainNavigationContent.videos')}
              </Link>
              <Link to="/featured-hotels" className="text-white hover:text-fuchsia-300 transition-colors">
                {t('mainNavigationContent.featuredHotels')}
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            
            {user && profile ? (
              <div className="relative" ref={accountMenuRef}>
                <button
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  className="flex items-center space-x-2 text-white hover:text-fuchsia-300 transition-colors bg-fuchsia-900/20 px-3 py-2 rounded-lg"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden md:inline">{t('mainNavigationContent.myAccount')}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isAccountMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#2D1B69] border border-fuchsia-900/20 rounded-lg shadow-lg backdrop-blur-md z-50">
                    <div className="py-2">
                      <Link
                        to="/user-dashboard"
                        className="flex items-center px-4 py-2 text-white hover:bg-fuchsia-900/20 transition-colors"
                        onClick={() => setIsAccountMenuOpen(false)}
                      >
                        <User className="w-4 h-4 mr-2" />
                        {t('mainNavigationContent.hotelDashboard')}
                      </Link>
                      
                      {profile.is_hotel_owner && (
                        <Link
                          to="/hotels"
                          className="flex items-center px-4 py-2 text-white hover:bg-fuchsia-900/20 transition-colors"
                          onClick={() => setIsAccountMenuOpen(false)}
                        >
                          <Building className="w-4 h-4 mr-2" />
                          Panel del Hotel
                        </Link>
                      )}
                      
                      <button
                        onClick={checkAdminStatus}
                        className="flex items-center w-full px-4 py-2 text-white hover:bg-fuchsia-900/20 transition-colors"
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        {t('mainNavigationContent.adminDashboard')}
                      </button>
                      
                      <div className="border-t border-fuchsia-900/20 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-white hover:bg-fuchsia-900/20 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        {t('mainNavigationContent.logout')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-white hover:text-fuchsia-300 transition-colors px-3 py-2"
                >
                  {t('navigation.login')}
                </Link>
                <Link
                  to="/signup"
                  className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {t('navigation.signup')}
                </Link>
              </div>
            )}
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-fuchsia-300 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#2D1B69] border-t border-fuchsia-900/20">
            <div className="px-4 py-2 space-y-2">
              <Link
                to="/faq"
                className="block text-white hover:text-fuchsia-300 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('mainNavigationContent.faq')}
              </Link>
              <Link
                to="/affinity-stays"
                className="block text-white hover:text-fuchsia-300 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('mainNavigationContent.affinityStays')}
              </Link>
              <Link
                to="/hotel-signup"
                className="block text-white hover:text-fuchsia-300 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('mainNavigationContent.hotel')}
              </Link>
              <Link
                to="/videos"
                className="block text-white hover:text-fuchsia-300 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('mainNavigationContent.videos')}
              </Link>
              <Link
                to="/featured-hotels"
                className="block text-white hover:text-fuchsia-300 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('mainNavigationContent.featuredHotels')}
              </Link>
              
              {user && profile ? (
                <>
                  <div className="border-t border-fuchsia-900/20 my-2"></div>
                  <Link
                    to="/user-dashboard"
                    className="flex items-center text-white hover:text-fuchsia-300 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    {t('mainNavigationContent.hotelDashboard')}
                  </Link>
                  
                  {profile.is_hotel_owner && (
                    <Link
                      to="/hotels"
                      className="flex items-center text-white hover:text-fuchsia-300 transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Building className="w-4 h-4 mr-2" />
                      Panel del Hotel
                    </Link>
                  )}
                  
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      checkAdminStatus();
                    }}
                    className="flex items-center text-white hover:text-fuchsia-300 transition-colors py-2"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    {t('mainNavigationContent.adminDashboard')}
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-white hover:text-fuchsia-300 transition-colors py-2"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('mainNavigationContent.logout')}
                  </button>
                </>
              ) : (
                <>
                  <div className="border-t border-fuchsia-900/20 my-2"></div>
                  <Link
                    to="/login"
                    className="block text-white hover:text-fuchsia-300 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('navigation.login')}
                  </Link>
                  <Link
                    to="/signup"
                    className="block text-white hover:text-fuchsia-300 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('navigation.signup')}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
