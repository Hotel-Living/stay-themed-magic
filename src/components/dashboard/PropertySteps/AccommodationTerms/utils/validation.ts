
export const validateAccommodationTerms = (
  selectedStayLengths: number[],
  selectedMealPlans: string[],
  roomTypes: any[],
  availableMonths?: string[]
): boolean => {
  return selectedStayLengths.length > 0 && 
         selectedMealPlans.length > 0 && 
         roomTypes.length > 0 &&
         (availableMonths?.length ?? 0) > 0;
};

export const formatMonths = (months: string[]): string[] => {
  return [...new Set(months.map((month: string) => {
    if (typeof month !== 'string') return '';
    return month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
  }))].filter(Boolean);
};
