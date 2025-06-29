
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";
import { DashboardSelector } from "./navigation/DashboardSelector";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, session, profile, signOut } = useAuth();
  const { t } = useTranslation();
  const isLoggedIn = !!user && !!session;

  const getDisplayName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    if (profile?.first_name) {
      return profile.first_name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="shadow-md" style={{ backgroundColor: "#996515" }}>
      <div className="flex items-center justify-between">
        <div className="flex-shrink-0 px-2 sm:px-3 py-2">
          <Logo />
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-[#FFF9B0] hover:text-white transition-colors">
            {t('navigation.home')}
          </Link>
          <Link to="/search" className="text-[#FFF9B0] hover:text-white transition-colors">
            {t('navigation.hotels')}
          </Link>
          <Link to="/faq" className="text-[#FFF9B0] hover:text-white transition-colors">
            {t('navigation.faq')}
          </Link>
          <Link to="/videos" className="text-[#FFF9B0] hover:text-white transition-colors">
            {t('navigation.videos')}
          </Link>
          <Link to="/contact" className="text-[#FFF9B0] hover:text-white transition-colors">
            {t('navigation.contact')}
          </Link>
          <Link to="/join-us" className="text-[#FFF9B0] hover:text-white transition-colors">
            Join Us
          </Link>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <DashboardSelector />
              
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2 text-[#FFF9B0] hover:text-white transition-colors">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{getDisplayName()}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-purple-900 border-purple-700">
                  <DropdownMenuItem asChild>
                    <Link to="/user-dashboard" className="text-white hover:bg-purple-800">
                      <User className="w-4 h-4 mr-2" />
                      {t('navigation.profile')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-white hover:bg-purple-800">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('navigation.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-[#FFF9B0] hover:text-white transition-colors">
                {t('navigation.login')}
              </Link>
              <Link to="/signup" className="bg-[#FFF9B0] text-purple-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-200 transition-colors">
                {t('navigation.signup')}
              </Link>
            </div>
          )}
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
