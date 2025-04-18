
import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import RoomTypeSection from "../rooms/roomTypes/RoomTypeSection";

interface RoomsRatesSectionProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onValidationChange: (isValid: boolean) => void;
}

export default function RoomsRatesSection({
  isOpen,
  onOpenChange,
  onValidationChange
}: RoomsRatesSectionProps) {
  return (
    <Collapsible 
      className="w-full mb-6 border border-white rounded-lg overflow-hidden bg-fuchsia-900/10" 
      open={isOpen} 
      onOpenChange={onOpenChange}
    >
      <CollapsibleTrigger className="w-full flex items-center justify-between px-4 text-left border-b border-white py-[4px]">
        <h2 className="font-medium text-base text-white">RATES PER PERSON FOR SELECTED STAY DURATIONS</h2>
        {isOpen ? <ChevronUp className="h-5 w-5 text-white" /> : <ChevronDown className="h-5 w-5 text-white" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4">
        <RoomTypeSection 
          onValidationChange={onValidationChange}
          title="RATES PER PERSON FOR SELECTED STAY DURATIONS" 
          fullWidth={true} 
          showHeader={false} 
        />
      </CollapsibleContent>
    </Collapsible>
  );
}
