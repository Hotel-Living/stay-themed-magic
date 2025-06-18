
import React, { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { StayDurationSection } from "./StayDurationSection";
import { CheckinDaySection } from "./CheckinDaySection";
import { AvailabilitySection } from "./AvailabilitySection";
import { MealPlansSection } from "./MealPlansSection";
import { RoomTypesSection } from "./RoomTypesSection";

interface AccommodationTermsStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export function AccommodationTermsStep({
  formData,
  updateFormData,
  onValidationChange = () => {}
}: AccommodationTermsStepProps) {
  const { t } = useTranslation();

  useEffect(() => {
    // Validate required fields for step 3
    const hasStayDurations = formData?.stayDurations && formData.stayDurations.length > 0;
    const hasCheckinDay = formData?.checkinDay;
    const hasMealPlans = formData?.mealPlans && formData.mealPlans.length > 0;
    const hasRoomTypes = formData?.roomTypes && formData.roomTypes.length > 0;
    const hasAvailableMonths = formData?.available_months && formData.available_months.length > 0;
    
    const isValid = hasStayDurations && hasCheckinDay && hasMealPlans && hasRoomTypes && hasAvailableMonths;
    onValidationChange(isValid);
  }, [formData, onValidationChange]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">{t('dashboard.accommodationTerms')}</h2>
        <p className="text-gray-300">Define stay conditions and room details</p>
      </div>

      <StayDurationSection 
        formData={formData}
        updateFormData={updateFormData}
      />

      <CheckinDaySection 
        formData={formData}
        updateFormData={updateFormData}
      />

      <AvailabilitySection 
        formData={formData}
        updateFormData={updateFormData}
      />

      <MealPlansSection 
        formData={formData}
        updateFormData={updateFormData}
      />

      <RoomTypesSection 
        formData={formData}
        updateFormData={updateFormData}
      />
    </div>
  );
}
