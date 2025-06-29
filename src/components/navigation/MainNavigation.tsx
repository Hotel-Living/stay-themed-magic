
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

const MainNavigation = () => {
  const { t } = useTranslation();

  return (
    <nav className="hidden md:flex items-center space-x-8">
      <Link 
        to="/faq" 
        className="text-white hover:text-yellow-400 transition-colors font-medium"
      >
        {t('navigation.faq')}
      </Link>
      <Link 
        to="/affinity-stays" 
        className="text-white hover:text-yellow-400 transition-colors font-medium"
      >
        {t('navigation.affinityStays')}
      </Link>
      <Link 
        to="/hotel-signup" 
        className="text-white hover:text-yellow-400 transition-colors font-medium"
      >
        {t('mainNavigationContent.hotel')}
      </Link>
    </nav>
  );
};

export default MainNavigation;
