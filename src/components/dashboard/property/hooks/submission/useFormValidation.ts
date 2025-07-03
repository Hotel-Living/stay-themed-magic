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

/**
 * Validates pricing structure - checks for actual pricing fields used in form
 */
const validatePricing = (formData: PropertyFormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Check for actual pricing fields used in the form
  const pricingFields = ['price_8', 'price_16', 'price_24', 'price_32'];
  const hasValidPricing = pricingFields.some(field => {
    const price = (formData as any)[field];
    return price && typeof price === 'number' && price > 0;
  });
  
  // Also check for traditional monthly pricing as fallback
  const monthlyPrice = (formData as any).price_per_month;
  const hasValidMonthlyPrice = monthlyPrice && monthlyPrice > 0;
  
  // Check for pricingMatrix if it exists (after conversion)
  const pricingMatrix = formData.pricingMatrix || [];
  const hasValidPricingMatrix = pricingMatrix.length > 0 && 
    pricingMatrix.some((pkg: any) => pkg.price && pkg.price > 0);
  
  if (!hasValidPricing && !hasValidMonthlyPrice && !hasValidPricingMatrix) {
    // Provide detailed debugging information
    const priceValues = pricingFields.map(field => `${field}: ${(formData as any)[field] || 'undefined'}`);
    console.error('🚨 Pricing validation failed. Current pricing data:', {
      priceValues,
      monthlyPrice,
      pricingMatrix: pricingMatrix.length,
      formDataKeys: Object.keys(formData)
    });
    errors.push("Valid pricing is required - please set at least one package price");
  }
  
  // Validate pricing matrix entries if they exist
  if (pricingMatrix.length > 0) {
    for (const pkg of pricingMatrix) {
      if (!pkg.price || pkg.price <= 0) {
        errors.push(`Invalid price for ${pkg.duration || 'unknown'} day package`);
      }
      if (!pkg.duration || pkg.duration <= 0) {
        errors.push(`Invalid duration for pricing package`);
      }
    }
  }
  
  return { isValid: errors.length === 0, errors };
};

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

    // Validate pricing data - check for either price_per_month OR pricingMatrix
    const hasValidPricing = validatePricing(formData);
    if (!hasValidPricing.isValid) {
      errors.push(...hasValidPricing.errors);
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