
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

