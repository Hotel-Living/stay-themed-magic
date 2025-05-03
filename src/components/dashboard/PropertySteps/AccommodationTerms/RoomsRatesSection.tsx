
import React, { useEffect } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
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
  useEffect(() => {
    console.log("RoomsRatesSection rendering with formData:", {
      hasRoomTypes: !!formData.roomTypes,
      roomTypeCount: formData.roomTypes?.length || 0,
      preferredWeekday: formData.preferredWeekday,
      hasRates: !!formData.rates,
      rateKeys: formData.rates ? Object.keys(formData.rates) : []
    });
  }, [formData]);

  return (
    <Collapsible 
      className="w-full border border-white rounded-lg overflow-hidden bg-fuchsia-900/10"
      open={isOpen} 
      onOpenChange={onOpenChange}
      defaultOpen={formData.roomTypes?.length > 0 || false}
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-[4px] text-left bg-fuchsia-900/20 border-b border-white">
        <h2 className="font-medium text-base text-white">
          Room Types & Rates {formData.roomTypes?.length > 0 ? `(${formData.roomTypes.length} defined)` : ''}
        </h2>
        {isOpen ? 
          <ChevronUp className="h-5 w-5 text-white" /> : 
          <ChevronDown className="h-5 w-5 text-white" />
        }
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4">
        <RoomRatesContent 
          onValidationChange={onValidationChange} 
          formData={formData}
          updateFormData={updateFormData}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}
