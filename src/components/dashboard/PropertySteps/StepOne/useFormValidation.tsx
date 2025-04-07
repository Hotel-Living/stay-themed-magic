import { useState, useEffect } from "react";

export interface FormData {
  hotelName: string;
  category: string;
  description: string;
  country: string;
  address: string;
  city: string;
  postalCode: string;
  contactName: string;
  email: string;
  phone: string;
}

export default function useFormValidation(onValidationChange: (isValid: boolean) => void) {
  const [formData, setFormData] = useState<FormData>({
    hotelName: "",
    category: "",
    description: "",
    country: "",
    address: "",
    city: "",
    postalCode: "",
    contactName: "",
    email: "",
    phone: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Basic validation
    if (!formData.hotelName.trim()) {
      newErrors.hotelName = "Hotel name is required";
      isValid = false;
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
      isValid = false;
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    if (!formData.country) {
      newErrors.country = "Country is required";
      isValid = false;
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
      isValid = false;
    }
    if (!formData.contactName.trim()) {
      newErrors.contactName = "Contact name is required";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    }
    setErrors(newErrors);
    onValidationChange(isValid);
    return isValid;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Mark field as touched
    if (!touchedFields[field]) {
      setTouchedFields(prev => ({
        ...prev,
        [field]: true
      }));
    }

    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    // Mark field as touched
    setTouchedFields(prev => ({
      ...prev,
      [field]: true
    }));

    // Validate the specific field
    const newErrors = { ...errors };
    
    if (field === 'hotelName' && !formData.hotelName.trim()) {
      newErrors.hotelName = "Hotel name is required";
    }
    if (field === 'category' && !formData.category) {
      newErrors.category = "Category is required";
    }
    if (field === 'description' && !formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (field === 'country' && !formData.country) {
      newErrors.country = "Country is required";
    }
    if (field === 'address' && !formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (field === 'city' && !formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (field === 'contactName' && !formData.contactName.trim()) {
      newErrors.contactName = "Contact name is required";
    }
    if (field === 'email') {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
    }
    if (field === 'phone' && !formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    
    setErrors(newErrors);
  };

  useEffect(() => {
    validate();
  }, [formData]);

  return {
    formData,
    errors,
    touchedFields,
    handleChange,
    handleBlur,
    validate,
    shouldShowError: (field: keyof FormData) => touchedFields[field] && errors[field]
  };
}
