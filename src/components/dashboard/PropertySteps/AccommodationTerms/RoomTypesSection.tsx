import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface RoomTypesSectionProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
  onValidationChange?: (isValid: boolean) => void;
}

const RoomTypesSection: React.FC<RoomTypesSectionProps> = ({
  isOpen,
  onToggle,
  formData,
  updateFormData,
  onValidationChange
}) => {
  // Validation logic: Valid if room types exist and have required data
  React.useEffect(() => {
    const roomTypes = formData?.room_types || [];
    const isValid = roomTypes.length > 0 && roomTypes.every((room: any) => 
      room.name && (room.roomCount || room.room_count)
    );
    onValidationChange?.(isValid);
  }, [formData?.room_types, onValidationChange]);

  return (
    <Accordion type="single" collapsible value={isOpen ? "room-types" : ""} onValueChange={(value) => onToggle(!!value)}>
      <AccordionItem value="room-types" className="border rounded-xl overflow-hidden bg-fuchsia-900/10">
        <AccordionTrigger className="px-4 py-3">
          <h3 className="text-lg capitalize">3.1— ROOM TYPES</h3>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-4">
            <p className="text-gray-300">Configure your room types and capacity:</p>
            
            {/* Room types configuration content would go here */}
            <div className="p-4 border border-gray-600 rounded-lg">
              <p className="text-sm text-gray-400">Room types configuration interface</p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default RoomTypesSection;
