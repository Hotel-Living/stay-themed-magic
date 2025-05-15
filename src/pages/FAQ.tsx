
import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { BenefitsList } from "@/components/faq/BenefitsList";
import { FaqTabs } from "@/components/faq/FaqTabs";
import { FaqSearch } from "@/components/faq/FaqSearch";
import { benefitsList, faqCategories, faqsByCategory } from "@/components/faq/faqData";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
export default function FAQ() {
  const [activeTab, setActiveTab] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();
  return <div className="min-h-screen flex flex-col relative">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 pt-16 bg-gradient-to-b from-[#570366]/40 to-transparent">
        <div className="container max-w-5xl mx-auto px-4 py-6">
          <div className="space-y-4 mb-16">
            <div className="flex justify-center">
              {/* Reduced vertical spacing above by 50% (pt-2 instead of pt-4) for mobile */}
              <h2 className={`text-center font-bold ${isMobile ? "text-2xl mb-5" : "text-4xl mb-10"} text-[#FFF9B0] tracking-tight uppercase bg-[#8017B0] py-2 px-6 rounded-lg inline-block mx-auto`}>Step Into a New World of Benefits </h2>
            </div>
            {/* Doubled vertical spacing below the main line for mobile with mt-6 */}
            <div className={`space-y-3 max-w-3xl mx-auto ${isMobile ? "mt-6" : ""}`}>
              {benefitsList.map((benefit, index) => <div key={index} className="bg-[#FFC700] py-2 px-4 rounded-lg ml-0 max-w-fit text-left">
                  <p className={`text-[#8017B0] ${isMobile ? "text-xl" : "text-base"} font-bold`}>{benefit}</p>
                </div>)}
            </div>
          </div>
          
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
    </div>;
}
