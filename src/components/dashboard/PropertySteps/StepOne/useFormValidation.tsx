
import { useState, useEffect } from "react";

interface FormData {
  hotelName: string;
  category: string;
  propertyType: string;
  description: string;
  country: string;
  address: string;
  city: string;
  postalCode: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  latitude: string;
  longitude: string;
}

const initialFormData: FormData = {
  hotelName: "",
  category: "",
  propertyType: "",
  description: "",
  country: "",
  address: "",
  city: "",
  postalCode: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  latitude: "",
  longitude: ""
};

const useFormValidation = (onValidationChange: (isValid: boolean) => void) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  
  const [touchedFields, setTouchedFields] = useState<Record<keyof FormData, boolean>>({
    hotelName: false,
    category: false,
    propertyType: false,
    description: false,
    country: false,
    address: false,
    city: false,
    postalCode: false,
    contactName: false,
    contactEmail: false,
    contactPhone: false,
    latitude: false,
    longitude: false
  });
  
  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    // Required fields validation
    if (!formData.hotelName) newErrors.hotelName = "Hotel name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.propertyType) newErrors.propertyType = "Property type is required";
    if (!formData.description) newErrors.description = "Description is required";
    
    // Email validation
    if (formData.contactEmail && !/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Invalid email format";
    }
    
    // Validate latitude and longitude if provided
    if (formData.latitude && isNaN(Number(formData.latitude))) {
      newErrors.latitude = "Latitude must be a valid number";
    }
    
    if (formData.longitude && isNaN(Number(formData.longitude))) {
      newErrors.longitude = "Longitude must be a valid number";
    }
    
    // Check latitude range
    if (formData.latitude && !isNaN(Number(formData.latitude))) {
      const lat = Number(formData.latitude);
      if (lat < -90 || lat > 90) {
        newErrors.latitude = "Latitude must be between -90 and 90";
      }
    }
    
    // Check longitude range
    if (formData.longitude && !isNaN(Number(formData.longitude))) {
      const lng = Number(formData.longitude);
      if (lng < -180 || lng > 180) {
        newErrors.longitude = "Longitude must be between -180 and 180";
      }
    }
    
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
