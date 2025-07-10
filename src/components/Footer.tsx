import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Separator } from "./ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

export function Footer() {
  const isMobile = useIsMobile();
  const { t } = useTranslation('footer');
  
  return <footer className="py-4 px-4 border-t border-[#3300B0]/20 mt-20" style={{ 
      backgroundColor: "#996515"
    }}>
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center">
          <div className={isMobile ? "mb-4" : "mb-6"}>
            <div className={isMobile ? "h-[59.67px]" : ""}>
              <Logo />
            </div>
          </div>
          
          {/* Extra spacing between logo and FAQ for mobile */}
          {isMobile && <div className="mb-8"></div>}
          
          {/* First Line - Header links */}
          <div className={`flex ${isMobile ? "flex-col" : "flex-wrap"} justify-center ${isMobile ? "gap-y-3" : "gap-y-4 gap-x-10"} mb-4 mx-auto text-center w-full`}>
            {isMobile ? (
              // Mobile: one link per row, centered
              <>
                <div className="flex justify-center w-full mb-3">
                  <Link to="/faq" className="text-white hover:text-white/90 text-[0.8em] font-bold uppercase">
                    {t('footer.links.faq')}
                  </Link>
                </div>
                <div className="flex justify-center w-full mb-3">
                  <Link to="/affinity-stays" className="text-white hover:text-white/90 text-[0.8em] font-bold uppercase">
                    {t('footer.links.affinityStays')}
                  </Link>
                </div>
                <div className="flex justify-center w-full mb-3">
                  <Link to="/hotels" className="text-white hover:text-white/90 text-[0.8em] font-bold uppercase">
                    {t('footer.links.hotel')}
                  </Link>
                </div>
                <div className="flex justify-center w-full mb-3">
                  <Link to="/videos" className="text-white hover:text-white/90 text-[0.8em] font-bold uppercase">
                    {t('footer.links.videos')}
                  </Link>
                </div>
                <div className="flex justify-center w-full">
                  <Link to="/featured-hotels" className="text-white hover:text-white/90 text-[0.8em] font-bold uppercase">
                    {t('footer.links.featuredHotels')}
                  </Link>
                </div>
              </>
            ) : (
              // Desktop: keep existing layout
              <>
                <Link to="/faq" className="text-white hover:text-white/90 text-[0.691rem] font-bold uppercase">
                  {t('footer.links.faq')}
                </Link>
                <Link to="/affinity-stays" className="text-white hover:text-white/90 text-[0.691rem] font-bold uppercase">
                  {t('footer.links.affinityStays')}
                </Link>
                <Link to="/hotels" className="text-white hover:text-white/90 text-[0.691rem] font-bold uppercase">
                  {t('footer.links.hotel')}
                </Link>
                <Link to="/videos" className="text-white hover:text-white/90 text-[0.691rem] font-bold uppercase">
                  {t('footer.links.videos')}
                </Link>
                <Link to="/featured-hotels" className="text-white hover:text-white/90 text-[0.691rem] font-bold uppercase">
                  {t('footer.links.featuredHotels')}
                </Link>
              </>
            )}
          </div>
          
          {/* Separator between first and second line */}
          <div className="w-full px-4 mb-2">
            <Separator className={cn("bg-[#3300B0]/40")} />
          </div>
          
          {/* Second Line */}
          <div className={`flex ${isMobile ? "flex-col" : "flex-wrap"} justify-center ${isMobile ? "gap-y-3" : "gap-y-4 gap-x-10"} mb-2 mx-auto text-center w-full`}>
            {isMobile ? (
              // Mobile: one link per row, centered
              <>
                <div className="flex justify-center w-full mb-3">
                  <Link to="/hotels" className="text-white hover:text-white/90 text-[0.8em] font-bold uppercase">
                    {t('footer.links.hotel')}
                  </Link>
                </div>
                <div className="flex justify-center w-full mb-3">
                  <Link to="/our-services" className="text-white hover:text-white/90 text-[0.8em] font-bold uppercase">
                    {t('footer.links.ourServices')}
                  </Link>
                </div>
                <div className="flex justify-center w-full mb-3">
                  <Link to="/our-values" className="text-white hover:text-white/90 text-[0.8em] font-bold uppercase">
                    {t('footer.links.ourValues')}
                  </Link>
                </div>
                <div className="flex justify-center w-full">
                  <Link to="/customer-service" className="text-white hover:text-white/90 text-[0.8em] font-bold uppercase">
                    {t('footer.links.customerService')}
                  </Link>
                </div>
              </>
            ) : (
              // Desktop: keep existing layout
              <>
                <Link to="/hotels" className="text-white hover:text-white/90 text-[0.691rem] font-bold uppercase">
                  {t('footer.links.hotel')}
                </Link>
                <Link to="/our-services" className="text-white hover:text-white/90 text-[0.691rem] font-bold uppercase">
                  {t('footer.links.ourServices')}
                </Link>
                <Link to="/our-values" className="text-white hover:text-white/90 text-[0.691rem] font-bold uppercase">
                  {t('footer.links.ourValues')}
                </Link>
                <Link to="/customer-service" className="text-white hover:text-white/90 text-[0.691rem] font-bold uppercase">
                  {t('footer.links.customerService')}
                </Link>
              </>
            )}
          </div>
          
          {/* Third Line */}
          <div className={`flex ${isMobile ? "flex-col" : "flex-wrap"} justify-center ${isMobile ? "gap-y-3" : "gap-y-4 gap-x-10"} mb-6 mx-auto text-center w-full`}>
            {isMobile ? (
              // Mobile: one link per row, centered
              <>
                <div className="flex justify-center w-full mb-3">
                  <Link to="/contact" className="text-white hover:text-white/90 text-[0.8em] font-bold uppercase">
                    {t('footer.links.contact')}
                  </Link>
                </div>
                <div className="flex justify-center w-full mb-3">
                  <Link to="/terms" className="text-white hover:text-white/90 text-[0.8em] font-bold uppercase">
                    {t('footer.links.terms')}
                  </Link>
                </div>
                <div className="flex justify-center w-full mb-3">
                  <Link to="/privacy" className="text-white hover:text-white/90 text-[0.8em] font-bold uppercase">
                    {t('footer.links.privacy')}
                  </Link>
                </div>
                <div className="flex justify-center w-full mb-3">
                  <Link to="/intellectual-property" className="text-white hover:text-white/90 text-[0.8em] font-bold uppercase">
                    {t('footer.links.intellectualProperty')}
                  </Link>
                </div>
                <div className="flex justify-center w-full">
                  <Link to="/our-team" className="text-white hover:text-white/90 text-[0.8em] font-bold uppercase">
                    {t('footer.links.ourTeam')}
                  </Link>
                </div>
              </>
            ) : (
              // Desktop: keep existing layout
              <>
                <Link to="/contact" className="text-white hover:text-white/90 text-[0.691rem] font-bold uppercase">
                  {t('footer.links.contact')}
                </Link>
                <Link to="/terms" className="text-white hover:text-white/90 text-[0.691rem] font-bold uppercase">
                  {t('footer.links.terms')}
                </Link>
                <Link to="/privacy" className="text-white hover:text-white/90 text-[0.691rem] font-bold uppercase">
                  {t('footer.links.privacy')}
                </Link>
                <Link to="/intellectual-property" className="text-white hover:text-white/90 text-[0.691rem] font-bold uppercase">
                  {t('footer.links.intellectualProperty')}
                </Link>
                <Link to="/our-team" className="text-white hover:text-white/90 text-[0.691rem] font-bold uppercase">
                  {t('footer.links.ourTeam')}
                </Link>
              </>
            )}
          </div>
          
          {/* Buttons - reduced size by 30% on mobile */}
          <div className={`flex flex-wrap gap-4 justify-center ${isMobile ? "mt-2" : "mb-4"}`}>
            <Link to="/signup" className={`text-white hover:text-white/90 bg-[#7A127C] font-bold rounded-md uppercase ${isMobile ? "px-4 py-1.5 text-sm" : "px-6 py-2"}`}>
              {t('footer.buttons.register')}
            </Link>
            <Link to="/login" className={`text-white hover:text-white/90 bg-[#7A127C] font-bold rounded-md uppercase ${isMobile ? "px-4 py-1.5 text-sm" : "px-6 py-2"}`}>
              {t('footer.buttons.signIn')}
            </Link>
            <Link to="/hotels" className={`text-white hover:text-white/90 bg-[#7A127C] font-bold rounded-md uppercase ${isMobile ? "px-4 py-1.5 text-sm" : "px-6 py-2"}`}>
              {t('footer.buttons.hotel')}
            </Link>
          </div>
        </div>
        
        {/* Fix: Use the cn utility to properly apply className to Separator */}
        <Separator className={cn("bg-[#3300B0]/40 my-2")} />
        
        <div className={`text-center text-xs text-white ${isMobile ? "mt-8 mb-6" : ""}`}>
          <p className="font-semibold">{t('footer.copyright')}</p>
          <p className="text-white text-center text-xs font-semibold">
            {t('footer.disclaimer')}
          </p>
        </div>
      </div>
    </footer>;
}
