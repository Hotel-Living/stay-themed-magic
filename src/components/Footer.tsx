import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Separator } from "./ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";
export function Footer() {
  const isMobile = useIsMobile();
  const {
    t
  } = useTranslation('footer');
  return <footer className="py-4 px-4 border-t border-[#3300B0]/20 mt-20 animate-fade-in" style={{
    backgroundColor: "#996515"
  }}>
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center">
          <div className={`${isMobile ? "mb-4" : "mb-6"} animate-fade-in`} style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <div className={isMobile ? "h-[59.67px]" : ""}>
              <Logo />
            </div>
          </div>
          
          {/* Extra spacing between logo and menu for mobile */}
          {isMobile && <div className="mb-8"></div>}
          
          {/* Footer Menu - 4 column layout */}
          <div className={`w-full max-w-4xl ${isMobile ? "mb-6" : "mb-8"} animate-fade-in`} style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <div className={`grid ${isMobile ? "grid-cols-2 gap-x-8 gap-y-6" : "grid-cols-4 gap-8"} text-center text-white text-sm font-bold`}>
              
              {/* Column 1: About Us */}
              <div className="space-y-2">
                <div className="text-purple-800 font-bold text-sm mb-2 bg-white px-2 py-0.5 rounded inline-block">{t('footer.sections.aboutUs')}</div>
                <div className="space-y-1">
                  <Link to="/our-team" className="block text-white hover:text-white/90 text-sm font-bold transition-all duration-300 hover:scale-105">
                    {t('footer.links.ourTeam')}
                  </Link>
                  <Link to="/our-values" className="block text-white hover:text-white/90 text-sm font-bold transition-all duration-300 hover:scale-105">
                    {t('footer.links.ourValues')}
                  </Link>
                  <Link to="/our-services" className="block text-white hover:text-white/90 text-sm font-bold transition-all duration-300 hover:scale-105">
                    {t('footer.links.ourServices')}
                  </Link>
                </div>
              </div>

              {/* Column 2: Customer Service */}
              <div className="space-y-2">
                <Link to="/customer-service" className="block text-white hover:text-white/90 text-sm font-bold transition-all duration-300 hover:scale-105">
                  {t('footer.links.customerService')}
                </Link>
              </div>

              {/* Column 3: Contact */}
              <div className="space-y-2">
                <Link to="/contact" className="block text-white hover:text-white/90 text-sm font-bold transition-all duration-300 hover:scale-105">
                  {t('footer.links.contact')}
                </Link>
              </div>

              {/* Column 4: Legal */}
              <div className="space-y-2">
                <div className="text-purple-800 font-bold text-sm mb-2 bg-white px-2 py-0.5 rounded inline-block">{t('footer.sections.legal')}</div>
                <div className="space-y-1">
                  <Link to="/intellectual-property" className="block text-white hover:text-white/90 text-sm font-bold transition-all duration-300 hover:scale-105">
                    {t('footer.links.intellectualProperty')}
                  </Link>
                  <Link to="/terms" className="block text-white hover:text-white/90 text-sm font-bold transition-all duration-300 hover:scale-105">
                    {t('footer.links.terms')}
                  </Link>
                  <Link to="/privacy" className="block text-white hover:text-white/90 text-sm font-bold transition-all duration-300 hover:scale-105">
                    {t('footer.links.privacy')}
                  </Link>
                </div>
              </div>

            </div>
          </div>
          
          
          {/* Buttons - reduced size by 30% on mobile */}
          <div className={`flex flex-wrap gap-4 justify-center ${isMobile ? "mt-2" : "mb-4"} animate-fade-in`} style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <Link to="/hotels" className={`text-white hover:text-white/90 bg-[#7A127C] font-bold rounded-md uppercase transition-all duration-300 hover:scale-105 hover:shadow-lg ${isMobile ? "px-4 py-1.5 text-sm" : "px-6 py-2"}`}>
              {t('footer.buttons.hotel')}
            </Link>
          </div>
        </div>
        
        {/* Fix: Use the cn utility to properly apply className to Separator */}
        <Separator className={cn("bg-[#3300B0]/40 my-2")} />
        
        <div className={`text-center text-xs text-white ${isMobile ? "mt-8 mb-6" : ""}`}>
          <p className="font-semibold">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>;
}