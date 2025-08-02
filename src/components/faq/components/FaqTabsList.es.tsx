
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaqCategory } from "../types";
import { useIsMobile } from "@/hooks/use-mobile";

interface FaqTabsListESProps {
  faqCategories: FaqCategory[];
}

export function FaqTabsListES({ faqCategories }: FaqTabsListESProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex justify-center mb-8 overflow-x-auto">
      <TabsList className={`${isMobile ? "grid grid-cols-3 gap-2 w-full" : "flex flex-wrap justify-center gap-3"} p-2 sm:p-4 bg-[#6804A3] rounded-none border-none shadow-none ${!isMobile ? "w-full min-w-max" : ""}`}>
        {faqCategories.map(category => {
          // Add line breaks for long category names
          let displayName = category.name;
          if (category.name === "Durante tu estancia") {
            displayName = "DURANTE\nTU ESTANCIA";
          } else if (category.name === "¿Nómadas Digitales?") {
            displayName = "NÓMADAS\nDIGITALES";
          } else if (category.name === "¿Detalles Prácticos?") {
            displayName = "DETALLES\nPRÁCTICOS";
          }
          
          return (
            <TabsTrigger 
              key={category.id} 
              value={category.id} 
              className={`faq-button faq-button ${isMobile ? "px-1 py-1 text-[8px] leading-[1.1] flex-1" : "min-w-[120px] h-[40px] px-2 sm:px-5 py-2 sm:py-4 text-[10px] sm:text-[12px]"} uppercase text-center bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-white text-white hover:bg-transparent hover:text-white transition-all duration-200 rounded-none font-bold tracking-wide ${!isMobile ? "flex-shrink-0" : ""} min-w-0 border-none`}
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
