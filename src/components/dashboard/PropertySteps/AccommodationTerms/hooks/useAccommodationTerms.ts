
import { useEffect } from "react";
import { useWeekdayState } from "./useWeekdayState";
import { useStayLengthState } from "./useStayLengthState";
import { useAccommodationOptions } from "./useAccommodationOptions";
import { useSectionsState } from "./useSectionsState";
import { useValidationState } from "./useValidationState";

export const useAccommodationTerms = (
  formData: any,
  updateFormData: (field: string, value: any) => void,
  onValidationChange: (isValid: boolean) => void
) => {
  const { selectedWeekday, handleWeekdayChange } = useWeekdayState({ 
    formData, 
    updateFormData 
  });

  const { selectedStayLengths, handleStayLengthChange } = useStayLengthState({ 
    formData, 
    updateFormData 
  });

  const {
    selectedMealPlans,
    roomTypes,
    handleMealPlanChange,
    handleRoomTypesChange
  } = useAccommodationOptions({ formData, updateFormData });

  const { sectionsState, toggleSection } = useSectionsState();

  const {
    error,
    setError,
    showValidationErrors,
    setShowValidationErrors,
    hasInteracted,
    setHasInteracted,
    isValid
  } = useValidationState({
    selectedStayLengths,
    selectedMealPlans,
    roomTypes,
    onValidationChange
  });

  // Log formData for debugging
  useEffect(() => {
    console.log("useAccommodationTerms - Current formData:", {
      preferredWeekday: formData.preferredWeekday,
      stayLengths: formData.stayLengths,
      mealPlans: formData.mealPlans,
      roomTypes: formData.roomTypes?.length
    });
  }, [formData]);

  return {
    sectionsState,
    validationState: {
      error,
      setError,
      showValidationErrors,
      setShowValidationErrors,
      hasInteracted,
      setHasInteracted,
      isValid
    },
    weekdayState: {
      selectedWeekday,
      handleWeekdayChange
    },
    stayLengthState: {
      selectedStayLengths,
      handleStayLengthChange
    },
    updateSectionState: toggleSection,
    updateWeekdayState: handleWeekdayChange,
    updateStayLengthState: handleStayLengthChange
  };
};
