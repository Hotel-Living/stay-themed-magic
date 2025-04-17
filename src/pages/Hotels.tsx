import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HotelSlogans } from "@/components/hotels/HotelSlogans";
import { HotelAccordionMenu } from "@/components/hotels/HotelAccordionMenu";
import { FaqTabs } from "@/components/faq/FaqTabs";
import { hotelFaqCategories, hotelFaqsByCategory } from "@/components/faq/hotelFaqData";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import { Building, Mail } from "lucide-react";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { HotelCards } from "@/components/hotels/HotelCards";
import { HotelFeatures } from "@/components/hotels/HotelFeatures";
import { HotelVideoPlayer } from "@/components/hotels/HotelVideoPlayer";

const orderedCategoryIds = [
  "benefits", "models", "revenue", "guests", "seniors", 
  "affinities", "operation", "integration", "marketing", "payment"
];

const HotelSignupButtons = ({ isMobile }: { isMobile: boolean }) => (
  <div className="mt-6 border-t-2 border-fuchsia-400/30 pt-4">
    <h3 className={`text-[#f9d3f6] ${isMobile ? "text-lg" : "text-base"} font-semibold mb-3 text-center`}>
      Ready to join Hotel-Living?
    </h3>
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Link to="/hotel-signup" className={`bg-[#981DA1] hover:bg-[#460F54] text-white font-bold py-1.5 px-4 rounded-lg transition-colors flex items-center justify-center ${isMobile ? "text-base" : "text-sm"}`}>
        <Building className="mr-2 h-4 w-4" />
        Register Your Hotel
      </Link>
      <Link to="/login?tab=hotel" className={`bg-fuchsia-700 hover:bg-fuchsia-800 text-white font-bold py-1.5 px-4 rounded-lg transition-colors flex items-center justify-center ${isMobile ? "text-base" : "text-sm"}`}>
        <Mail className="mr-2 h-4 w-4" />
        Partner Login
      </Link>
    </div>
  </div>
);

export default function Hotels() {
  const [activeTab, setActiveTab] = React.useState("benefits");
  const isMobile = useIsMobile();
  
  const orderedFaqCategories = React.useMemo(() => 
    orderedCategoryIds.map(id => 
      hotelFaqCategories.find(cat => cat.id === id)
    ).filter(Boolean) as typeof hotelFaqCategories,
  []);
  
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 pt-8 relative z-10">
        <div className="container mx-auto px-4 py-3 flex flex-col items-center">
          <HotelSlogans />
          
          <div className="max-w-4xl w-full backdrop-blur-sm rounded-xl border border-fuchsia-400/20 p-4 md:p-6 bg-gradient-to-b from-[#460F54]/40 to-[#300A38]/60 z-20">
            <HotelAccordionMenu />
          </div>
          
          <div className="w-full max-w-4xl mt-48">
            <div className="glass-card rounded-lg overflow-hidden border-none p-4 mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-[#f9d3f6] mb-6">Frequently Asked Questions</h2>
              
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
