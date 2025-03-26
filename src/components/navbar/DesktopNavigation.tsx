
import React from "react";
import { Link } from "react-router-dom";
import { UserNavigation } from "./UserNavigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

interface DesktopNavigationProps {
  getInitials: () => string;
  signOut: () => Promise<void>;
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  getInitials,
  signOut,
}) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  
  return (
    <nav className="hidden md:flex items-center gap-6">
      <ul className="flex items-center gap-6">
        <li>
          <Link to="/" className="text-white hover:text-white/90">
            {t("nav.home")}
          </Link>
        </li>
        <li>
          <Link to="/search" className="text-white hover:text-white/90">
            {t("nav.search")}
          </Link>
        </li>
        {user && (
          <>
            <li>
              <Link to="/bookings" className="text-white hover:text-white/90">
                {t("nav.bookings")}
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="text-white hover:text-white/90">
                {t("nav.favorites")}
              </Link>
            </li>
          </>
        )}
      </ul>
      
      {user ? (
        <UserNavigation getInitials={getInitials} signOut={signOut} />
      ) : (
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium text-white"
          >
            {t("nav.login")}
          </Link>
          <Link
            to="/signup"
            className="px-3 py-2 text-sm font-medium text-fuchsia-600 bg-white rounded-md hover:bg-white/90"
          >
            {t("nav.signup")}
          </Link>
        </div>
      )}
    </nav>
  );
};
