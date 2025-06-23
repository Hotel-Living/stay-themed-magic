
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, User, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";
import { useTranslation } from "@/hooks/useTranslation";
import { useIsAdmin } from "@/hooks/useIsAdmin";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isAdmin = useIsAdmin();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="bg-gradient-to-r from-[#1a0b2e] via-[#2d1b4e] to-[#4a2c6a] border-b border-fuchsia-500/20 fixed top-0 w-full z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/faq" className="text-white/90 hover:text-fuchsia-300 transition-colors">
              {t('navigation.faq')}
            </Link>
            <Link to="/affinity-stays" className="text-white/90 hover:text-fuchsia-300 transition-colors">
              {t('mainNavigationContent.affinityStays')}
            </Link>
            <Link to="/hotels" className="text-white/90 hover:text-fuchsia-300 transition-colors">
              {t('mainNavigationContent.hotel')}
            </Link>
            <Link to="/videos" className="text-white/90 hover:text-fuchsia-300 transition-colors">
              {t('navigation.videos')}
            </Link>
            <Link to="/featured-hotels" className="text-white/90 hover:text-fuchsia-300 transition-colors">
              {t('mainNavigationContent.featuredHotels')}
            </Link>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSwitcher />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:text-fuchsia-300 hover:bg-fuchsia-500/10">
                    <User className="w-4 h-4 mr-2" />
                    {t('mainNavigationContent.myAccount')}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-[#2d1b4e] border-fuchsia-500/20">
                  <DropdownMenuItem asChild>
                    <Link to="/user-dashboard" className="text-white hover:text-fuchsia-300">
                      <User className="w-4 h-4 mr-2" />
                      {t('mainNavigationContent.hotelDashboard')}
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="text-white hover:text-fuchsia-300">
                        <Settings className="w-4 h-4 mr-2" />
                        {t('mainNavigationContent.adminDashboard')}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-fuchsia-500/20" />
                  <DropdownMenuItem onClick={handleLogout} className="text-white hover:text-fuchsia-300">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('mainNavigationContent.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="ghost" className="text-white hover:text-fuchsia-300 hover:bg-fuchsia-500/10">
                  <Link to="/login">{t('navigation.login')}</Link>
                </Button>
                <Button asChild className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white">
                  <Link to="/signup">{t('navigation.register')}</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-fuchsia-300 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-fuchsia-500/20 bg-[#1a0b2e]/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/faq"
                className="block px-3 py-2 text-white hover:text-fuchsia-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t('navigation.faq')}
              </Link>
              <Link
                to="/affinity-stays"
                className="block px-3 py-2 text-white hover:text-fuchsia-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t('mainNavigationContent.affinityStays')}
              </Link>
              <Link
                to="/hotels"
                className="block px-3 py-2 text-white hover:text-fuchsia-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t('mainNavigationContent.hotel')}
              </Link>
              <Link
                to="/videos"
                className="block px-3 py-2 text-white hover:text-fuchsia-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t('navigation.videos')}
              </Link>
              <Link
                to="/featured-hotels"
                className="block px-3 py-2 text-white hover:text-fuchsia-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t('mainNavigationContent.featuredHotels')}
              </Link>
              
              {user ? (
                <>
                  <div className="border-t border-fuchsia-500/20 pt-2 mt-2">
                    <div className="px-3 py-2 text-fuchsia-300 font-medium">
                      {t('mainNavigationContent.myAccount')}
                    </div>
                    <Link
                      to="/user-dashboard"
                      className="block px-6 py-2 text-white hover:text-fuchsia-300 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {t('mainNavigationContent.hotelDashboard')}
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="block px-6 py-2 text-white hover:text-fuchsia-300 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {t('mainNavigationContent.adminDashboard')}
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="block w-full text-left px-6 py-2 text-white hover:text-fuchsia-300 transition-colors"
                    >
                      {t('mainNavigationContent.logout')}
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-t border-fuchsia-500/20 pt-2 mt-2 space-y-1">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-white hover:text-fuchsia-300 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('navigation.login')}
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('navigation.register')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
