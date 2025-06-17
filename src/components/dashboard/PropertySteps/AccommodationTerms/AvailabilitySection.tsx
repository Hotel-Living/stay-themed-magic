
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useAvailabilityDates } from "./hooks/useAvailabilityDates";
import { useTranslation } from "@/hooks/useTranslation";

interface AvailabilitySectionProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  isOpen,
  onToggle,
  formData,
  updateFormData
}) => {
  const { t } = useTranslation();
  const { availableMonths, toggleMonth } = useAvailabilityDates(formData, updateFormData);

  const months = [
    { value: "june-2025", label: "June 2025" },
    { value: "july-2025", label: "July 2025" },
    { value: "august-2025", label: "August 2025" },
    { value: "september-2025", label: "September 2025" },
    { value: "october-2025", label: "October 2025" }
  ];

  return (
    <Accordion type="single" collapsible value={isOpen ? "availability" : ""} onValueChange={(value) => onToggle(!!value)}>
      <AccordionItem value="availability" className="border rounded-xl overflow-hidden bg-fuchsia-900/10">
        <AccordionTrigger className="px-4 py-3">
          <h3 className="text-lg capitalize">3.3— AVAILABILITY DATES</h3>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-4">
            <p className="text-gray-300">Select complete months or specific check-in dates (Mondays only):</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                {months.map((month) => (
                  <div key={month.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={month.value}
                      checked={availableMonths.includes(month.value)}
                      onChange={() => toggleMonth(month.value)}
                      className="w-4 h-4"
                    />
                    <label htmlFor={month.value} className="text-white">
                      {month.label}
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="bg-fuchsia-950/30 p-4 rounded-lg">
                <p className="text-sm text-gray-300 italic">
                  {availableMonths.length === 0 ? "No dates selected yet" : "Dates will be configured"}
                </p>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AvailabilitySection;
