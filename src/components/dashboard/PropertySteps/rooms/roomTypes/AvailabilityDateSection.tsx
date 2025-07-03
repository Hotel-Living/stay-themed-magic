
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { format, addMonths, parseISO, addDays, isBefore, isAfter, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
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
    return format(date, "MMMM yyyy", { locale: es });
  });

  const toggleMonth = (month: string) => {
    setExpandedMonths(prev => ({
      ...prev,
      [month]: !prev[month]
    }));
  };

  // Clean the selected dates to ensure only valid dates for the current weekday
  const cleanSelectedDates = (dates: string[]) => {
    const dayNum = weekdayMap[effectiveWeekday];
    const validDates = dates.filter(dateStr => {
      try {
        const date = parseISO(dateStr);
        return date.getDay() === dayNum;
      } catch {
        return false;
      }
    });
    // Remove duplicates
    return Array.from(new Set(validDates));
  };

  // Fill in dates between selected endpoints for the same weekday
  const fillDateRange = (dates: string[]) => {
    if (dates.length < 2) return dates;
    
    const dayNum = weekdayMap[effectiveWeekday];
    const sortedDates = dates
      .map(d => parseISO(d))
      .sort((a, b) => a.getTime() - b.getTime());
    
    const result = new Set(dates);
    
    // For each pair of consecutive dates, fill in the gaps
    for (let i = 0; i < sortedDates.length - 1; i++) {
      const startDate = sortedDates[i];
      const endDate = sortedDates[i + 1];
      
      let currentDate = new Date(startDate);
      
      // Move to next occurrence of the weekday
      while (currentDate < endDate) {
        currentDate.setDate(currentDate.getDate() + 7);
        if (currentDate < endDate && currentDate.getDay() === dayNum) {
          result.add(format(currentDate, "yyyy-MM-dd"));
        }
      }
    }
    
    return Array.from(result).sort();
  };

  const handleMonthSelection = (month: string) => {
    // Convert Spanish month back to Date for processing
    const monthDate = new Date(month.replace(/^(\w+)\s(\d+)$/, (match, monthName, year) => {
      const monthMap = {
        'enero': 'January',
        'febrero': 'February', 
        'marzo': 'March',
        'abril': 'April',
        'mayo': 'May',
        'junio': 'June',
        'julio': 'July',
        'agosto': 'August',
        'septiembre': 'September',
        'octubre': 'October',
        'noviembre': 'November',
        'diciembre': 'December'
      };
      return `${monthMap[monthName.toLowerCase()]} ${year}`;
    }) + " 01");
    
    const dayNum = weekdayMap[effectiveWeekday];
    const availableDates = getAvailableDatesForMonth(monthDate, dayNum).map(d => format(d, "yyyy-MM-dd"));
    
    // Clean the current selected dates first
    const cleanDates = cleanSelectedDates(selectedDates);
    
    // Check if this month is currently selected (has all its dates)
    const hasAll = availableDates.every(d => cleanDates.includes(d));
    
    if (hasAll) {
      // Remove all dates from this month
      const newSelectedDates = cleanDates.filter(date => !availableDates.includes(date));
      const filledDates = fillDateRange(newSelectedDates);
      onAvailabilityChange(filledDates);
    } else {
      // Add all dates from this month, but prevent duplicates
      const uniqueNewDates = availableDates.filter(date => !cleanDates.includes(date));
      const newSelectedDates = [...cleanDates, ...uniqueNewDates];
      const filledDates = fillDateRange(newSelectedDates);
      onAvailabilityChange(filledDates);
    }
  };

  const handleDateSelect = (date: Date | undefined, month: string) => {
    if (!date) return;
    const dateString = format(date, "yyyy-MM-dd");
    
    // Clean the current selected dates first
    const cleanDates = cleanSelectedDates(selectedDates);
    
    if (cleanDates.includes(dateString)) {
      // Remove this specific date
      const newSelectedDates = cleanDates.filter(d => d !== dateString);
      const filledDates = fillDateRange(newSelectedDates);
      onAvailabilityChange(filledDates);
    } else {
      // Add this specific date - no limit on number of dates per month
      const newSelectedDates = [...cleanDates, dateString];
      const filledDates = fillDateRange(newSelectedDates);
      onAvailabilityChange(filledDates);
    }
  };

  const isMonthSelected = (month: string) => {
    // Convert Spanish month back to Date for processing
    const monthDate = new Date(month.replace(/^(\w+)\s(\d+)$/, (match, monthName, year) => {
      const monthMap = {
        'enero': 'January',
        'febrero': 'February', 
        'marzo': 'March',
        'abril': 'April',
        'mayo': 'May',
        'junio': 'June',
        'julio': 'July',
        'agosto': 'August',
        'septiembre': 'September',
        'octubre': 'October',
        'noviembre': 'November',
        'diciembre': 'December'
      };
      return `${monthMap[monthName.toLowerCase()]} ${year}`;
    }) + " 01");
    
    const dayNum = weekdayMap[effectiveWeekday];
    const availableDates = getAvailableDatesForMonth(monthDate, dayNum).map(d => format(d, "yyyy-MM-dd"));
    const cleanDates = cleanSelectedDates(selectedDates);
    return availableDates.length > 0 && availableDates.every(d => cleanDates.includes(d));
  };

  const preferredDayNum = weekdayMap[effectiveWeekday];

  // Always use cleaned selected dates for display
  const displayDates = cleanSelectedDates(selectedDates);

  return (
    <div className="grid grid-cols-4 items-start gap-4">
      <div className="col-span-3 grid grid-cols-2 gap-4">
        <div className="bg-fuchsia-950/50 border border-white rounded-lg p-4 text-white">
          <div className="space-y-2">
            {months.map((month, idx) => {
              const monthDate = addMonths(currentDate, idx);
              return (
                <Collapsible 
                  key={month} 
                  open={expandedMonths[month] || false} 
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
                      selected={displayDates} 
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
          {displayDates.length > 0 ? (
            <>
              <h4 className="text-sm font-medium mb-2">Disponibilidad Seleccionada:</h4>
              <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
                {displayDates.map(date => (
                  <div key={date} className="bg-fuchsia-800/40 text-white text-xs px-2 py-1 rounded flex items-center">
                    {format(parseISO(date), "MMM dd, yyyy", { locale: es })}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="ml-1 h-4 w-4 p-0 text-white hover:bg-fuchsia-700/30" 
                      onClick={() => {
                        const cleanDates = cleanSelectedDates(selectedDates);
                        const newDates = cleanDates.filter(d => d !== date);
                        const filledDates = fillDateRange(newDates);
                        onAvailabilityChange(filledDates);
                      }}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-center italic text-fuchsia-300">Aún no se han seleccionado fechas</p>
          )}
        </div>
      </div>
    </div>
  );
}
