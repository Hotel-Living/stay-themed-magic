import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation('navigation');

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
            <div className="text-white hover:text-white/80 transition-colors font-bold text-xs leading-tight cursor-pointer py-2">
              <div className="text-center">
                <div>{t('mainNavigationContent.videos.line1')}</div>
                <div>{t('mainNavigationContent.videos.line2')}</div>
              </div>
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-[#7801AA] shadow-lg rounded-lg z-50 min-w-max">
              <Link to="/videos" className="block text-white hover:bg-[#5D0080] px-4 py-2 rounded-t-lg transition-colors text-xs">
                {t('mainNavigationContent.videosAndPress.videos')}
              </Link>
              <Link to="/press" className="block text-white hover:bg-[#5D0080] px-4 py-2 rounded-b-lg transition-colors text-xs">
                {t('mainNavigationContent.videosAndPress.press')}
              </Link>
            </div>
          </div>

          <div className="relative group">
            <div className="text-white hover:text-white/80 transition-colors font-bold text-xs leading-tight cursor-pointer py-2">
              <div className="text-center">
                <div>{t('mainNavigationContent.ambassador.line1')}</div>
                <div>{t('mainNavigationContent.ambassador.line2')}</div>
              </div>
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-[#7801AA] shadow-lg rounded-lg z-50 min-w-max">
              <Link to="/ambassador" className="block text-white hover:bg-[#5D0080] px-4 py-2 rounded-t-lg transition-colors text-xs">
                {t('mainNavigationContent.growWithUs.ambassador')}
              </Link>
              <Link to="/agentes" className="block text-white hover:bg-[#5D0080] px-4 py-2 rounded-b-lg transition-colors text-xs">
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
          
          <Link to="/hotels" className="text-white hover:text-white/80 transition-colors font-bold text-xs leading-tight">
            <div className="text-center">
              <div>{t('mainNavigationContent.hotel.line1')}</div>
              <div>{t('mainNavigationContent.hotel.line2')}</div>
            </div>
          </Link>
          
          
          {/* Authentication Buttons */}
          <div className="relative group">
            <button className="bg-[#7E26A6] hover:bg-[#5D0080] text-white font-bold text-xs px-3 py-2 rounded transition-colors">
              SET UP
            </button>
            <div className="absolute top-full right-0 mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white shadow-lg rounded-lg z-50 min-w-max border">
              <Link to="/registerUser" className="block text-black hover:bg-gray-100 px-4 py-2 rounded-t-lg transition-colors text-xs">
                User
              </Link>
              <Link to="/registerHotel" className="block text-black hover:bg-gray-100 px-4 py-2 transition-colors text-xs">
                Hotel
              </Link>
              <Link to="/registerAssociation" className="block text-black hover:bg-gray-100 px-4 py-2 transition-colors text-xs">
                Association
              </Link>
              <Link to="/registerPromotor" className="block text-black hover:bg-gray-100 px-4 py-2 rounded-b-lg transition-colors text-xs">
                Promoter
              </Link>
            </div>
          </div>
          
          <div className="relative group">
            <button className="bg-[#7E26A6] hover:bg-[#5D0080] text-white font-bold text-xs px-3 py-2 rounded transition-colors">
              LOGIN
            </button>
            <div className="absolute top-full right-0 mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white shadow-lg rounded-lg z-50 min-w-max border">
              <Link to="/login/user" className="block text-black hover:bg-gray-100 px-4 py-2 rounded-t-lg transition-colors text-xs">
                User
              </Link>
              <Link to="/login/hotel" className="block text-black hover:bg-gray-100 px-4 py-2 transition-colors text-xs">
                Hotel
              </Link>
              <Link to="/login/association" className="block text-black hover:bg-gray-100 px-4 py-2 transition-colors text-xs">
                Association
              </Link>
              <Link to="/login/promoter" className="block text-black hover:bg-gray-100 px-4 py-2 rounded-b-lg transition-colors text-xs">
                Promoter
              </Link>
            </div>
          </div>
          
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
          
          <Link to="/hotels" onClick={() => setIsMenuOpen(false)} className="text-white font-bold hover:text-white/80 text-right text-base uppercase">
            {t('mainNavigationContent.hotel.mobile')}
          </Link>
        </nav>
      </div>
    </header>
  );
}
