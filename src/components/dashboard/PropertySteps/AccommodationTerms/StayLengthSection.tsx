
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

interface StayLengthSectionProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  selectedLengths: number[];
  onLengthToggle: (field: string, value: any) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

const StayLengthSection: React.FC<StayLengthSectionProps> = ({
  isOpen,
  onToggle,
  selectedLengths,
  onLengthToggle,
  formData,
  updateFormData
}) => {
  const { t } = useTranslation();
  
  const stayOptions = [
    { days: 8, label: "8 days" },
    { days: 16, label: "16 days" },
    { days: 24, label: "24 days" },
    { days: 32, label: "32 days" }
  ];

  const handleLengthToggle = (days: number) => {
    const currentLengths = selectedLengths || [];
    const newLengths = currentLengths.includes(days)
      ? currentLengths.filter(length => length !== days)
      : [...currentLengths, days];
    
    onLengthToggle('selectedLengths', newLengths);
    if (updateFormData) {
      updateFormData('stayLengths', newLengths);
    }
  };

  return (
    <Accordion type="single" collapsible value={isOpen ? "stay-length" : ""} onValueChange={(value) => onToggle(!!value)}>
      <AccordionItem value="stay-length" className="border rounded-xl overflow-hidden bg-fuchsia-900/10">
        <AccordionTrigger className="px-4 py-3">
          <h3 className="text-lg capitalize">3.1— STAY DURATION</h3>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-4">
            <p className="text-gray-300">Select all stay durations you offer:</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {stayOptions.map((option) => (
                <Button
                  key={option.days}
                  variant={selectedLengths?.includes(option.days) ? "default" : "outline"}
                  onClick={() => handleLengthToggle(option.days)}
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

export default StayLengthSection;
