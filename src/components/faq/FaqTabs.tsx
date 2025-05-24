
import React, { useMemo, useState } from "react";
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
  hideTabsList?: boolean;
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
  textSizeClass = "text-xs md:text-sm",
  answerTextSizeClass = "text-[0.7rem] md:text-xs",
  hideTabsList = false
}: FaqTabsProps) {
  const isMobile = useIsMobile();
  const [searchResults, setSearchResults] = useState<Record<string, FaqItem[]>>({});

  // Modified getFilteredFaqs to return all faqs that match the query from all categories
  const getFilteredFaqs = (categoryId: string) => {
    if (!searchQuery) return faqsByCategory[categoryId as keyof typeof faqsByCategory] || [];
    return (faqsByCategory[categoryId as keyof typeof faqsByCategory] || []).filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Get all matching FAQs across all categories when searching
  const getAllSearchResults = useMemo(() => {
    if (!searchQuery) return {};
    const results: Record<string, FaqItem[]> = {};
    faqCategories.forEach(category => {
      const filteredFaqs = getFilteredFaqs(category.id);
      if (filteredFaqs.length > 0) {
        results[category.id] = filteredFaqs;
      }
    });
    return results;
  }, [faqCategories, faqsByCategory, searchQuery]);

  // Check if there are any search results across all categories
  const hasSearchResults = searchQuery ? Object.values(getAllSearchResults).some(results => results.length > 0) : true;

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

  // If there's a search query, show all matching results from all categories
  // regardless of which tab is active
  const searchResultsView = searchQuery && (
    <div className="animate-fade-in">
      {Object.entries(getAllSearchResults).map(([categoryId, faqs]) => {
        const category = faqCategories.find(cat => cat.id === categoryId);
        if (!faqs.length) return null;

        return (
          <div key={categoryId} className="mb-6">
            <div className="mb-2">
              <h3 className="text-[#FFF9B0] text-sm font-medium border-b border-[#FFF9B0]/30 pb-1">
                Results in {category?.name || categoryId}
              </h3>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqs.map((faq, index) => {
                const startIndex = categoryStartIndices[categoryId] || 1;
                const questionNumber = startIndex + index;
                return (
                  <AccordionItem key={index} value={`search-${categoryId}-${index}`} className="overflow-hidden border-none shadow-xl">
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-[#996515] rounded-t-xl border-l-6 border-[#FFF9B0] hover:bg-[#996515]/80 transition-all duration-300">
                      <div className={`text-[#FFF9B0] font-bold ${textSizeClass}`}>
                        {numbered ? `${questionNumber}. ` : ''}{faq.question}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
                      <p className={`text-[#FFF9B0] ${answerTextSizeClass} leading-relaxed`}>
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        );
      })}
    </div>
  );

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className={`w-full ${marginBottom} ${className}`}>
      {!hideTabsList && !searchQuery && (
        <div className="flex justify-center mb-4">
          <TabsList className="flex flex-wrap justify-center gap-1 p-1 bg-[#996515]/50 rounded-xl border border-fuchsia-500/30 backdrop-blur-md">
            {faqCategories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id} 
                className="px-2 uppercase whitespace-nowrap bg-gradient-to-r from-[#996515] to-[#996515] text-white shadow-md hover:shadow-fuchsia-500/20 hover:scale-105 transition-all duration-200 border border-fuchsia-600/20 font-normal text-base text-justify rounded-lg py-0"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      )}
      
      {!hasSearchResults && (
        <div className="text-center py-10 glass-card rounded-xl mb-8">
          <p className="text-[#e3d6e9] text-xl">No FAQs found matching "{searchQuery}"</p>
          <p className="text-[#e3d6e9] text-base mt-2">Try different keywords or clear your search</p>
        </div>
      )}
      
      {/* Show search results from all categories when searching */}
      {searchQuery ? searchResultsView :
        // Show normal tabs when not searching
        faqCategories.map(category => {
          const filteredFaqs = getFilteredFaqs(category.id);
          const startIndex = categoryStartIndices[category.id];

          return (
            <TabsContent key={category.id} value={category.id} className="customer-text animate-fade-in">
              {/* Increased vertical spacing between menu and questions for mobile */}
              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className={`w-full space-y-3 ${isMobile ? "mt-24" : ""}`}>
                  {filteredFaqs.map((faq, index) => {
                    const questionNumber = startIndex + index;
                    return (
                      <AccordionItem key={index} value={`${category.id}-${index}`} className="overflow-hidden border-none shadow-xl">
                        <AccordionTrigger className="px-6 text-left hover:no-underline bg-[#996515] rounded-t-xl border-l-6 border-[#FFF9B0] hover:bg-[#996515]/80 transition-all duration-300 mx-0 text-lg font-bold py-[5px] my-[13px]">
                          <div className={`text-[#FFF9B0] font-bold ${textSizeClass}`}>
                            {numbered ? `${questionNumber}. ` : ''}{faq.question}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 py-4 bg-[#560365]/90 backdrop-blur-md rounded-b-xl border-l-6 border-[#FFF9B0]/50">
                          <p className={`text-[#FFF9B0] ${answerTextSizeClass} leading-relaxed`}>
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
        })
      }
    </Tabs>
  );
}
