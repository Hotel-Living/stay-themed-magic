
import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { FaqTabs } from "@/components/faq/FaqTabs";
import { FaqSearch } from "@/components/faq/FaqSearch";
import { faqCategories, faqsByCategory } from "@/components/faq/faqData";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { BenefitsHeader } from "@/components/faq/BenefitsHeader";
import { WhyHotelLivingSection } from "@/components/faq/WhyHotelLivingSection";

export default function FAQ() {
  const [activeTab, setActiveTab] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col relative">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 pt-16 bg-gradient-to-b from-[#570366]/40 to-transparent">
        <div className="container max-w-5xl mx-auto px-4 py-6">
          <WhyHotelLivingSection />
          
          {/* Two highlighted boxes with slogans */}
          <div className={`grid ${isMobile ? "grid-cols-1 gap-4" : "grid-cols-2 gap-6"} mb-12`}>
            {/* Left box */}
            <div className="bg-gradient-to-br from-[#8017B0]/80 to-[#5A0363]/80 backdrop-blur-md border border-fuchsia-500/30 rounded-xl p-6 shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center text-white">
                  <span className="text-lg mr-3">🏨</span>
                  <span className="text-sm font-medium">Hotels need people</span>
                </div>
                <div className="flex items-center text-white">
                  <span className="text-lg mr-3">👥</span>
                  <span className="text-sm font-medium">People need better living</span>
                </div>
                <div className="flex items-center text-white">
                  <span className="text-lg mr-3">🌐</span>
                  <span className="text-sm font-medium">Society needs an update</span>
                </div>
                <div className="flex items-center text-white">
                  <span className="text-lg mr-3">💡</span>
                  <span className="text-sm font-medium">All need Hotel Living</span>
                </div>
              </div>
            </div>
            
            {/* Right box */}
            <div className="bg-gradient-to-br from-[#8017B0]/80 to-[#5A0363]/80 backdrop-blur-md border border-fuchsia-500/30 rounded-xl p-6 shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center text-white">
                  <span className="text-lg mr-3">🛏️</span>
                  <span className="text-sm font-medium">5 billion hotel nights need to be full</span>
                </div>
                <div className="flex items-center text-white">
                  <span className="text-lg mr-3">👨‍👩‍👧‍👦</span>
                  <span className="text-sm font-medium">400 million people need better living</span>
                </div>
                <div className="flex items-center text-white">
                  <span className="text-lg mr-3">🔁</span>
                  <span className="text-sm font-medium">Society keeps repeating the past</span>
                </div>
                <div className="flex items-center text-white">
                  <span className="text-lg mr-3">🚀</span>
                  <span className="text-sm font-medium">Hotel Living changes that</span>
                </div>
              </div>
            </div>
          </div>
          
          <BenefitsHeader />
          
          {/* Second title - Frequently Asked Questions */}
          <div className="text-center mb-6">
            <div className="flex justify-center">
              <h1 className={`
                ${isMobile ? "text-2xl" : "text-3xl md:text-4xl"} 
                font-bold mb-4 text-[#eedbf7] glow 
                tracking-tight leading-tight
                bg-[#8017B0] py-2 px-8 rounded-lg inline-block
              `}>
                Frequently Asked Questions
              </h1>
            </div>
            <p className={`${isMobile ? "text-xl" : "text-base"} font-medium text-[#e3d6e9] mb-6`}>
              Find answers to common questions
            </p>
            
            <FaqSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Search all FAQs..." />
          </div>

          <FaqTabs 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            faqCategories={faqCategories} 
            faqsByCategory={faqsByCategory} 
            numbered={true} 
            searchQuery={searchQuery} 
            textSizeClass="text-base md:text-lg" 
            answerTextSizeClass="text-sm md:text-base" 
            marginBottom={isMobile ? "mb-10" : "mb-20"} 
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
