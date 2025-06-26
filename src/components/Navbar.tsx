import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, Settings, Calendar, Hotel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";
import { Logo } from "./Logo";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900 via-purple-800 to-fuchsia-900 backdrop-blur-md border-b border-purple-600/30 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link 
            to="/faq" 
            className={`text-sm font-medium transition-colors hover:text-yellow-300 ${isActive('/faq') ? 'text-yellow-300' : 'text-white'}`}
          >
            {t('navigation.faq')}
          </Link>
          
          <Link 
            to="/affinity-stays" 
            className={`text-sm font-medium transition-colors hover:text-yellow-300 ${isActive('/affinity-stays') ? 'text-yellow-300' : 'text-white'}`}
          >
            {t('navigation.affinityStays')}
          </Link>
          
          <Link 
            to="/join-us" 
            className={`text-sm font-medium transition-colors hover:text-yellow-300 ${isActive('/join-us') ? 'text-yellow-300' : 'text-white'}`}
          >
            {t('navigation.hotel')}
          </Link>
          
          <Link 
            to="/videos" 
            className={`text-sm font-medium transition-colors hover:text-yellow-300 ${isActive('/videos') ? 'text-yellow-300' : 'text-white'}`}
          >
            {t('navigation.videos')}
          </Link>
          
          <Link 
            to="/featured-hotels" 
            className={`text-sm font-medium transition-colors hover:text-yellow-300 ${isActive('/featured-hotels') ? 'text-yellow-300' : 'text-white'}`}
          >
            {t('navigation.featuredHotels')}
          </Link>

          {user && (
            <>
              <Link 
                to="/dashboard" 
                className={`text-sm font-medium transition-colors hover:text-yellow-300 ${isActive('/dashboard') ? 'text-yellow-300' : 'text-white'}`}
              >
                {t('mainNavigationContent.hotelDashboard')}
              </Link>
              
              {profile?.role === 'admin' && (
                <Link 
                  to="/admin" 
                  className={`text-sm font-medium transition-colors hover:text-yellow-300 ${isActive('/admin') ? 'text-yellow-300' : 'text-white'}`}
                >
                  {t('mainNavigationContent.adminDashboard')}
                </Link>
              )}
            </>
          )}
        </div>

        {/* User Menu and Language Switcher */}
        <div className="hidden lg:flex items-center space-x-4">
          <LanguageSwitcher />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:text-yellow-300">
                  <User className="w-4 h-4 mr-2" />
                  {profile?.first_name || user.email}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/user-dashboard" className="flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    {t('mainNavigationContent.myAccount')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('mainNavigationContent.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login" className="text-sm font-medium text-white hover:text-yellow-300 transition-colors">
                {t('navigation.login')}
              </Link>
              <Link to="/register" className="text-sm font-medium bg-yellow-500 text-purple-900 px-3 py-1 rounded-full hover:bg-yellow-400 transition-colors">
                {t('navigation.register')}
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center space-x-2">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            className="text-white hover:text-yellow-300"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-purple-900 to-purple-800 border-b border-purple-600/30 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            <Link 
              to="/faq" 
              className={`block text-sm font-medium transition-colors hover:text-yellow-300 ${isActive('/faq') ? 'text-yellow-300' : 'text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navigation.faq')}
            </Link>
            
            <Link 
              to="/affinity-stays" 
              className={`block text-sm font-medium transition-colors hover:text-yellow-300 ${isActive('/affinity-stays') ? 'text-yellow-300' : 'text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navigation.affinityStays')}
            </Link>
            
            <Link 
              to="/join-us" 
              className={`block text-sm font-medium transition-colors hover:text-yellow-300 ${isActive('/join-us') ? 'text-yellow-300' : 'text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navigation.hotel')}
            </Link>
            
            <Link 
              to="/videos" 
              className={`block text-sm font-medium transition-colors hover:text-yellow-300 ${isActive('/videos') ? 'text-yellow-300' : 'text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navigation.videos')}
            </Link>
            
            <Link 
              to="/featured-hotels" 
              className={`block text-sm font-medium transition-colors hover:text-yellow-300 ${isActive('/featured-hotels') ? 'text-yellow-300' : 'text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navigation.featuredHotels')}
            </Link>

            {user && (
              <>
                <Link 
                  to="/dashboard" 
                  className={`block text-sm font-medium transition-colors hover:text-yellow-300 ${isActive('/dashboard') ? 'text-yellow-300' : 'text-white'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('mainNavigationContent.hotelDashboard')}
                </Link>
                
                {profile?.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className={`block text-sm font-medium transition-colors hover:text-yellow-300 ${isActive('/admin') ? 'text-yellow-300' : 'text-white'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('mainNavigationContent.adminDashboard')}
                  </Link>
                )}
                
                <button 
                  onClick={handleLogout}
                  className="block text-sm font-medium text-white hover:text-yellow-300 transition-colors w-full text-left"
                >
                  {t('mainNavigationContent.logout')}
                </button>
              </>
            )}

            {!user && (
              <div className="space-y-2 pt-4 border-t border-purple-600/30">
                <Link 
                  to="/login" 
                  className="block text-sm font-medium text-white hover:text-yellow-300 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('navigation.login')}
                </Link>
                <Link 
                  to="/register" 
                  className="block text-sm font-medium bg-yellow-500 text-purple-900 px-3 py-2 rounded-full hover:bg-yellow-400 transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('navigation.register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
