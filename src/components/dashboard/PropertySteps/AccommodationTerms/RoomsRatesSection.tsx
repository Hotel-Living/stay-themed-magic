
import React, { useState } from "react";
import RoomTypesSection from "./RoomRates/RoomTypesSection";
import PricesSection from "./RoomRates/PricesSection";
import AvailabilitySection from "./RoomRates/AvailabilitySection";

// Note: Only changed where necessary!
interface RoomsRatesSectionProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onValidationChange: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function RoomsRatesSection({
  isOpen,
  onOpenChange,
  onValidationChange,
  formData = {},
  updateFormData = () => {}
}: RoomsRatesSectionProps) {
  // state for which section is open, so only one open at a time
  const [openSection, setOpenSection] = useState<"roomTypes"|"prices"|"availability" | null>(null);

  // Only one validation callback is handled; you may adapt this logic as needed.
  return (
    <div className="w-full">
      <RoomTypesSection
        isOpen={openSection === "roomTypes"}
        onOpenChange={open => setOpenSection(open ? "roomTypes" : null)}
        onValidationChange={onValidationChange}
        formData={formData}
        updateFormData={updateFormData}
      />
      <PricesSection
        isOpen={openSection === "prices"}
        onOpenChange={open => setOpenSection(open ? "prices" : null)}
        onValidationChange={onValidationChange}
        formData={formData}
        updateFormData={updateFormData}
      />
      <AvailabilitySection
        isOpen={openSection === "availability"}
        onOpenChange={open => setOpenSection(open ? "availability" : null)}
        onValidationChange={onValidationChange}
        formData={formData}
        updateFormData={updateFormData}
      />
    </div>
  );
}
