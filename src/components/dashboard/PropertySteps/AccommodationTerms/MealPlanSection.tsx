
import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import MealPlanSection from "../rooms/MealPlanSection";

interface MealPlanSectionProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onValidationChange: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function AccommodationMealPlanSection({
  isOpen,
  onOpenChange,
  onValidationChange,
  formData = {},
  updateFormData = () => {}
}: MealPlanSectionProps) {
  return (
    <Collapsible 
      className="w-full border border-fuchsia-800/30 rounded-lg overflow-hidden bg-fuchsia-900/10"
      open={isOpen} 
      onOpenChange={onOpenChange}
      defaultOpen={false}
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 text-left bg-fuchsia-900/20">
        <label className="text-base font-medium text-white">
          Meals
        </label>
        {isOpen ? 
          <ChevronUp className="h-4 w-4 text-white" /> : 
          <ChevronDown className="h-4 w-4 text-white" />
        }
      </CollapsibleTrigger>
      <CollapsibleContent className="p-3">
        <MealPlanSection 
          onValidationChange={onValidationChange} 
          showHeader={false}
          formData={formData}
          updateFormData={updateFormData} 
        />
      </CollapsibleContent>
    </Collapsible>
  );
}
