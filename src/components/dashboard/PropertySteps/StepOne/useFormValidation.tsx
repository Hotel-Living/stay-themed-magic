import { useState, useEffect } from "react";
import { UploadedImage } from "@/hooks/usePropertyImages";
import { validateRequiredField, validateEmail, validateCoordinate, validateImages } from "@/utils/validators";

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

const initialFormData: FormData = {
  hotelName: "",
  category: "",
  propertyType: "",
  style: "",
  description: "",
  idealGuests: "",
  atmosphere: "",
  perfectLocation: "",
  country: "",
  address: "",
  city: "",
  postalCode: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  latitude: "",
  longitude: "",
  hotelImages: [],
  mainImageUrl: ""
};

const useFormValidation = (onValidationChange: (isValid: boolean) => void) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  
  const [touchedFields, setTouchedFields] = useState<Record<keyof FormData, boolean>>({
    hotelName: false,
    category: false,
    propertyType: false,
    style: false,
    description: false,
    idealGuests: false,
    atmosphere: false,
    perfectLocation: false,
    country: false,
    address: false,
    city: false,
    postalCode: false,
    contactName: false,
    contactEmail: false,
    contactPhone: false,
    latitude: false,
    longitude: false,
    hotelImages: false,
    mainImageUrl: false
  });
  
  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    // Validate required fields
    newErrors.hotelName = validateRequiredField(formData.hotelName, 'hotelName');
    newErrors.category = validateRequiredField(formData.category, 'category');
    newErrors.propertyType = validateRequiredField(formData.propertyType, 'propertyType');
    newErrors.description = validateRequiredField(formData.description, 'description');
    
    // Validate email
    newErrors.contactEmail = validateEmail(formData.contactEmail);
    
    // Validate coordinates
    newErrors.latitude = validateCoordinate(formData.latitude, 'latitude');
    newErrors.longitude = validateCoordinate(formData.longitude, 'longitude');
    
    // Validate images
    newErrors.hotelImages = validateImages(formData.hotelImages);
    
    // Remove undefined errors
    Object.keys(newErrors).forEach(key => {
      if (newErrors[key as keyof FormData] === undefined) {
        delete newErrors[key as keyof FormData];
      }
    });
    
    setErrors(newErrors);
    
    // Check if form is valid (no errors)
    const isValid = Object.keys(newErrors).length === 0;
    onValidationChange(isValid);
    
    return isValid;
  };
  
  useEffect(() => {
    validateForm();
  }, [formData]);
  
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleBlur = (field: string) => {
    setTouchedFields(prev => ({
      ...prev,
      [field]: true
    }));
  };
  
  return {
    formData,
    setFormData,
    errors,
    touchedFields,
    handleChange,
    handleBlur,
    validateForm
  };
};

export default useFormValidation;
