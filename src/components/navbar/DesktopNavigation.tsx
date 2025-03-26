
import React from "react";
import { Link } from "react-router-dom";
import { UserNavigation } from "./UserNavigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export const DesktopNavigation = () => {
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
      
      <UserNavigation />
    </nav>
  );
};
