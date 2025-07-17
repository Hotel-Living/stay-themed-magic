
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaqCategory } from "../types";

interface FaqTabsListENProps {
  faqCategories: FaqCategory[];
}

export function FaqTabsListEN({ faqCategories }: FaqTabsListENProps) {
  return (
    <div className="flex justify-center mb-6">
      <TabsList className="flex flex-nowrap justify-center gap-2 p-2 bg-gradient-to-r from-purple-500/20 via-violet-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg w-4/5">
        {faqCategories.map(category => {
          // Add line breaks for long category names
          let displayName = category.name;
          if (category.name === "During your stay") {
            displayName = "DURING\nYOUR STAY";
          } else if (category.name === "Digital Nomads?") {
            displayName = "DIGITAL\nNOMADS?";
          } else if (category.name === "Practical Details?") {
            displayName = "PRACTICAL\nDETAILS?";
          }
          
          return (
            <TabsTrigger 
              key={category.id} 
              value={category.id} 
              className="px-4 py-3 uppercase whitespace-pre-line text-center bg-purple-800 data-[state=active]:bg-purple-900 data-[state=active]:text-white text-white hover:bg-purple-700 hover:text-white transition-all duration-200 rounded-xl text-[10px] font-bold tracking-wide backdrop-blur-sm flex-1 min-w-0 border border-purple-600"
            >
              {displayName}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </div>
  );
}
