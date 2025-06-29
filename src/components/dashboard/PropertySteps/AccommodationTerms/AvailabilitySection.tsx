
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CustomCalendarSingleWeekday from "../rooms/roomTypes/CustomCalendarSingleWeekday";
import { weekdayMap } from "../rooms/roomTypes/availabilityDateUtils";
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
  const [selectedMonth, setSelectedMonth] = React.useState<Date>(new Date());
  const [selectedDates, setSelectedDates] = React.useState<string[]>(formData?.availability_dates || []);
  
  const { availableMonths, toggleMonth } = useAvailabilityDates(formData, updateFormData);
  
  const preferredWeekday = formData?.preferredWeekday || "Monday";
  const preferredDayNum = weekdayMap[preferredWeekday] || 1;

  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  const handleDateSelect = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    const newDates = selectedDates.includes(dateString)
      ? selectedDates.filter(d => d !== dateString)
      : [...selectedDates, dateString];
    
    setSelectedDates(newDates);
    if (updateFormData) {
      updateFormData('availability_dates', newDates);
    }
  };

  const handleMonthSelect = (monthValue: string) => {
    const isSelected = availableMonths.includes(monthValue);
    toggleMonth(monthValue);
    
    if (!isSelected) {
      // When selecting a full month, create the corresponding Date object
      const [monthName, year] = monthValue.split(' ');
      const monthIndex = months.indexOf(monthName.toLowerCase());
      if (monthIndex !== -1) {
        const monthDate = new Date(parseInt(year), monthIndex, 1);
        setSelectedMonth(monthDate);
      }
    }
  };

  return (
    <Accordion type="single" collapsible value={isOpen ? "availability" : ""} onValueChange={(value) => onToggle(!!value)}>
      <AccordionItem value="availability" className="border rounded-xl overflow-hidden bg-fuchsia-900/10">
        <AccordionTrigger className="px-4 py-3">
          <h3 className="text-lg capitalize">3.3— FECHAS DE DISPONIBILIDAD</h3>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-6">
            <p className="text-gray-300">
              Seleccione fechas específicas de check-in (solo los lunes) o meses completos:
            </p>

            {/* Month Selection Dropdown */}
            <div className="space-y-4">
              <Select onValueChange={handleMonthSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="junio 2025" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month, index) => {
                    const monthValueCurrent = `${month} ${currentYear}`;
                    const monthValueNext = `${month} ${nextYear}`;
                    return (
                      <React.Fragment key={month}>
                        <SelectItem 
                          value={monthValueCurrent}
                          disabled={availableMonths.includes(monthValueCurrent)}
                        >
                          {month.charAt(0).toUpperCase() + month.slice(1)} {currentYear}
                          {availableMonths.includes(monthValueCurrent) && " ✓"}
                        </SelectItem>
                        <SelectItem 
                          value={monthValueNext}
                          disabled={availableMonths.includes(monthValueNext)}
                        >
                          {month.charAt(0).toUpperCase() + month.slice(1)} {nextYear}
                          {availableMonths.includes(monthValueNext) && " ✓"}
                        </SelectItem>
                      </React.Fragment>
                    );
                  })}
                </SelectContent>
              </Select>
              
              {availableMonths.length === 0 && (
                <p className="text-sm text-gray-400">Aún no se han seleccionado fechas</p>
              )}
            </div>

            {/* Calendar for specific date selection */}
            <div className="space-y-4">
              <CustomCalendarSingleWeekday
                month={selectedMonth}
                preferredDayNum={preferredDayNum}
                selected={selectedDates}
                preferredWeekday={preferredWeekday}
                onSelectDate={handleDateSelect}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AvailabilitySection;
