
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface StayDurationSectionProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
  onValidationChange?: (isValid: boolean) => void;
}

const StayDurationSection: React.FC<StayDurationSectionProps> = ({
  isOpen,
  onToggle,
  formData,
  updateFormData,
  onValidationChange
}) => {
  const durationOptions = [
    { nights: 8, label: "8 days" },
    { nights: 15, label: "15 days" },
    { nights: 22, label: "22 days" },
    { nights: 29, label: "29 days" }
  ];

  const handleDurationSelect = (nights: number) => {
    if (updateFormData) {
      const currentDurations = formData?.selectedStayDurations || [];
      if (currentDurations.includes(nights)) {
        // Remove if already selected
        updateFormData('selectedStayDurations', currentDurations.filter((d: number) => d !== nights));
      } else {
        // Add if not selected
        updateFormData('selectedStayDurations', [...currentDurations, nights]);
      }
    }
  };

  const selectedDurations = formData?.selectedStayDurations || [];

  // Validation logic: Valid if at least one duration selected
  React.useEffect(() => {
    const isValid = selectedDurations.length > 0;
    onValidationChange?.(isValid);
  }, [selectedDurations, onValidationChange]);

  return (
    <Accordion type="single" collapsible value={isOpen ? "stay-duration" : ""} onValueChange={(value) => onToggle(!!value)}>
      <AccordionItem value="stay-duration" className="border rounded-xl overflow-hidden bg-fuchsia-900/10">
        <AccordionTrigger className="px-4 py-3">
          <h3 className="text-lg capitalize">3.3— STAY DURATION</h3>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-4">
            <p className="text-gray-300">Select one or more stay durations for your availability packages:</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {durationOptions.map((option) => (
                <Button
                  key={option.nights}
                  variant={selectedDurations.includes(option.nights) ? "default" : "outline"}
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
