
/**
 * Get amenities for a hotel based on category
 */
export const getHotelAmenities = (category?: number | null): string[] => {
  const baseAmenities = [
    "Free WiFi",
    "Air conditioning",
    "Workspace",
    "Kitchen",
    "Washing machine"
  ];
  
  // Add more amenities for higher category hotels
  if (category && category >= 3) {
    baseAmenities.push("Swimming pool", "Fitness center");
  }
  
  if (category && category >= 4) {
    baseAmenities.push("Spa", "Room service");
  }
  
  if (category && category >= 5) {
    baseAmenities.push("Concierge service", "Valet parking");
  }
  
  return baseAmenities;
};

/**
 * Get available months for hotel booking
 */
export const getAvailableMonths = (): string[] => {
  const currentDate = new Date();
  const months = [];
  
  // Generate the next 12 months from current date
  for (let i = 0; i < 12; i++) {
    const month = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
    const monthString = month.toLocaleString('default', { month: 'long', year: 'numeric' });
    months.push(monthString);
  }
  
  return months;
};
