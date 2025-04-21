
import { parseISO, format } from 'date-fns';

/**
 * Extracts month information from a date string in 'yyyy-MM-dd' format
 * @param dateString The date string in 'yyyy-MM-dd' format
 * @returns The month name in lowercase (e.g., 'january', 'february', etc.)
 */
export const extractMonthFromDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'MMMM').toLowerCase();
  } catch (error) {
    console.error('Error parsing date string:', dateString, error);
    return '';
  }
};

/**
 * Groups availability dates by month
 * @param dates Array of date strings in 'yyyy-MM-dd' format
 * @returns Object with months as keys and arrays of dates as values
 */
export const groupDatesByMonth = (dates: string[]): Record<string, string[]> => {
  const result: Record<string, string[]> = {};
  
  dates.forEach(dateString => {
    const month = extractMonthFromDate(dateString);
    if (month) {
      if (!result[month]) {
        result[month] = [];
      }
      result[month].push(dateString);
    }
  });
  
  return result;
};
