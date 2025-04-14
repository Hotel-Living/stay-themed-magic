
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  name: string;
}

interface FaqTravelersTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  faqCategories: FaqCategory[];
  faqsByCategory: Record<string, FaqItem[]>;
}

export function FaqTravelersTabs({ 
  activeTab, 
  setActiveTab, 
  faqCategories, 
  faqsByCategory 
}: FaqTravelersTabsProps) {
  const isMobile = useIsMobile();

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className={`w-full flex justify-start overflow-x-auto py-2 px-1 bg-muted/20 rounded-xl mb-6 gap-1 ${isMobile ? "text-lg" : ""}`}>
        {faqCategories.map(category => (
          <TabsTrigger 
            key={category.id} 
            value={category.id} 
            className={`px-4 py-1.5 rounded-lg capitalize whitespace-nowrap ${isMobile ? "text-lg" : "text-sm"} bg-[#730483] text-white`}
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {faqCategories.map(category => (
        <TabsContent key={category.id} value={category.id} className="customer-text">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqsByCategory[category.id as keyof typeof faqsByCategory].map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`${category.id}-${index}`} 
                className="glass-card rounded-lg overflow-hidden border-none"
              >
                <AccordionTrigger 
                  className={`px-4 py-3 text-left hover:no-underline text-[#56cc41] bg-[#6a037c] ${isMobile ? "text-lg" : "text-xl"}`}
                >
                  <h2 className={`text-[#f8faf8] font-bold ${isMobile ? "text-2xl" : "text-lg"}`}>
                    {faq.question}
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-4 bg-[#5A0363]">
                  <p className={`text-slate-50 ${isMobile ? "text-lg" : ""}`}>
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      ))}
    </Tabs>
  );
}
