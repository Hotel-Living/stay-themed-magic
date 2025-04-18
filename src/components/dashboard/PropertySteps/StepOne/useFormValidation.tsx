
import { useState, useEffect, ChangeEvent, FocusEvent } from "react";

interface FormData {
  name: string;
  propertyType: string;
  description: string;
  country: string;
  address: string;
  city: string;
  postalCode: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  category: number;
  style: string;
  [key: string]: any;
}

interface FormErrors {
  name?: string;
  propertyType?: string;
  description?: string;
  country?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export default function useFormValidation(
  onValidationChange: (isValid: boolean) => void = () => {},
  initialData: Partial<FormData> = {}
) {
  const [formData, setFormData] = useState<FormData>({
    name: initialData.name || '',
    propertyType: initialData.propertyType || '',
    description: initialData.description || '',
    country: initialData.country || '',
    address: initialData.address || '',
    city: initialData.city || '',
    postalCode: initialData.postalCode || '',
    contactName: initialData.contactName || '',
    contactEmail: initialData.contactEmail || '',
    contactPhone: initialData.contactPhone || '',
    category: initialData.category || 3,
    style: initialData.style || '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  
  // Validate the form
  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    // Required fields validation
    if (!formData.name) newErrors.name = "Hotel name is required";
    if (!formData.propertyType) newErrors.propertyType = "Property type is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    
    // Email validation
    if (formData.contactEmail && !/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Invalid email format";
    }
    
    // Update errors
    setErrors(newErrors);
    
    // Check if form is valid (no errors)
    const isValid = Object.keys(newErrors).length === 0;
    onValidationChange(isValid);
    
    return isValid;
  };
  
  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouchedFields(prev => ({ ...prev, [name]: true }));
  };
  
  // Handle input blur (for validation)
  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    validateForm();
  };
  
  // Validate form when form data changes
  useEffect(() => {
    validateForm();
  }, [formData]);
  
  return {
    formData,
    setFormData,
    errors,
    touchedFields,
    handleChange,
    handleBlur,
    validateForm
  };
}
