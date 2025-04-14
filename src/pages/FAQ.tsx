
import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { BenefitsList } from "@/components/faq/BenefitsList";
import { FaqTabs } from "@/components/faq/FaqTabs";
import { benefitsList, faqCategories, faqsByCategory } from "@/components/faq/faqData";

export default function FAQ() {
  const [activeTab, setActiveTab] = useState("general");
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-5xl mx-auto px-4 py-12">
          <BenefitsList benefits={benefitsList} />
          
          <div className="text-center mb-20"> {/* Increased bottom margin from mb-16 to mb-20 */}
            <h1 className={`
              ${isMobile ? "text-6xl" : "text-5xl md:text-6xl"} 
              font-bold mb-6 text-gradient text-[#eedbf7] glow 
              animate-text-slow tracking-tight leading-tight
            `}>
              Frequently Asked Questions
            </h1>
            <p className={`${isMobile ? "text-2xl" : "text-xl"} font-medium text-[#e3d6e9] mb-4`}>
              Find answers to common questions
            </p>
          </div>

          <FaqTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            faqCategories={faqCategories}
            faqsByCategory={faqsByCategory}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
