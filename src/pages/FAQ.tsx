
import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { BenefitsList } from "@/components/faq/BenefitsList";
import { FaqTabs } from "@/components/faq/FaqTabs";
import { FaqSearch } from "@/components/faq/FaqSearch";
import { benefitsList, faqCategories, faqsByCategory } from "@/components/faq/faqData";

export default function FAQ() {
  const [activeTab, setActiveTab] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      
      <main className="flex-1 pt-16 bg-gradient-to-b from-[#570366]/40 to-transparent">
        <div className="container max-w-5xl mx-auto px-4 py-12">
          <BenefitsList benefits={benefitsList} />
          
          <div className="text-center mb-12">
            <h1 className={`
              ${isMobile ? "text-5xl" : "text-4xl md:text-5xl"} 
              font-bold mb-6 text-[#eedbf7] glow 
              tracking-tight leading-tight
            `}>
              Frequently Asked Questions
            </h1>
            <p className={`${isMobile ? "text-2xl" : "text-xl"} font-medium text-[#e3d6e9] mb-8`}>
              Find answers to common questions
            </p>
            
            <FaqSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="Search all FAQs..."
            />
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
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
