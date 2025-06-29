import React from "react";
import StayLengthSection from "./StayLengthSection";
import PreferredWeekdaySection from "./PreferredWeekdaySection";
import AvailabilitySection from "./AvailabilitySection";
import MealPlanSection from "./MealPlanSection";
import RoomsRatesSection from "./RoomsRatesSection";
import ValidationMessages from "./ValidationMessages";

interface AccommodationTermsStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const AccommodationTermsStep: React.FC<AccommodationTermsStepProps> = ({
  formData,
  updateFormData
}) => {
  const [isStayLengthOpen, setIsStayLengthOpen] = React.useState(false);
  const [isWeekdayOpen, setIsWeekdayOpen] = React.useState(false);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = React.useState(false);
  const [isMealPlanOpen, setIsMealPlanOpen] = React.useState(false);
  const [isRoomsRatesOpen, setIsRoomsRatesOpen] = React.useState(false);
  const [isValidationOpen, setIsValidationOpen] = React.useState(false);
  const [selectedDay, setSelectedDay] = React.useState(formData?.checkinDay || "monday");

  const handleDaySelect = (field: string, value: any) => {
    setSelectedDay(value);
    if (updateFormData) {
      updateFormData(field, value);
    }
  };

  return (
    <div className="space-y-6">
      <StayLengthSection
        isOpen={isStayLengthOpen}
        onToggle={setIsStayLengthOpen}
        formData={formData}
        updateFormData={updateFormData}
      />

      <PreferredWeekdaySection
        isOpen={isWeekdayOpen}
        onToggle={setIsWeekdayOpen}
        selectedDay={selectedDay}
        onDaySelect={handleDaySelect}
        formData={formData}
        updateFormData={updateFormData}
      />

      <AvailabilitySection
        isOpen={isAvailabilityOpen}
        onToggle={setIsAvailabilityOpen}
        formData={formData}
        updateFormData={updateFormData}
      />

      <MealPlanSection
        isOpen={isMealPlanOpen}
        onToggle={setIsMealPlanOpen}
        formData={formData}
        updateFormData={updateFormData}
      />

      <RoomsRatesSection
        isOpen={isRoomsRatesOpen}
        onToggle={setIsRoomsRatesOpen}
        formData={formData}
        updateFormData={updateFormData}
      />

      <ValidationMessages
        isOpen={isValidationOpen}
        onToggle={setIsValidationOpen}
        formData={formData}
        updateFormData={updateFormData}
      />
    </div>
  );
};

export default AccommodationTermsStep;
