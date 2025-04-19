
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
  testField: string; // Added the testField to FormData interface
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
  testField: "" // Added initial value for testField
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
    testField: false // Added testField to touchedFields
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

    setErrors(newErrors);

    // Check if form is valid (no errors)
    const isValid = Object.keys(newErrors).length === 0;
    onValidationChange(isValid);

    return isValid;
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBlur = (field: keyof FormData) => {
    setTouchedFields((prev) => ({
      ...prev,
      [field]: true
    }));
    validateForm();
  };

  return {
    formData,
    setFormData,
    errors,
    touchedFields,
    handleChange,
    handleBlur
  };
};

export default useFormValidation;
