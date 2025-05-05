
import React, { useEffect } from "react";
import HotelInfoSection from "./StepOne/HotelInfo";
import LocationSection from "./StepOne/Location";
import ContactSection from "./StepOne/ContactSection";
import ValidationMessage from "./StepOne/ValidationMessage";
import useFormValidation from "./StepOne/useFormValidation";
import PicturesStep from "./PicturesStep";
import { UploadedImage } from "@/hooks/usePropertyImages";

interface FormData {
  hotelName: string;
  category: string;
  propertyType: string;
  style: string;
  description: string;
  idealGuests?: string;
  atmosphere?: string;
  perfectLocation?: string;
  country: string;
  address: string;
  city: string;
  postalCode: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  latitude: string;
  longitude: string;
  hotelImages: UploadedImage[];
  mainImageUrl: string;
}

interface StepOneProps {
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
  showHeading?: boolean;
}

export default function StepOne({
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {},
  showHeading = true
}: StepOneProps) {
  const {
    formData: localFormData,
    errors,
    touchedFields,
    handleChange,
    handleBlur,
    setFormData: setLocalFormData
  } = useFormValidation(onValidationChange);

  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      console.log("StepOne: Syncing with parent formData", {
        hotelName: formData.hotelName,
        category: formData.category,
        propertyType: formData.propertyType,
        description: formData.description,
        hasHotelImages: Boolean(formData.hotelImages),
        imageCount: formData.hotelImages?.length || 0
      });
      
      setLocalFormData({
        hotelName: formData.hotelName || '',
        category: formData.category || '',
        propertyType: formData.propertyType || '',
        style: formData.style || '',
        description: formData.description || '',
        idealGuests: formData.idealGuests || '',
        atmosphere: formData.atmosphere || '',
        perfectLocation: formData.perfectLocation || '',
        country: formData.country || '',
        address: formData.address || '',
        city: formData.city || '',
        postalCode: formData.postalCode || '',
        contactName: formData.contactName || '',
        contactEmail: formData.contactEmail || '',
        contactPhone: formData.contactPhone || '',
        latitude: formData.latitude || '',
        longitude: formData.longitude || '',
        hotelImages: formData.hotelImages || [],
        mainImageUrl: formData.mainImageUrl || ''
      });
    }
  }, [formData]);

  const handleLocalChange = (field: string, value: string) => {
    handleChange(field, value);
    updateFormData(field, value);
  };

  return (
    <div className="space-y-4 max-w-[80%]">
      {showHeading && <h2 className="text-xl font-bold mb-2 text-white">1. GENERAL INFORMATION</h2>}
      
      <div className="grid gap-3">
        <HotelInfoSection 
          formData={localFormData}
          errors={errors}
          touchedFields={touchedFields}
          handleChange={handleLocalChange}
          handleBlur={handleBlur}
        />
        
        <PicturesStep
          formData={{
            hotelImages: formData.hotelImages || [],
            mainImageUrl: formData.mainImageUrl || ''
          }}
          updateFormData={updateFormData}
        />
        
        <LocationSection
          formData={{
            country: localFormData.country,
            address: localFormData.address,
            city: localFormData.city,
            postalCode: localFormData.postalCode,
            latitude: localFormData.latitude,
            longitude: localFormData.longitude
          }}
          errors={errors}
          touchedFields={touchedFields}
          handleChange={handleLocalChange}
          handleBlur={handleBlur}
        />
        
        <ContactSection
          formData={{
            contactName: localFormData.contactName,
            contactEmail: localFormData.contactEmail,
            contactPhone: localFormData.contactPhone
          }}
          errors={errors}
          touchedFields={touchedFields}
          handleChange={handleLocalChange}
          handleBlur={handleBlur}
        />
      </div>
      
      <ValidationMessage errors={errors} />
    </div>
  );
}
