
import React from "react";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import LengthOfStaySection from "../rooms/LengthOfStaySection";

interface StayLengthSectionProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onValidationChange: (isValid: boolean) => void;
}

export default function AccommodationStayLengthSection({
  isOpen,
  onOpenChange,
  onValidationChange
}: StayLengthSectionProps) {
  return (
    <Collapsible 
      className="w-full mb-6"
      open={isOpen} 
      onOpenChange={onOpenChange}
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full px-6 py-3 text-left rounded-full bg-[#7a0486]">
        <label className="text-base font-semibold text-white">
          Length of Stay
        </label>
        <ChevronDown className="h-5 w-5 text-white" />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4">
        <LengthOfStaySection 
          onValidationChange={onValidationChange} 
          showHeader={false} 
        />
      </CollapsibleContent>
    </Collapsible>
  );
}
