
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RoomTypesSectionProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

const RoomTypesSection: React.FC<RoomTypesSectionProps> = ({
  isOpen,
  onToggle,
  formData,
  updateFormData
}) => {
  const handleDescriptionChange = (value: string) => {
    if (updateFormData) {
      updateFormData('roomDescription', value);
    }
  };

  return (
    <Accordion type="single" collapsible value={isOpen ? "room-types" : ""} onValueChange={(value) => onToggle(!!value)}>
      <AccordionItem value="room-types" className="border rounded-xl overflow-hidden bg-fuchsia-900/10">
        <AccordionTrigger className="px-4 py-3">
          <h3 className="text-lg capitalize">3.1— ROOM TYPES</h3>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-4">
            <p className="text-gray-300">Define the room type, which can be used as double or individual.</p>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="room-description" className="text-white">Room Description</Label>
                <Input
                  id="room-description"
                  value={formData?.roomDescription || ''}
                  onChange={(e) => handleDescriptionChange(e.target.value)}
                  placeholder="Describe your room type..."
                  className="bg-fuchsia-950/50 border-fuchsia-800/30 text-white placeholder-gray-400"
                />
              </div>
              
              <div>
                <Label className="text-white">Room Photo(s)</Label>
                <div className="mt-2 p-4 border-2 border-dashed border-fuchsia-800/30 rounded-lg">
                  <p className="text-center text-gray-400">Upload room images here</p>
                  <p className="text-center text-sm text-gray-500 mt-1">This room can be used as double or individual</p>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default RoomTypesSection;
