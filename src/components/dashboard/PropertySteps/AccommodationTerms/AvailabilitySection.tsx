import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const months = [
    { value: "january", label: "Enero" },
    { value: "february", label: "Febrero" }, 
    { value: "march", label: "Marzo" },
    { value: "april", label: "Abril" },
    { value: "may", label: "Mayo" },
    { value: "june", label: "Junio" },
    { value: "july", label: "Julio" },
    { value: "august", label: "Agosto" },
    { value: "september", label: "Septiembre" },
    { value: "october", label: "Octubre" },
    { value: "november", label: "Noviembre" },
    { value: "december", label: "Diciembre" }
  ];

  const leftColumnMonths = months.slice(0, 6);
  const rightColumnMonths = months.slice(6, 12);

  const [expandedMonths, setExpandedMonths] = React.useState<string[]>([]);
  const [selectedDates, setSelectedDates] = React.useState<{[key: string]: number}>({});

  const toggleMonth = (month: string) => {
    setExpandedMonths(prev => 
      prev.includes(month) 
        ? prev.filter(m => m !== month)
        : [...prev, month]
    );
  };

  const handleDateSelection = (dateKey: string, rooms: number) => {
    setSelectedDates(prev => ({
      ...prev,
      [dateKey]: rooms
    }));
  };

  const handlePackageCreate = () => {
    const packages = Object.entries(selectedDates).map(([dateKey, rooms]) => ({
      date: dateKey,
      rooms: rooms,
      checkinDay: formData?.checkinDay || 'monday'
    }));
    
    if (updateFormData) {
      updateFormData('availabilityPackages', packages);
    }
  };

  // Get selected weekday from formData
  const selectedWeekday = formData?.checkinDay || 'monday';
  
  // Generate dates for each month that match the selected weekday
  const generateDatesForMonth = (monthIndex: number) => {
    const year = new Date().getFullYear();
    const dates = [];
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const targetDayIndex = daysOfWeek.indexOf(selectedWeekday.toLowerCase());
    
    for (let day = 1; day <= 31; day++) {
      const date = new Date(year, monthIndex, day);
      if (date.getMonth() !== monthIndex) break;
      if (date.getDay() === targetDayIndex) {
        dates.push({
          day: day,
          weekday: selectedWeekday,
          dateKey: `${year}-${monthIndex + 1}-${day}`
        });
      }
    }
    return dates;
  };

  const renderMonthColumn = (monthsArray: typeof months) => (
    <div className="space-y-3">
      {monthsArray.map((month, index) => {
        const monthIndex = months.indexOf(month);
        const monthDates = generateDatesForMonth(monthIndex);
        const isExpanded = expandedMonths.includes(month.value);
        
        return (
          <div key={month.value} className="border rounded-lg overflow-hidden bg-fuchsia-950/30">
            <button
              onClick={() => toggleMonth(month.value)}
              className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-fuchsia-900/20"
            >
              <span className="font-medium text-white">{month.label}</span>
              <span className="text-fuchsia-300">{isExpanded ? '−' : '+'}</span>
            </button>
            
            {isExpanded && (
              <div className="p-4 space-y-2 border-t border-fuchsia-800/30">
                {monthDates.length > 0 ? (
                  monthDates.map((date) => (
                    <div key={date.dateKey} className="flex items-center justify-between p-2 bg-fuchsia-900/20 rounded">
                      <span className="text-white capitalize">
                        {date.weekday} {date.day}
                      </span>
                      <Select onValueChange={(value) => handleDateSelection(date.dateKey, parseInt(value))}>
                        <SelectTrigger className="w-20">
                          <SelectValue placeholder="0" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No {selectedWeekday}s in this month</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  const hasSelectedDates = Object.keys(selectedDates).length > 0;

  return (
    <Accordion type="single" collapsible value={isOpen ? "availability" : ""} onValueChange={(value) => onToggle(!!value)}>
      <AccordionItem value="availability" className="border rounded-xl overflow-hidden bg-fuchsia-900/10">
        <AccordionTrigger className="px-4 py-3">
          <h3 className="text-lg capitalize">3.5— PAQUETES DE DISPONIBILIDAD</h3>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-6">
            <p className="text-gray-300">
              Create availability packages by selecting dates and room quantities. 
              Only {selectedWeekday}s are shown based on your check-in day selection.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderMonthColumn(leftColumnMonths)}
              {renderMonthColumn(rightColumnMonths)}
            </div>

            {hasSelectedDates && (
              <div className="mt-6 pt-4 border-t border-fuchsia-800/30">
                <Button 
                  onClick={handlePackageCreate}
                  className="w-full bg-fuchsia-600 hover:bg-fuchsia-700"
                >
                  Create Availability Packages
                </Button>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AvailabilitySection;
