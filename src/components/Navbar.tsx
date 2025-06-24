
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import { Menu, X, LogOut, User, Settings, Calendar, Heart, MessageCircle, Building } from "lucide-react";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsAdmin } from "@/hooks/useIsAdmin";

export function Navbar() {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAdmin = useIsAdmin();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isHomePage = location.pathname === '/';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isHomePage 
        ? 'bg-gradient-to-r from-purple-900/95 via-purple-800/95 to-fuchsia-900/95 backdrop-blur-sm' 
        : 'bg-gradient-to-r from-purple-900 via-purple-800 to-fuchsia-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/hotels" 
              className="text-white hover:text-fuchsia-200 transition-colors font-medium"
            >
              {t('navigation.hotels')}
            </Link>
            <Link 
              to="/featured-hotels" 
              className="text-white hover:text-fuchsia-200 transition-colors font-medium"
            >
              {t('mainNavigationContent.featuredHotels')}
            </Link>
            <Link 
              to="/affinity-stays" 
              className="text-white hover:text-fuchsia-200 transition-colors font-medium"
            >
              {t('mainNavigationContent.affinityStays')}
            </Link>
            <Link 
              to="/videos" 
              className="text-white hover:text-fuchsia-200 transition-colors font-medium"
            >
              {t('mainNavigationContent.videos')}
            </Link>
            <Link 
              to="/faq" 
              className="text-white hover:text-fuchsia-200 transition-colors font-medium"
            >
              {t('mainNavigationContent.faq')}
            </Link>
            
            {/* Add Prueba link for admin users */}
            {isAdmin && (
              <Link 
                to="/prueba" 
                className="text-white hover:text-fuchsia-200 transition-colors font-medium"
              >
                Prueba
              </Link>
            )}
          </div>

          {/* User Menu and Language Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:text-fuchsia-200 hover:bg-purple-800/50">
                    <User className="w-4 h-4 mr-2" />
                    {t('mainNavigationContent.myAccount')}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white border-purple-200">
                  <DropdownMenuItem asChild>
                    <Link to="/user-dashboard" className="flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      {t('navigation.dashboard')}
                    </Link>
                  </DropdownMenuItem>
                  
                  {user.user_metadata?.role === 'hotel_owner' && (
                    <DropdownMenuItem asChild>
                      <Link to="/hotel-dashboard" className="flex items-center">
                        <Building className="w-4 h-4 mr-2" />
                        {t('mainNavigationContent.hotelDashboard')}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        {t('mainNavigationContent.adminDashboard')}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('mainNavigationContent.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button asChild variant="ghost" className="text-white hover:text-fuchsia-200 hover:bg-purple-800/50">
                  <Link to="/login">{t('navigation.login')}</Link>
                </Button>
                <Button asChild className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white">
                  <Link to="/signup">{t('navigation.signup')}</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-fuchsia-200 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-purple-900/95 backdrop-blur-sm border-t border-purple-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/hotels" 
              className="block px-3 py-2 text-white hover:text-fuchsia-200 hover:bg-purple-800/50 rounded-md transition-colors"
            >
              {t('navigation.hotels')}
            </Link>
            <Link 
              to="/featured-hotels" 
              className="block px-3 py-2 text-white hover:text-fuchsia-200 hover:bg-purple-800/50 rounded-md transition-colors"
            >
              {t('mainNavigationContent.featuredHotels')}
            </Link>
            <Link 
              to="/affinity-stays" 
              className="block px-3 py-2 text-white hover:text-fuchsia-200 hover:bg-purple-800/50 rounded-md transition-colors"
            >
              {t('mainNavigationContent.affinityStays')}
            </Link>
            <Link 
              to="/videos" 
              className="block px-3 py-2 text-white hover:text-fuchsia-200 hover:bg-purple-800/50 rounded-md transition-colors"
            >
              {t('mainNavigationContent.videos')}
            </Link>
            <Link 
              to="/faq" 
              className="block px-3 py-2 text-white hover:text-fuchsia-200 hover:bg-purple-800/50 rounded-md transition-colors"
            >
              {t('mainNavigationContent.faq')}
            </Link>
            
            {/* Add Prueba link for admin users in mobile menu */}
            {isAdmin && (
              <Link 
                to="/prueba" 
                className="block px-3 py-2 text-white hover:text-fuchsia-200 hover:bg-purple-800/50 rounded-md transition-colors"
              >
                Prueba
              </Link>
            )}
            
            <div className="pt-4 border-t border-purple-700">
              <div className="px-3 py-2">
                <LanguageSwitcher />
              </div>
              
              {user ? (
                <>
                  <Link 
                    to="/user-dashboard" 
                    className="block px-3 py-2 text-white hover:text-fuchsia-200 hover:bg-purple-800/50 rounded-md transition-colors"
                  >
                    {t('navigation.dashboard')}
                  </Link>
                  
                  {user.user_metadata?.role === 'hotel_owner' && (
                    <Link 
                      to="/hotel-dashboard" 
                      className="block px-3 py-2 text-white hover:text-fuchsia-200 hover:bg-purple-800/50 rounded-md transition-colors"
                    >
                      {t('mainNavigationContent.hotelDashboard')}
                    </Link>
                  )}
                  
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      className="block px-3 py-2 text-white hover:text-fuchsia-200 hover:bg-purple-800/50 rounded-md transition-colors"
                    >
                      {t('mainNavigationContent.adminDashboard')}
                    </Link>
                  )}
                  
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-white hover:text-fuchsia-200 hover:bg-purple-800/50 rounded-md transition-colors"
                  >
                    {t('mainNavigationContent.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block px-3 py-2 text-white hover:text-fuchsia-200 hover:bg-purple-800/50 rounded-md transition-colors"
                  >
                    {t('navigation.login')}
                  </Link>
                  <Link 
                    to="/signup" 
                    className="block px-3 py-2 text-white hover:text-fuchsia-200 hover:bg-purple-800/50 rounded-md transition-colors"
                  >
                    {t('navigation.signup')}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
