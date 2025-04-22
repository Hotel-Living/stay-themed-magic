
import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import RoomTypeSection from "../../../rooms/roomTypes/RoomTypeSection";

interface RoomTypesSectionProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onValidationChange: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function RoomTypesSection({
  isOpen,
  onOpenChange,
  onValidationChange,
  formData = {},
  updateFormData = () => {}
}: RoomTypesSectionProps) {
  return (
    <Collapsible
      className="w-full mb-6 border border-white rounded-lg overflow-hidden bg-fuchsia-900/10"
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full px-4 text-left border-b border-white py-[4px]">
        <h2 className="font-medium text-base text-white">Room Types</h2>
        <ChevronRight className="h-4 w-4 text-white" />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4">
        <RoomTypeSection
          onValidationChange={onValidationChange}
          title="ROOM TYPES"
          fullWidth={true}
          showHeader={false}
          formData={formData}
          updateFormData={updateFormData}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}
