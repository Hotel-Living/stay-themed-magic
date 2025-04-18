
import React, { useState, useEffect } from "react";
import StayLengthMealsSection from "./StayLengthMealsSection";
import PreferredWeekdaySection from "./PreferredWeekdaySection";
import RoomsRatesSection from "./RoomsRatesSection";
import ValidationMessages from "./ValidationMessages";
import RoomTypeSection from "../rooms/roomTypes/RoomTypeSection";

interface AccommodationTermsStepProps {
  onValidationChange?: (isValid: boolean, data?: any) => void;
  initialData?: {
    stayLengths?: number[];
    mealPlans?: string[];
  };
}

export default function AccommodationTermsStep({
  onValidationChange = () => {},
  initialData = { stayLengths: [], mealPlans: [] }
}: AccommodationTermsStepProps) {
  const [stayLengths, setStayLengths] = useState<number[]>(initialData.stayLengths || []);
  const [mealPlans, setMealPlans] = useState<string[]>(initialData.mealPlans || []);
  const [preferredWeekdays, setPreferredWeekdays] = useState<string[]>([]);
  const [roomTypesValid, setRoomTypesValid] = useState(false);
  const [roomTypes, setRoomTypes] = useState<any[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    // Validate form fields
    const newErrors: string[] = [];
    
    if (stayLengths.length === 0) {
      newErrors.push("Please select at least one stay length");
    }
    
    if (mealPlans.length === 0) {
      newErrors.push("Please select at least one meal plan");
    }
    
    setErrors(newErrors);
    
    // Check if form is valid (no errors and room types are valid)
    const isValid = newErrors.length === 0 && roomTypesValid;
    
    // Pass validation state and data up to parent
    onValidationChange(isValid, {
      stayLengths,
      mealPlans,
      preferredWeekdays,
      roomTypes
    });
  }, [stayLengths, mealPlans, preferredWeekdays, roomTypesValid, roomTypes, onValidationChange]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-2 text-white">ACCOMMODATION TERMS</h2>
      
      <div className="glass-card rounded-xl p-4 space-y-4 bg-[#690695]/40">
        <StayLengthMealsSection 
          stayLengths={stayLengths}
          setStayLengths={setStayLengths}
          mealPlans={mealPlans}
          setMealPlans={setMealPlans}
        />
        
        <PreferredWeekdaySection 
          preferredWeekdays={preferredWeekdays}
          setPreferredWeekdays={setPreferredWeekdays}
        />
      </div>
      
      <RoomTypeSection 
        onValidationChange={setRoomTypesValid}
        title="ROOM TYPES"
        fullWidth={true}
      />
      
      <ValidationMessages errors={errors} />
    </div>
  );
}
