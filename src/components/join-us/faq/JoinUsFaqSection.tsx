
import React from "react";
import { ChevronDown } from "lucide-react";
import { FaqSection } from "./types";
import { JoinUsFaqItem } from "./JoinUsFaqItem";
import { cn } from "@/lib/utils";

interface JoinUsFaqSectionProps {
  section: FaqSection;
  isExpanded: boolean;
  toggleSection: () => void;
}

export function JoinUsFaqSection({ section, isExpanded, toggleSection }: JoinUsFaqSectionProps) {
  return (
    <div className="bg-[#730483]/50 rounded-lg overflow-hidden shadow-lg border border-fuchsia-500/30">
      <button 
        className="w-full text-left px-6 py-4 flex items-center justify-between bg-gradient-to-r from-[#730483] to-[#570366] hover:from-[#8A0499] hover:to-[#660377] transition-all duration-300"
        onClick={toggleSection}
      >
        <div className="flex items-center">
          {section.emoji && <span className="text-2xl mr-3">{section.emoji}</span>}
          <h3 className="text-xl font-bold text-[#FFF9B0]">{section.title}</h3>
        </div>
        <ChevronDown 
          className={cn(
            "h-5 w-5 text-[#FFF9B0] transition-transform duration-300",
            isExpanded ? "rotate-180" : ""
          )}
        />
      </button>
      
      {isExpanded && (
        <div className="divide-y divide-fuchsia-500/20">
          {section.questions.map((item, idx) => (
            <JoinUsFaqItem key={idx} question={item.question} answer={item.answer} />
          ))}
        </div>
      )}
    </div>
  );
}
