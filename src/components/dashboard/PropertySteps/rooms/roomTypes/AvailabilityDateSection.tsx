
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { format, addMonths, isSameDay, parseISO, getDay } from "date-fns";

interface AvailabilityDateSectionProps {
  preferredWeekday: string;
  onAvailabilityChange: (dates: string[]) => void;
  selectedDates: string[];
}

const weekdayMap: Record<string, number> = {
  "Monday": 1,
  "Tuesday": 2,
  "Wednesday": 3,
  "Thursday": 4,
  "Friday": 5,
  "Saturday": 6,
  "Sunday": 0
};

export default function AvailabilityDateSection({
  preferredWeekday = "Monday",
  onAvailabilityChange,
  selectedDates = []
}: AvailabilityDateSectionProps) {
  const [expandedMonths, setExpandedMonths] = useState<Record<string, boolean>>({});
  
  const currentDate = new Date();
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = addMonths(currentDate, i);
    return format(date, "MMMM yyyy");
  });

  const toggleMonth = (month: string) => {
    setExpandedMonths(prev => ({
      ...prev,
      [month]: !prev[month]
    }));
  };

  const handleMonthSelection = (month: string) => {
    // Add or remove the entire month
    const isSelected = selectedDates.some(date => date.startsWith(month.split(" ")[0]));
    
    if (isSelected) {
      // Remove all dates from this month
      onAvailabilityChange(selectedDates.filter(date => !date.startsWith(month.split(" ")[0])));
    } else {
      // Add the entire month
      onAvailabilityChange([...selectedDates, month]);
    }
  };

  const isDateDisabled = (date: Date) => {
    // Check if the date is the preferred weekday
    const day = getDay(date);
    return day !== weekdayMap[preferredWeekday];
  };

  const handleDateSelect = (date: Date | undefined, month: string) => {
    if (!date) return;
    
    const dateString = format(date, "yyyy-MM-dd");
    
    // Toggle selection
    if (selectedDates.includes(dateString)) {
      onAvailabilityChange(selectedDates.filter(d => d !== dateString));
    } else {
      onAvailabilityChange([...selectedDates, dateString]);
    }
  };

  const isMonthSelected = (month: string) => {
    return selectedDates.includes(month);
  };

  const isDateSelected = (date: Date) => {
    return selectedDates.some(d => {
      try {
        return isSameDay(parseISO(d), date);
      } catch {
        return false;
      }
    });
  };

  return (
    <div className="grid grid-cols-4 items-start gap-4">
      <Label className="text-right text-sm text-white">AVAILABILITY DATES</Label>
      <div className="col-span-3 bg-fuchsia-950/50 border border-white rounded-lg p-4 text-white">
        <p className="text-sm mb-3">
          Select full months or specific check-in dates ({preferredWeekday}s only)
        </p>
        
        <div className="space-y-2">
          {months.map((month) => (
            <Collapsible 
              key={month} 
              open={expandedMonths[month]} 
              onOpenChange={() => toggleMonth(month)}
              className="border border-fuchsia-800/30 rounded-md overflow-hidden"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left bg-fuchsia-900/30 hover:bg-fuchsia-900/50">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isMonthSelected(month)}
                    onChange={() => handleMonthSelection(month)}
                    onClick={(e) => e.stopPropagation()}
                    className="mr-3 rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50"
                  />
                  <span>{month}</span>
                </div>
                {expandedMonths[month] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </CollapsibleTrigger>
              
              <CollapsibleContent className="px-3 py-2">
                <div className="mt-2">
                  <Calendar
                    mode="single"
                    onSelect={(date) => handleDateSelect(date, month)}
                    month={new Date(month)}
                    className="pointer-events-auto bg-fuchsia-950/50 rounded-md border border-fuchsia-800/30"
                    disabled={isDateDisabled}
                    selected={undefined}
                    modifiers={{
                      selected: (date) => isDateSelected(date)
                    }}
                    modifiersClassNames={{
                      selected: "bg-fuchsia-600 text-white hover:bg-fuchsia-700"
                    }}
                    showOutsideDays={false}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
        
        {selectedDates.length > 0 && (
          <div className="mt-4 p-2 bg-fuchsia-900/20 rounded">
            <h4 className="text-sm font-medium mb-1">Selected Availability:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedDates.map((date) => (
                <div 
                  key={date} 
                  className="bg-fuchsia-800/40 text-white text-xs px-2 py-1 rounded flex items-center"
                >
                  {date.includes("-") ? format(parseISO(date), "MMM dd, yyyy") : date}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-4 w-4 p-0 text-white hover:bg-fuchsia-700/30"
                    onClick={() => onAvailabilityChange(selectedDates.filter(d => d !== date))}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
