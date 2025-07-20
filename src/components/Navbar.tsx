import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Globe, Menu, X } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { LanguageSelector } from "./LanguageSelector";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const { t } = useTranslation('navigation');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Desktop Navigation Items
  const DesktopNavigation = () => (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="flex space-x-1">
        {/* UN MUNDO DE VENTAJAS */}
        <NavigationMenuItem>
          <Link to="/faq" className="nav-item">
            <div className="nav-text">
              <div className="nav-line">{t('mainNavigationContent.worldOfAdvantages.line1')}</div>
              <div className="nav-line">{t('mainNavigationContent.worldOfAdvantages.line2')}</div>
            </div>
          </Link>
        </NavigationMenuItem>

        {/* ¿AFINIDADES HOTEL-LIVING? */}
        <NavigationMenuItem>
          <Link to="/affinity-stays" className="nav-item">
            <div className="nav-text">
              <div className="nav-line">{t('mainNavigationContent.affinityHotelLiving.line1')}</div>
              <div className="nav-line">{t('mainNavigationContent.affinityHotelLiving.line2')}</div>
            </div>
          </Link>
        </NavigationMenuItem>

        {/* ¡CRECE CON NOSOTROS! - Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="nav-item group">
            <div className="nav-text">
              <div className="nav-line">{t('mainNavigationContent.growWithUs.line1')}</div>
              <div className="nav-line">{t('mainNavigationContent.growWithUs.line2')}</div>
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="dropdown-content">
              <NavigationMenuLink asChild>
                <Link to="/ambassador" className="dropdown-item">
                  {t('navigation.ambassador')}
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/agentes" className="dropdown-item">
                  {t('navigation.localPromoter')}
                </Link>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* VIDEOS Y PRENSA - Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="nav-item group">
            <div className="nav-text">
              <div className="nav-line">{t('mainNavigationContent.videosAndPress.line1')}</div>
              <div className="nav-line">{t('mainNavigationContent.videosAndPress.line2')}</div>
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="dropdown-content">
              <NavigationMenuLink asChild>
                <Link to="/videos" className="dropdown-item">
                  {t('navigation.videos')}
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/press" className="dropdown-item">
                  {t('navigation.press')}
                </Link>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* PREGUNTAS FRECUENTES */}
        <NavigationMenuItem>
          <Link to="/faq" className="nav-item">
            <div className="nav-text">
              <div className="nav-line">{t('mainNavigationContent.frequentlyAskedQuestions.line1')}</div>
              <div className="nav-line">{t('mainNavigationContent.frequentlyAskedQuestions.line2')}</div>
            </div>
          </Link>
        </NavigationMenuItem>

        {/* ¿HOTEL? - Unchanged */}
        <NavigationMenuItem>
          <Link to="/auth" className="nav-item">
            <div className="nav-text">
              <div className="nav-line">{t('mainNavigationContent.hotel.line1')}</div>
              <div className="nav-line">{t('mainNavigationContent.hotel.line2')}</div>
            </div>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );

  // Mobile Navigation Items
  const MobileNavigation = () => (
    <div className={`md:hidden transition-all duration-300 ease-in-out ${
      isMenuOpen 
        ? 'max-h-screen opacity-100 visible' 
        : 'max-h-0 opacity-0 invisible overflow-hidden'
    }`}>
      <div className="mobile-menu">
        <Link to="/faq" className="mobile-nav-item" onClick={closeMenu}>
          {t('mainNavigationContent.worldOfAdvantages.mobile')}
        </Link>
        
        <Link to="/affinity-stays" className="mobile-nav-item" onClick={closeMenu}>
          {t('mainNavigationContent.affinityHotelLiving.mobile')}
        </Link>
        
        <div className="mobile-nav-section">
          <div className="mobile-nav-header">
            {t('mainNavigationContent.growWithUs.mobile')}
          </div>
          <Link to="/ambassador" className="mobile-nav-subitem" onClick={closeMenu}>
            {t('navigation.ambassador')}
          </Link>
          <Link to="/agentes" className="mobile-nav-subitem" onClick={closeMenu}>
            {t('navigation.localPromoter')}
          </Link>
        </div>
        
        <div className="mobile-nav-section">
          <div className="mobile-nav-header">
            {t('mainNavigationContent.videosAndPress.mobile')}
          </div>
          <Link to="/videos" className="mobile-nav-subitem" onClick={closeMenu}>
            {t('navigation.videos')}
          </Link>
          <Link to="/press" className="mobile-nav-subitem" onClick={closeMenu}>
            {t('navigation.press')}
          </Link>
        </div>
        
        <Link to="/faq" className="mobile-nav-item" onClick={closeMenu}>
          {t('mainNavigationContent.frequentlyAskedQuestions.mobile')}
        </Link>
        
        <Link to="/auth" className="mobile-nav-item" onClick={closeMenu}>
          {t('mainNavigationContent.hotel.mobile')}
        </Link>
      </div>
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 navbar-gradient">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <span className="text-xl font-bold text-white">Hotel-Living</span>
          </Link>

          {/* Desktop Navigation */}
          <DesktopNavigation />

          {/* Right side - Language selector and mobile menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-white" />
              <LanguageSelector />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white hover:text-yellow-200 transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNavigation />
      </div>

      <style jsx>{`
        .navbar-gradient {
          background: linear-gradient(135deg, #D4AF37 0%, #B8941F 50%, #D4AF37 100%);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }

        .nav-item {
          display: flex;
          align-items: center;
          padding: 0.5rem 1rem;
          color: white;
          text-decoration: none;
          transition: all 0.3s ease;
          border-radius: 0.5rem;
          min-height: 3rem;
        }

        .nav-item:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: #fef3c7;
        }

        .nav-text {
          text-align: center;
          line-height: 1.2;
        }

        .nav-line {
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .dropdown-content {
          background: linear-gradient(135deg, #D4AF37 0%, #B8941F 50%, #D4AF37 100%);
          border-radius: 0.5rem;
          padding: 0.5rem;
          min-width: 200px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          z-index: 1000;
        }

        .dropdown-item {
          display: block;
          padding: 0.75rem 1rem;
          color: white;
          text-decoration: none;
          border-radius: 0.375rem;
          transition: all 0.3s ease;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .dropdown-item:hover {
          background-color: rgba(255, 255, 255, 0.15);
          color: #fef3c7;
        }

        .mobile-menu {
          background: linear-gradient(135deg, #D4AF37 0%, #B8941F 50%, #D4AF37 100%);
          padding: 1rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-nav-item {
          display: block;
          padding: 0.75rem 1rem;
          color: white;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.875rem;
          transition: all 0.3s ease;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-nav-item:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: #fef3c7;
        }

        .mobile-nav-section {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-nav-header {
          padding: 0.75rem 1rem;
          color: white;
          font-weight: 700;
          font-size: 0.875rem;
          background-color: rgba(255, 255, 255, 0.05);
        }

        .mobile-nav-subitem {
          display: block;
          padding: 0.5rem 2rem;
          color: white;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.8125rem;
          transition: all 0.3s ease;
        }

        .mobile-nav-subitem:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: #fef3c7;
        }
      `}</style>
    </nav>
  );
}
