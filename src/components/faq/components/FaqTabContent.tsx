
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

  return (
    <TabsContent key={category.id} value={category.id} className="customer-text animate-fade-in">
      {filteredFaqs.length > 0 ? (
        <Accordion type="multiple" className={`w-full space-y-3 ${isMobile ? "mt-24" : ""}`}>
          {filteredFaqs.map((faq, index) => {
            const questionNumber = startIndex + index;
            return (
              <AccordionItem key={index} value={`${category.id}-${index}`} className="overflow-hidden border-none shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 group">
                <AccordionTrigger className="px-6 text-left hover:no-underline bg-gradient-to-r from-[#6A2089] to-[#8B3A9C] rounded-t-xl border-l-4 border-purple-300 hover:border-purple-200 hover:from-[#7A2499] hover:to-[#9B4AAC] transition-all duration-300 mx-0 text-base font-bold py-4 my-2 shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] group-hover:glow">
                  <div className={`text-white font-bold ${textSizeClass} drop-shadow-sm`}>
                    {numbered ? `${questionNumber}. ` : ''}{faq.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-5 bg-gradient-to-b from-[#6A2089]/95 to-[#6A2089]/85 backdrop-blur-sm rounded-b-xl border-l-4 border-purple-300/60 shadow-inner">
                  <p className={`text-purple-50 ${answerTextSizeClass} leading-relaxed drop-shadow-sm`}>
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      ) : null}
    </TabsContent>
  );
}
