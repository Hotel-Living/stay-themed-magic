
import { useState, useEffect } from "react";
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
  
  // Helper validation functions
  const validateRequiredField = (value: string, fieldName: string): string | undefined => {
    if (!value) {
      switch (fieldName) {
        case 'hotelName':
          return "Hotel name is required";
        case 'category':
          return "Category is required";
        case 'propertyType':
          return "Property type is required";
        case 'description':
          return "Description is required";
        default:
          return undefined;
      }
    }
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      return "Invalid email format";
    }
    return undefined;
  };

  const validateCoordinate = (coordinate: string, type: 'latitude' | 'longitude'): string | undefined => {
    if (!coordinate) return undefined;
    
    if (isNaN(Number(coordinate))) {
      return type === 'latitude' ? "Latitude must be a valid number" : "Longitude must be a valid number";
    }
    
    const value = Number(coordinate);
    if (type === 'latitude') {
      if (value < -90 || value > 90) {
        return "Latitude must be between -90 and 90";
      }
    } else {
      if (value < -180 || value > 180) {
        return "Longitude must be between -180 and 180";
      }
    }
    
    return undefined;
  };

  const validateImages = (images: UploadedImage[]): string | undefined => {
    if (!images || images.length === 0) {
      return "At least one hotel image is required";
    }
    return undefined;
  };
  
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
