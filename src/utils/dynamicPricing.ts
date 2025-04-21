
/**
 * Calculates the dynamic price based on demand
 * 
 * @param basePrice - The original base price
 * @param totalNightsInMonth - Total night capacity for the month
 * @param nightsSold - How many nights have been booked so far
 * @param maxIncreasePercent - Maximum percentage increase (default: 20%)
 * @returns The dynamically adjusted price
 */
export const calculateDynamicPrice = (
  basePrice: number,
  totalNightsInMonth: number,
  nightsSold: number,
  maxIncreasePercent: number = 20
): number => {
  // Calculate how many steps to reach max increase (each step is 1%)
  const steps = maxIncreasePercent;
  
  // Calculate how many nights per 1% step
  const nightsPerStep = totalNightsInMonth / steps;
  
  // Calculate how many full steps have been reached
  const stepReached = Math.floor(nightsSold / nightsPerStep);
  
  // Calculate the percentage increase (capped at maxIncreasePercent)
  const percentIncrease = Math.min(stepReached, steps);
  
  // Calculate the final price with the increase
  const finalPrice = basePrice * (1 + percentIncrease / 100);
  
  return finalPrice;
};

/**
 * Format a price as currency
 */
export const formatCurrency = (price: number, currency: string = "USD"): string => {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: currency 
  }).format(price);
};

/**
 * Calculate total available nights for a hotel in a month
 * 
 * @param roomCount - Number of rooms
 * @param year - Year
 * @param month - Month (0-11)
 * @returns Total available room-nights in the month
 */
export const calculateTotalNightsInMonth = (
  roomCount: number,
  year: number,
  month: number
): number => {
  // Get the last day of the month to determine days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Total nights = rooms × days
  return roomCount * daysInMonth;
};

/**
 * Calculate already sold nights based on bookings
 * 
 * @param bookings - Array of booking objects with start/end dates
 * @param year - Year
 * @param month - Month (0-11)
 * @returns Total nights sold in the month
 */
export const calculateNightsSold = (
  bookings: Array<{ startDate: Date; endDate: Date }>,
  year: number,
  month: number
): number => {
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);
  
  let totalNightsSold = 0;
  
  bookings.forEach(booking => {
    // Clamp dates to month boundaries
    const bookingStart = new Date(Math.max(booking.startDate.getTime(), monthStart.getTime()));
    const bookingEnd = new Date(Math.min(booking.endDate.getTime(), monthEnd.getTime()));
    
    if (bookingEnd >= bookingStart) {
      // Calculate days between the dates
      const daysDiff = Math.ceil((bookingEnd.getTime() - bookingStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      totalNightsSold += daysDiff;
    }
  });
  
  return totalNightsSold;
};
