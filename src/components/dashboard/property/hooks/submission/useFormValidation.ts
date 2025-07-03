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
 * Validates pricing structure - checks for ACTUAL pricing data structure used in form
 */
const validatePricing = (formData: PropertyFormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  console.group("🔍 PRICING VALIDATION DEBUG");
  console.log("📋 Form data sample:", {
    hotelName: formData.hotelName,
    country: formData.country,
    city: formData.city
  });
  
  // Check the ACTUAL pricing data structure used by the form
  // 1. Check rates object (primary storage for pricing in StayRatesStep)
  const rates = formData.rates || {};
  const ratesKeys = Object.keys(rates);
  const hasValidRates = ratesKeys.length > 0 && 
    Object.values(rates).some(rate => {
      const numRate = typeof rate === 'string' ? parseFloat(rate) : rate;
      return numRate && numRate > 0;
    });
  console.log("💰 Rates object:", { 
    keys: ratesKeys, 
    values: Object.values(rates),
    isValid: hasValidRates 
  });
  
  // 2. Check pricingMatrix (converted from rates)
  const pricingMatrix = formData.pricingMatrix || [];
  const hasValidPricingMatrix = pricingMatrix.length > 0 && 
    pricingMatrix.some((pkg: any) => {
      const price = typeof pkg.price === 'string' ? parseFloat(pkg.price) : pkg.price;
      return price && price > 0;
    });
  console.log("💰 Pricing matrix:", { 
    length: pricingMatrix.length, 
    packages: pricingMatrix,
    isValid: hasValidPricingMatrix 
  });
  
  // 3. Check legacy price_X fields (backup check)
  const pricingFields = ['price_8', 'price_16', 'price_24', 'price_32'];
  const hasValidPricingFields = pricingFields.some(field => {
    const price = (formData as any)[field];
    return price && typeof price === 'number' && price > 0;
  });
  console.log("💰 Legacy price fields:", { 
    fields: pricingFields.map(f => ({ [f]: (formData as any)[f] })),
    isValid: hasValidPricingFields 
  });
  
  // 4. Check monthly price (fallback)
  const monthlyPrice = (formData as any).price_per_month;
  const hasValidMonthlyPrice = monthlyPrice && monthlyPrice > 0;
  console.log("💰 Monthly price:", { value: monthlyPrice, type: typeof monthlyPrice, isValid: hasValidMonthlyPrice });
  
  // Final validation result
  const anyPricingValid = hasValidRates || hasValidPricingMatrix || hasValidPricingFields || hasValidMonthlyPrice;
  
  console.log("✅ Validation results:", {
    hasValidRates,
    hasValidPricingMatrix,
    hasValidPricingFields,
    hasValidMonthlyPrice,
    anyPricingValid
  });
  
  if (!anyPricingValid) {
    console.error('🚨 ALL PRICING VALIDATION FAILED');
    console.error('🚨 No valid pricing found in: rates, pricingMatrix, price_X fields, or monthly price');
    console.groupEnd();
    errors.push("Valid pricing is required - please set at least one package price");
  } else {
    console.log("✅ Pricing validation PASSED");
    console.groupEnd();
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