
import { useState, useEffect } from 'react';
import { format, addMonths, eachDayOfInterval, isSameDay } from 'date-fns';
import { datesToMonthNames, selectedMonthsToArray } from '../../rooms/roomTypes/availabilityDateUtils';

type SelectedMonthsType = Record<string, boolean>;

export const useAvailabilityDates = (
  initialAvailableMonths: string[] = [],
  updateFormData?: (field: string, value: any) => void,
  selectedWeekday: number = 1 // Monday by default
) => {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<SelectedMonthsType>({});

  // Initialize months
  useEffect(() => {
    const currentDate = new Date();
    const monthsWithYear: Record<string, boolean> = {};
    for (let i = 0; i < 24; i++) {
      const date = addMonths(currentDate, i);
      const monthYear = format(date, 'MMMM yyyy');
      monthsWithYear[monthYear] = false;
    }
    setSelectedMonths(monthsWithYear);
  }, []);

  // Generate all matching weekdays in a month
  const generateWeekdaysInMonth = (monthYear: string): Date[] => {
    const [monthName, yearStr] = monthYear.split(' ');
    const monthIndex = new Date(`${monthName} 1, ${yearStr}`).getMonth();
    const year = parseInt(yearStr);

    const start = new Date(year, monthIndex, 1);
    const end = new Date(year, monthIndex + 1, 0);

    const allDays = eachDayOfInterval({ start, end });
    return allDays.filter(date => date.getDay() === selectedWeekday);
  };

  const toggleMonth = (monthYear: string) => {
    const weekdays = generateWeekdaysInMonth(monthYear);
    const newDates = [...selectedDates];

    weekdays.forEach(date => {
      const dateStr = format(date, 'yyyy-MM-dd');
      const index = newDates.indexOf(dateStr);
      if (index === -1) {
        newDates.push(dateStr);
      } else {
        newDates.splice(index, 1);
      }
    });

    const uniqueSorted = Array.from(new Set(newDates)).sort();
    setSelectedDates(uniqueSorted);
    if (updateFormData) updateFormData('availableDates', uniqueSorted);
  };

  const removeDate = (dateStr: string) => {
    const filtered = selectedDates.filter(d => d !== dateStr);
    setSelectedDates(filtered);
    if (updateFormData) updateFormData('availableDates', filtered);
  };

  return {
    selectedDates,
    setSelectedDates,
    selectedMonths,
    setSelectedMonths,
    toggleMonth,
    removeDate,
    generateWeekdaysInMonth
  };
};
