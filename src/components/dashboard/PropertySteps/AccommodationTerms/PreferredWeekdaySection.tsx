
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface PreferredWeekdaySectionProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  selectedDay: string;
  onDaySelect: (field: string, value: any) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
  hasPackages?: boolean;
}

const PreferredWeekdaySection: React.FC<PreferredWeekdaySectionProps> = ({
  isOpen,
  onToggle,
  selectedDay,
  onDaySelect,
  formData,
  updateFormData,
  hasPackages = false
}) => {
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
          <h3 className="text-lg capitalize">3.4— CHECK-IN DAY / CHECK-OUT</h3>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-4">
            <p className="text-gray-300">Select the weekday when all stays will begin and end:</p>
            
            <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
              {weekdays.map((day) => (
                <Button
                  key={day.value}
                  variant={selectedDay === day.value ? "default" : "outline"}
                  onClick={() => handleDaySelect(day.value)}
                  className="h-12"
                  disabled={hasPackages}
                >
                  {day.label}
                </Button>
              ))}
            </div>

            {/* Warning notice */}
            <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
              <p className="text-yellow-200 text-sm flex items-start gap-2">
                <span className="text-yellow-400 font-bold">⚠️</span>
                <span>
                  This selection is definitive for future packages.
                  Once availability packages exist, this day cannot be changed.
                  Existing packages and bookings remain unchanged and valid.
                </span>
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PreferredWeekdaySection;
