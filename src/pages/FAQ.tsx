import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { FaqTabs } from "@/components/faq/FaqTabs";
import { FaqSearch } from "@/components/faq/FaqSearch";
import { useFaqData } from "@/components/faq/faqData";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { BenefitsHeader } from "@/components/faq/BenefitsHeader";
import { WhyHotelLivingSection } from "@/components/faq/WhyHotelLivingSection";
import { useTranslation } from "@/hooks/useTranslation";
export default function FAQ() {
  const [activeTab, setActiveTab] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();
  const {
    t
  } = useTranslation();
  const {
    translatedCategories,
    translatedFaqsByCategory
  } = useFaqData();
  return <div className="min-h-screen flex flex-col relative">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 pt-16 bg-gradient-to-b from-[#570366]/40 to-transparent">
        <div className="container max-w-5xl mx-auto px-4 py-6">
          <WhyHotelLivingSection />
          
          <BenefitsHeader />
          
          {/* Second title - Frequently Asked Questions */}
          <div className="text-center mb-6">
            
            
            
            <FaqSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder={t('faq.search')} />
          </div>

          <FaqTabs activeTab={activeTab} setActiveTab={setActiveTab} faqCategories={translatedCategories} faqsByCategory={translatedFaqsByCategory} numbered={true} searchQuery={searchQuery} textSizeClass="text-base md:text-lg" answerTextSizeClass="text-sm md:text-base" marginBottom={isMobile ? "mb-10" : "mb-20"} />
        </div>
      </main>
      
      <Footer />
    </div>;
}