import type { PropertyFormData } from "../usePropertyFormData";

/**
 * Convert pricing fields to pricingMatrix and calculate monthly price
 */
export const convertPricingData = (formData: PropertyFormData): PropertyFormData & { price_per_month: number } => {
  const convertedData = { ...formData } as PropertyFormData & { price_per_month: number };
  
  // Extract pricing fields from form data - now aligned with StayDurationSection
  const price8 = (formData as any).price_8;
  const price15 = (formData as any).price_15;
  const price22 = (formData as any).price_22;
  const price29 = (formData as any).price_29;
  
  console.log('🔄 Converting pricing data:', { price8, price15, price22, price29 });
  
  // Build pricing matrix from individual price fields
  const pricingMatrix: any[] = [];
  
  if (price8 && price8 > 0) {
    pricingMatrix.push({ duration: 8, price: price8, currency: 'EUR' });
  }
  if (price15 && price15 > 0) {
    pricingMatrix.push({ duration: 15, price: price15, currency: 'EUR' });
  }
  if (price22 && price22 > 0) {
    pricingMatrix.push({ duration: 22, price: price22, currency: 'EUR' });
  }
  if (price29 && price29 > 0) {
    pricingMatrix.push({ duration: 29, price: price29, currency: 'EUR' });
  }
  
  convertedData.pricingMatrix = pricingMatrix;
  
  // Calculate monthly price from the pricing matrix
  convertedData.price_per_month = calculateMonthlyPrice(convertedData);
  
  console.log('✅ Pricing conversion complete:', {
    pricingMatrix: convertedData.pricingMatrix,
    monthlyPrice: convertedData.price_per_month
  });
  
  return convertedData;
};

/**
 * Calculate monthly price from pricing matrix or use existing monthly price
 */
export const calculateMonthlyPrice = (formData: PropertyFormData): number => {
  // If we have explicit monthly price, use it
  const explicitMonthlyPrice = (formData as any).price_per_month;
  if (explicitMonthlyPrice && explicitMonthlyPrice > 0) {
    return explicitMonthlyPrice;
  }
  
  // Calculate from pricing matrix using hotel's package logic
  const pricingMatrix = formData.pricingMatrix || [];
  if (pricingMatrix.length === 0) {
    console.warn("⚠️ No pricing data available - using default 0");
    return 0;
  }
  
  // Find the first valid price and apply the correct multiplier
  const validPrices = pricingMatrix.filter((pkg: any) => pkg.price && pkg.price > 0 && pkg.duration && pkg.duration > 0);
  
  if (validPrices.length === 0) {
    console.warn("⚠️ No valid prices in pricing matrix");
    return 0;
  }
  
  const firstPrice = validPrices[0];
  const duration = parseInt(firstPrice.duration);
  const price = parseFloat(firstPrice.price);
  
  let monthlyPrice = 0;
  
  // Apply the correct calculation logic: 28 days = 1 month
  switch (duration) {
    case 8:
      monthlyPrice = Math.round((price / 8) * 28); // 8 days → scale to 28 days (1 month)
      break;
    case 15:
      monthlyPrice = Math.round((price / 15) * 28); // 15 days → scale to 28 days (1 month)
      break;
    case 22:
      monthlyPrice = Math.round((price / 22) * 28); // 22 days → scale to 28 days (1 month)
      break;
    case 29:
      monthlyPrice = Math.round((price / 29) * 28); // 29 days → scale to 28 days (1 month)
      break;
    default:
      // For any other duration, calculate proportionally to 28 days (1 month)
      monthlyPrice = Math.round((price / duration) * 28);
      console.warn(`⚠️ Unusual duration ${duration} days - calculated proportionally to 28 days`);
  }
  
  console.log(`💰 Calculated monthly price: ${monthlyPrice} (from ${duration}-day package at ${price})`);
  return monthlyPrice;
};