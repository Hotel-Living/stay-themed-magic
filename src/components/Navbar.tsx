import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, User, Settings, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/context/auth/AuthContext";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useTranslation } from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { isAdmin } = useIsAdmin();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const navigationItems = [
    { href: "/", label: t('navigation.home') },
    { href: "/hotels", label: t('navigation.hotels') },
    { href: "/affinity-stays", label: t('navigation.affinityStays') },
    { href: "/videos", label: t('navigation.videos') },
    { href: "/featured-hotels", label: t('navigation.featuredHotels') },
    { href: "/faq", label: t('navigation.faq') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-fuchsia-900/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-fuchsia-400 to-purple-600 bg-clip-text text-transparent">
              HOTEL-LIVING
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-white hover:text-fuchsia-400 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-white hover:text-fuchsia-400 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>{t('mainNavigationContent.myAccount')}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg border border-fuchsia-900/20">
                    <div className="py-2">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-white hover:bg-fuchsia-900/20 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4 inline mr-2" />
                        {t('navigation.dashboard')}
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-white hover:bg-fuchsia-900/20 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Shield className="w-4 h-4 inline mr-2" />
                          {t('mainNavigationContent.adminDashboard')}
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-white hover:bg-fuchsia-900/20 transition-colors"
                      >
                        <LogOut className="w-4 h-4 inline mr-2" />
                        {t('mainNavigationContent.logout')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:text-fuchsia-400 transition-colors font-medium"
                >
                  {t('navigation.login')}
                </Link>
                <Link
                  to="/signup"
                  className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  {t('navigation.signup')}
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white hover:text-fuchsia-400 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-gray-900 border-t border-fuchsia-900/20">
            <div className="px-4 py-4 space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block text-white hover:text-fuchsia-400 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block text-white hover:text-fuchsia-400 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('navigation.dashboard')}
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="block text-white hover:text-fuchsia-400 transition-colors font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('mainNavigationContent.adminDashboard')}
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-white hover:text-fuchsia-400 transition-colors font-medium"
                  >
                    {t('mainNavigationContent.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-white hover:text-fuchsia-400 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('navigation.login')}
                  </Link>
                  <Link
                    to="/signup"
                    className="block bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded-lg transition-colors font-medium text-center"
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
};
