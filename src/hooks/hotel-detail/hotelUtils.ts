
// Generate hotel amenities based on category
export const getHotelAmenities = (category?: number): string[] => {
  // Base amenities that all hotels have
  const baseAmenities = [
    "Free WiFi", 
    "Air Conditioning", 
    "Daily Housekeeping"
  ];
  
  if (!category) return baseAmenities;
  
  let amenities = [...baseAmenities];
  
  // Add more amenities based on hotel category
  if (category >= 3) {
    amenities.push("Pool", "Gym");
  }
  
  if (category >= 4) {
    amenities.push("Spa", "Room Service", "Restaurant");
  }
  
  if (category >= 5) {
    amenities.push("Concierge Service", "Valet Parking", "Business Center");
  }
  
  return amenities;
};

// Generate available months based on current date
export const getAvailableMonths = (): string[] => {
  const currentMonth = new Date().getMonth();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  // Generate next 6 available months starting from current month
  return Array.from({ length: 6 }, (_, i) => {
    const monthIndex = (currentMonth + i) % 12;
    return monthNames[monthIndex];
  });
};
