import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Settings, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/hooks/useTranslation";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useToast } from "@/hooks/use-toast";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const isAdmin = useIsAdmin();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (err) {
      console.error("Error during logout:", err);
      toast({
        title: "Error",
        description: "Could not complete logout. Please try again.",
        variant: "destructive"
      });
    }
  };

  const navigation = [
    { name: t('mainNavigationContent.featuredHotels'), href: '/featured-hotels', current: location.pathname === '/featured-hotels' },
    { name: t('mainNavigationContent.videos'), href: '/videos', current: location.pathname === '/videos' },
    { name: t('mainNavigationContent.affinityStays'), href: '/affinity-stays', current: location.pathname === '/affinity-stays' },
    { name: t('mainNavigationContent.faq'), href: '/faq', current: location.pathname === '/faq' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900/95 to-fuchsia-900/95 backdrop-blur-sm border-b border-purple-700/50">
      
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium ${item.current ? 'bg-purple-800' : 'hover:bg-purple-800'}`}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              
              {user ? (
                <div className="relative">
                  <Button
                    variant="ghost"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 text-white hover:bg-purple-800"
                  >
                    <User className="w-4 h-4" />
                    <span>{t('mainNavigationContent.myAccount')}</span>
                  </Button>
                  
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        to="/user-dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User className="w-4 h-4 mr-2" />
                        {t('mainNavigationContent.dashboard')}
                      </Link>
                      
                      {isAdmin && (
                        <Link
                          to="/admin/hotels"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          {t('mainNavigationContent.adminDashboard')}
                        </Link>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        {t('mainNavigationContent.logout')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login">
                    <Button variant="ghost" className="text-white hover:bg-purple-800">
                      {t('mainNavigationContent.signIn')}
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white">
                      {t('mainNavigationContent.signUp')}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-purple-800"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-purple-900/95 rounded-lg mt-2">
              
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium ${item.current ? 'bg-purple-800' : 'hover:bg-purple-800'}`}
                  aria-current={item.current ? 'page' : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {user ? (
                <div className="space-y-1">
                  <Link
                    to="/user-dashboard"
                    className="flex items-center px-3 py-2 text-white hover:bg-purple-800 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    {t('mainNavigationContent.myAccount')}
                  </Link>
                  
                  {isAdmin && (
                    <Link
                      to="/admin/hotels"
                      className="flex items-center px-3 py-2 text-white hover:bg-purple-800 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      {t('mainNavigationContent.adminDashboard')}
                    </Link>
                  )}
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 text-white hover:bg-purple-800 rounded-md"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('mainNavigationContent.logout')}
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-white hover:bg-purple-800 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('mainNavigationContent.signIn')}
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 text-white hover:bg-purple-800 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('mainNavigationContent.signUp')}
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
