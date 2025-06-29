
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuthContext } from '@/context/auth/AuthContext';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { user, signOut } = useAuthContext();
  const location = useLocation();
  const { isAdmin } = useIsAdmin();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-black/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/faq" 
              className={`transition-colors font-medium ${
                isActive('/faq') 
                  ? 'text-yellow-400' 
                  : 'text-white hover:text-yellow-400'
              }`}
            >
              {t('navigation.faq')}
            </Link>
            <Link 
              to="/affinity-stays" 
              className={`transition-colors font-medium ${
                isActive('/affinity-stays') 
                  ? 'text-yellow-400' 
                  : 'text-white hover:text-yellow-400'
              }`}
            >
              {t('navigation.affinityStays')}
            </Link>
            <Link 
              to="/hotel-signup" 
              className={`transition-colors font-medium ${
                isActive('/hotel-signup') 
                  ? 'text-yellow-400' 
                  : 'text-white hover:text-yellow-400'
              }`}
            >
              {t('mainNavigationContent.hotel')}
            </Link>
            
            <LanguageSwitcher />
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to={isAdmin ? "/admin-dashboard" : "/dashboard"} 
                  className="text-white hover:text-yellow-400 transition-colors flex items-center space-x-2"
                >
                  <User size={18} />
                  <span>{t(isAdmin ? 'mainNavigationContent.adminDashboard' : 'mainNavigationContent.hotelDashboard')}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-white hover:text-yellow-400 transition-colors flex items-center space-x-2"
                >
                  <LogOut size={18} />
                  <span>{t('mainNavigationContent.logout')}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-white hover:text-yellow-400 transition-colors"
                >
                  {t('navigation.login')}
                </Link>
                <Link 
                  to="/login?tab=signup" 
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  {t('navigation.signup')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm">
            <div className="px-4 py-6 space-y-4">
              <Link 
                to="/faq" 
                className={`block transition-colors font-medium py-2 ${
                  isActive('/faq') 
                    ? 'text-yellow-400' 
                    : 'text-white hover:text-yellow-400'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t('navigation.faq')}
              </Link>
              <Link 
                to="/affinity-stays" 
                className={`block transition-colors font-medium py-2 ${
                  isActive('/affinity-stays') 
                    ? 'text-yellow-400' 
                    : 'text-white hover:text-yellow-400'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t('navigation.affinityStays')}
              </Link>
              <Link 
                to="/hotel-signup" 
                className={`block transition-colors font-medium py-2 ${
                  isActive('/hotel-signup') 
                    ? 'text-yellow-400' 
                    : 'text-white hover:text-yellow-400'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t('mainNavigationContent.hotel')}
              </Link>
              
              <div className="pt-4 border-t border-white/20">
                <LanguageSwitcher />
              </div>
              
              {user ? (
                <div className="space-y-4 pt-4 border-t border-white/20">
                  <Link 
                    to={isAdmin ? "/admin-dashboard" : "/dashboard"} 
                    className="block text-white hover:text-yellow-400 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {t(isAdmin ? 'mainNavigationContent.adminDashboard' : 'mainNavigationContent.hotelDashboard')}
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    className="block text-white hover:text-yellow-400 transition-colors py-2 w-full text-left"
                  >
                    {t('mainNavigationContent.logout')}
                  </button>
                </div>
              ) : (
                <div className="space-y-4 pt-4 border-t border-white/20">
                  <Link 
                    to="/login" 
                    className="block text-white hover:text-yellow-400 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('navigation.login')}
                  </Link>
                  <Link 
                    to="/login?tab=signup" 
                    className="block bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md transition-colors text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('navigation.signup')}
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

export default Navbar;
