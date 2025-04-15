
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
  textSizeClass = "text-lg md:text-xl",
  answerTextSizeClass = "text-sm md:text-base"
}: FaqTabsProps) {
  const isMobile = useIsMobile();

  // Filter FAQs based on search query
  const getFilteredFaqs = (categoryId: string) => {
    if (!searchQuery) return faqsByCategory[categoryId as keyof typeof faqsByCategory] || [];
    
    return (faqsByCategory[categoryId as keyof typeof faqsByCategory] || []).filter(
      faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Check if any FAQs match the search query in any category
  const hasSearchResults = searchQuery ? 
    faqCategories.some(category => getFilteredFaqs(category.id).length > 0) : true;

  // Calculate question number start index for each category
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
      <TabsList className={`w-full flex justify-center overflow-x-auto py-2 px-1 bg-muted/20 rounded-xl mb-6 gap-2`}>
        {faqCategories.map(category => (
          <TabsTrigger 
            key={category.id} 
            value={category.id} 
            className={`px-4 py-1.5 rounded-lg capitalize whitespace-nowrap text-sm md:text-base bg-[#730483] text-white`}
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {!hasSearchResults && (
        <div className="text-center py-8 bg-[#5A0363]/20 rounded-lg">
          <p className="text-[#e3d6e9] text-lg">No FAQs found matching "{searchQuery}"</p>
          <p className="text-[#e3d6e9] text-sm mt-2">Try different keywords or clear your search</p>
        </div>
      )}
      
      {faqCategories.map(category => {
        const filteredFaqs = getFilteredFaqs(category.id);
        const startIndex = categoryStartIndices[category.id];
        
        return (
          <TabsContent key={category.id} value={category.id} className="customer-text">
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full space-y-2">
                {filteredFaqs.map((faq, index) => {
                  // Use the start index for the category + current index within filtered results
                  // When searching, maintain the original numbering
                  const questionNumber = searchQuery ? startIndex + index : startIndex + index;
                  
                  return (
                    <AccordionItem 
                      key={index} 
                      value={`${category.id}-${index}`} 
                      className="glass-card rounded-lg overflow-hidden border-none"
                    >
                      <AccordionTrigger 
                        className={`px-4 py-3 text-left hover:no-underline text-[${accentTextColor}] bg-[#FFF9B0]/90 ${textSizeClass}`}
                      >
                        <h2 className={`text-[#460F54] font-bold ${textSizeClass}`}>
                          {numbered ? `${questionNumber}. ` : ''}{faq.question}
                        </h2>
                      </AccordionTrigger>
                      <AccordionContent className={`px-4 pb-4 pt-4 bg-[#FFF9B0]/40`}>
                        <p className={`text-slate-900 ${answerTextSizeClass}`}>
                          {faq.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            ) : searchQuery ? (
              <div className="text-center py-8 bg-[#5A0363]/20 rounded-lg">
                <p className="text-[#e3d6e9] text-lg">No FAQs found in this category</p>
              </div>
            ) : null}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
