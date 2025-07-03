import type { PropertyFormData } from "../usePropertyFormData";

/**
 * Convert pricing fields to pricingMatrix and calculate monthly price
 */
export const convertPricingData = (formData: PropertyFormData): PropertyFormData & { price_per_month: number } => {
  const convertedData = { ...formData } as PropertyFormData & { price_per_month: number };
  
  // Extract pricing fields from form data
  const price8 = (formData as any).price_8;
  const price16 = (formData as any).price_16;
  const price24 = (formData as any).price_24;
  const price32 = (formData as any).price_32;
  
  console.log('🔄 Converting pricing data:', { price8, price16, price24, price32 });
  
  // Build pricing matrix from individual price fields
  const pricingMatrix: any[] = [];
  
  if (price8 && price8 > 0) {
    pricingMatrix.push({ duration: 8, price: price8, currency: 'EUR' });
  }
  if (price16 && price16 > 0) {
    pricingMatrix.push({ duration: 16, price: price16, currency: 'EUR' });
  }
  if (price24 && price24 > 0) {
    pricingMatrix.push({ duration: 24, price: price24, currency: 'EUR' });
  }
  if (price32 && price32 > 0) {
    pricingMatrix.push({ duration: 32, price: price32, currency: 'EUR' });
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
  
  // Apply your specific calculation logic
  switch (duration) {
    case 8:
      monthlyPrice = Math.round(price * 4); // 8 days → multiply by 4
      break;
    case 16:
      monthlyPrice = Math.round(price * 2); // 16 days → multiply by 2
      break;
    case 24:
      monthlyPrice = Math.round(price * 1.33); // 24 days → multiply by 1.33
      break;
    case 32:
      monthlyPrice = Math.round(price); // 32 days → use directly
      break;
    default:
      // For any other duration, calculate proportionally to 32 days
      monthlyPrice = Math.round((price / duration) * 32);
      console.warn(`⚠️ Unusual duration ${duration} days - calculated proportionally`);
  }
  
  console.log(`💰 Calculated monthly price: ${monthlyPrice} (from ${duration}-day package at ${price})`);
  return monthlyPrice;
};