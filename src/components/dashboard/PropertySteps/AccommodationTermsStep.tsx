
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
  
  const { 
    selectedMonths, 
    handleMonthToggle 
  } = useAvailabilityDates(
    formData.available_months || [], 
    updateFormData
  );

  // Standard meal plan options
  const mealPlanOptions = [
    { id: "breakfast", label: "Breakfast" },
    { id: "halfBoard", label: "Half Board (Breakfast & Dinner)" },
    { id: "fullBoard", label: "Full Board (All Meals)" },
    { id: "allInclusive", label: "All Inclusive" }
  ];
  
  // Duration options in days
  const durationOptions = [8, 16, 24, 32];

  useEffect(() => {
    // Update parent form with local state values
    updateFormData("stayLengths", stayDurations);
    updateFormData("preferredWeekday", checkinDay);
    updateFormData("mealPlans", mealPlans);
    
    // Validate the step
    const isValid = validateAccommodationTerms(
      stayDurations,
      mealPlans,
      formData.roomTypes || [],
      formData.available_months
    );
    
    onValidationChange(isValid);
  }, [stayDurations, checkinDay, mealPlans, formData.available_months, formData.roomTypes, updateFormData, onValidationChange]);

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

  const getCurrentMonthsArray = () => {
    const months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
    return months;
  };

  const handleRoomTypesValidation = (isValid: boolean) => {
    // This will be called from the RoomTypeSection component
    onValidationChange(
      isValid && 
      stayDurations.length > 0 && 
      mealPlans.length > 0 && 
      (formData.available_months?.length > 0)
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4 text-white">ACCOMMODATION TERMS</h2>

      {/* Duration Section */}
      <Card className="p-4 bg-fuchsia-950/30">
        <h3 className="font-medium mb-3">Length of Stay</h3>
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
        <h3 className="font-medium mb-3">Check-in Day</h3>
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

      {/* Available Months Section - Full functionality */}
      <Card className="p-4 bg-fuchsia-950/30">
        <h3 className="font-medium mb-3">Available Months</h3>
        <p className="text-sm text-gray-300 mb-4">Select the months when your hotel is available:</p>
        <AvailabilitySection 
          formData={formData}
          updateFormData={updateFormData}
          onValidationChange={(valid) => {
            if (!valid) {
              onValidationChange(false);
            }
          }}
        />
        {showErrors && 
          (!formData.available_months || formData.available_months.length === 0) && (
          <p className="text-red-400 text-sm mt-2">Please select at least one month</p>
        )}
      </Card>

      {/* Meal Plans Section */}
      <Card className="p-4 bg-fuchsia-950/30">
        <h3 className="font-medium mb-3">Meal Plans</h3>
        <p className="text-sm text-gray-300 mb-4">Select the meal plans you offer:</p>
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
        <h3 className="font-medium mb-3">Room Types</h3>
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
        <button
          onClick={() => {
            setShowErrors(true);
            const isValid = validateAccommodationTerms(
              stayDurations,
              mealPlans, 
              formData.roomTypes || [],
              formData.available_months
            );
            
            if (isValid) {
              toast({
                title: "Validation successful",
                description: "All required accommodation terms have been completed.",
                variant: "default"
              });
            } else {
              toast({
                title: "Validation failed",
                description: "Please complete all required fields.",
                variant: "destructive"
              });
            }
            
            onValidationChange(isValid);
          }}
          className="px-6 py-2 bg-fuchsia-600 rounded-lg text-white hover:bg-fuchsia-700"
        >
          Validate Accommodation Terms
        </button>
      </div>
    </div>
  );
};
