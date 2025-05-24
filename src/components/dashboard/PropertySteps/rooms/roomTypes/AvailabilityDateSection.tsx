
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { format, addMonths, parseISO } from "date-fns";
import CustomCalendarSingleWeekday from "./CustomCalendarSingleWeekday";
import { weekdayMap, getAvailableDatesForMonth } from "./availabilityDateUtils";

interface AvailabilityDateSectionProps {
  preferredWeekday: string;
  onAvailabilityChange: (dates: string[]) => void;
  selectedDates: string[];
}

export default function AvailabilityDateSection({
  preferredWeekday = "Monday",
  onAvailabilityChange,
  selectedDates = []
}: AvailabilityDateSectionProps) {
  const [expandedMonths, setExpandedMonths] = useState<Record<string, boolean>>({});
  const [effectiveWeekday, setEffectiveWeekday] = useState<string>(preferredWeekday);

  // Update effective weekday when prop changes
  useEffect(() => {
    setEffectiveWeekday(preferredWeekday);
  }, [preferredWeekday]);

  const currentDate = new Date();
  const months = Array.from({
    length: 12
  }, (_, i) => {
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
    const monthDate = new Date(month + " 01");
    const dayNum = weekdayMap[effectiveWeekday];
    const availableDates = getAvailableDatesForMonth(monthDate, dayNum).map(d => format(d, "yyyy-MM-dd"));
    
    // Check if this month is currently selected (has all its dates)
    const hasAll = availableDates.every(d => selectedDates.includes(d));
    
    if (hasAll) {
      // Remove all dates from this month
      const newSelectedDates = selectedDates.filter(date => !availableDates.includes(date));
      onAvailabilityChange(newSelectedDates);
    } else {
      // Add all dates from this month, but prevent duplicates
      const uniqueNewDates = availableDates.filter(date => !selectedDates.includes(date));
      const newSelectedDates = [...selectedDates, ...uniqueNewDates];
      onAvailabilityChange(newSelectedDates);
    }
  };

  const handleDateSelect = (date: Date | undefined, month: string) => {
    if (!date) return;
    const dateString = format(date, "yyyy-MM-dd");
    
    if (selectedDates.includes(dateString)) {
      // Remove this specific date
      const newSelectedDates = selectedDates.filter(d => d !== dateString);
      onAvailabilityChange(newSelectedDates);
    } else {
      // Add this specific date (limit to 2 per month)
      const monthDate = new Date(month + " 01");
      const dayNum = weekdayMap[effectiveWeekday];
      const datesInMonth = selectedDates.map(d => {
        try {
          return parseISO(d);
        } catch {
          return null;
        }
      }).filter(d => 
        d && 
        d.getMonth() === monthDate.getMonth() && 
        d.getFullYear() === monthDate.getFullYear() && 
        d.getDay() === dayNum
      ).map(d => format(d as Date, "yyyy-MM-dd"));
      
      if (datesInMonth.length < 2) {
        const newSelectedDates = [...selectedDates, dateString];
        onAvailabilityChange(newSelectedDates);
      }
    }
  };

  const isMonthSelected = (month: string) => {
    const monthDate = new Date(month + " 01");
    const dayNum = weekdayMap[effectiveWeekday];
    const availableDates = getAvailableDatesForMonth(monthDate, dayNum).map(d => format(d, "yyyy-MM-dd"));
    return availableDates.length > 0 && availableDates.every(d => selectedDates.includes(d));
  };

  const preferredDayNum = weekdayMap[effectiveWeekday];

  // Remove duplicates from selectedDates to prevent display issues
  const uniqueSelectedDates = Array.from(new Set(selectedDates));

  return (
    <div className="grid grid-cols-4 items-start gap-4">
      <div className="col-span-3 grid grid-cols-2 gap-4">
        <div className="bg-fuchsia-950/50 border border-white rounded-lg p-4 text-white">
          <p className="text-sm mb-3">
            Select full months or specific check-in dates ({effectiveWeekday}s only)
          </p>
          <div className="space-y-2">
            {months.map((month, idx) => {
              const monthDate = addMonths(currentDate, idx);
              return (
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
                      <span className="text-sm">{month}</span>
                    </div>
                    {expandedMonths[month] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-3 py-2">
                    <CustomCalendarSingleWeekday 
                      month={monthDate} 
                      preferredDayNum={preferredDayNum} 
                      selected={uniqueSelectedDates} 
                      preferredWeekday={effectiveWeekday} 
                      onSelectDate={(date) => handleDateSelect(date, month)} 
                    />
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>
        </div>
        
        <div className="bg-fuchsia-950/50 border border-white rounded-lg p-4 text-white">
          {uniqueSelectedDates.length > 0 ? (
            <>
              <h4 className="text-sm font-medium mb-2">Selected Availability:</h4>
              <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
                {uniqueSelectedDates.map(date => (
                  <div key={date} className="bg-fuchsia-800/40 text-white text-xs px-2 py-1 rounded flex items-center">
                    {date.includes("-") ? format(parseISO(date), "MMM dd, yyyy") : date}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="ml-1 h-4 w-4 p-0 text-white hover:bg-fuchsia-700/30" 
                      onClick={() => onAvailabilityChange(uniqueSelectedDates.filter(d => d !== date))}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-center italic text-fuchsia-300">No dates selected yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
