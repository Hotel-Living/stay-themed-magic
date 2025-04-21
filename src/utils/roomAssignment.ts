
import { addDays, isBefore, isAfter, isSameDay, format, differenceInDays } from "date-fns";
import { Room, BookedStay, StayRequest, BookingGap } from "@/types/booking";
import { formatDateForCalendar, calculateBookingPosition } from "@/utils/dateUtils";
import { findGapsBetweenBookings, calculateAvailableGapsForMonth, sortBookings } from "@/utils/bookingGaps";
import { 
  hasOverlap, 
  stayFitsInGap, 
  stayFitsInRoom, 
  calculateRoomScore 
} from "@/utils/roomScoring";
import { 
  findBestAvailableRoom,
  findAvailableRoom,
  assignRoom,
  getMonthBookings,
  generateSampleBookings
} from "@/utils/roomAssignmentUtils";

// Export everything needed for backward compatibility
export {
  BookedStay,
  Room,
  StayRequest,
  BookingGap,
  formatDateForCalendar,
  calculateBookingPosition,
  calculateAvailableGapsForMonth,
  findGapsBetweenBookings,
  sortBookings,
  hasOverlap,
  stayFitsInGap,
  stayFitsInRoom,
  calculateRoomScore,
  findBestAvailableRoom,
  findAvailableRoom,
  assignRoom,
  getMonthBookings,
  generateSampleBookings
};
