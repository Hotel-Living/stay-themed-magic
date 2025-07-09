import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HotelSlogans } from "@/components/hotels/HotelSlogans";
import { HotelNewAccordionMenu } from "@/components/hotels/HotelNewAccordionMenu";
import { FaqTabs } from "@/components/faq/FaqTabs";
import { useHotelFaqCategories, useHotelFaqsByCategory } from "@/components/faq/hotelFaqData";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import { Building, Mail } from "lucide-react";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { HotelCards } from "@/components/hotels/HotelCards";
import { HotelFeatures } from "@/components/hotels/HotelFeatures";
import { HotelVideoPlayer } from "@/components/hotels/HotelVideoPlayer";
import { useTranslation } from "@/hooks/useTranslation";
const orderedCategoryIds = ["benefits", "models", "revenue", "guests", "seniors", "affinities", "operation", "integration", "marketing", "payment"];
const HotelSignupButtons = ({
  isMobile
}: {
  isMobile: boolean;
}) => {
  const {
    t
  } = useTranslation();
  return <div className="mt-6 border-t-2 border-fuchsia-400/30 pt-4">
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        
        
      </div>
    </div>;
};
export default function Hotels() {
  const [activeTab, setActiveTab] = React.useState("benefits");
  const isMobile = useIsMobile();
  const {
    t,
    language
  } = useTranslation();
  const hotelFaqCategories = useHotelFaqCategories();
  const hotelFaqsByCategory = useHotelFaqsByCategory();
  const orderedFaqCategories = React.useMemo(() => orderedCategoryIds.map(id => hotelFaqCategories.find(cat => cat.id === id)).filter(Boolean) as typeof hotelFaqCategories, [hotelFaqCategories]);
  return <div className="min-h-screen flex flex-col relative overflow-hidden">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 pt-8 relative z-10">
        <div className="container mx-auto px-4 py-3 flex flex-col items-center">
          <HotelSlogans />
          
          {/* Professional Study Offer - Centered between blocks */}
          <div className="my-16 flex justify-center px-4">
            <div className="bg-gradient-to-br from-purple-900/80 via-fuchsia-900/60 to-purple-800/80 backdrop-blur-sm border-2 border-fuchsia-400 rounded-2xl p-8 max-w-2xl cursor-pointer hover:border-fuchsia-300 hover:bg-gradient-to-br hover:from-purple-800/90 hover:via-fuchsia-800/70 hover:to-purple-700/90 transition-all duration-300 shadow-2xl hover:shadow-fuchsia-500/30 hover:scale-105" onClick={() => {
            // TODO: Navigate to professional study page
            console.log("Navigate to professional study page");
          }}>
              <p className="text-white text-center text-lg leading-relaxed drop-shadow-lg font-bold">
                {language === 'en' && 'Get, at no cost, a complete professional, technical and in-person study about your hotel and its development possibilities'}
                {language === 'es' && (
                  <>
                    Obtenga, sin coste alguno, un completo estudio profesional,<br />
                    técnico y presencial, sobre su hotel y sus posibilidades de desarrollo
                  </>
                )}
                {language === 'pt' && 'Obtenha, sem qualquer custo, um estudo profissional, técnico e presencial completo sobre o seu hotel e as suas possibilidades de desenvolvimento'}
                {language === 'ro' && 'Obțineți, fără costuri, un studiu profesional complet, tehnic și în persoană despre hotelul dvs. și posibilitățile sale de dezvoltare'}
              </p>
            </div>
          </div>
          
          {/* New accordion menu */}
          <HotelNewAccordionMenu />
          
          <div className="w-full max-w-4xl mt-10">
            <div className="glass-card rounded-lg overflow-hidden border-none p-4 mb-10 bg-[#5f0276]">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-[#f9d3f6] mb-6">{t('faq.title')}</h2>
              
              <FaqTabs activeTab={activeTab} setActiveTab={setActiveTab} faqCategories={orderedFaqCategories} faqsByCategory={hotelFaqsByCategory} numbered={true} searchQuery="" accentTextColor="#4db74d" headerBgColor="#71037c" marginBottom="" textSizeClass="text-base md:text-lg" answerTextSizeClass="text-sm md:text-base" hideTabsList={false} />
              
              <HotelSignupButtons isMobile={isMobile} />
            </div>
          </div>
          
          <HotelCards />
          
          <HotelFeatures />
          
          <div className="w-full max-w-2xl mt-16 mb-12">
            <HotelVideoPlayer />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
}