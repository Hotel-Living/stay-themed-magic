import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { FaqItem, FaqCategory } from "../types";
interface FaqTabContentProps {
  category: FaqCategory;
  filteredFaqs: FaqItem[];
  startIndex: number;
  numbered: boolean;
  textSizeClass: string;
  answerTextSizeClass: string;
}
export function FaqTabContent({
  category,
  filteredFaqs,
  startIndex,
  numbered,
  textSizeClass,
  answerTextSizeClass
}: FaqTabContentProps) {
  const isMobile = useIsMobile();
  return <TabsContent key={category.id} value={category.id} className="customer-text animate-fade-in">
      {filteredFaqs.length > 0 ? <Accordion type="multiple" className={`w-full space-y-3 ${isMobile ? "mt-24" : ""}`}>
          {filteredFaqs.map((faq, index) => {
        const questionNumber = startIndex + index;
        return <AccordionItem key={index} value={`${category.id}-${index}`} className="overflow-hidden border-none shadow-xl">
                
                <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
                  <p className={`text-[#FFF9B0] ${answerTextSizeClass} leading-relaxed`}>
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>;
      })}
        </Accordion> : null}
    </TabsContent>;
}