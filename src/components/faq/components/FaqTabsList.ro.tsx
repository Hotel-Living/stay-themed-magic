
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaqCategory } from "../types";

interface FaqTabsListROProps {
  faqCategories: FaqCategory[];
}

export function FaqTabsListRO({ faqCategories }: FaqTabsListROProps) {
  return (
    <div className="flex justify-center mb-4">
      <TabsList className="flex flex-wrap justify-center gap-1 p-1 bg-[#996515]/50 rounded-xl border border-fuchsia-500/30 backdrop-blur-md">
        {faqCategories.map(category => (
          <TabsTrigger 
            key={category.id} 
            value={category.id} 
            className="px-2 uppercase whitespace-nowrap bg-gradient-to-r from-[#996515] to-[#996515] text-white shadow-md hover:shadow-fuchsia-500/20 hover:scale-105 transition-all duration-200 border border-fuchsia-600/20 text-justify rounded-lg py-0 text-sm font-medium"
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
}
