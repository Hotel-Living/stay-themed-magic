
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
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, session, profile, signOut } = useAuth();
  const { t } = useTranslation('navigation');
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

  // Auth Dropdown Component
  const AuthDropdown = () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:text-white/80 transition-colors">
          <User className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 bg-white shadow-lg rounded-xl border border-gray-200 z-50" align="end">
        <div className="flex flex-col gap-2 p-2">
          <Link to="/login" className="w-full">
            <Button variant="outline" className="w-full text-sm font-medium">
              {t('mainNavigationContent.login.mobile')}
            </Button>
          </Link>
          <Link to="/signup" className="w-full">
            <Button variant="outline" className="w-full text-sm font-medium">
              {t('mainNavigationContent.signup.mobile')}
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <header className="shadow-md" style={{ backgroundColor: "#996515" }}>
      <div className="flex items-center justify-between">
        <div className="flex-shrink-0 px-2 sm:px-3 py-2">
          <Logo />
        </div>

        <div className="hidden md:flex items-center space-x-6">
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
          
          <div className="relative group">
            <div className="text-white hover:text-white/80 transition-colors font-bold text-xs leading-tight cursor-pointer">
              <div className="text-center">
                <div>{t('mainNavigationContent.videos.line1')}</div>
                <div>{t('mainNavigationContent.videos.line2')}</div>
              </div>
            </div>
            <div className="absolute top-full left-0 mt-1 hidden group-hover:block bg-[#7801AA] shadow-lg rounded-lg border border-gray-200 z-50 min-w-max">
              <Link to="/videos" className="block text-white hover:bg-[#5D0080] px-4 py-2 rounded-t-lg">
                {t('mainNavigationContent.videosAndPress.videos')}
              </Link>
              <Link to="/press" className="block text-white hover:bg-[#5D0080] px-4 py-2 rounded-b-lg">
                {t('mainNavigationContent.videosAndPress.press')}
              </Link>
            </div>
          </div>

          <div className="relative group">
            <div className="text-white hover:text-white/80 transition-colors font-bold text-xs leading-tight cursor-pointer">
              <div className="text-center">
                <div>{t('mainNavigationContent.ambassador.line1')}</div>
                <div>{t('mainNavigationContent.ambassador.line2')}</div>
              </div>
            </div>
            <div className="absolute top-full left-0 mt-1 hidden group-hover:block bg-[#7801AA] shadow-lg rounded-lg border border-gray-200 z-50 min-w-max">
              <Link to="/ambassador" className="block text-white hover:bg-[#5D0080] px-4 py-2 rounded-t-lg">
                {t('mainNavigationContent.growWithUs.ambassador')}
              </Link>
              <Link to="/agentes" className="block text-white hover:bg-[#5D0080] px-4 py-2 rounded-b-lg">
                {t('mainNavigationContent.growWithUs.localPromoter')}
              </Link>
            </div>
          </div>

          <Link to="/ayuda" className="text-white hover:text-white/80 transition-colors font-bold text-xs leading-tight">
            <div className="text-center">
              <div>{t('mainNavigationContent.frequentQuestions.line1')}</div>
              <div>{t('mainNavigationContent.frequentQuestions.line2')}</div>
            </div>
          </Link>
          
          {!user ? (
            <AuthDropdown />
          ) : (
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
                    {t('mainNavigationContent.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          
          <Link to="/hotels" className="text-white hover:text-white/80 transition-colors font-bold text-xs leading-tight">
            <div className="text-center">
              <div>{t('mainNavigationContent.hotel.line1')}</div>
              <div>{t('mainNavigationContent.hotel.line2')}</div>
            </div>
          </Link>
          
          
          <LanguageSwitcher />
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
            {t('mainNavigationContent.faq.mobile')}
          </Link>
          <Link to="/affinity-stays" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 text-right text-base uppercase">
            {t('mainNavigationContent.affinityStays.mobile')}
          </Link>
          <Link to="/videos" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 text-right text-base uppercase">
            {t('mainNavigationContent.videos.mobile')}
          </Link>
          <Link to="/ambassador" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 text-right text-base uppercase">
            {t('mainNavigationContent.ambassador.mobile')}
          </Link>
          <Link to="/ayuda" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 text-right text-base uppercase">
            {t('mainNavigationContent.frequentQuestions.mobile')}
          </Link>
           {!isLoggedIn && (
            <div className="flex justify-center w-full mb-3">
              <AuthDropdown />
            </div>
           )}
          <Link to="/hotels" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 text-right text-base uppercase">
            {t('mainNavigationContent.hotel.mobile')}
          </Link>
        </nav>
      </div>
    </header>
  );
}
