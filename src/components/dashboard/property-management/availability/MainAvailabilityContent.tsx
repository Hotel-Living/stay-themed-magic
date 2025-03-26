
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { WeekdaySelector } from './WeekdaySelector';
import { AvailabilityYearSelector } from './AvailabilityYearSelector';
import { MonthCalendarView } from './MonthCalendarView';
import { SelectedPeriodsCard } from './SelectedPeriodsCard';
import { DetailedCalendarPlaceholder } from './DetailedCalendarPlaceholder';

// Valid period lengths in days
const VALID_PERIOD_LENGTHS = [8, 16, 24, 32];

interface MainAvailabilityContentProps {
  selectedWeekday: number;
  setSelectedWeekday: (weekday: number) => void;
  selectedMonths: Record<string, boolean>;
  handleMonthSelect: (year: number, month: number, selected: boolean) => void;
  expandedMonth: { year: number; month: number } | null;
  handleMonthExpand: (year: number, month: number) => void;
  selectedPeriods: Array<{ start: Date; end: Date }>;
  handlePeriodSelect: (start: Date, end: Date | null) => void;
  handleRemovePeriod: (index: number) => void;
}

export function MainAvailabilityContent({
  selectedWeekday,
  setSelectedWeekday,
  selectedMonths,
  handleMonthSelect,
  expandedMonth,
  handleMonthExpand,
  selectedPeriods,
  handlePeriodSelect,
  handleRemovePeriod
}: MainAvailabilityContentProps) {
  return (
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
        <SelectedPeriodsCard
          selectedPeriods={selectedPeriods}
          selectedWeekday={selectedWeekday}
          onRemovePeriod={handleRemovePeriod}
        />
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
              <DetailedCalendarPlaceholder />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
