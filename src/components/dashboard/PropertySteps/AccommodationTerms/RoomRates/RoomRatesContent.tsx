
import React from "react";
import { CollapsibleContent } from "@/components/ui/collapsible";
import RoomTypeSection from "../../rooms/roomTypes/RoomTypeSection";

interface RoomRatesContentProps {
  onValidationChange: (isValid: boolean) => void;
}

export default function RoomRatesContent({ onValidationChange }: RoomRatesContentProps) {
  return (
    <CollapsibleContent className="p-4">
      <RoomTypeSection 
        onValidationChange={onValidationChange}
        title="RATES PER PERSON FOR SELECTED STAY DURATIONS" 
        fullWidth={true} 
        showHeader={false} 
      />
    </CollapsibleContent>
  );
}
