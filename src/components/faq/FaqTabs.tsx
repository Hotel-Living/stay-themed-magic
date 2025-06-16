
import React, { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface FaqTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  faqCategories: Array<{ id: string; label?: string; name?: string }>;
  faqsByCategory: Record<string, Array<{ question: string; answer: string }>>;
  numbered?: boolean;
  searchQuery?: string;
  accentTextColor?: string;
  headerBgColor?: string;
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
  accentTextColor = "#4db74d",
  headerBgColor = "#71037c",
  marginBottom = "mb-20",
  textSizeClass = "text-base md:text-lg",
  answerTextSizeClass = "text-sm md:text-base",
  hideTabsList = false
}: FaqTabsProps) {
  const isMobile = useIsMobile();
  const [openItems, setOpenItems] = useState<Record<string, Set<number>>>(
    faqCategories.reduce((acc, category) => {
      acc[category.id] = new Set<number>();
      return acc;
    }, {} as Record<string, Set<number>>)
  );

  const toggleItem = (categoryId: string, index: number) => {
    setOpenItems(prev => {
      const newOpenItems = { ...prev };
      const categoryOpenItems = new Set(prev[categoryId] || new Set<number>());
      
      if (categoryOpenItems.has(index)) {
        categoryOpenItems.delete(index);
      } else {
        categoryOpenItems.add(index);
      }
      
      newOpenItems[categoryId] = categoryOpenItems;
      return newOpenItems;
    });
  };

  const filterFaqs = (faqs: Array<{ question: string; answer: string }>) => {
    if (!searchQuery) return faqs;
    return faqs.filter(
      faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getCategoryLabel = (category: { id: string; label?: string; name?: string }) => {
    return category.label || category.name || category.id;
  };

  return (
    <div className={marginBottom}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {!hideTabsList && (
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} mb-6`}>
            {faqCategories.slice(0, isMobile ? 4 : 8).map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs">
                {getCategoryLabel(category)}
              </TabsTrigger>
            ))}
          </TabsList>
        )}
        
        {faqCategories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="space-y-4">
              {filterFaqs(faqsByCategory[category.id] || []).map((faq, index) => (
                <Collapsible 
                  key={index}
                  open={openItems[category.id]?.has(index) || false}
                  onOpenChange={() => toggleItem(category.id, index)}
                >
                  <div className="border border-purple-700/30 rounded-lg bg-purple-900/20">
                    <CollapsibleTrigger className="w-full p-4 text-left flex items-center justify-between hover:bg-purple-800/20 transition-colors">
                      <h3 
                        className={`font-semibold text-[#e3d6e9] ${textSizeClass}`}
                        style={{ color: accentTextColor }}
                      >
                        {numbered ? `${index + 1}. ` : ""}{faq.question}
                      </h3>
                      <ChevronDown 
                        className={`h-4 w-4 text-purple-300 transition-transform ${
                          openItems[category.id]?.has(index) ? 'rotate-180' : 'rotate-0'
                        }`} 
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4">
                      <p className={`text-white leading-relaxed ${answerTextSizeClass}`}>
                        {faq.answer}
                      </p>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
