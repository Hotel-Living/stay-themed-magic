
import React from "react";
import { CollapsibleContent } from "@/components/ui/collapsible";
import RoomTypeSection from "../../rooms/roomTypes/RoomTypeSection";

interface RoomRatesContentProps {
  onValidationChange: (isValid: boolean) => void;
  formData?: any; // Add formData
  updateFormData?: (field: string, value: any) => void; // Add updateFormData
}

export default function RoomRatesContent({ 
  onValidationChange,
  formData = {}, // Default empty object
  updateFormData = () => {} // Default no-op function
}: RoomRatesContentProps) {
  return (
    <CollapsibleContent className="p-4">
      <RoomTypeSection 
        onValidationChange={onValidationChange}
        title="RATES PER PERSON FOR SELECTED STAY DURATIONS" 
        fullWidth={true} 
        showHeader={false} 
        formData={formData}
        updateFormData={updateFormData}
      />
    </CollapsibleContent>
  );
}
