
import React, { useState, useEffect } from "react";
import LocationStep from "./LocationStep";
import HotelInfoSection from "./StepOne/HotelInfo/HotelInfoSection";
import PicturesStep from "./PicturesStep";
import { useTranslation } from "@/hooks/useTranslation";

interface StepOneProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange?: (isValid: boolean) => void;
  showHeading?: boolean;
}

export default function StepOne({
  formData,
  updateFormData,
  onValidationChange = () => {},
  showHeading = true
}: StepOneProps) {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({
    hotelName: false,
    category: false,
    propertyType: false,
    style: false,
    description: false,
    country: false,
    city: false,
    address: false
  });

  const validateField = (field: string, value: any): string => {
    switch (field) {
      case 'hotelName':
        return !value || value.trim().length === 0 ? 'Hotel name is required' : '';
      case 'category':
        return !value ? 'Category is required' : '';
      case 'propertyType':
        return !value ? 'Property type is required' : '';
      case 'style':
        return !value ? 'Property style is required' : '';
      case 'description':
        return !value || value.trim().length === 0 ? 'Description is required' : '';
      case 'country':
        return !value ? 'Country is required' : '';
      case 'city':
        return !value || value.trim().length === 0 ? 'City is required' : '';
      case 'address':
        return !value || value.trim().length === 0 ? 'Address is required' : '';
      default:
        return '';
    }
  };

  const handleChange = (field: string, value: string) => {
    updateFormData(field, value);
    
    if (touchedFields[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: string) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  useEffect(() => {
    const requiredFields = ['hotelName', 'category', 'propertyType', 'style', 'description', 'country', 'city', 'address'];
    const hasErrors = Object.values(errors).some(error => error !== '');
    const allFieldsFilled = requiredFields.every(field => {
      const value = formData[field];
      return value && (typeof value === 'string' ? value.trim().length > 0 : true);
    });
    
    const hasImages = formData.hotelImages && formData.hotelImages.length > 0;
    const isValid = allFieldsFilled && !hasErrors && hasImages;
    
    onValidationChange(isValid);
  }, [formData, errors, onValidationChange]);

  return (
    <div className="space-y-8 max-w-[80%]">
      {showHeading && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">{t('dashboard.generalInformation')}</h2>
          <p className="text-gray-300">Basic details about your property</p>
        </div>
      )}

      <PicturesStep 
        formData={formData}
        updateFormData={updateFormData}
      />

      <HotelInfoSection
        formData={formData}
        errors={errors}
        touchedFields={touchedFields}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />

      <LocationStep
        formData={formData}
        updateFormData={updateFormData}
        errors={errors}
        touchedFields={touchedFields}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
    </div>
  );
}
