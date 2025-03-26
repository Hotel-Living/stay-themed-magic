
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  signOut: () => Promise<void>;
  getInitials: () => string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  signOut,
  getInitials,
}) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-[#860477] backdrop-blur-xl border-b border-[#c266af] animate-in slide-in-from-top-5 duration-300">
      <nav className="container px-4 sm:px-6 py-4">
        <ul className="space-y-3">
          <li>
            <Link 
              to="/" 
              className="block py-2 text-white hover:text-white/90"
              onClick={onClose}
            >
              {t("nav.home")}
            </Link>
          </li>
          <li>
            <Link 
              to="/search" 
              className="block py-2 text-white hover:text-white/90"
              onClick={onClose}
            >
              {t("nav.search")}
            </Link>
          </li>
          
          {user ? (
            <>
              <li>
                <Link 
                  to="/bookings" 
                  className="block py-2 text-white hover:text-white/90"
                  onClick={onClose}
                >
                  {t("nav.bookings")}
                </Link>
              </li>
              <li>
                <Link 
                  to="/favorites" 
                  className="block py-2 text-white hover:text-white/90"
                  onClick={onClose}
                >
                  {t("nav.favorites")}
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard" 
                  className="block py-2 text-white hover:text-white/90"
                  onClick={onClose}
                >
                  {t("nav.dashboard")}
                </Link>
              </li>
              <li>
                <button 
                  className="block w-full text-left py-2 text-white hover:text-white/90"
                  onClick={() => {
                    signOut();
                    onClose();
                  }}
                >
                  {t("nav.logout")}
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link 
                  to="/login" 
                  className="block py-2 text-white hover:text-white/90"
                  onClick={onClose}
                >
                  {t("nav.login")}
                </Link>
              </li>
              <li>
                <Link 
                  to="/signup" 
                  className="block py-2 text-white hover:text-white/90"
                  onClick={onClose}
                >
                  {t("nav.signup")}
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};
