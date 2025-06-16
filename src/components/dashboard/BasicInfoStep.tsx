import React, { useEffect } from "react";
import { UploadedImage } from "@/hooks/usePropertyImages";
import PicturesStep from "@/components/dashboard/PropertySteps/PicturesStep";

interface BasicInfoStepProps {
  formData: {
    hotelName?: string;
    propertyType?: string;
    description?: string;
    category?: string;
    style?: string;
    hotelImages?: UploadedImage[];
    mainImageUrl?: string;
  };
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

// This component is now just a wrapper for PicturesStep for backward compatibility
export default function BasicInfoStep({
  formData,
  updateFormData,
  onValidationChange
}: BasicInfoStepProps) {
  return (
    <PicturesStep
      formData={formData}
      updateFormData={updateFormData}
      onValidationChange={onValidationChange}
    />
  );
}
