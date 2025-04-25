
import React, { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface MonthSelectionSectionProps {
  selectedMonths: string[];
  onChange: (months: string[]) => void;
}

export function MonthSelectionSection({ 
  selectedMonths = [], 
  onChange 
}: MonthSelectionSectionProps) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleMonthToggle = (month: string) => {
    if (selectedMonths.includes(month)) {
      onChange(selectedMonths.filter(m => m !== month));
    } else {
      onChange([...selectedMonths, month]);
    }
  };

  return (
    <Card className="p-4 bg-fuchsia-900/10 rounded">
      <h3 className="text-sm font-medium mb-4 uppercase">Available Months</h3>
      <p className="text-sm mb-4">Select the months when your property is available for rent</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {months.map(month => (
          <div key={month} className="flex items-center space-x-2">
            <Checkbox 
              id={`month-${month}`}
              checked={selectedMonths.includes(month)}
              onCheckedChange={() => handleMonthToggle(month)}
              className="border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50"
            />
            <Label 
              htmlFor={`month-${month}`}
              className="text-sm text-white"
            >
              {month}
            </Label>
          </div>
        ))}
      </div>
    </Card>
  );
}
