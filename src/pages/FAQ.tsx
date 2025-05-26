
import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { BenefitsList } from "@/components/faq/BenefitsList";
import { FaqTabs } from "@/components/faq/FaqTabs";
import { FaqSearch } from "@/components/faq/FaqSearch";
import { benefitsList, faqCategories, faqsByCategory } from "@/components/faq/faqData";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function FAQ() {
  const [activeTab, setActiveTab] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeAccordionTab, setActiveAccordionTab] = useState("still-renting");
  const isMobile = useIsMobile();

  const accordionOptions = [
    { id: "still-renting", label: "STILL RENTING?" },
    { id: "retired", label: "RETIRED?" },
    { id: "online-worker", label: "ONLINE WORKER?" },
    { id: "digital-nomad", label: "DIGITAL NOMAD?" },
    { id: "commuter", label: "COMMUTER?" },
    { id: "free-soul", label: "A FREE SOUL?" }
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 pt-16 bg-gradient-to-b from-[#570366]/40 to-transparent">
        <div className="container max-w-5xl mx-auto px-4 py-6">
          <div className="space-y-4 mb-16">
            <div className="flex justify-center">
              <h2 className={`text-center font-bold ${isMobile ? "text-2xl" : "text-4xl mb-10"} text-[#FFF9B0] tracking-tight uppercase bg-[#8017B0] py-2 px-6 rounded-lg inline-block mx-auto`}>
                Step Into a New World of Benefits
              </h2>
            </div>
            <div className={`space-y-3 max-w-3xl mx-auto flex flex-col items-center ${isMobile ? "mt-12" : ""}`}>
              {benefitsList.map((benefit, index) => (
                <div key={index} className="bg-[#FFC700] py-2 px-4 text-center my-[12px] rounded-xl">
                  <p className={`text-[#8017B0] ${isMobile ? "text-xl" : "text-base"} font-bold`}>{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Duplicate "Frequently Asked Questions" slogan */}
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
          </div>

          {/* Horizontal Accordion Menu */}
          <div className="mb-8">
            <Tabs value={activeAccordionTab} onValueChange={setActiveAccordionTab} className="w-full">
              <TabsList className={`grid w-full ${isMobile ? "grid-cols-2 gap-1" : "grid-cols-6"} bg-[#8017B0]/20`}>
                {accordionOptions.map((option) => (
                  <TabsTrigger 
                    key={option.id} 
                    value={option.id}
                    className={`${isMobile ? "text-xs px-2 py-2" : "text-sm px-3 py-2"} font-bold text-white`}
                  >
                    {option.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {accordionOptions.map((option) => (
                <TabsContent key={option.id} value={option.id} className="mt-4">
                  <div className="bg-[#8017B0]/10 p-6 rounded-lg border border-[#8017B0]/30">
                    <p className="text-white text-center">
                      Content for {option.label} will be populated later.
                    </p>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
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
    </div>
  );
}
