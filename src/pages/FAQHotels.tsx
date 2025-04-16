
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Building, Mail } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { FaqSearch } from "@/components/faq/FaqSearch";
import { FaqTabs } from "@/components/faq/FaqTabs";
import { hotelFaqCategories, hotelFaqsByCategory } from "@/components/faq/faqHotelsData";

const HotelSignupButtons = ({ isMobile }: { isMobile: boolean }) => (
  <div className="mt-8 border-t-2 border-fuchsia-400/30 pt-6">
    <h3 className={`text-[#f9d3f6] ${isMobile ? "text-xl" : "text-lg"} font-semibold mb-4 text-center`}>Ready to join Hotels Life?</h3>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link to="/hotel-signup" className={`bg-[#981DA1] hover:bg-[#460F54] text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center justify-center ${isMobile ? "text-lg" : ""}`}>
        <Building className="mr-2 h-5 w-5" />
        Register Your Hotel
      </Link>
      <Link to="/hotel-login" className={`bg-fuchsia-700 hover:bg-fuchsia-800 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center justify-center ${isMobile ? "text-lg" : ""}`}>
        <Mail className="mr-2 h-5 w-5" />
        Partner Login
      </Link>
    </div>
  </div>
);

export default function FAQHotels() {
  const [activeTab, setActiveTab] = useState("video");
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();
  
  // Filter video tab from faq categories for content rendering
  const contentFaqCategories = useMemo(() => 
    hotelFaqCategories.filter(cat => cat.id !== "video"), 
    []
  );

  // Get combined faq list but exclude video category
  const contentFaqsByCategory = useMemo(() => {
    const result = {...hotelFaqsByCategory};
    delete result.video;
    return result;
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col faq-page">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className={`
              ${isMobile ? "text-6xl" : "text-5xl md:text-6xl"} 
              font-bold mb-6 text-gradient text-[#eedbf7] glow 
              animate-text-slow tracking-tight leading-tight
            `}>
              Hotel Partner FAQ
            </h1>
            <p className={`${isMobile ? "text-2xl" : "text-xl"} font-medium text-[#e3d6e9] mb-8`}>
              Find answers to common questions about joining Hotels Life as a property partner
            </p>
            
            <FaqSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="Search partner FAQs..."
            />
          </div>
          
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
            textSizeClass="text-xl md:text-2xl" // Using appropriate text size
            answerTextSizeClass="text-base md:text-lg" // Keep answer text size normal
          />
          
          {activeTab === "video" && (
            <div className="glass-card rounded-lg overflow-hidden border-none p-6">
              <h2 className={`font-semibold text-[#f9d3f6] ${isMobile ? "text-2xl" : "text-xl"} mb-4 text-center`}>Watch Our Explainer Video</h2>
              <div className="aspect-video w-full max-w-3xl mx-auto">
                <iframe className="w-full h-full rounded-lg shadow-lg" src="https://www.youtube.com/embed/NEn7uG_fb8M" title="Hotels Life Partner Program Overview" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                </iframe>
              </div>
              
              <HotelSignupButtons isMobile={isMobile} />
            </div>
          )}
          
          {activeTab !== "video" && <HotelSignupButtons isMobile={isMobile} />}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
