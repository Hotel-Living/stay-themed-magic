
import React from "react";
import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
      className="w-full mb-6"
      open={isOpen} 
      onOpenChange={onOpenChange}
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full px-6 py-3 text-left rounded-lg bg-[#860493]">
        <h2 className="text-base font-medium text-white">Meals</h2>
        <ChevronRight className="h-5 w-5 text-white" />
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
