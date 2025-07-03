import { PropertyFormData } from "../usePropertyFormData";

/**
 * PHASE 4: DATA PROTECTION AND VALIDATION
 * 
 * Prevents submission of incomplete hotel data that would cause corruption
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export const useFormValidation = () => {
  
  const validateBeforeSubmission = (formData: PropertyFormData): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Critical field validation
    if (!formData.hotelName || formData.hotelName.trim() === '') {
      errors.push("Hotel name is required");
    }

    if (!formData.country || formData.country.trim() === '') {
      errors.push("Country is required");
    }

    if (!formData.city || formData.city.trim() === '') {
      errors.push("City is required");
    }

    if (!(formData as any).price_per_month || (formData as any).price_per_month <= 0) {
      errors.push("Valid price per month is required");
    }

    // Data completeness warnings
    if (!formData.hotelImages || formData.hotelImages.length === 0) {
      warnings.push("No hotel images uploaded - property will have no photos");
    }

    if (!formData.mealPlans || formData.mealPlans.length === 0) {
      warnings.push("No meal plans selected - guests won't see meal options");
    }

    if (!formData.stayLengths || formData.stayLengths.length === 0) {
      warnings.push("No stay lengths selected - guests won't see duration options");
    }

    if (!formData.roomTypes || formData.roomTypes.length === 0) {
      warnings.push("No room types configured - guests won't see accommodation details");
    }

    if (!formData.themes || formData.themes.length === 0) {
      warnings.push("No themes selected - property won't appear in theme searches");
    }

    if (!formData.activities || formData.activities.length === 0) {
      warnings.push("No activities selected - property won't appear in activity searches");
    }

    if (!formData.available_months || formData.available_months.length === 0) {
      warnings.push("No availability months set - guests won't be able to book");
    }

    // Logical validation
    if (formData.stayLengths && formData.stayLengths.some(length => length <= 0)) {
      errors.push("Stay lengths must be positive numbers");
    }

    if (formData.latitude && (typeof formData.latitude === 'number' && (formData.latitude < -90 || formData.latitude > 90))) {
      errors.push("Latitude must be between -90 and 90");
    }

    if (formData.longitude && (typeof formData.longitude === 'number' && (formData.longitude < -180 || formData.longitude > 180))) {
      errors.push("Longitude must be between -180 and 180");
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  };

  const validateDataIntegrity = (formData: PropertyFormData): boolean => {
    // Ensure critical arrays are not null or undefined
    const criticalFields = [
      'mealPlans', 'stayLengths', 'roomTypes', 'themes', 
      'activities', 'available_months', 'hotelImages'
    ];

    for (const field of criticalFields) {
      const value = (formData as any)[field];
      if (value !== undefined && value !== null && !Array.isArray(value)) {
        console.error(`⚠️ Data integrity issue: ${field} should be an array but is:`, typeof value);
        return false;
      }
    }

    return true;
  };

  return {
    validateBeforeSubmission,
    validateDataIntegrity
  };
};