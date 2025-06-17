
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

interface PreferredWeekdaySectionProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  selectedDay: string;
  onDaySelect: (field: string, value: any) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

const PreferredWeekdaySection: React.FC<PreferredWeekdaySectionProps> = ({
  isOpen,
  onToggle,
  selectedDay,
  onDaySelect,
  formData,
  updateFormData
}) => {
  const { t } = useTranslation();
  
  const weekdays = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" }
  ];

  const handleDaySelect = (dayValue: string) => {
    onDaySelect('selectedDay', dayValue);
    if (updateFormData) {
      updateFormData('checkinDay', dayValue);
    }
  };

  return (
    <Accordion type="single" collapsible value={isOpen ? "weekday" : ""} onValueChange={(value) => onToggle(!!value)}>
      <AccordionItem value="weekday" className="border rounded-xl overflow-hidden bg-fuchsia-900/10">
        <AccordionTrigger className="px-4 py-3">
          <h3 className="text-lg capitalize">3.2— CHECK-IN DAY / CHECK-OUT</h3>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-4">
            <p className="text-gray-300">Select the day when guests check-in and check-out:</p>
            
            <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
              {weekdays.map((day) => (
                <Button
                  key={day.value}
                  variant={selectedDay === day.value ? "default" : "outline"}
                  onClick={() => handleDaySelect(day.value)}
                  className="h-12"
                >
                  {day.label}
                </Button>
              ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PreferredWeekdaySection;
