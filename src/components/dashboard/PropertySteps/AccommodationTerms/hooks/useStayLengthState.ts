
import { useState, useEffect } from "react";
import { saveSelectedStayLengths } from "@/utils/stayLengthsContext";

interface UseStayLengthStateProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export const useStayLengthState = ({ formData, updateFormData }: UseStayLengthStateProps) => {
  const [selectedStayLengths, setSelectedStayLengths] = useState<number[]>(
    formData.stayLengths?.length ? formData.stayLengths : []
  );

  useEffect(() => {
    if (formData.stayLengths && formData.stayLengths.length > 0) {
      setSelectedStayLengths(formData.stayLengths);
      saveSelectedStayLengths(formData.stayLengths);
    }
  }, [formData]);

  const handleStayLengthChange = (lengths: number[]) => {
    setSelectedStayLengths(lengths);
    updateFormData('stayLengths', lengths);
    saveSelectedStayLengths(lengths);
    
    const event = new CustomEvent('stayLengthsUpdated', { detail: lengths });
    window.dispatchEvent(event);
  };

  return {
    selectedStayLengths,
    handleStayLengthChange
  };
};
