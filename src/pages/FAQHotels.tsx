
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Building, Mail } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { FaqSearch } from "@/components/faq/FaqSearch";
import { FaqTabs } from "@/components/faq/FaqTabs";
import { HotelVideoPlayer } from "@/components/hotels/HotelVideoPlayer";
import { hotelFaqCategories, hotelFaqsByCategory } from "@/components/faq/faqHotelsData";

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

export default function FAQHotels() {
  const [activeTab, setActiveTab] = useState("video");
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const contentFaqCategories = useMemo(() => 
    hotelFaqCategories.filter(cat => cat.id !== "video"), 
    []
  );

  const contentFaqsByCategory = useMemo(() => {
    const result = {...hotelFaqsByCategory};
    delete result.video;
    return result;
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col faq-page">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-4xl mx-auto px-4 py-3">
          <div className="text-center mb-4">
            <h1 className={`
              ${isMobile ? "text-4xl" : "text-3xl md:text-4xl"} 
              font-bold mb-2 text-gradient text-[#eedbf7] glow 
              animate-text-slow tracking-tight leading-tight
            `}>
              Hotel Partner FAQ
            </h1>
            <p className={`${isMobile ? "text-xl" : "text-base"} font-medium text-[#e3d6e9] mb-6`}>
              Find answers to common questions about joining Hotel-Living as a property partner
            </p>
            
            <FaqSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="Search partner FAQs..."
            />
          </div>
          
          {/* Modified: Only show one set of tab buttons divided into two rows */}
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex justify-center">
              <div className="grid grid-cols-5 gap-2 p-2 bg-[#460F54]/50 rounded-xl border border-fuchsia-500/30 backdrop-blur-md">
                {hotelFaqCategories.slice(0, 5).map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`px-3 py-1 rounded-lg uppercase whitespace-nowrap text-xs font-bold ${activeTab === category.id ? 'bg-[#981DA1]' : 'bg-gradient-to-r from-[#730483] to-[#570366]'} text-white shadow-md hover:shadow-fuchsia-500/20 hover:scale-105 transition-all duration-200 border border-fuchsia-600/20`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="grid grid-cols-5 gap-2 p-2 bg-[#460F54]/50 rounded-xl border border-fuchsia-500/30 backdrop-blur-md">
                {hotelFaqCategories.slice(5).map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`px-3 py-1 rounded-lg uppercase whitespace-nowrap text-xs font-bold ${activeTab === category.id ? 'bg-[#981DA1]' : 'bg-gradient-to-r from-[#730483] to-[#570366]'} text-white shadow-md hover:shadow-fuchsia-500/20 hover:scale-105 transition-all duration-200 border border-fuchsia-600/20`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {activeTab === "video" && (
            <div className="glass-card rounded-lg overflow-hidden border-none p-4">
              <div className="max-w-md mx-auto">
                <HotelVideoPlayer />
              </div>
              
              <HotelSignupButtons isMobile={isMobile} />
            </div>
          )}
          
          {/* Remove the TabsList from FaqTabs component to avoid the third row of menus */}
          <FaqTabs 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            faqCategories={hotelFaqCategories}
            faqsByCategory={{
              ...contentFaqsByCategory,
              video: [] // Include empty video array to handle tab switching
            }}
            numbered={true}
            searchQuery={searchQuery}
            accentTextColor="#4db74d"
            headerBgColor="#71037c"
            marginBottom=""
            textSizeClass="text-sm md:text-base"
            answerTextSizeClass="text-xs md:text-sm"
            hideTabsList={true} // Add a new prop to hide the TabsList
          />
          
          {activeTab !== "video" && <HotelSignupButtons isMobile={isMobile} />}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
