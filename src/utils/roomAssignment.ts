
import { addDays, isBefore, isAfter, isSameDay, format } from "date-fns";

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
 * Finds a room that can accommodate a new stay request
 * Returns the room ID if found, or null if no suitable room exists
 */
export const findAvailableRoom = (
  stayRequest: StayRequest, 
  existingRooms: Room[],
  roomTypeId: string
): string | null => {
  // First try to fit the stay into an existing room
  for (const room of existingRooms) {
    // Skip rooms of different types
    if (room.roomTypeId !== roomTypeId) continue;
    
    // Check if this room can accommodate the new stay
    if (!hasOverlap(stayRequest, room.bookings)) {
      return room.id;
    }
  }
  
  // If no existing room can accommodate the stay, return null
  // This signals that a new room should be assigned
  return null;
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
