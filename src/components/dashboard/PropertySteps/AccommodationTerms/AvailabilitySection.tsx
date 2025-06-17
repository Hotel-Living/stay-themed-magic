
import React from "react";
import AvailabilityDateSection from "../rooms/roomTypes/AvailabilityDateSection";

interface AvailabilitySectionProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
  onValidationChange?: (isValid: boolean) => void;
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  formData,
  updateFormData,
  onValidationChange
}) => {
  const handleAvailabilityChange = (dates: string[]) => {
    if (updateFormData) {
      updateFormData('availabilityDates', dates);
    }
    
    // Validate - at least one date should be selected
    if (onValidationChange) {
      onValidationChange(dates.length > 0);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-300 mb-4">
        Seleccione fechas específicas de check-in (solo los lunes) o meses completos:
      </p>
      
      <AvailabilityDateSection
        preferredWeekday={formData?.preferredWeekday || "Monday"}
        onAvailabilityChange={handleAvailabilityChange}
        selectedDates={formData?.availabilityDates || []}
      />
    </div>
  );
};

export default AvailabilitySection;
