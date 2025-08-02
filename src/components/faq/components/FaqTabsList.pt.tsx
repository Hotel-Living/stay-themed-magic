
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaqCategory } from "../types";
import { useIsMobile } from "@/hooks/use-mobile";

interface FaqTabsListPTProps {
  faqCategories: FaqCategory[];
}

export function FaqTabsListPT({ faqCategories }: FaqTabsListPTProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex justify-center mb-3">
      <TabsList className={`${isMobile ? "grid grid-cols-3 gap-2 w-full" : "flex flex-nowrap justify-center gap-2"} p-2 bg-gradient-to-r from-purple-500/20 via-violet-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg ${!isMobile ? "w-4/5" : ""}`}>
        {faqCategories.map(category => {
          // Add line breaks for long category names
          let displayName = category.name;
          if (category.name === "Durante a sua estadia") {
            displayName = "DURANTE\nSUA ESTADIA";
          } else if (category.name === "Nômades Digitais?") {
            displayName = "NÔMADES\nDIGITAIS";
          } else if (category.name === "Detalhes Práticos?") {
            displayName = "DETALHES\nPRÁTICOS";
          }
          
          return (
            <TabsTrigger 
              key={category.id} 
              value={category.id} 
              className={`${isMobile ? "px-1 py-1 text-[2px] leading-[1.1]" : "px-4 py-3 text-[6px]"} uppercase text-center bg-purple-800 data-[state=active]:bg-purple-900 data-[state=active]:text-white text-white hover:bg-purple-700 hover:text-white transition-all duration-200 rounded-xl font-bold tracking-wide backdrop-blur-sm ${!isMobile ? "flex-1" : ""} min-w-0 border border-purple-600`}
              style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', ...(isMobile && { lineHeight: '1.2em' }) }}
            >
              {displayName}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </div>
  );
}
