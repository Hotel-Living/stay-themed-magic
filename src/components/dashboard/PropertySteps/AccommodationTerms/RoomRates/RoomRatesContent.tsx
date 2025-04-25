
import React, { useEffect } from "react";
import { CollapsibleContent } from "@/components/ui/collapsible";
import RoomTypeSection from "../../rooms/roomTypes/RoomTypeSection";

interface RoomRatesContentProps {
  onValidationChange: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function RoomRatesContent({ 
  onValidationChange,
  formData = {},
  updateFormData = () => {}
}: RoomRatesContentProps) {
  useEffect(() => {
    console.log("RoomRatesContent rendering with formData:", formData);
  }, [formData]);

  return (
    <CollapsibleContent className="p-3">
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
