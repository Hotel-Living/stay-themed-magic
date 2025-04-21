
import { formatDateForCalendar, calculateBookingPosition } from "@/utils/dateUtils";
import { findGapsBetweenBookings, calculateAvailableGapsForMonth, sortBookings } from "@/utils/bookingGaps";
import {
  hasOverlap,
  stayFitsInGap,
  stayFitsInRoom,
  calculateRoomScore,
} from "@/utils/roomScoring";
import {
  findBestAvailableRoom,
  findAvailableRoom,
  assignRoom,
} from "@/utils/roomAssignmentLogic";
import {
  getMonthBookings,
  generateSampleBookings,
} from "@/utils/bookingManagement";

// Export all logic and utilities for backward compatibility
export { formatDateForCalendar, calculateBookingPosition };
export { findGapsBetweenBookings, calculateAvailableGapsForMonth, sortBookings };
export { hasOverlap, stayFitsInGap, stayFitsInRoom, calculateRoomScore };
export { findBestAvailableRoom, findAvailableRoom, assignRoom };
export { getMonthBookings, generateSampleBookings };

// Type re-exports, using `export type`
export type { BookedStay, Room, StayRequest, BookingGap } from "@/types/booking";
