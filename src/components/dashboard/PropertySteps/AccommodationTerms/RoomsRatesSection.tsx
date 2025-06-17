
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslation } from "@/hooks/useTranslation";

interface RoomsRatesSectionProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

const RoomsRatesSection: React.FC<RoomsRatesSectionProps> = ({
  isOpen,
  onToggle,
  formData,
  updateFormData
}) => {
  const { t } = useTranslation();

  return (
    <Accordion type="single" collapsible value={isOpen ? "room-types" : ""} onValueChange={(value) => onToggle(!!value)}>
      <AccordionItem value="room-types" className="border rounded-xl overflow-hidden bg-fuchsia-900/10">
        <AccordionTrigger className="px-4 py-3">
          <h3 className="text-lg capitalize">3.5— ROOM TYPES</h3>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-4">
            <p className="text-gray-300">Define your room types with photos and availability:</p>
            
            <div className="bg-fuchsia-950/30 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">AVAILABLE TYPES OF ROOMS</h4>
              <select className="w-full p-2 rounded bg-fuchsia-950/50 border border-fuchsia-800/30 text-white">
                <option value="">None</option>
                <option value="single">Single Room</option>
                <option value="double">Double Room</option>
                <option value="suite">Suite</option>
              </select>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default RoomsRatesSection;
