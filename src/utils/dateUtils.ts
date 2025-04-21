
import { format, isAfter, isBefore, isSameDay, differenceInDays } from "date-fns";

/**
 * Format date for displaying in calendar
 */
export const formatDateForCalendar = (date: Date): string => {
  return format(date, "MMM d");
};

/**
 * Check if two date ranges overlap
 */
export const dateRangesOverlap = (
  startA: Date,
  endA: Date,
  startB: Date,
  endB: Date
): boolean => {
  return (
    // Check if range A starts during range B
    (isAfter(startA, startB) && isBefore(startA, endB)) ||
    // Check if range A ends during range B
    (isAfter(endA, startB) && isBefore(endA, endB)) ||
    // Check if range A contains range B
    (isBefore(startA, startB) && isAfter(endA, endB)) ||
    // Check if dates exactly match
    isSameDay(startA, startB) || 
    isSameDay(startA, endB) ||
    isSameDay(endA, startB) || 
    isSameDay(endA, endB)
  );
};

/**
 * Calculate the percentage of the month a booking takes up
 * and its position in the month for visualization
 */
export const calculateBookingPosition = (
  booking: { startDate: Date; endDate: Date },
  month: number,
  year: number
): { start: number; width: number } => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Calculate start day (clamped to beginning of month)
  const startDay = booking.startDate.getMonth() === month ? 
    Math.min(booking.startDate.getDate(), daysInMonth) : 1;
  
  // Calculate end day (clamped to end of month)
  const rawEndDay = booking.endDate.getDate();
  const endDay = booking.endDate.getMonth() === month ? 
    Math.min(rawEndDay, daysInMonth) : daysInMonth;
  
  // Calculate position and width as percentages
  const start = ((startDay - 1) / daysInMonth) * 100;
  const width = ((endDay - startDay + 1) / daysInMonth) * 100;
  
  return { start, width };
};
