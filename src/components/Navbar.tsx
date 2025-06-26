import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Globe, User, LogOut, Settings, Hotel, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/auth/AuthContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";
import { Logo } from "@/components/Logo";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-fuchsia-900/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              to="/faq"
              className="text-sm font-medium text-white hover:text-fuchsia-300 transition-colors whitespace-nowrap"
            >
              {t('navigation.faq')}
            </Link>
            <Link
              to="/affinity-stays"
              className="text-sm font-medium text-white hover:text-fuchsia-300 transition-colors whitespace-nowrap"
            >
              {t('navigation.affinityStays')}
            </Link>
            <Link
              to="/hotels"
              className="text-sm font-medium text-white hover:text-fuchsia-300 transition-colors whitespace-nowrap"
            >
              {t('navigation.hotel')}
            </Link>
            <Link
              to="/videos"
              className="text-sm font-medium text-white hover:text-fuchsia-300 transition-colors whitespace-nowrap"
            >
              {t('navigation.videos')}
            </Link>
            <Link
              to="/featured-hotels"
              className="text-sm font-medium text-white hover:text-fuchsia-300 transition-colors whitespace-nowrap"
            >
              {t('navigation.featuredHotels')}
            </Link>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-sm font-medium text-white hover:text-fuchsia-300">
                    <User className="h-4 w-4 mr-2" />
                    {user.email}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={handleDashboardClick}>
                    <Settings className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">{t('navigation.dashboard')}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/hotel-dashboard" className="text-sm font-medium">
                      <Hotel className="h-4 w-4 mr-2" />
                      {t('navigation.hotelPanel')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="text-sm font-medium">
                      <Shield className="h-4 w-4 mr-2" />
                      {t('navigation.adminPanel')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">{t('navigation.signOut')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={handleAuthClick}
                variant="ghost" 
                size="sm"
                className="text-sm font-medium text-white hover:text-fuchsia-300"
              >
                {t('navigation.signIn')}
              </Button>
            )}

            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-fuchsia-300"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-fuchsia-900/30 py-4">
            <div className="flex flex-col space-y-3">
              <Link
                to="/faq"
                className="text-sm font-medium text-white hover:text-fuchsia-300 transition-colors px-2 py-1"
                onClick={() => setIsOpen(false)}
              >
                {t('navigation.faq')}
              </Link>
              <Link
                to="/affinity-stays"
                className="text-sm font-medium text-white hover:text-fuchsia-300 transition-colors px-2 py-1"
                onClick={() => setIsOpen(false)}
              >
                {t('navigation.affinityStays')}
              </Link>
              <Link
                to="/hotels"
                className="text-sm font-medium text-white hover:text-fuchsia-300 transition-colors px-2 py-1"
                onClick={() => setIsOpen(false)}
              >
                {t('navigation.hotel')}
              </Link>
              <Link
                to="/videos"
                className="text-sm font-medium text-white hover:text-fuchsia-300 transition-colors px-2 py-1"
                onClick={() => setIsOpen(false)}
              >
                {t('navigation.videos')}
              </Link>
              <Link
                to="/featured-hotels"
                className="text-sm font-medium text-white hover:text-fuchsia-300 transition-colors px-2 py-1"
                onClick={() => setIsOpen(false)}
              >
                {t('navigation.featuredHotels')}
              </Link>

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-sm font-medium text-white hover:text-fuchsia-300 transition-colors px-2 py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('navigation.dashboard')}
                  </Link>
                  <Link
                    to="/hotel-dashboard"
                    className="text-sm font-medium text-white hover:text-fuchsia-300 transition-colors px-2 py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('navigation.hotelPanel')}
                  </Link>
                  <Link
                    to="/admin"
                    className="text-sm font-medium text-white hover:text-fuchsia-300 transition-colors px-2 py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('navigation.adminPanel')}
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    className="text-sm font-medium text-white hover:text-fuchsia-300 transition-colors px-2 py-1 text-left"
                  >
                    {t('navigation.signOut')}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleAuthClick();
                    setIsOpen(false);
                  }}
                  className="text-sm font-medium text-white hover:text-fuchsia-300 transition-colors px-2 py-1 text-left"
                >
                  {t('navigation.signIn')}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
