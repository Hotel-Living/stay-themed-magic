import React, { useMemo } from "react";
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

interface FaqTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  faqCategories: FaqCategory[];
  faqsByCategory: Record<string, FaqItem[]>;
  numbered?: boolean;
  searchQuery?: string;
  className?: string;
  accentTextColor?: string;
  headerBgColor?: string;
  contentBgColor?: string;
  marginBottom?: string;
  textSizeClass?: string;
  answerTextSizeClass?: string;
}

export function FaqTabs({ 
  activeTab, 
  setActiveTab, 
  faqCategories, 
  faqsByCategory,
  numbered = false,
  searchQuery = "",
  className = "",
  accentTextColor = "#56cc41",
  headerBgColor = "#6a037c",
  contentBgColor = "#5A0363",
  marginBottom = "mb-20",
  textSizeClass = "text-xl md:text-2xl",
  answerTextSizeClass = "text-base md:text-lg"
}: FaqTabsProps) {
  const isMobile = useIsMobile();

  const getFilteredFaqs = (categoryId: string) => {
    if (!searchQuery) return faqsByCategory[categoryId as keyof typeof faqsByCategory] || [];
    
    return (faqsByCategory[categoryId as keyof typeof faqsByCategory] || []).filter(
      faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const hasSearchResults = searchQuery ? 
    faqCategories.some(category => getFilteredFaqs(category.id).length > 0) : true;

  const categoryStartIndices = useMemo(() => {
    const indices: Record<string, number> = {};
    let currentIndex = 1;

    for (const category of faqCategories) {
      indices[category.id] = currentIndex;
      if (!searchQuery) {
        currentIndex += (faqsByCategory[category.id] || []).length;
      }
    }

    return indices;
  }, [faqCategories, faqsByCategory, searchQuery]);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className={`w-full ${marginBottom} ${className}`}>
      <div className="flex justify-center mb-8">
        <TabsList className="flex flex-wrap justify-center gap-3 p-3 bg-[#460F54]/50 rounded-xl border border-fuchsia-500/30 backdrop-blur-md">
          {faqCategories.map(category => (
            <TabsTrigger 
              key={category.id} 
              value={category.id} 
              className="px-4 py-2 rounded-lg capitalize whitespace-nowrap text-base font-bold bg-gradient-to-r from-[#730483] to-[#570366] text-white shadow-md hover:shadow-fuchsia-500/20 hover:scale-105 transition-all duration-200 border border-fuchsia-600/20"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      
      {!hasSearchResults && (
        <div className="text-center py-10 glass-card rounded-xl mb-8">
          <p className="text-[#e3d6e9] text-xl">No FAQs found matching "{searchQuery}"</p>
          <p className="text-[#e3d6e9] text-base mt-2">Try different keywords or clear your search</p>
        </div>
      )}
      
      {faqCategories.map(category => {
        const filteredFaqs = getFilteredFaqs(category.id);
        const startIndex = categoryStartIndices[category.id];
        
        return (
          <TabsContent key={category.id} value={category.id} className="customer-text animate-fade-in">
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full space-y-5">
                {filteredFaqs.map((faq, index) => {
                  const questionNumber = searchQuery ? startIndex + index : startIndex + index;
                  
                  return (
                    <AccordionItem 
                      key={index} 
                      value={`${category.id}-${index}`} 
                      className="overflow-hidden border-none shadow-2xl"
                    >
                      <AccordionTrigger 
                        className="px-8 py-6 text-left hover:no-underline bg-gradient-to-r from-[#730483] to-[#570366] rounded-t-xl border-l-6 border-[#FFF9B0] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300"
                      >
                        <h2 className={`text-[#FFF9B0] font-bold ${textSizeClass}`}>
                          {numbered ? `${questionNumber}. ` : ''}{faq.question}
                        </h2>
                      </AccordionTrigger>
                      <AccordionContent className="px-8 py-6 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
                        <p className={`text-[#FFF9B0] ${answerTextSizeClass} leading-relaxed`}>
                          {faq.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            ) : searchQuery ? (
              <div className="text-center py-8 glass-card rounded-xl">
                <p className="text-[#e3d6e9] text-lg">No FAQs found in this category</p>
              </div>
            ) : null}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
