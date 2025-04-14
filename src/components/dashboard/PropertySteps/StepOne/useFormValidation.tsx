
import { useState, useEffect } from "react";

interface FormData {
  hotelName: string;
  category: string;
  propertyType: string; 
  description: string;
  country: string;
  city: string;
  address: string;
  latitude: string;
  longitude: string;
  postalCode: string; // Add the missing postalCode field
  contactName: string;
  contactEmail: string; // Changed from email to contactEmail
  contactPhone: string; // Changed from phone to contactPhone
}

interface FormErrors {
  hotelName?: string;
  category?: string;
  propertyType?: string;
  description?: string;
  country?: string;
  city?: string;
  address?: string;
  postalCode?: string; // Add postalCode error
  contactName?: string;
  contactEmail?: string; // Changed from email to contactEmail
  contactPhone?: string; // Changed from phone to contactPhone
  [key: string]: string | undefined; // Add index signature to make it assignable to Record<string, string>
}

interface TouchedFields {
  hotelName: boolean;
  category: boolean;
  propertyType: boolean;
  description: boolean;
  country: boolean;
  city: boolean;
  address: boolean;
  latitude: boolean;
  longitude: boolean;
  postalCode: boolean; // Add postalCode touched field
  contactName: boolean;
  contactEmail: boolean; // Changed from email to contactEmail
  contactPhone: boolean; // Changed from phone to contactPhone
  [key: string]: boolean; // Add index signature to make it assignable to Record<string, boolean>
}

export default function useFormValidation(onValidationChange: (isValid: boolean) => void) {
  const [formData, setFormData] = useState<FormData>({
    hotelName: "",
    category: "",
    propertyType: "",
    description: "",
    country: "",
    city: "",
    address: "",
    latitude: "",
    longitude: "",
    postalCode: "", // Add postalCode initialization
    contactName: "",
    contactEmail: "", // Changed from email to contactEmail
    contactPhone: "" // Changed from phone to contactPhone
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({
    hotelName: false,
    category: false,
    propertyType: false,
    description: false,
    country: false,
    city: false,
    address: false,
    latitude: false,
    longitude: false,
    postalCode: false, // Add postalCode touched initialization
    contactName: false,
    contactEmail: false, // Changed from email to contactEmail
    contactPhone: false // Changed from phone to contactPhone
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
      formData.propertyType !== "" && 
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
