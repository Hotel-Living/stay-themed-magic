import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Logo } from '@/components/Logo';

export function Navbar() {
  const { t } = useTranslation();
  const { isAdmin } = useAuth();

  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Logo />
        <nav className="flex space-x-6">
          <Link to="/faq" className="text-sm font-medium text-gray-700 hover:text-black">
            {t('mainNavigationContent.faq')}
          </Link>
          <Link to="/affinities" className="text-sm font-medium text-gray-700 hover:text-black">
            {t('mainNavigationContent.affinities')}
          </Link>
          <Link to="/hotels" className="text-sm font-medium text-gray-700 hover:text-black">
            {t('mainNavigationContent.hotels')}
          </Link>
          {isAdmin && (
            <Link to="/admin" className="text-sm font-medium text-gray-700 hover:text-black">
              Admin
            </Link>
          )}
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
}

export default Navbar;
