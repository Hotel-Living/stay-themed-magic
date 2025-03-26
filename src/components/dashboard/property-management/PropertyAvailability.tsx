
import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { AvailabilityYearSelector } from './availability/AvailabilityYearSelector';
import { WeekdaySelector } from './availability/WeekdaySelector';
import { MonthCalendarView } from './availability/MonthCalendarView';
import { Button } from '@/components/ui/button';
import { differenceInDays } from 'date-fns';

interface PropertyAvailabilityProps {
  propertyId: string | null;
}

// Valid period lengths in days
const VALID_PERIOD_LENGTHS = [8, 16, 24, 32];

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
        <div className="flex items-center justify-center p-12 border border-dashed rounded-lg">
          <div className="text-center">
            <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
            <h3 className="mt-4 text-lg font-semibold">No property selected</h3>
            <p className="text-muted-foreground">
              Select a property to manage its availability
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar with year/month selector and weekday selector */}
          <div className="lg:col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Availability Settings</CardTitle>
                <CardDescription>
                  Select available months and check-in/out weekday
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <WeekdaySelector 
                  selectedWeekday={selectedWeekday}
                  onWeekdaySelect={setSelectedWeekday}
                />
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium mb-2">AVAILABLE MONTHS</h3>
                  <AvailabilityYearSelector 
                    selectedMonths={selectedMonths}
                    onMonthSelect={handleMonthSelect}
                    onMonthExpand={handleMonthExpand}
                    expandedMonth={expandedMonth}
                  />
                </div>

                <div className="space-y-2 border-t pt-4">
                  <h3 className="text-sm font-medium mb-2">VALID PERIOD LENGTHS</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {VALID_PERIOD_LENGTHS.map(days => (
                      <div key={days} className="bg-fuchsia-950/10 p-2 rounded-md text-center">
                        <span className="text-lg font-semibold">{days}</span>
                        <span className="text-xs block">days</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    You can only set availability periods of exactly 8, 16, 24, or 32 days
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Selected Periods List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Selected Periods</CardTitle>
                <CardDescription>
                  All selected periods must start and end on {new Date(2023, 0, selectedWeekday + 1).toLocaleString('default', { weekday: 'long' })}s
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedPeriods.length > 0 ? (
                  <ul className="space-y-2">
                    {selectedPeriods.map((period, index) => {
                      const days = differenceInDays(period.end, period.start) + 1;
                      return (
                        <li key={index} className="flex justify-between items-center p-2 hover:bg-fuchsia-950/10 rounded">
                          <div>
                            <span className="text-sm">
                              {period.start.toLocaleDateString()} - {period.end.toLocaleDateString()}
                            </span>
                            <span className="text-xs text-fuchsia-400 block">
                              {days} days
                            </span>
                          </div>
                          <button 
                            onClick={() => handleRemovePeriod(index)}
                            className="text-red-500 hover:text-red-700 text-xs"
                          >
                            Remove
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-center py-4 text-sm text-muted-foreground">
                    No specific periods selected
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Month Calendar View */}
          <div className="lg:col-span-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {expandedMonth ? 
                    `${new Date(expandedMonth.year, expandedMonth.month).toLocaleString('default', { month: 'long' })} ${expandedMonth.year} Calendar` : 
                    'Detailed Calendar View'
                  }
                </CardTitle>
                <CardDescription>
                  {expandedMonth ? 
                    `Select periods of ${VALID_PERIOD_LENGTHS.join(', ')} days starting and ending on ${new Date(2023, 0, selectedWeekday + 1).toLocaleString('default', { weekday: 'long' })}s` : 
                    'Select a month to view detailed calendar'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {expandedMonth ? (
                  <MonthCalendarView 
                    year={expandedMonth.year}
                    month={expandedMonth.month}
                    selectedWeekday={selectedWeekday}
                    selectedPeriods={selectedPeriods}
                    onPeriodSelect={handlePeriodSelect}
                    validPeriodLengths={VALID_PERIOD_LENGTHS}
                  />
                ) : (
                  <div className="flex items-center justify-center p-12 border border-dashed rounded-lg">
                    <div className="text-center">
                      <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                      <h3 className="mt-4 text-base font-medium">No month selected</h3>
                      <p className="text-sm text-muted-foreground">
                        Click on the dropdown arrow next to a month to view and select specific days
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
