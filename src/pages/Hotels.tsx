import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HotelSlogans } from "@/components/hotels/HotelSlogans";
import { HotelNewAccordionMenuES } from "@/components/hotels/HotelNewAccordionMenu.es";
import { HotelAccordionMenu } from "@/components/hotels/HotelAccordionMenu";
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
    t
  } = useTranslation();
  const hotelFaqCategories = useHotelFaqCategories();
  const hotelFaqsByCategory = useHotelFaqsByCategory();
  
  const orderedFaqCategories = React.useMemo(() => 
    orderedCategoryIds.map(id => 
      hotelFaqCategories.find(cat => cat.id === id)
    ).filter(Boolean) as typeof hotelFaqCategories,
  [hotelFaqCategories]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 pt-8 relative z-10">
        <div className="container mx-auto px-4 py-3 flex flex-col items-center">
          <HotelSlogans />
          
          {/* New accordion menu */}
          <HotelNewAccordionMenuES />
          
          <div className="max-w-4xl w-full backdrop-blur-sm rounded-xl border border-fuchsia-400/20 p-4 md:p-6 bg-gradient-to-b from-[#460F54]/40 to-[#300A38]/60 z-20">
            <HotelAccordionMenu />
          </div>
          
          <div className="w-full max-w-4xl mt-10">
            <div className="glass-card rounded-lg overflow-hidden border-none p-4 mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-[#f9d3f6] mb-6">{t('faq.title')}</h2>
              
              <FaqTabs 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                faqCategories={orderedFaqCategories}
                faqsByCategory={hotelFaqsByCategory}
                numbered={true}
                searchQuery=""
                accentTextColor="#4db74d"
                headerBgColor="#71037c"
                marginBottom=""
                textSizeClass="text-base md:text-lg"
                answerTextSizeClass="text-sm md:text-base"
                hideTabsList={false}
              />
              
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
    </div>
  );
}
