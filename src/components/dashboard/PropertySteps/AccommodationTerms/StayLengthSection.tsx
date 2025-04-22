
import React, { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import LengthOfStaySection from "../rooms/LengthOfStaySection";

interface StayLengthSectionProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onValidationChange: (isValid: boolean) => void;
}

export default function StayLengthSection({
  isOpen,
  onOpenChange,
  onValidationChange
}: StayLengthSectionProps) {
  return (
    <Collapsible 
      className="w-full" 
      open={isOpen} 
      onOpenChange={onOpenChange}
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
        <label className="block text-sm font-medium text-foreground/90 uppercase">
          LENGTH OF STAY
        </label>
        <ChevronRight className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <LengthOfStaySection 
          onValidationChange={onValidationChange} 
          showHeader={false} 
        />
      </CollapsibleContent>
    </Collapsible>
  );
}
