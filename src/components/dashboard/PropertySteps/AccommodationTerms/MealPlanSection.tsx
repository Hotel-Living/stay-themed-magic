
import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import MealPlanSection from "../rooms/MealPlanSection";

interface MealPlanSectionProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onValidationChange: (isValid: boolean) => void;
}

export default function AccommodationMealPlanSection({
  isOpen,
  onOpenChange,
  onValidationChange
}: MealPlanSectionProps) {
  return (
    <Collapsible 
      className="w-full mb-6 glass-card rounded-xl overflow-hidden"
      open={isOpen} 
      onOpenChange={onOpenChange}
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full px-4 text-left border-b border-white py-[12px]">
        <label className="text-lg font-semibold text-white">
          Meals
        </label>
        <ChevronDown className="h-5 w-5 text-white" />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4">
        <MealPlanSection 
          onValidationChange={onValidationChange} 
          showHeader={false} 
        />
      </CollapsibleContent>
    </Collapsible>
  );
}
