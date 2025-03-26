
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar, Check, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface AvailabilityYearSelectorProps {
  selectedMonths: Record<string, boolean>;
  onMonthSelect: (year: number, month: number, selected: boolean) => void;
  onMonthExpand: (year: number, month: number) => void;
  expandedMonth: { year: number; month: number } | null;
}

export function AvailabilityYearSelector({
  selectedMonths,
  onMonthSelect,
  onMonthExpand,
  expandedMonth
}: AvailabilityYearSelectorProps) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const nextYear = currentYear + 1;
  
  const [expandedYear, setExpandedYear] = useState<number | null>(currentYear);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const toggleYear = (year: number) => {
    setExpandedYear(expandedYear === year ? null : year);
  };
  
  const isMonthSelected = (year: number, month: number) => {
    return selectedMonths[`${year}-${month}`] || false;
  };
  
  const isMonthExpanded = (year: number, month: number) => {
    return expandedMonth?.year === year && expandedMonth?.month === month;
  };

  const renderYear = (year: number) => {
    const isExpanded = expandedYear === year;
    const startMonth = year === currentYear ? currentDate.getMonth() : 0;
    
    return (
      <Collapsible 
        open={isExpanded} 
        onOpenChange={() => toggleYear(year)}
        className="border border-fuchsia-800/30 rounded-lg mb-2 overflow-hidden"
      >
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full flex justify-between items-center p-3 text-left"
          >
            <span className="font-medium">{year}</span>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="px-2 pb-2">
          {monthNames.slice(startMonth).map((monthName, index) => {
            const actualMonthIndex = startMonth + index;
            const monthKey = `${year}-${actualMonthIndex}`;
            const isSelected = isMonthSelected(year, actualMonthIndex);
            const isExpandedMonth = isMonthExpanded(year, actualMonthIndex);
            
            return (
              <div key={monthKey} className="flex items-center justify-between py-1 px-2 rounded hover:bg-fuchsia-950/20">
                <div className="flex items-center">
                  <Checkbox
                    id={monthKey}
                    checked={isSelected}
                    onCheckedChange={(checked) => {
                      onMonthSelect(year, actualMonthIndex, !!checked);
                    }}
                    className="mr-2 border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50"
                  />
                  <label htmlFor={monthKey} className="text-sm cursor-pointer">
                    {monthName}
                  </label>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMonthExpand(year, actualMonthIndex)}
                  className="p-0 h-6 w-6"
                >
                  {isExpandedMonth ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
            );
          })}
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <div className="space-y-2">
      {renderYear(currentYear)}
      {renderYear(nextYear)}
    </div>
  );
}
