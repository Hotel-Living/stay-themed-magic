
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings, Calendar } from 'lucide-react';

export const Navbar = () => {
  const { t } = useTranslation();
  const { user, logout, userRole, isHotelOwner } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleAuthAction = (action: 'login' | 'signup') => {
    navigate(`/${action}`);
  };

  console.log('Navbar - Current user:', user);
  console.log('Navbar - User role:', userRole);
  console.log('Navbar - Is hotel owner:', isHotelOwner);

  return (
    <nav className="bg-gradient-to-r from-[#7801AA] to-[#5D0080] text-white relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Hotel Living" 
                className="h-8 w-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link to="/faq" className="text-white hover:text-white/80 transition-colors font-bold text-xs leading-tight">
                <div className="text-center">
                  <div>{t('mainNavigationContent.faq.line1')}</div>
                  <div>{t('mainNavigationContent.faq.line2')}</div>
                </div>
              </Link>
              
              <Link to="/affinity-stays" className="text-white hover:text-white/80 transition-colors font-bold text-xs leading-tight">
                <div className="text-center">
                  <div>{t('mainNavigationContent.affinityStays.line1')}</div>
                  <div>{t('mainNavigationContent.affinityStays.line2')}</div>
                </div>
              </Link>
              
              {/* Videos y Prensa Dropdown - Hover Enabled */}
              <div className="relative group">
                <div className="text-white hover:text-white/80 transition-colors font-bold text-xs leading-tight cursor-pointer py-2 px-1">
                  <div className="text-center">
                    <div>{t('mainNavigationContent.videos.line1')}</div>
                    <div>{t('mainNavigationContent.videos.line2')}</div>
                  </div>
                </div>
                {/* Hover area extender - invisible div to improve hover detection */}
                <div className="absolute top-full left-0 w-full h-2 bg-transparent"></div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-[#7801AA] shadow-xl rounded-lg border border-white/20 z-[60] min-w-max">
                  <div className="py-2">
                    <Link 
                      to="/videos" 
                      className="block text-white hover:bg-[#5D0080] px-6 py-3 text-sm font-medium transition-colors duration-150 first:rounded-t-lg"
                    >
                      {t('mainNavigationContent.videosAndPress.videos')}
                    </Link>
                    <Link 
                      to="/press" 
                      className="block text-white hover:bg-[#5D0080] px-6 py-3 text-sm font-medium transition-colors duration-150 last:rounded-b-lg"
                    >
                      {t('mainNavigationContent.videosAndPress.press')}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Crece con Nosotros Dropdown - Hover Enabled */}
              <div className="relative group">
                <div className="text-white hover:text-white/80 transition-colors font-bold text-xs leading-tight cursor-pointer py-2 px-1">
                  <div className="text-center">
                    <div>{t('mainNavigationContent.ambassador.line1')}</div>
                    <div>{t('mainNavigationContent.ambassador.line2')}</div>
                  </div>
                </div>
                {/* Hover area extender - invisible div to improve hover detection */}
                <div className="absolute top-full left-0 w-full h-2 bg-transparent"></div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-[#7801AA] shadow-xl rounded-lg border border-white/20 z-[60] min-w-max">
                  <div className="py-2">
                    <Link 
                      to="/ambassador" 
                      className="block text-white hover:bg-[#5D0080] px-6 py-3 text-sm font-medium transition-colors duration-150 first:rounded-t-lg"
                    >
                      {t('mainNavigationContent.growWithUs.ambassador')}
                    </Link>
                    <Link 
                      to="/agentes" 
                      className="block text-white hover:bg-[#5D0080] px-6 py-3 text-sm font-medium transition-colors duration-150 last:rounded-b-lg"
                    >
                      {t('mainNavigationContent.growWithUs.localPromoter')}
                    </Link>
                  </div>
                </div>
              </div>

              <Link to="/ayuda" className="text-white hover:text-white/80 transition-colors font-bold text-xs leading-tight">
                <div className="text-center">
                  <div>{t('mainNavigationContent.frequentQuestions.line1')}</div>
                  <div>{t('mainNavigationContent.frequentQuestions.line2')}</div>
                </div>
              </Link>
              
              <Link to="/hotel-register" className="text-white hover:text-white/80 transition-colors font-bold text-xs leading-tight">
                <div className="text-center">
                  <div>{t('mainNavigationContent.hotel.line1')}</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:bg-white/10">
                    <User className="h-4 w-4 mr-2" />
                    {user.email}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="text-gray-700 hover:bg-gray-100 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {t('navigation.profile')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="text-gray-700 hover:bg-gray-100 flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      {t('navigation.settings')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/bookings" className="text-gray-700 hover:bg-gray-100 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {t('navigation.bookings')}
                    </Link>
                  </DropdownMenuItem>
                  {(userRole === 'admin' || isHotelOwner) && (
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="text-gray-700 hover:bg-gray-100">
                        {t('navigation.dashboard')}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout} className="text-gray-700 hover:bg-gray-100 flex items-center">
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('navigation.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  onClick={() => handleAuthAction('login')}
                  className="text-white hover:bg-white/10 text-xs font-bold"
                >
                  <div className="text-center">
                    <div>{t('mainNavigationContent.login.line1')}</div>
                    <div>{t('mainNavigationContent.login.line2')}</div>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleAuthAction('signup')}
                  className="bg-white text-purple-600 hover:bg-gray-100 border-white text-xs font-bold"
                >
                  <div className="text-center">
                    <div>{t('mainNavigationContent.signup.line1')}</div>
                    <div>{t('mainNavigationContent.signup.line2')}</div>
                  </div>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-white/80 focus:outline-none focus:text-white/80"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#5D0080]">
              <Link 
                to="/faq" 
                className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('mainNavigationContent.faq.mobile')}
              </Link>
              <Link 
                to="/affinity-stays" 
                className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('mainNavigationContent.affinityStays.mobile')}
              </Link>
              <Link 
                to="/videos" 
                className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('mainNavigationContent.videosAndPress.videos')}
              </Link>
              <Link 
                to="/press" 
                className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('mainNavigationContent.videosAndPress.press')}
              </Link>
              <Link 
                to="/ambassador" 
                className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('mainNavigationContent.growWithUs.ambassador')}
              </Link>
              <Link 
                to="/agentes" 
                className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('mainNavigationContent.growWithUs.localPromoter')}
              </Link>
              <Link 
                to="/ayuda" 
                className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('mainNavigationContent.frequentQuestions.mobile')}
              </Link>
              <Link 
                to="/hotel-register" 
                className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('mainNavigationContent.hotel.mobile')}
              </Link>
              
              {!user && (
                <div className="pt-4 pb-3 border-t border-white/20">
                  <div className="flex items-center px-5 space-y-2 flex-col">
                    <Button 
                      variant="ghost" 
                      onClick={() => {
                        handleAuthAction('login');
                        setMobileMenuOpen(false);
                      }}
                      className="text-white hover:bg-white/10 w-full"
                    >
                      {t('mainNavigationContent.login.mobile')}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        handleAuthAction('signup');
                        setMobileMenuOpen(false);
                      }}
                      className="bg-white text-purple-600 hover:bg-gray-100 border-white w-full"
                    >
                      {t('mainNavigationContent.signup.mobile')}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
