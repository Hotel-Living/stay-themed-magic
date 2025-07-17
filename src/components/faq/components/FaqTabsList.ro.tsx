
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaqCategory } from "../types";

interface FaqTabsListROProps {
  faqCategories: FaqCategory[];
}

export function FaqTabsListRO({ faqCategories }: FaqTabsListROProps) {
  return (
    <div className="flex justify-center mb-6">
      <TabsList className="flex flex-nowrap justify-center gap-2 p-2 bg-gradient-to-r from-purple-500/20 via-violet-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg w-4/5">
        {faqCategories.map(category => {
          // Add line breaks for long category names
          let displayName = category.name;
          if (category.name === "În timpul șederii") {
            displayName = "ÎN TIMPUL\nȘEDERII";
          } else if (category.name === "Nomazi Digitali?") {
            displayName = "NOMAZI\nDIGITALI";
          } else if (category.name === "Detalii Practice?") {
            displayName = "DETALII\nPRACTICE";
          }
          
          return (
            <TabsTrigger 
              key={category.id} 
              value={category.id} 
              className="px-4 py-3 uppercase whitespace-pre-line text-center bg-white/10 data-[state=active]:bg-white/25 data-[state=active]:text-white text-white/80 hover:bg-white/15 hover:text-white transition-all duration-200 rounded-xl text-[10px] font-bold tracking-wide backdrop-blur-sm flex-1 min-w-0 border border-white/5"
            >
              {displayName}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </div>
  );
}
