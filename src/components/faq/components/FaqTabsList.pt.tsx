
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaqCategory } from "../types";

interface FaqTabsListPTProps {
  faqCategories: FaqCategory[];
}

export function FaqTabsListPT({ faqCategories }: FaqTabsListPTProps) {
  return (
    <div className="flex justify-center mb-6">
      <TabsList className="flex flex-nowrap justify-center gap-1 p-3 bg-gradient-to-r from-violet-600/90 via-purple-600/90 to-fuchsia-600/90 rounded-full border border-violet-300/60 backdrop-blur-lg shadow-2xl shadow-violet-400/40 glow-effect w-4/5">
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
              className="px-3 py-2 uppercase whitespace-pre-line text-center bg-gradient-to-br from-white/20 to-white/10 data-[state=active]:from-white data-[state=active]:to-violet-50 data-[state=active]:text-violet-700 text-white shadow-md hover:shadow-violet-300/50 hover:scale-105 transition-all duration-300 border border-white/30 hover:border-white/60 rounded-2xl text-[10px] font-bold tracking-wide hover:from-white/30 hover:to-white/20 backdrop-blur-sm flex-1 min-w-0"
            >
              {displayName}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </div>
  );
}
