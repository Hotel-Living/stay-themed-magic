
import { addDays, isBefore, isAfter, isSameDay, format, differenceInDays } from "date-fns";

// Type for a booked stay
export interface BookedStay {
  id: string;
  roomId: string;
  startDate: Date;
  endDate: Date;
  duration: number;
}

// Type for a room with its bookings
export interface Room {
  id: string;
  roomTypeId: string;
  bookings: BookedStay[];
}

// Type for a new stay request
export interface StayRequest {
  startDate: Date;
  endDate: Date;
  duration: number;
}

// Type for a gap between bookings
interface BookingGap {
  startDate: Date;
  endDate: Date;
  size: number;
}

/**
 * Checks if a new stay overlaps with any existing bookings in a room
 */
const hasOverlap = (newStay: StayRequest, existingBookings: BookedStay[]): boolean => {
  return existingBookings.some(booking => 
    // Check if new stay's start date falls within an existing booking
    (isAfter(newStay.startDate, booking.startDate) && isBefore(newStay.startDate, booking.endDate)) ||
    // Check if new stay's end date falls within an existing booking
    (isAfter(newStay.endDate, booking.startDate) && isBefore(newStay.endDate, booking.endDate)) ||
    // Check if new stay completely contains an existing booking
    (isBefore(newStay.startDate, booking.startDate) && isAfter(newStay.endDate, booking.endDate)) ||
    // Check if new stay starts or ends exactly on existing booking dates
    isSameDay(newStay.startDate, booking.startDate) || 
    isSameDay(newStay.startDate, booking.endDate) ||
    isSameDay(newStay.endDate, booking.startDate) || 
    isSameDay(newStay.endDate, booking.endDate)
  );
};

/**
 * Sort bookings chronologically by start date
 */
const sortBookings = (bookings: BookedStay[]): BookedStay[] => {
  return [...bookings].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
};

/**
 * Find all gaps between bookings in a room
 * This includes the gap from "now" to the first booking
 * and the gap after the last booking
 */
const findGapsBetweenBookings = (bookings: BookedStay[], referenceDate: Date = new Date()): BookingGap[] => {
  // If there are no bookings, the entire future is available
  if (bookings.length === 0) {
    return [{ 
      startDate: referenceDate, 
      endDate: addDays(referenceDate, 365), // Assume 1 year availability
      size: 365 
    }];
  }
  
  // Sort bookings chronologically
  const sortedBookings = sortBookings(bookings);
  const gaps: BookingGap[] = [];
  
  // Check if there's a gap before the first booking
  if (isBefore(referenceDate, sortedBookings[0].startDate)) {
    gaps.push({
      startDate: referenceDate,
      endDate: addDays(sortedBookings[0].startDate, -1),
      size: differenceInDays(sortedBookings[0].startDate, referenceDate)
    });
  }
  
  // Find gaps between bookings
  for (let i = 0; i < sortedBookings.length - 1; i++) {
    const currentBookingEnd = sortedBookings[i].endDate;
    const nextBookingStart = sortedBookings[i + 1].startDate;
    
    // If there's at least 1 day between bookings
    if (differenceInDays(nextBookingStart, currentBookingEnd) > 1) {
      gaps.push({
        startDate: addDays(currentBookingEnd, 1),
        endDate: addDays(nextBookingStart, -1),
        size: differenceInDays(nextBookingStart, currentBookingEnd) - 1
      });
    }
  }
  
  // Check if there's a gap after the last booking (assume 1 year availability)
  const lastBooking = sortedBookings[sortedBookings.length - 1];
  gaps.push({
    startDate: addDays(lastBooking.endDate, 1),
    endDate: addDays(lastBooking.endDate, 365), // Assume 1 year availability
    size: 365
  });
  
  return gaps;
};

/**
 * Check if a stay can fit within a specific gap
 */
const stayFitsInGap = (stay: StayRequest, gap: BookingGap): boolean => {
  const stayDuration = differenceInDays(stay.endDate, stay.startDate);
  
  // Check if the stay's start date is within the gap
  const startDateInGap = 
    (isAfter(stay.startDate, gap.startDate) || isSameDay(stay.startDate, gap.startDate)) &&
    (isBefore(stay.startDate, gap.endDate) || isSameDay(stay.startDate, gap.endDate));
    
  // Check if the stay's end date is within the gap
  const endDateInGap = 
    (isAfter(stay.endDate, gap.startDate) || isSameDay(stay.endDate, gap.startDate)) &&
    (isBefore(stay.endDate, gap.endDate) || isSameDay(stay.endDate, gap.endDate));
    
  // Check if the stay encompasses the entire gap
  const stayEncompassesGap = 
    (isBefore(stay.startDate, gap.startDate) || isSameDay(stay.startDate, gap.startDate)) &&
    (isAfter(stay.endDate, gap.endDate) || isSameDay(stay.endDate, gap.endDate));
    
  return (startDateInGap && endDateInGap) || stayEncompassesGap;
};

/**
 * Check if a stay can fit in any gap in a room
 */
const stayFitsInRoom = (stay: StayRequest, room: Room): boolean => {
  // If there are no bookings, the room is available
  if (room.bookings.length === 0) return true;
  
  // If there's an overlap with existing bookings, the room is not available
  if (hasOverlap(stay, room.bookings)) return false;
  
  // Find all gaps and check if the stay fits in any of them
  const gaps = findGapsBetweenBookings(room.bookings);
  return gaps.some(gap => stayFitsInGap(stay, gap));
};

/**
 * Calculate a room score based on how efficiently it uses space
 * Higher scores mean better utilization
 */
const calculateRoomScore = (stay: StayRequest, room: Room): number => {
  // If the room can't accommodate the stay, return a very negative score
  if (!stayFitsInRoom(stay, room)) return -1000;
  
  // Start with a base score
  let score = 0;
  
  // Find all gaps in the room
  const gaps = findGapsBetweenBookings(room.bookings);
  
  // Find the best fitting gap
  let bestGap: BookingGap | null = null;
  let minWastedSpace = Number.MAX_VALUE;
  
  for (const gap of gaps) {
    if (stayFitsInGap(stay, gap)) {
      // Calculate wasted space (gap size - stay duration)
      const wastedSpace = gap.size - stay.duration;
      
      if (wastedSpace < minWastedSpace) {
        minWastedSpace = wastedSpace;
        bestGap = gap;
      }
    }
  }
  
  if (bestGap) {
    // Adjust score based on how efficiently the gap is used
    // Minimize wasted space (10 points for perfect fit, less for wasted space)
    score += Math.max(0, 10 - minWastedSpace);
    
    // Bonus for filling smaller gaps (promotes efficient room utilization)
    score += Math.max(0, 20 - bestGap.size);
    
    // Bonus for rooms with more bookings (to consolidate bookings)
    score += Math.min(10, room.bookings.length * 2);
  }
  
  return score;
};

/**
 * Finds the best room that can accommodate a new stay request
 * Uses a scoring system to prioritize efficient gap filling
 * Returns the room ID if found, or null if no suitable room exists
 */
export const findBestAvailableRoom = (
  stayRequest: StayRequest, 
  existingRooms: Room[],
  roomTypeId: string
): string | null => {
  const eligibleRooms = existingRooms.filter(room => 
    room.roomTypeId === roomTypeId && stayFitsInRoom(stayRequest, room)
  );
  
  if (eligibleRooms.length === 0) return null;
  
  // Calculate scores for each eligible room
  const roomScores = eligibleRooms.map(room => ({
    roomId: room.id,
    score: calculateRoomScore(stayRequest, room)
  }));
  
  // Sort by score in descending order
  roomScores.sort((a, b) => b.score - a.score);
  
  // Return the room with the highest score
  return roomScores[0].roomId;
};

/**
 * Finds a room that can accommodate a new stay request
 * Returns the room ID if found, or null if no suitable room exists
 */
export const findAvailableRoom = (
  stayRequest: StayRequest, 
  existingRooms: Room[],
  roomTypeId: string
): string | null => {
  // First try to find the best room based on efficient gap filling
  return findBestAvailableRoom(stayRequest, existingRooms, roomTypeId);
};

/**
 * Assigns a room for a new stay request
 * If no existing room is available, creates a new room
 */
export const assignRoom = (
  stayRequest: StayRequest, 
  existingRooms: Room[],
  roomTypeId: string
): { roomId: string; isNewRoom: boolean } => {
  // Try to find an existing room
  const availableRoomId = findAvailableRoom(stayRequest, existingRooms, roomTypeId);
  
  if (availableRoomId) {
    // We found an existing room that can accommodate the stay
    return { roomId: availableRoomId, isNewRoom: false };
  } else {
    // No existing room can accommodate the stay, so assign a new room
    const newRoomId = `room-${existingRooms.length + 1}`;
    return { roomId: newRoomId, isNewRoom: true };
  }
};

/**
 * Gets all bookings for a specific month, grouped by room
 */
export const getMonthBookings = (
  allRooms: Room[], 
  month: number, // 0-11
  year: number
): Room[] => {
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);
  
  return allRooms.map(room => ({
    ...room,
    bookings: room.bookings.filter(booking => 
      (isAfter(booking.startDate, monthStart) || isSameDay(booking.startDate, monthStart)) &&
      (isBefore(booking.startDate, monthEnd) || isSameDay(booking.startDate, monthEnd))
    )
  })).filter(room => room.bookings.length > 0);
};

/**
 * Utility to simulate booking data for visualization
 */
export const generateSampleBookings = (): Room[] => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // Create sample room data
  const rooms: Room[] = [
    {
      id: "room-1",
      roomTypeId: "single",
      bookings: [
        {
          id: "booking-1",
          roomId: "room-1",
          startDate: new Date(currentYear, currentMonth, 5),
          endDate: new Date(currentYear, currentMonth, 13),
          duration: 8
        }
      ]
    },
    {
      id: "room-2",
      roomTypeId: "single",
      bookings: [
        {
          id: "booking-2",
          roomId: "room-2",
          startDate: new Date(currentYear, currentMonth, 15),
          endDate: new Date(currentYear, currentMonth, 23),
          duration: 8
        }
      ]
    },
    {
      id: "room-3",
      roomTypeId: "double",
      bookings: [
        {
          id: "booking-3",
          roomId: "room-3",
          startDate: new Date(currentYear, currentMonth, 18),
          endDate: new Date(currentYear, currentMonth, 34),
          duration: 16
        }
      ]
    }
  ];
  
  return rooms;
};

/**
 * Format date for displaying in calendar
 */
export const formatDateForCalendar = (date: Date): string => {
  return format(date, "MMM d");
};

/**
 * Calculate the percentage of the month a booking takes up
 * and its position in the month for visualization
 */
export const calculateBookingPosition = (
  booking: BookedStay,
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

/**
 * Calculate available gaps in a room for a specific month
 * Returns the gaps as positions for visualization
 */
export const calculateAvailableGapsForMonth = (
  room: Room,
  month: number,
  year: number
): Array<{start: number; width: number}> => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month, daysInMonth);
  
  // Get all bookings for this room in this month
  const relevantBookings = room.bookings.filter(booking => {
    // Check if booking overlaps with the month
    return (
      (isAfter(booking.startDate, monthStart) || isSameDay(booking.startDate, monthStart) || 
       isAfter(monthStart, booking.startDate)) &&
      (isBefore(booking.endDate, monthEnd) || isSameDay(booking.endDate, monthEnd) || 
       isBefore(monthEnd, booking.endDate))
    );
  });
  
  if (relevantBookings.length === 0) {
    // If no bookings, the entire month is available
    return [{
      start: 0,
      width: 100
    }];
  }
  
  // Find all gaps in the month
  const sortedBookings = sortBookings(relevantBookings);
  const gaps = [];
  
  // Check for gap at the beginning of the month
  const firstBooking = sortedBookings[0];
  if (isAfter(firstBooking.startDate, monthStart)) {
    const gapDays = differenceInDays(firstBooking.startDate, monthStart);
    if (gapDays > 0) {
      gaps.push({
        start: 0,
        width: (gapDays / daysInMonth) * 100
      });
    }
  }
  
  // Check for gaps between bookings
  for (let i = 0; i < sortedBookings.length - 1; i++) {
    const currentBookingEnd = sortedBookings[i].endDate;
    const nextBookingStart = sortedBookings[i + 1].startDate;
    
    if (isAfter(nextBookingStart, currentBookingEnd)) {
      // Ensure we're only considering days within the month
      const gapStart = isAfter(currentBookingEnd, monthStart) ? 
        currentBookingEnd : monthStart;
      const gapEnd = isBefore(nextBookingStart, monthEnd) ? 
        nextBookingStart : monthEnd;
      
      if (isAfter(gapEnd, gapStart)) {
        const startDay = Math.max(1, gapStart.getDate());
        const endDay = Math.min(gapEnd.getDate(), daysInMonth);
        const start = ((startDay - 1) / daysInMonth) * 100;
        const width = ((endDay - startDay + 1) / daysInMonth) * 100;
        
        if (width > 0) {
          gaps.push({ start, width });
        }
      }
    }
  }
  
  // Check for gap at the end of the month
  const lastBooking = sortedBookings[sortedBookings.length - 1];
  if (isBefore(lastBooking.endDate, monthEnd)) {
    const gapDays = differenceInDays(monthEnd, lastBooking.endDate);
    if (gapDays > 0) {
      const startDay = lastBooking.endDate.getDate() + 1;
      const start = ((startDay - 1) / daysInMonth) * 100;
      const width = ((daysInMonth - startDay + 1) / daysInMonth) * 100;
      
      if (width > 0) {
        gaps.push({ start, width });
      }
    }
  }
  
  return gaps;
};
