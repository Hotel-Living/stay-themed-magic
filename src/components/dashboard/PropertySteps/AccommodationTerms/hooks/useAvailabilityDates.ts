
import { useState, useEffect } from "react";

interface UseAvailabilityDatesProps {
  formData: any;
  updateFormData?: (field: string, value: any) => void;
}

export const useAvailabilityDates = (formData: any, updateFormData?: (field: string, value: any) => void) => {
  const [availableMonths, setAvailableMonths] = useState<string[]>(
    formData?.available_months || []
  );

  useEffect(() => {
    if (formData?.available_months) {
      setAvailableMonths(formData.available_months);
    }
  }, [formData?.available_months]);

  const toggleMonth = (monthYear: string) => {
    const newMonths = availableMonths.includes(monthYear)
      ? availableMonths.filter(month => month !== monthYear)
      : [...availableMonths, monthYear];
    
    setAvailableMonths(newMonths);
    if (updateFormData) {
      updateFormData('available_months', newMonths);
    }
  };

  return {
    availableMonths,
    toggleMonth
  };
};
