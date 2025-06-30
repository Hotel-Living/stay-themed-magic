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
}

const AccommodationTermsStep: React.FC<AccommodationTermsStepProps> = ({
  formData,
  updateFormData
}) => {
  const [isRoomTypesOpen, setIsRoomTypesOpen] = React.useState(false);
  const [isMealPlanOpen, setIsMealPlanOpen] = React.useState(false);
  const [isStayDurationOpen, setIsStayDurationOpen] = React.useState(false);
  const [isWeekdayOpen, setIsWeekdayOpen] = React.useState(false);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = React.useState(false);
  const [selectedDay, setSelectedDay] = React.useState(formData?.checkinDay || "monday");

  const handleDaySelect = (field: string, value: any) => {
    setSelectedDay(value);
    if (updateFormData) {
      updateFormData(field, value);
    }
  };

  // Check if packages exist to disable weekday changes
  const hasPackages = formData?.availabilityPackages && formData.availabilityPackages.length > 0;

  return (
    <div className="space-y-6">
      <RoomTypesSection
        isOpen={isRoomTypesOpen}
        onToggle={setIsRoomTypesOpen}
        formData={formData}
        updateFormData={updateFormData}
      />

      <MealPlanSection
        isOpen={isMealPlanOpen}
        onToggle={setIsMealPlanOpen}
        formData={formData}
        updateFormData={updateFormData}
      />

      <StayDurationSection
        isOpen={isStayDurationOpen}
        onToggle={setIsStayDurationOpen}
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
        hasPackages={hasPackages}
      />

      <AvailabilitySection
        isOpen={isAvailabilityOpen}
        onToggle={setIsAvailabilityOpen}
        formData={formData}
        updateFormData={updateFormData}
        selectedDay={selectedDay}
      />

      <ValidationMessages formData={formData} />
    </div>
  );
};

export default AccommodationTermsStep;
