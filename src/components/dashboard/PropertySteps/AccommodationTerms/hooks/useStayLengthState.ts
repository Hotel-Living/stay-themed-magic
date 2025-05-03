
import { useState, useEffect } from "react";
import { saveSelectedStayLengths } from "@/utils/stayLengthsContext";
import { toast } from "sonner";

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
      console.log("useStayLengthState - Loading stay lengths:", formData.stayLengths);
      setSelectedStayLengths(formData.stayLengths);
      saveSelectedStayLengths(formData.stayLengths);
    }
  }, [formData.stayLengths]);

  const handleStayLengthChange = (lengths: number[]) => {
    console.log("Updating stay lengths:", lengths);
    setSelectedStayLengths(lengths);
    updateFormData('stayLengths', lengths);
    saveSelectedStayLengths(lengths);
    
    // Dispatch event to notify other components
    const event = new CustomEvent('stayLengthsUpdated', { detail: lengths });
    window.dispatchEvent(event);
    
    // Show toast for user feedback
    toast.success(`Stay durations updated: ${lengths.join(', ')} days`);
  };

  return {
    selectedStayLengths,
    handleStayLengthChange
  };
};
