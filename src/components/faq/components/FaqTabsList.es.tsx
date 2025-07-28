
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaqCategory } from "../types";

interface FaqTabsListESProps {
  faqCategories: FaqCategory[];
}

export function FaqTabsListES({ faqCategories }: FaqTabsListESProps) {
  return (
    <div className="flex justify-center mb-0 overflow-x-auto">
      <TabsList className="flex flex-nowrap justify-center gap-2 sm:gap-6 p-2 sm:p-4 bg-[#6804A3] rounded-none border-none shadow-none w-full min-w-max">
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
              className="px-2 sm:px-5 py-2 sm:py-4 uppercase whitespace-pre-line text-center bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-white text-white hover:bg-transparent hover:text-white transition-all duration-200 rounded-none text-[10px] sm:text-xs font-bold tracking-wide flex-shrink-0 min-w-0 border-none"
            >
              {displayName}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </div>
  );
}
