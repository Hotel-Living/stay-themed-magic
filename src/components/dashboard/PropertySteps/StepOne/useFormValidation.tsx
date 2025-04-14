
import { useState, useEffect } from "react";

interface FormData {
  hotelName: string;
  category: string;
  propertyType: string; // Added property type field
  description: string;
  country: string;
  city: string;
  address: string;
  latitude: string;
  longitude: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

interface FormErrors {
  hotelName?: string;
  category?: string;
  propertyType?: string; // Added property type field
  description?: string;
  country?: string;
  city?: string;
  address?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
}

interface TouchedFields {
  hotelName: boolean;
  category: boolean;
  propertyType: boolean; // Added property type field
  description: boolean;
  country: boolean;
  city: boolean;
  address: boolean;
  latitude: boolean;
  longitude: boolean;
  contactName: boolean;
  contactEmail: boolean;
  contactPhone: boolean;
}

export default function useFormValidation(onValidationChange: (isValid: boolean) => void) {
  const [formData, setFormData] = useState<FormData>({
    hotelName: "",
    category: "",
    propertyType: "", // Added property type field
    description: "",
    country: "",
    city: "",
    address: "",
    latitude: "",
    longitude: "",
    contactName: "",
    contactEmail: "",
    contactPhone: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({
    hotelName: false,
    category: false,
    propertyType: false, // Added property type field
    description: false,
    country: false,
    city: false,
    address: false,
    latitude: false,
    longitude: false,
    contactName: false,
    contactEmail: false,
    contactPhone: false
  });

  // Handle input changes
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle input blur for validation
  const handleBlur = (field: string) => {
    setTouchedFields(prev => ({
      ...prev,
      [field]: true
    }));
  };

  // Validate the form data
  useEffect(() => {
    const newErrors: FormErrors = {};

    // Validate Hotel Name
    if (!formData.hotelName.trim()) {
      newErrors.hotelName = "Hotel name is required";
    } else if (formData.hotelName.length < 3) {
      newErrors.hotelName = "Hotel name must be at least 3 characters";
    }

    // Validate Category
    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    // Validate Property Type
    if (!formData.propertyType) {
      newErrors.propertyType = "Property type is required";
    }

    // Validate Description
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    // Validate Country
    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    // Validate City
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    // Validate Contact Email
    if (formData.contactEmail && !/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email address";
    }

    // Validate Contact Phone
    if (formData.contactPhone && !/^\+?[0-9]{10,15}$/.test(formData.contactPhone.replace(/[-\s]/g, ''))) {
      newErrors.contactPhone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    
    // Check if form is valid (no errors and required fields are filled)
    const isValid = Object.keys(newErrors).length === 0 && 
      formData.hotelName.trim() !== "" && 
      formData.category !== "" &&
      formData.propertyType !== "" && // Added property type field validation
      formData.description.trim() !== "" && 
      formData.country.trim() !== "" && 
      formData.city.trim() !== "";
    
    onValidationChange(isValid);
  }, [formData, onValidationChange]);

  return {
    formData,
    errors,
    touchedFields,
    handleChange,
    handleBlur
  };
}
