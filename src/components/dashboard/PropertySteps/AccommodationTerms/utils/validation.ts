export const validateAccommodationTerms = (
  stayLengths: number[],
  mealPlans: string[],
  roomTypes: any[],
  availableMonths: string[]
) => {
  const hasStayLengths = stayLengths && stayLengths.length > 0;
  const hasMealPlans = mealPlans && mealPlans.length > 0;
  const hasRoomTypes = roomTypes && roomTypes.length > 0;
  const hasAvailableMonths = availableMonths && availableMonths.length > 0;
  
  return hasStayLengths && hasMealPlans && hasRoomTypes && hasAvailableMonths;
};

export const formatMonths = (months: string[]) => {
  if (!months || months.length === 0) return "No months selected";
  
  // Capitalize month names
  const capitalizedMonths = months.map(
    month => month.charAt(0).toUpperCase() + month.slice(1).toLowerCase()
  );
  
  // Sort months in calendar order
  const monthsOrder = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const sortedMonths = [...capitalizedMonths].sort(
    (a, b) => monthsOrder.indexOf(a) - monthsOrder.indexOf(b)
  );
  
  return sortedMonths.join(", ");
};
