
export const useStepFiveValidation = (formData: any) => {
  // Check if room types, meal plans, and stay lengths all exist and have valid values
  const hasValidRoomTypes = formData?.roomTypes && Array.isArray(formData.roomTypes) && formData.roomTypes.length > 0;
  const hasValidMealPlans = formData?.mealPlans && Array.isArray(formData.mealPlans) && formData.mealPlans.length > 0;
  const hasValidStayLengths = formData?.stayLengths && Array.isArray(formData.stayLengths) && formData.stayLengths.length > 0;
  
  // Only render price tables if all three conditions are met
  const shouldRenderPriceTables = hasValidRoomTypes && hasValidMealPlans && hasValidStayLengths;
  
  return {
    hasValidRoomTypes,
    hasValidMealPlans,
    hasValidStayLengths,
    shouldRenderPriceTables
  };
};
