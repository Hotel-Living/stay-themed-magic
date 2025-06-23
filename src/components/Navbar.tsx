import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, Settings, Calendar, Building } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";
import { supabase } from "@/integrations/supabase/client";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language } = useTranslation();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        try {
          const { data, error } = await supabase.rpc('has_role', { role_name: 'admin' });
          if (!error && data) {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error('Error checking admin status:', error);
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: language === 'es' ? "Sesión cerrada" : "Logged out",
        description: language === 'es' ? "Has cerrado sesión exitosamente." : "You have been successfully logged out."
      });
      navigate('/');
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Error during logout:", error);
      toast({
        title: language === 'es' ? "Error" : "Error",
        description: language === 'es' ? "No se pudo cerrar sesión. Inténtalo de nuevo." : "Could not log out. Please try again.",
        variant: "destructive"
      });
    }
  };

  const navigationLinks = [
    { href: "/faq", label: t('navigation.faq') },
    { href: "/affinity-stays", label: t('navigation.affinityStays') },
    { href: "/hotel-signup", label: t('navigation.hotels') },
    { href: "/videos", label: t('navigation.videos') },
    { href: "/featured-hotels", label: t('navigation.featuredHotels') }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A1F2C]/95 backdrop-blur-md border-b border-purple-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-white hover:text-purple-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSwitcher />
            
            {user ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Link
                    to="/admin/hotels"
                    className="text-white hover:text-purple-300 transition-colors flex items-center space-x-1"
                  >
                    <Building className="w-4 h-4" />
                    <span>{t('mainNavigationContent.adminDashboard')}</span>
                  </Link>
                )}
                
                <Link
                  to="/user-dashboard"
                  className="text-white hover:text-purple-300 transition-colors flex items-center space-x-1"
                >
                  <User className="w-4 h-4" />
                  <span>{t('mainNavigationContent.myAccount')}</span>
                </Link>
                
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-white hover:text-purple-300 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('mainNavigationContent.logout')}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost" className="text-white hover:text-purple-300">
                    {t('navigation.login')}
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    {t('navigation.signup')}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-[#1A1F2C] border-t border-purple-500/20">
            <div className="px-4 py-6 space-y-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block text-white hover:text-purple-300 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {user ? (
                <div className="space-y-2 pt-4 border-t border-purple-500/20">
                  {isAdmin && (
                    <Link
                      to="/admin/hotels"
                      className="block text-white hover:text-purple-300 transition-colors py-2 flex items-center space-x-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Building className="w-4 h-4" />
                      <span>{t('mainNavigationContent.adminDashboard')}</span>
                    </Link>
                  )}
                  
                  <Link
                    to="/user-dashboard"
                    className="block text-white hover:text-purple-300 transition-colors py-2 flex items-center space-x-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>{t('mainNavigationContent.myAccount')}</span>
                  </Link>
                  
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="w-full justify-start text-white hover:text-purple-300 transition-colors p-2"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('mainNavigationContent.logout')}
                  </Button>
                </div>
              ) : (
                <div className="space-y-2 pt-4 border-t border-purple-500/20">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-white hover:text-purple-300">
                      {t('navigation.login')}
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      {t('navigation.signup')}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
