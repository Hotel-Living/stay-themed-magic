
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { BenefitsTravelersList } from "@/components/faq/BenefitsTravelersList";
import { FaqTabs } from "@/components/faq/FaqTabs";
import { FaqSearch } from "@/components/faq/FaqSearch";
import { 
  benefitsTravelersList, 
  faqTravelersCategories, 
  faqTravelersByCategory 
} from "@/components/faq/faqTravelersData";

export default function FAQTravelers() {
  const [activeTab, setActiveTab] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col faq-page">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-4xl mx-auto px-4 py-6"> {/* Reduced padding */}
          <BenefitsTravelersList benefits={benefitsTravelersList} />

          <div className="text-center mb-8"> {/* Reduced margin */}
            <h1 className={`
              ${isMobile ? "text-4xl" : "text-3xl md:text-4xl"} 
              font-bold mb-4 text-gradient text-[#eedbf7] glow 
              animate-text-slow tracking-tight leading-tight
            `}> {/* Reduced heading size */}
              Travelers FAQ
            </h1>
            <p className={`${isMobile ? "text-xl" : "text-base"} font-medium text-[#e3d6e9] mb-6`}> {/* Reduced text size */}
              Everything you need to know about Hotel-Living
            </p>
            
            <FaqSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="Search traveler FAQs..."
            />
          </div>

          <FaqTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            faqCategories={faqTravelersCategories}
            faqsByCategory={faqTravelersByCategory}
            numbered={true}
            searchQuery={searchQuery}
            accentTextColor="#4db74d"
            headerBgColor="#71037c"
            marginBottom=""
            textSizeClass="text-sm md:text-base" // Reduced text size
            answerTextSizeClass="text-xs md:text-sm" // Reduced answer text size
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
