
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { BenefitsTravelersList } from "@/components/faq/BenefitsTravelersList";
import { FaqTabs } from "@/components/faq/FaqTabs";
import { FaqSearch } from "@/components/faq/FaqSearch";
import { useFaqData } from "@/components/faq/faqData";
import { benefitsTravelersList } from "@/components/faq/faqTravelersData";
import { useTranslation } from "@/hooks/useTranslation";

export default function FAQTravelers() {
  const [activeTab, setActiveTab] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const { translatedCategories, translatedFaqsByCategory } = useFaqData();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col faq-page">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-4xl mx-auto px-4 py-6"> {/* Reduced padding */}
          <BenefitsTravelersList benefits={benefitsTravelersList} />

          <div className="text-center mb-16"> {/* Doubled margin from mb-8 to mb-16 */}
            <h1 className={`
              ${isMobile ? "text-4xl" : "text-3xl md:text-4xl"} 
              font-bold mb-4 text-gradient text-[#eedbf7] glow 
              animate-text-slow tracking-tight leading-tight
            `}> {/* Reduced heading size */}
              {t('faq.title')}
            </h1>
            <p className={`${isMobile ? "text-xl" : "text-base"} font-medium text-[#e3d6e9] mb-6`}> {/* Reduced text size */}
              {t('faq.subtitle')}
            </p>
            
            <FaqSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder={t('faq.search')}
            />
          </div>

          <div className="w-4/5 mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-fuchsia-500/20 to-purple-600/20 rounded-2xl blur-lg"></div>
            <div className="relative bg-black/20 backdrop-blur-xl rounded-2xl border border-purple-300/30 p-6 shadow-2xl shadow-purple-500/20">
              <FaqTabs 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                faqCategories={translatedCategories}
                faqsByCategory={translatedFaqsByCategory}
                numbered={true}
                searchQuery={searchQuery}
                accentTextColor="#4db74d"
                headerBgColor="#71037c"
                marginBottom=""
                textSizeClass="text-sm md:text-base" // Reduced text size
                answerTextSizeClass="text-xs md:text-sm" // Reduced answer text size
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
