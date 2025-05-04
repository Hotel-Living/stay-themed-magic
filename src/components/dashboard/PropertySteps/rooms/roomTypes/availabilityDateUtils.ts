
import { format } from 'date-fns';

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
