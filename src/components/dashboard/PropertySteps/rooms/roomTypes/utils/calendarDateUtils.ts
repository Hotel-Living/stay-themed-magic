
import { format, parseISO, isSameDay } from "date-fns";

export function getSelectedDatesInMonth(selected: string[], month: Date, preferredDayNum: number) {
  return selected
    .map(d => {
      try { return parseISO(d); } catch { return null; }
    })
    .filter(date => 
      date &&
      date.getMonth() === month.getMonth() &&
      date.getFullYear() === month.getFullYear() &&
      date.getDay() === preferredDayNum
    ) as Date[];
}

export function isCheckoutOnlyDate(date: Date, selected: string[]) {
  const allSelectedDates = selected
    .map(d => {
      try { return parseISO(d); } catch { return null; }
    })
    .filter(d => d !== null) as Date[];
  
  if (allSelectedDates.length === 0) return false;
  
  allSelectedDates.sort((a, b) => a.getTime() - b.getTime());
  
  const lastDate = allSelectedDates[allSelectedDates.length - 1];
  return isSameDay(date, lastDate);
}

export function isDateSelected(date: Date, selected: string[]) {
  try {
    return selected.some((d) => isSameDay(parseISO(d), date));
  } catch {
    return false;
  }
}
