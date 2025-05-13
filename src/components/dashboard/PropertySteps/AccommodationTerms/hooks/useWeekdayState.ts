
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface UseWeekdayStateProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export const useWeekdayState = ({ formData, updateFormData }: UseWeekdayStateProps) => {
  const [selectedWeekday, setSelectedWeekday] = useState<string>(formData.preferredWeekday || "Monday");
  const { toast } = useToast();

  useEffect(() => {
    if (formData.preferredWeekday) {
      setSelectedWeekday(formData.preferredWeekday);
    }
  }, [formData]);

  const handleWeekdayChange = (weekday: string) => {
    setSelectedWeekday(weekday);
    updateFormData('preferredWeekday', weekday);
    
    const event = new CustomEvent('preferredWeekdayUpdated', { detail: weekday });
    window.dispatchEvent(event);
    
    toast("Weekday Updated", {
      description: `Preferred check-in/out day set to ${weekday}.`
    });
  };

  return {
    selectedWeekday,
    handleWeekdayChange
  };
};
