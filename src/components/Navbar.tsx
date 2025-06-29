import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, session } = useAuth();
  const { t } = useTranslation();
  const isLoggedIn = !!user && !!session;

  return (
    <header className="shadow-md" style={{ backgroundColor: "#996515" }}>
      <div className="flex items-center justify-between">
        <div className="flex-shrink-0 px-2 sm:px-3 py-2">
          <Logo />
        </div>

        <div className="hidden md:flex items-center gap-4 px-2 sm:px-3 py-2 ml-auto">
          <Link to="/faq" className="text-white font-bold hover:text-white/80 text-[0.66rem] uppercase">
            {t('mainNavigationContent.faq')}
          </Link>
          <Link to="/affinity-stays" className="text-white font-bold hover:text-white/80 text-[0.66rem] uppercase">
            {t('mainNavigationContent.affinityStays')}
          </Link>
          <Link to="/hotels" className="text-white font-bold hover:text-white/80 text-[0.66rem] uppercase">
            {t('mainNavigationContent.hotel')}
          </Link>
          {!isLoggedIn && (
            <>
              <Link to="/signup" className="text-white font-bold hover:text-white/80 text-[0.66rem] uppercase">
                {t('navigation.signup')}
              </Link>
              <Link to="/login" className="text-white font-bold hover:text-white/80 text-[0.66rem] uppercase">
                {t('navigation.login')}
              </Link>
            </>
          )}

          <div className="border-l border-white/20 pl-4 ml-2">
            <LanguageSwitcher />
          </div>
        </div>

        <div className="flex items-center gap-2 px-2 sm:px-3 py-2 md:hidden">
          <LanguageSwitcher />
          <button className="flex items-center ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      <div className={cn("fixed inset-0 top-[48px] z-40 flex flex-col p-4 gap-3 transition-all duration-300 ease-in-out transform md:hidden", isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0")} style={{ backgroundColor: "#996515" }}>
        <nav className="flex flex-col space-y-4">
          <Link to="/faq" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 text-right text-base uppercase">
            {t('mainNavigationContent.faq')}
          </Link>
          <Link to="/affinity-stays" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 text-right text-base uppercase">
            {t('mainNavigationContent.affinityStays')}
          </Link>
          <Link to="/hotels" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 text-right text-base uppercase">
            {t('mainNavigationContent.hotel')}
          </Link>
          {!isLoggedIn && (
            <>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 text-right text-base uppercase">
                {t('navigation.signup')}
              </Link>
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 text-right text-base uppercase">
                {t('navigation.login')}
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
