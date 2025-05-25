
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { validateAccommodationTerms, formatMonths } from "./AccommodationTerms/utils/validation";
import { useAvailabilityDates } from "./AccommodationTerms/hooks/useAvailabilityDates";
import { weekdays } from "@/utils/constants";
import RoomTypeSection from "./rooms/roomTypes/RoomTypeSection";
import AvailabilitySection from "./AccommodationTerms/AvailabilitySection";

export interface AccommodationTermsStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export const AccommodationTermsStep: React.FC<AccommodationTermsStepProps> = ({
  formData,
  updateFormData,
  onValidationChange = () => {}
}) => {
  const { toast } = useToast();
  const [stayDurations, setStayDurations] = useState<number[]>(formData.stayLengths || []);
  const [checkinDay, setCheckinDay] = useState<string>(formData.preferredWeekday || "Monday");
  const [mealPlans, setMealPlans] = useState<string[]>(formData.mealPlans || []);
  const [showErrors, setShowErrors] = useState(false);
  const [availabilityValid, setAvailabilityValid] = useState(false);

  // Initialize availabilityDates from formData if present
  useEffect(() => {
    if (!formData.availabilityDates) {
      updateFormData("availabilityDates", []);
    }
  }, [formData, updateFormData]);

  // Standardized meal plan options using consistent kebab-case format
  const mealPlanOptions = [
    { id: "breakfast-included", label: "Breakfast Included" },
    { id: "half-board", label: "Half Board" },
    { id: "full-board", label: "Full Board" },
    { id: "all-inclusive", label: "All Inclusive" },
    { id: "laundry", label: "Laundry" },
    { id: "external-laundry", label: "External Laundry Service Available" }
  ];

  // Duration options in days
  const durationOptions = [8, 16, 24, 32];

  useEffect(() => {
    // Update parent form with local state values
    updateFormData("stayLengths", stayDurations);
    updateFormData("preferredWeekday", checkinDay);
    updateFormData("mealPlans", mealPlans);

    // Validate the step
    const isValid = validateAccommodationTerms(stayDurations, mealPlans, formData.roomTypes || [], formData.available_months);
    onValidationChange(isValid && availabilityValid);
  }, [stayDurations, checkinDay, mealPlans, formData.available_months, formData.roomTypes, updateFormData, onValidationChange, availabilityValid]);

  const toggleDuration = (duration: number) => {
    setStayDurations(prev => 
      prev.includes(duration) 
        ? prev.filter(d => d !== duration) 
        : [...prev, duration]
    );
  };

  const toggleMealPlan = (planId: string) => {
    setMealPlans(prev => 
      prev.includes(planId) 
        ? prev.filter(p => p !== planId) 
        : [...prev, planId]
    );
  };

  const handleRoomTypesValidation = (isValid: boolean) => {
    // This will be called from the RoomTypeSection component
    onValidationChange(isValid && stayDurations.length > 0 && mealPlans.length > 0 && availabilityValid);
  };

  return (
    <div className="space-y-6">
      {/* Duration Section */}
      <Card className="p-4 bg-fuchsia-950/30">
        <h3 className="font-medium mb-3">3.1- LENGTH OF STAY</h3>
        <p className="text-sm text-gray-300 mb-4">Select all the stay durations you offer:</p>
        <div className="flex flex-wrap gap-3">
          {durationOptions.map(duration => (
            <button
              key={duration}
              onClick={() => toggleDuration(duration)}
              className={`px-4 py-2 rounded-full text-sm ${
                stayDurations.includes(duration)
                  ? "bg-fuchsia-600 text-white"
                  : "bg-fuchsia-900/30 text-gray-300"
              }`}
            >
              {duration} days
            </button>
          ))}
        </div>
        {showErrors && stayDurations.length === 0 && (
          <p className="text-red-400 text-sm mt-2">Please select at least one stay duration</p>
        )}
      </Card>

      {/* Check-in Day Section */}
      <Card className="p-4 bg-fuchsia-950/30">
        <h3 className="font-medium mb-3">3.2- ONLY WEEKDAY FOR CHECK-INS / OUTS</h3>
        <p className="text-sm text-gray-300 mb-4">Select the day when guests check in/out:</p>
        <div className="flex flex-wrap gap-3">
          {weekdays.map(day => (
            <button
              key={day}
              onClick={() => setCheckinDay(day)}
              className={`px-4 py-2 rounded-full text-sm ${
                checkinDay === day
                  ? "bg-fuchsia-600 text-white"
                  : "bg-fuchsia-900/30 text-gray-300"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </Card>

      {/* Available Months Section - Using full calendar functionality */}
      <Card className="p-4 bg-fuchsia-950/30">
        <h3 className="font-medium mb-3">3.3- AVAILABILITY DATES</h3>
        
        <AvailabilitySection 
          formData={formData} 
          updateFormData={updateFormData} 
          onValidationChange={setAvailabilityValid} 
        />
        {showErrors && (!formData.available_months || formData.available_months.length === 0) && (
          <p className="text-red-400 text-sm mt-2">Please select at least one month</p>
        )}
      </Card>

      {/* Meal Plans Section */}
      <Card className="p-4 bg-fuchsia-950/30">
        <h3 className="font-medium mb-3">3.4- MEAL PLANS</h3>
        
        <div className="flex flex-wrap gap-3">
          {mealPlanOptions.map(plan => (
            <button
              key={plan.id}
              onClick={() => toggleMealPlan(plan.id)}
              className={`px-4 py-2 rounded-full text-sm ${
                mealPlans.includes(plan.id)
                  ? "bg-fuchsia-600 text-white"
                  : "bg-fuchsia-900/30 text-gray-300"
              }`}
            >
              {plan.label}
            </button>
          ))}
        </div>
        {showErrors && mealPlans.length === 0 && (
          <p className="text-red-400 text-sm mt-2">Please select at least one meal plan</p>
        )}
      </Card>

      {/* Room Types Section */}
      <Card className="p-4 bg-fuchsia-950/30">
        <h3 className="font-medium mb-3">3.5- ROOM TYPES</h3>
        <p className="text-sm text-gray-300 mb-4">Define your room types with photos and availability:</p>
        <RoomTypeSection 
          onValidationChange={handleRoomTypesValidation} 
          formData={formData} 
          updateFormData={updateFormData} 
          fullWidth={true} 
          showHeader={false} 
        />
        {showErrors && (!formData.roomTypes || formData.roomTypes.length === 0) && (
          <p className="text-red-400 text-sm mt-2">Please add at least one room type</p>
        )}
      </Card>

      {/* Validation Button */}
      <div className="mt-6">
        
      </div>
    </div>
  );
};
