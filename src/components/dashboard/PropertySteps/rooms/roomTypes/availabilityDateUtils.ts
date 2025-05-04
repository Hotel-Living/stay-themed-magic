
import { format } from 'date-fns';

/**
 * Map day names to day numbers (0-6)
 */
export const weekdayMap: Record<string, number> = {
  "Sunday": 0,
  "Monday": 1,
  "Tuesday": 2,
  "Wednesday": 3,
  "Thursday": 4,
  "Friday": 5,
  "Saturday": 6,
};

/**
 * Reverse map of weekdayMap - maps day numbers (0-6) to day names
 */
export const weekdayNumToName: Record<number, string> = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

/**
 * Get all available dates for a specific weekday in a given month
 */
export const getAvailableDatesForMonth = (month: Date, preferredDayNum: number): Date[] => {
  const dates: Date[] = [];
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDay = new Date(year, monthIndex, 1);
  
  // Find the first occurrence of the preferred day in the month
  let currentDay = new Date(firstDay);
  while (currentDay.getDay() !== preferredDayNum) {
    currentDay.setDate(currentDay.getDate() + 1);
  }
  
  // Add all occurrences of the preferred day in the month
  while (currentDay.getMonth() === monthIndex) {
    dates.push(new Date(currentDay));
    currentDay.setDate(currentDay.getDate() + 7);
  }
  
  return dates;
};

/**
 * Get the month name from a month index
 */
export const getMonthName = (monthIndex: number): string => {
  const date = new Date(2023, monthIndex, 1);
  return format(date, 'MMMM');
};

/**
 * Converts an array of date strings to an array of month names
 */
export const datesToMonthNames = (dates: string[]): string[] => {
  if (!dates.length) return [];
  
  const monthSet = new Set<string>();
  
  dates.forEach(dateStr => {
    try {
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        // Get month name in lowercase
        const monthName = format(date, 'MMMM').toLowerCase();
        monthSet.add(monthName);
      }
    } catch (e) {
      console.error('Error parsing date:', dateStr, e);
    }
  });
  
  return Array.from(monthSet);
};

/**
 * Converts a record of selected months to an array of month names
 */
export const selectedMonthsToArray = (selectedMonths: Record<string, boolean>): string[] => {
  return Object.entries(selectedMonths)
    .filter(([_, isSelected]) => isSelected)
    .map(([month]) => {
      // Extract just the month name (without year) and lowercase it
      return month.split(' ')[0].toLowerCase();
    });
};

/**
 * Checks if a date falls within available months
 */
export const isDateInAvailableMonths = (date: Date, availableMonths: string[]): boolean => {
  if (!availableMonths || availableMonths.length === 0) return false;
  
  const monthName = format(date, 'MMMM').toLowerCase();
  return availableMonths.includes(monthName);
};

/**
 * Formats an array of available months into a readable string
 */
export const formatAvailableMonths = (availableMonths: string[]): string => {
  if (!availableMonths || availableMonths.length === 0) return 'No months selected';
  
  const capitalizedMonths = availableMonths.map(
    month => month.charAt(0).toUpperCase() + month.slice(1).toLowerCase()
  );
  
  // Sort months in calendar order
  const monthOrder = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];
  
  const sortedMonths = [...capitalizedMonths].sort(
    (a, b) => monthOrder.indexOf(a.toLowerCase()) - monthOrder.indexOf(b.toLowerCase())
  );
  
  return sortedMonths.join(', ');
};
