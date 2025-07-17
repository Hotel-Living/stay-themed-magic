
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaqCategory } from "../types";

interface FaqTabsListESProps {
  faqCategories: FaqCategory[];
}

export function FaqTabsListES({ faqCategories }: FaqTabsListESProps) {
  return (
    <div className="flex justify-center mb-6">
      <TabsList className="flex flex-wrap justify-center gap-2 p-2 bg-gradient-to-r from-[#6A2089]/80 to-[#8B3A9C]/80 rounded-2xl border border-purple-300/40 backdrop-blur-lg shadow-2xl shadow-purple-500/30">
        {faqCategories.map(category => (
          <TabsTrigger 
            key={category.id} 
            value={category.id} 
            className="px-4 py-2 uppercase whitespace-nowrap bg-gradient-to-r from-[#6A2089] to-[#7A2499] data-[state=active]:from-purple-100 data-[state=active]:to-white data-[state=active]:text-[#6A2089] text-white shadow-lg hover:shadow-purple-400/40 hover:scale-105 transition-all duration-300 border border-purple-300/30 hover:border-purple-200/60 rounded-xl text-sm font-bold tracking-wide hover:from-[#7A2499] hover:to-[#8B3A9C] glow-on-hover"
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
}
