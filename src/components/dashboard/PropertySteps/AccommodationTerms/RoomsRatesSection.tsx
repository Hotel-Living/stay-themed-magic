
import React from "react";
import { Collapsible } from "@/components/ui/collapsible";
import CollapsibleHeader from "./RoomRates/CollapsibleHeader";
import RoomRatesContent from "./RoomRates/RoomRatesContent";

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
      <CollapsibleHeader isOpen={isOpen} />
      <RoomRatesContent onValidationChange={onValidationChange} />
    </Collapsible>
  );
}
