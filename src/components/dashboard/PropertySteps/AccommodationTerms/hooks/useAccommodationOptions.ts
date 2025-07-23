
import { useState, useEffect } from "react";

interface UseAccommodationOptionsProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export const useAccommodationOptions = ({ formData, updateFormData }: UseAccommodationOptionsProps) => {
  const [selectedMealPlans, setSelectedMealPlans] = useState<string[]>(
    formData.mealPlans?.length ? formData.mealPlans : []
  );
  const [roomTypes, setRoomTypes] = useState<any[]>(formData.roomTypes || []);

  useEffect(() => {
    if (formData.mealPlans && formData.mealPlans.length > 0) {
      setSelectedMealPlans(formData.mealPlans);
    }
    
    if (formData.roomTypes && formData.roomTypes.length > 0) {
      setRoomTypes(formData.roomTypes);
    }
  }, [formData]);

  const handleMealPlanChange = (plans: string[]) => {
    setSelectedMealPlans(plans);
    updateFormData('mealPlans', plans);
  };

  const handleRoomTypesChange = (updatedRoomTypes: any[]) => {
    setRoomTypes(updatedRoomTypes);
    updateFormData('roomTypes', updatedRoomTypes);
  };

  return {
    selectedMealPlans,
    roomTypes,
    handleMealPlanChange,
    handleRoomTypesChange
  };
};
