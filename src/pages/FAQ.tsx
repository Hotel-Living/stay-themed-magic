
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
          
          <h1 className={`${isMobile ? "text-4xl" : "text-3xl md:text-4xl"} font-bold mb-6 text-center text-gradient text-[#eedbf7]`}>
            Frequently Asked Questions
          </h1>
          <p className={`${isMobile ? "text-xl" : "text-lg"} text-center mb-12 font-medium text-[#e3d6e9]`}>
            Find answers to common questions
          </p>

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
