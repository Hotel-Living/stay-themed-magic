
import { addDays, getDay, startOfMonth, endOfMonth, format } from "date-fns";

export const weekdayMap: Record<string, number> = {
  "Monday": 1,
  "Tuesday": 2,
  "Wednesday": 3,
  "Thursday": 4,
  "Friday": 5,
  "Saturday": 6,
  "Sunday": 0,
};

export function getAvailableDatesForMonth(monthDate: Date, preferredDayNum: number) {
  const dates: Date[] = [];
  let d = startOfMonth(monthDate);
  const end = endOfMonth(monthDate);
  // Find the first occurrence of preferred weekday in the month
  while (getDay(d) !== preferredDayNum) {
    d = addDays(d, 1);
  }
  while (d <= end) {
    dates.push(new Date(d));
    d = addDays(d, 7);
  }
  return dates;
}

// Helper function to extract month name from date
export function getMonthName(date: Date): string {
  return format(date, "MMMM").toLowerCase();
}

// Convert an array of dates to month names
export function datesToMonthNames(dates: string[]): string[] {
  if (!dates || dates.length === 0) return [];
  
  const uniqueMonths = new Set<string>();
  
  dates.forEach(dateStr => {
    try {
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        const monthName = format(date, "MMMM").toLowerCase();
        uniqueMonths.add(monthName);
      }
    } catch (error) {
      console.error("Error parsing date:", error);
    }
  });
  
  return Array.from(uniqueMonths);
}

// Convert month selections to available_months array
export function selectedMonthsToArray(selectedMonths: Record<string, boolean>): string[] {
  if (!selectedMonths) return [];
  
  return Object.entries(selectedMonths)
    .filter(([_, isSelected]) => isSelected)
    .map(([month]) => {
      // Extract just the month name without year
      const monthMatch = month.match(/^([A-Za-z]+)/);
      return monthMatch ? monthMatch[1].toLowerCase() : month.toLowerCase();
    });
}
