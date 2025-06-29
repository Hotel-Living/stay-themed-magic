
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Logo } from '@/components/Logo';
import { useTranslation } from '@/hooks/useTranslation';
import MainNavigation from '@/components/navigation/MainNavigation';
import MobileNavigation from '@/components/navigation/MobileNavigation';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const isAdmin = useIsAdmin();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900 to-purple-700 backdrop-blur-md border-b border-purple-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <MainNavigation />
            
            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              
              {user ? (
                <div className="flex items-center space-x-2">
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      className="text-white hover:text-yellow-400 transition-colors font-medium"
                    >
                      {t('mainNavigationContent.adminDashboard')}
                    </Link>
                  )}
                  <Link 
                    to="/hotel-dashboard" 
                    className="text-white hover:text-yellow-400 transition-colors font-medium"
                  >
                    {t('mainNavigationContent.hotelDashboard')}
                  </Link>
                  <Button 
                    onClick={handleLogout}
                    variant="ghost" 
                    size="sm"
                    className="text-white hover:text-yellow-400 hover:bg-white/10"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('mainNavigationContent.logout')}
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm" className="text-white hover:text-yellow-400 hover:bg-white/10">
                      <User className="w-4 h-4 mr-2" />
                      {t('navigation.login')}
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
                      {t('navigation.signup')}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={toggleMenu}
              className="text-white hover:text-yellow-400 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation isOpen={isMenuOpen} onClose={closeMenu} />
    </nav>
  );
}
