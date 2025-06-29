
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-black/95 backdrop-blur-sm">
      <div className="px-4 py-6 space-y-4">
        <Link 
          to="/faq" 
          className="block text-white hover:text-yellow-400 transition-colors font-medium py-2"
          onClick={onClose}
        >
          {t('navigation.faq')}
        </Link>
        <Link 
          to="/affinity-stays" 
          className="block text-white hover:text-yellow-400 transition-colors font-medium py-2"
          onClick={onClose}
        >
          {t('navigation.affinityStays')}
        </Link>
        <Link 
          to="/hotel-signup" 
          className="block text-white hover:text-yellow-400 transition-colors font-medium py-2"
          onClick={onClose}
        >
          {t('mainNavigationContent.hotel')}
        </Link>
      </div>
    </div>
  );
};

export default MobileNavigation;
