
import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import LengthOfStaySection from "../rooms/LengthOfStaySection";
import MealPlanSection from "../rooms/MealPlanSection";

interface StayLengthMealsSectionProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onStayLengthValidChange: (isValid: boolean) => void;
  onMealPlanValidChange: (isValid: boolean) => void;
}

export default function StayLengthMealsSection({
  isOpen,
  onOpenChange,
  onStayLengthValidChange,
  onMealPlanValidChange
}: StayLengthMealsSectionProps) {
  return (
    <Collapsible 
      className="w-full mb-6 border border-white rounded-lg overflow-hidden bg-fuchsia-900/10" 
      open={isOpen} 
      onOpenChange={onOpenChange}
    >
      <CollapsibleTrigger className="w-full flex items-center justify-between px-4 text-left border-b border-white py-[4px]">
        <h2 className="font-medium text-base text-white">LENGTH OF STAY – MEALS</h2>
        {isOpen ? <ChevronUp className="h-5 w-5 text-white" /> : <ChevronDown className="h-5 w-5 text-white" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4">
        <div className="space-y-6">
          <LengthOfStaySection 
            onValidationChange={onStayLengthValidChange} 
            showHeader={true} 
          />
          
          <MealPlanSection 
            onValidationChange={onMealPlanValidChange} 
            showHeader={true} 
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

