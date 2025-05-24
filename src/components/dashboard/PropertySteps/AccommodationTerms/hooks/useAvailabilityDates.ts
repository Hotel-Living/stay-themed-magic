
import { useState, useEffect } from 'react';
import { format, addMonths, eachWeekOfInterval, isSameDay } from 'date-fns';
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

    return eachWeekOfInterval({ start, end }, { weekStartsOn: 0 })
      .map(weekStart => {
        const date = new Date(weekStart);
        date.setDate(date.getDate() + ((selectedWeekday + 7 - date.getDay()) % 7));
        return date <= end ? date : null;
      })
      .filter((d): d is Date => d !== null);
  };

  const toggleMonth = (monthYear: string) => {
    const newSelectedDates = [...selectedDates];
    const allWeekdays = generateWeekdaysInMonth(monthYear);

    allWeekdays.forEach(date => {
      const dateStr = format(date, 'yyyy-MM-dd');
      const index = newSelectedDates.indexOf(dateStr);
      if (index === -1) {
        newSelectedDates.push(dateStr);
      } else {
        newSelectedDates.splice(index, 1);
      }
    });

    setSelectedDates([...new Set(newSelectedDates)].sort());
    if (updateFormData) updateFormData('availableDates', newSelectedDates);
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
