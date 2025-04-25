
import { useState, useEffect } from 'react';
import { format, addMonths } from 'date-fns';
import { datesToMonthNames } from '../../rooms/roomTypes/availabilityDateUtils';

type SelectedMonthsType = Record<string, boolean>;

export const useAvailabilityDates = (
  initialAvailableMonths: string[] = [],
  updateFormData?: (field: string, value: any) => void
) => {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<SelectedMonthsType>({});
  
  // Initialize from form data
  useEffect(() => {
    if (initialAvailableMonths && initialAvailableMonths.length > 0) {
      const currentDate = new Date();
      const monthsWithYear: Record<string, boolean> = {};
      
      // Generate all months for the current year and next year
      for (let i = 0; i < 24; i++) {
        const date = addMonths(currentDate, i);
        const monthYear = format(date, 'MMMM yyyy');
        monthsWithYear[monthYear] = false;
      }
      
      // Mark selected months
      initialAvailableMonths.forEach(month => {
        const normalizedMonth = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
        
        // Find the entry in monthsWithYear that matches this month
        Object.keys(monthsWithYear).forEach(monthYear => {
          if (monthYear.startsWith(normalizedMonth)) {
            monthsWithYear[monthYear] = true;
          }
        });
      });
      
      setSelectedMonths(monthsWithYear);
    }
  }, [initialAvailableMonths]);
  
  // Update form data when selectedMonths changes
  useEffect(() => {
    if (updateFormData) {
      const availableMonths = Object.entries(selectedMonths)
        .filter(([_, isSelected]) => isSelected)
        .map(([month]) => {
          const monthName = month.split(' ')[0].toLowerCase();
          return monthName;
        });
      
      updateFormData('available_months', availableMonths);
    }
  }, [selectedMonths, updateFormData]);
  
  const handleMonthToggle = (month: string, isSelected: boolean) => {
    setSelectedMonths(prev => ({
      ...prev,
      [month]: isSelected
    }));
  };
  
  const handleDateSelection = (dates: string[]) => {
    setSelectedDates(dates);
    
    // Update available_months based on the selected dates
    if (updateFormData) {
      const monthNames = datesToMonthNames(dates);
      updateFormData('available_months', monthNames);
    }
  };
  
  return {
    selectedDates,
    selectedMonths,
    handleMonthToggle,
    handleDateSelection
  };
};
