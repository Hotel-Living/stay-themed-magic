import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, Calendar, BarChart } from 'lucide-react';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from '@/hooks/useTranslation';
import { useIsMobile } from '@/hooks/use-mobile';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await signOut();
      setShowUserMenu(false);
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/') 
                    ? 'bg-fuchsia-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                onClick={closeMenu}
              >
                {t('navigation.home')}
              </Link>
              
              <Link
                to="/hotels"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/hotels') 
                    ? 'bg-fuchsia-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                onClick={closeMenu}
              >
                {t('navigation.hotels')}
              </Link>

              <Link
                to="/affinity-stays"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/affinity-stays') 
                    ? 'bg-fuchsia-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                onClick={closeMenu}
              >
                {t('mainNavigationContent.affinityStays')}
              </Link>

              <Link
                to="/videos"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/videos') 
                    ? 'bg-fuchsia-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                onClick={closeMenu}
              >
                {t('navigation.videos')}
              </Link>

              <Link
                to="/faq"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive('/faq') 
                    ? 'bg-fuchsia-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                onClick={closeMenu}
              >
                {t('mainNavigationContent.faq')}
              </Link>
            </div>
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden lg:inline">{t('mainNavigationContent.myAccount')}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <BarChart className="w-4 h-4 mr-2" />
                      {t('navigation.dashboard')}
                    </Link>
                    <Link
                      to="/dashboard/bookings"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      {t('navigation.bookings')}
                    </Link>
                    <Link
                      to="/dashboard/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      {t('navigation.settings')}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {t('mainNavigationContent.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {t('navigation.login')}
                </Link>
                <Link
                  to="/signup"
                  className="bg-fuchsia-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-fuchsia-700 transition-colors duration-200"
                >
                  {t('navigation.signup')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive('/') 
                  ? 'bg-fuchsia-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={closeMenu}
            >
              {t('navigation.home')}
            </Link>
            
            <Link
              to="/hotels"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive('/hotels') 
                  ? 'bg-fuchsia-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={closeMenu}
            >
              {t('navigation.hotels')}
            </Link>

            <Link
              to="/affinity-stays"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive('/affinity-stays') 
                  ? 'bg-fuchsia-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={closeMenu}
            >
              {t('mainNavigationContent.affinityStays')}
            </Link>

            <Link
              to="/videos"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive('/videos') 
                  ? 'bg-fuchsia-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={closeMenu}
            >
              {t('navigation.videos')}
            </Link>

            <Link
              to="/faq"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive('/faq') 
                  ? 'bg-fuchsia-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={closeMenu}
            >
              {t('mainNavigationContent.faq')}
            </Link>

            {/* Mobile user menu */}
            {user ? (
              <>
                <div className="border-t border-gray-700 pt-4">
                  <div className="px-3 py-2 text-sm text-gray-400 font-semibold">
                    {t('mainNavigationContent.myAccount')}
                  </div>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                    onClick={closeMenu}
                  >
                    {t('navigation.dashboard')}
                  </Link>
                  <Link
                    to="/dashboard/bookings"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                    onClick={closeMenu}
                  >
                    {t('navigation.bookings')}
                  </Link>
                  <Link
                    to="/dashboard/settings"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                    onClick={closeMenu}
                  >
                    {t('navigation.settings')}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                  >
                    {t('mainNavigationContent.logout')}
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t border-gray-700 pt-4 space-y-1">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                  onClick={closeMenu}
                >
                  {t('navigation.login')}
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-fuchsia-600 text-white hover:bg-fuchsia-700 transition-colors duration-200"
                  onClick={closeMenu}
                >
                  {t('navigation.signup')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
