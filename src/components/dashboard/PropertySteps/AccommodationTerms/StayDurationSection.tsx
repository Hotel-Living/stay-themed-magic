
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface StayDurationSectionProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

const StayDurationSection: React.FC<StayDurationSectionProps> = ({
  isOpen,
  onToggle,
  formData,
  updateFormData
}) => {
  const durationOptions = [
    { nights: 8, label: "8 nights" },
    { nights: 15, label: "15 nights" },
    { nights: 22, label: "22 nights" },
    { nights: 29, label: "29 nights" }
  ];

  const handleDurationSelect = (nights: number) => {
    if (updateFormData) {
      updateFormData('selectedStayDuration', nights);
    }
  };

  const selectedDuration = formData?.selectedStayDuration;

  return (
    <Accordion type="single" collapsible value={isOpen ? "stay-duration" : ""} onValueChange={(value) => onToggle(!!value)}>
      <AccordionItem value="stay-duration" className="border rounded-xl overflow-hidden bg-fuchsia-900/10">
        <AccordionTrigger className="px-4 py-3">
          <h3 className="text-lg capitalize">3.3— STAY DURATION</h3>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-4">
            <p className="text-gray-300">Choose one fixed duration for all availability packages:</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {durationOptions.map((option) => (
                <Button
                  key={option.nights}
                  variant={selectedDuration === option.nights ? "default" : "outline"}
                  onClick={() => handleDurationSelect(option.nights)}
                  className="h-12"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default StayDurationSection;
