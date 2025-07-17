
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaqCategory } from "../types";

interface FaqTabsListESProps {
  faqCategories: FaqCategory[];
}

export function FaqTabsListES({ faqCategories }: FaqTabsListESProps) {
  return (
    <div className="flex justify-center mb-8">
      <TabsList className="flex flex-nowrap justify-center gap-6 p-4 bg-gradient-to-r from-purple-500/20 via-violet-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg w-full max-w-6xl">
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
              className="px-5 py-4 uppercase whitespace-pre-line text-center bg-purple-800 data-[state=active]:bg-purple-900 data-[state=active]:text-white text-white hover:bg-purple-700 hover:text-white transition-all duration-200 rounded-xl text-xs font-bold tracking-wide backdrop-blur-sm flex-1 min-w-0 border border-purple-600"
            >
              {displayName}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </div>
  );
}
