
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
    <div className="flex justify-center mb-4 overflow-x-auto">
      <div className={`${isMobile ? "grid grid-cols-3 gap-2 w-full" : "w-full max-w-4xl"}`}>
        <TabsList className={`${isMobile ? "contents" : "flex flex-wrap justify-center gap-3 mb-2"} p-2 sm:p-4 bg-[#6804A3] rounded-none border-none shadow-none`}>
          {faqCategories.map((category, index) => {
            // Add line breaks for long category names
            let displayName = category.name;
            if (category.name === "Durante tu estancia") {
              displayName = "DURANTE\nTU ESTANCIA";
            } else if (category.name === "¿Nómadas Digitales?") {
              displayName = "NÓMADAS\nDIGITALES";
            } else if (category.name === "¿Detalles Prácticos?") {
              displayName = "DETALLES\nPRÁCTICOS";
            }
            
            // For desktop: Force line break after 5th item (index 4)
            const shouldBreak = !isMobile && index === 5;
            
            return (
              <React.Fragment key={category.id}>
                {shouldBreak && <div className="w-full h-0"></div>}
                <TabsTrigger 
                  value={category.id} 
                  className={`faq-button faq-button ${isMobile ? "px-1 py-1 text-[8px] leading-[1.1]" : "min-w-[120px] h-[40px] px-2 sm:px-5 py-2 sm:py-4 text-[10px] sm:text-[12px]"} uppercase text-center bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-white text-white hover:bg-transparent hover:text-white transition-all duration-200 rounded-none font-bold tracking-wide min-w-0 border-none`}
                  style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', ...(isMobile && { lineHeight: '1.2em' }) }}
                >
                  {displayName}
                </TabsTrigger>
              </React.Fragment>
            );
          })}
        </TabsList>
      </div>
    </div>
  );
}
