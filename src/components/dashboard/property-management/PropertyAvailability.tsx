
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { differenceInDays } from 'date-fns';
import { NoPropertySelected } from './availability/NoPropertySelected';
import { MainAvailabilityContent } from './availability/MainAvailabilityContent';

// Valid period lengths in days
const VALID_PERIOD_LENGTHS = [8, 16, 24, 32];

interface PropertyAvailabilityProps {
  propertyId: string | null;
}

export function PropertyAvailability({ propertyId }: PropertyAvailabilityProps) {
  const { toast } = useToast();
  const [selectedWeekday, setSelectedWeekday] = useState<number>(1); // Default to Monday (index 1)
  const [selectedMonths, setSelectedMonths] = useState<Record<string, boolean>>({});
  const [expandedMonth, setExpandedMonth] = useState<{ year: number; month: number } | null>(null);
  const [selectedPeriods, setSelectedPeriods] = useState<Array<{ start: Date; end: Date }>>([]);
  
  // Handle month selection
  const handleMonthSelect = (year: number, month: number, selected: boolean) => {
    const monthKey = `${year}-${month}`;
    setSelectedMonths({
      ...selectedMonths,
      [monthKey]: selected
    });
    
    toast({
      title: selected ? "Month added to availability" : "Month removed from availability",
      description: `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year} is now ${selected ? 'available' : 'unavailable'} for bookings.`,
    });
  };
  
  // Handle month expansion to view the detailed calendar
  const handleMonthExpand = (year: number, month: number) => {
    if (expandedMonth?.year === year && expandedMonth?.month === month) {
      setExpandedMonth(null);
    } else {
      setExpandedMonth({ year, month });
    }
  };
  
  // Handle period selection in the month view
  const handlePeriodSelect = (start: Date, end: Date | null) => {
    if (!end) return;
    
    const days = differenceInDays(end, start) + 1; // +1 to include the end day
    
    // Check if the selected period matches one of our valid periods
    if (!VALID_PERIOD_LENGTHS.includes(days)) {
      toast({
        title: "Invalid period length",
        description: `Selected period must be ${VALID_PERIOD_LENGTHS.join(', ')} days exactly. Your selection was ${days} days.`,
        variant: "destructive",
      });
      return;
    }
    
    const newPeriod = { start, end };
    setSelectedPeriods([...selectedPeriods, newPeriod]);
    
    toast({
      title: "Period added to availability",
      description: `${days}-day period from ${start.toLocaleDateString()} to ${end.toLocaleDateString()} is now available for bookings.`,
    });
  };
  
  // Remove a period
  const handleRemovePeriod = (index: number) => {
    const newPeriods = [...selectedPeriods];
    newPeriods.splice(index, 1);
    setSelectedPeriods(newPeriods);
    
    toast({
      title: "Period removed from availability",
      description: "The selected period has been removed from availability.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold">Property Availability</h3>
          <p className="text-sm text-muted-foreground">
            Set which months and specific days your property is available for booking
          </p>
        </div>
      </div>
      
      {!propertyId ? (
        <NoPropertySelected />
      ) : (
        <MainAvailabilityContent 
          selectedWeekday={selectedWeekday}
          setSelectedWeekday={setSelectedWeekday}
          selectedMonths={selectedMonths}
          handleMonthSelect={handleMonthSelect}
          expandedMonth={expandedMonth}
          handleMonthExpand={handleMonthExpand}
          selectedPeriods={selectedPeriods}
          handlePeriodSelect={handlePeriodSelect}
          handleRemovePeriod={handleRemovePeriod}
        />
      )}
    </div>
  );
}
