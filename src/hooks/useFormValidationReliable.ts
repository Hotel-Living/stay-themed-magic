import { useState, useCallback } from 'react';
import { HotelRegistrationFormData } from '@/components/dashboard/hotel-registration/NewHotelRegistrationForm';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  email?: boolean;
  custom?: (value: any, allData?: HotelRegistrationFormData) => string | null;
}

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  fieldErrors: string[];
}

const validationRules: Partial<Record<keyof HotelRegistrationFormData, ValidationRule>> = {
  hotelName: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  address: {
    required: true,
    minLength: 5
  },
  city: {
    required: true,
    minLength: 2
  },
  country: {
    required: true,
    minLength: 2
  },
  email: {
    required: true,
    email: true
  },
  phone: {
    required: true,
    minLength: 6
  },
  propertyType: {
    required: true
  },
  propertyStyle: {
    required: true
  },
  hotelDescription: {
    required: true,
    minLength: 20,
    maxLength: 2000
  },
  roomDescription: {
    required: true,
    minLength: 10,
    maxLength: 1000
  },
  classification: {
    required: true
  },
  checkInDay: {
    required: true
  },
  stayLengths: {
    custom: (value: string[]) => {
      if (!value || value.length === 0) {
        return 'At least one stay length must be selected';
      }
      return null;
    }
  },
  availabilityPackages: {
    custom: (value: any[], allData?: HotelRegistrationFormData) => {
      if (!value || value.length === 0) {
        return 'At least one availability package is required';
      }

      // Check for overlapping dates
      const sortedPackages = [...value].sort((a, b) => 
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );

      for (let i = 0; i < sortedPackages.length - 1; i++) {
        const current = sortedPackages[i];
        const next = sortedPackages[i + 1];
        
        if (new Date(current.endDate) >= new Date(next.startDate)) {
          return 'Availability packages cannot have overlapping dates';
        }
      }

      // Validate each package
      for (const pkg of value) {
        if (!pkg.startDate || !pkg.endDate) {
          return 'All packages must have start and end dates';
        }
        
        if (new Date(pkg.startDate) >= new Date(pkg.endDate)) {
          return 'End date must be after start date for all packages';
        }
        
        if (pkg.availableRooms < 1) {
          return 'Each package must have at least 1 available room';
        }
        
        if (pkg.availableRooms > 50) {
          return 'Maximum 50 rooms per package allowed';
        }
      }

      return null;
    }
  },
  price_per_month: {
    required: true,
    min: 100,
    max: 50000
  },
  termsAccepted: {
    custom: (value: boolean) => {
      if (!value) {
        return 'You must accept the terms and conditions';
      }
      return null;
    }
  }
};

export function useFormValidationReliable() {
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isValidating, setIsValidating] = useState(false);

  const validateField = useCallback((
    fieldName: keyof HotelRegistrationFormData, 
    value: any,
    allData?: HotelRegistrationFormData
  ): string | null => {
    const rule = validationRules[fieldName];
    if (!rule) return null;

    // Required validation
    if (rule.required && (value === undefined || value === null || value === '' || 
        (Array.isArray(value) && value.length === 0))) {
      return `${fieldName} is required`;
    }

    // Skip other validations if value is empty and not required
    if (!rule.required && (value === undefined || value === null || value === '')) {
      return null;
    }

    // String validations
    if (typeof value === 'string') {
      if (rule.minLength && value.length < rule.minLength) {
        return `Minimum ${rule.minLength} characters required`;
      }
      
      if (rule.maxLength && value.length > rule.maxLength) {
        return `Maximum ${rule.maxLength} characters allowed`;
      }
      
      if (rule.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Please enter a valid email address';
      }
      
      if (rule.pattern && !rule.pattern.test(value)) {
        return 'Invalid format';
      }
    }

    // Number validations
    if (typeof value === 'number') {
      if (rule.min !== undefined && value < rule.min) {
        return `Minimum value is ${rule.min}`;
      }
      
      if (rule.max !== undefined && value > rule.max) {
        return `Maximum value is ${rule.max}`;
      }
    }

    // Custom validation
    if (rule.custom) {
      return rule.custom(value, allData);
    }

    return null;
  }, []);

  const validateAllFields = useCallback((data: HotelRegistrationFormData): ValidationResult => {
    setIsValidating(true);
    
    const errors: Record<string, string> = {};
    const fieldErrors: string[] = [];

    // Validate each field with rules
    Object.keys(validationRules).forEach(fieldName => {
      const field = fieldName as keyof HotelRegistrationFormData;
      const value = data[field];
      const error = validateField(field, value, data);
      
      if (error) {
        errors[field] = error;
        fieldErrors.push(`${field}: ${error}`);
      }
    });

    // Additional business logic validations
    
    // Image validation
    if (!data.photos?.hotel || data.photos.hotel.length === 0) {
      errors.photos = 'At least one hotel photo is required';
      fieldErrors.push('Photos: At least one hotel photo is required');
    }

    // Date validations for availability packages
    if (data.availabilityPackages && data.availabilityPackages.length > 0) {
      const now = new Date();
      const hasValidFutureDates = data.availabilityPackages.some(pkg => 
        new Date(pkg.startDate) > now
      );
      
      if (!hasValidFutureDates) {
        errors.availabilityPackages = 'At least one availability package must have future dates';
        fieldErrors.push('Availability: At least one package must have future dates');
      }
    }

    // Feature validation
    if (!data.hotelFeatures || data.hotelFeatures.length === 0) {
      errors.hotelFeatures = 'At least one hotel feature must be selected';
      fieldErrors.push('Features: At least one hotel feature must be selected');
    }

    const result: ValidationResult = {
      isValid: Object.keys(errors).length === 0,
      errors,
      fieldErrors
    };

    setValidationErrors(errors);
    setIsValidating(false);
    
    return result;
  }, [validateField]);

  const validateSingleField = useCallback((
    fieldName: keyof HotelRegistrationFormData,
    value: any,
    allData?: HotelRegistrationFormData
  ) => {
    const error = validateField(fieldName, value, allData);
    
    setValidationErrors(prev => {
      if (error) {
        return { ...prev, [fieldName]: error };
      } else {
        const { [fieldName]: removed, ...rest } = prev;
        return rest;
      }
    });

    return error;
  }, [validateField]);

  const clearValidationErrors = useCallback(() => {
    setValidationErrors({});
  }, []);

  const hasValidationErrors = useCallback(() => {
    return Object.keys(validationErrors).length > 0;
  }, [validationErrors]);

  return {
    validationErrors,
    isValidating,
    validateAllFields,
    validateSingleField,
    clearValidationErrors,
    hasValidationErrors
  };
}