
import React from "react";
import { Collapsible } from "@/components/ui/collapsible";
import CollapsibleHeader from "./RoomRates/CollapsibleHeader";
import RoomRatesContent from "./RoomRates/RoomRatesContent";

interface RoomsRatesSectionProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onValidationChange: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function RoomsRatesSection({
  isOpen,
  onOpenChange,
  onValidationChange,
  formData = {},
  updateFormData = () => {}
}: RoomsRatesSectionProps) {
  return (
    <Collapsible 
      className="w-full border border-fuchsia-800/30 rounded-lg overflow-hidden bg-fuchsia-900/10"
      open={isOpen} 
      onOpenChange={onOpenChange}
      defaultOpen={false}
    >
      <CollapsibleHeader isOpen={isOpen} />
      <RoomRatesContent 
        onValidationChange={onValidationChange} 
        formData={formData}
        updateFormData={updateFormData}
      />
    </Collapsible>
  );
}
