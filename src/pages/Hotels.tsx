import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HotelSlogansEnhanced as HotelSlogans } from "@/components/hotels/HotelSlogansEnhanced";
import { HotelNewAccordionMenu } from "@/components/hotels/HotelNewAccordionMenu";
import { FaqTabs } from "@/components/faq/FaqTabs";
import { useHotelFaqCategories, useHotelFaqsByCategory } from "@/components/faq/hotelFaqData";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link, useNavigate } from "react-router-dom";
import { Building, Mail } from "lucide-react";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { HotelCardsEnhanced as HotelCards } from "@/components/hotels/HotelCardsEnhanced";
import { HotelFeaturesEnhanced as HotelFeatures } from "@/components/hotels/HotelFeaturesEnhanced";
import { HotelVideoPlayer } from "@/components/hotels/HotelVideoPlayer";
import { useTranslation } from "@/hooks/useTranslation";
import { HotelPageAvatar } from "@/components/avatars/HotelPageAvatar";
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
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const {
    t,
    language
  } = useTranslation('faq');
  const hotelFaqCategories = useHotelFaqCategories();
  const hotelFaqsByCategory = useHotelFaqsByCategory();
  const orderedFaqCategories = React.useMemo(() => orderedCategoryIds.map(id => hotelFaqCategories.find(cat => cat.id === id)).filter(Boolean) as typeof hotelFaqCategories, [hotelFaqCategories]);

  // Staggered section reveals
  useEffect(() => {
    [0, 1, 2, 3, 4].forEach((section) => {
      setTimeout(() => {
        setVisibleSections(prev => [...prev, section]);
      }, section * 300 + 1500); // Start after enhanced components
    });
  }, []);
  return <div className="min-h-screen flex flex-col relative overflow-hidden">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 pt-8 relative z-10">
        <div className="container mx-auto px-4 py-3 flex flex-col items-center">
          <HotelSlogans />
          
          {/* Enhanced Professional Study Offer */}
          <div 
            className={`
              my-16 flex justify-center px-4 transition-all duration-700 ease-out
              ${visibleSections.includes(0) 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-6 opacity-0'
              }
            `}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-85 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              <div 
                className="relative bg-gradient-to-br from-purple-900/80 via-fuchsia-900/60 to-purple-800/80 backdrop-blur-sm border-2 border-fuchsia-400 rounded-2xl p-8 max-w-2xl cursor-pointer transition-all duration-300 shadow-2xl hover:border-fuchsia-300 hover:bg-gradient-to-br hover:from-purple-800/90 hover:via-fuchsia-800/70 hover:to-purple-700/90 hover:shadow-fuchsia-500/30 hover:scale-105 hover:-translate-y-1" 
                onClick={() => navigate('/professional-study')}
              >
                <p className="text-white text-center text-lg leading-relaxed drop-shadow-lg font-bold uppercase transition-all duration-300 hover:tracking-wide">
                  {language === 'en' && 'Get, at no cost, a complete professional, technical and in-person study about your hotel and its development possibilities'}
                  {language === 'es' && 'Obtenga, sin coste alguno, un completo estudio profesional, técnico y presencial, sobre su hotel y sus posibilidades de desarrollo'}
                  {language === 'pt' && 'Obtenha, sem qualquer custo, um estudo profissional, técnico e presencial completo sobre o seu hotel e as suas possibilidades de desenvolvimento'}
                  {language === 'ro' && 'Obțineți, fără costuri, un studiu profesional complet, tehnic și în persoană despre hotelul dvs. și posibilitățile sale de dezvoltare'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Enhanced accordion menu */}
          <div 
            className={`
              transition-all duration-700 ease-out
              ${visibleSections.includes(1) 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-6 opacity-0'
              }
            `}
          >
            <HotelNewAccordionMenu />
          </div>
          
          {/* Enhanced FAQ section */}
          <div 
            className={`
              w-full max-w-4xl mt-10 transition-all duration-700 ease-out
              ${visibleSections.includes(2) 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-6 opacity-0'
              }
            `}
          >
            <div className="glass-card rounded-lg overflow-hidden border-none p-4 mb-10 bg-[#5f0276] hover:bg-[#6a0a7f] transition-colors duration-300">
              {/* Enhanced FAQ title */}
              <div className="relative group w-fit mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-85 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <h2 className="relative text-2xl md:text-3xl font-bold text-center text-[#f9d3f6] px-4 py-2 hover:scale-105 transition-transform duration-300">{t('title')}</h2>
              </div>
              
              {/* Enhanced FAQ tabs */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-85 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <div className="relative">
                  <FaqTabs activeTab={activeTab} setActiveTab={setActiveTab} faqCategories={orderedFaqCategories} faqsByCategory={hotelFaqsByCategory} numbered={true} searchQuery="" accentTextColor="#4db74d" headerBgColor="#71037c" marginBottom="" textSizeClass="text-base md:text-lg" answerTextSizeClass="text-sm md:text-base" hideTabsList={false} />
                </div>
              </div>
              
              {/* Enhanced Hotel Crisis Link */}
              <div className="mt-6 flex justify-center">
                <Link 
                  to="/hotel-crisis" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-fuchsia-500/30 hover:tracking-wide"
                >
                  📊 {t('linkText', { defaultValue: 'Retrato de la Crisis Hotelera' })}
                </Link>
              </div>
              
              <HotelSignupButtons isMobile={isMobile} />
            </div>
          </div>
          
          <HotelCards />
          
          <HotelFeatures />
          
          {/* Enhanced video section */}
          <div 
            className={`
              w-full max-w-2xl mt-16 mb-12 transition-all duration-700 ease-out
              ${visibleSections.includes(4) 
                ? 'translate-y-0 opacity-100 scale-100' 
                : 'translate-y-6 opacity-0 scale-95'
              }
            `}
          >
            <div className="hover:scale-105 transition-transform duration-300">
              <HotelVideoPlayer />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Martin avatar for hotel partners */}
      <HotelPageAvatar />
    </div>;
}