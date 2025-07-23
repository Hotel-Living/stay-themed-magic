
import React from "react";
import RoomTypesSection from "./RoomTypesSection";
import MealPlanSection from "./MealPlanSection";
import StayDurationSection from "./StayDurationSection";
import PreferredWeekdaySection from "./PreferredWeekdaySection";
import AvailabilitySection from "./AvailabilitySection";
import ValidationMessages from "./ValidationMessages";

interface AccommodationTermsStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange?: (isValid: boolean) => void;
}

const AccommodationTermsStep: React.FC<AccommodationTermsStepProps> = ({
  formData,
  updateFormData,
  onValidationChange
}) => {
  const [isRoomTypesOpen, setIsRoomTypesOpen] = React.useState(false);
  const [isMealPlanOpen, setIsMealPlanOpen] = React.useState(false);
  const [isStayDurationOpen, setIsStayDurationOpen] = React.useState(false);
  const [isWeekdayOpen, setIsWeekdayOpen] = React.useState(false);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = React.useState(false);
  const [selectedDay, setSelectedDay] = React.useState(formData?.checkinDay || "monday");

  // Validation states for all sections
  const [roomTypesValid, setRoomTypesValid] = React.useState(false);
  const [mealPlanValid, setMealPlanValid] = React.useState(false);
  const [stayDurationValid, setStayDurationValid] = React.useState(false);
  const [weekdayValid, setWeekdayValid] = React.useState(false);
  const [availabilityValid, setAvailabilityValid] = React.useState(false);

  const handleDaySelect = (field: string, value: any) => {
    setSelectedDay(value);
    if (updateFormData) {
      updateFormData(field, value);
    }
  };

  // Aggregate validation states and report to parent
  React.useEffect(() => {
    const overallValid = roomTypesValid && mealPlanValid && stayDurationValid && weekdayValid && availabilityValid;
    onValidationChange?.(overallValid);
  }, [roomTypesValid, mealPlanValid, stayDurationValid, weekdayValid, availabilityValid, onValidationChange]);

  // Check if packages exist to disable weekday changes
  const hasPackages = formData?.availabilityPackages && formData.availabilityPackages.length > 0;

  return (
    <div className="space-y-6">
      <RoomTypesSection
        isOpen={isRoomTypesOpen}
        onToggle={setIsRoomTypesOpen}
        formData={formData}
        updateFormData={updateFormData}
        onValidationChange={setRoomTypesValid}
      />

      <MealPlanSection
        isOpen={isMealPlanOpen}
        onToggle={setIsMealPlanOpen}
        formData={formData}
        updateFormData={updateFormData}
        onValidationChange={setMealPlanValid}
      />

      <StayDurationSection
        isOpen={isStayDurationOpen}
        onToggle={setIsStayDurationOpen}
        formData={formData}
        updateFormData={updateFormData}
        onValidationChange={setStayDurationValid}
      />

      <PreferredWeekdaySection
        isOpen={isWeekdayOpen}
        onToggle={setIsWeekdayOpen}
        selectedDay={selectedDay}
        onDaySelect={handleDaySelect}
        formData={formData}
        updateFormData={updateFormData}
        hasPackages={hasPackages}
        onValidationChange={setWeekdayValid}
      />

      <AvailabilitySection
        isOpen={isAvailabilityOpen}
        onToggle={setIsAvailabilityOpen}
        formData={formData}
        updateFormData={updateFormData}
        selectedDay={selectedDay}
        onValidationChange={setAvailabilityValid}
      />

      <ValidationMessages formData={formData} />
    </div>
  );
};

export default AccommodationTermsStep;
