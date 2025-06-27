
interface PriceRange {
  value: number;
  translationKey: string;
  min: number;
  max: number;
}

export const generateDynamicPriceRanges = (
  minPrice: number, 
  maxPrice: number, 
  avgPrice: number
): PriceRange[] => {
  // Create meaningful price ranges based on actual data
  const ranges: PriceRange[] = [];
  
  // Calculate quartiles for better distribution
  const range = maxPrice - minPrice;
  const quarter = range / 4;
  
  // Add ranges based on actual price distribution
  if (minPrice < 500) {
    ranges.push({
      value: 500,
      translationKey: 'filters.priceRange.under500',
      min: 0,
      max: 500
    });
  }
  
  if (minPrice < 1000) {
    ranges.push({
      value: 1000,
      translationKey: 'filters.priceRange.under1000',
      min: 0,
      max: 1000
    });
  }
  
  if (minPrice < 1500) {
    ranges.push({
      value: 1500,
      translationKey: 'filters.priceRange.under1500',
      min: 0,
      max: 1500
    });
  }
  
  if (minPrice < 2000) {
    ranges.push({
      value: 2000,
      translationKey: 'filters.priceRange.under2000',
      min: 0,
      max: 2000
    });
  }
  
  // Add dynamic middle ranges
  if (avgPrice > 1000 && avgPrice < 3000) {
    ranges.push({
      value: Math.round(avgPrice),
      translationKey: 'filters.priceRange.underAverage',
      min: 0,
      max: Math.round(avgPrice)
    });
  }
  
  if (maxPrice > 2500) {
    ranges.push({
      value: 2500,
      translationKey: 'filters.priceRange.under2500',
      min: 0,
      max: 2500
    });
  }
  
  if (maxPrice > 3000) {
    ranges.push({
      value: 3000,
      translationKey: 'filters.priceRange.under3000',
      min: 0,
      max: 3000
    });
  }
  
  if (maxPrice > 5000) {
    ranges.push({
      value: 5000,
      translationKey: 'filters.priceRange.under5000',
      min: 0,
      max: 5000
    });
  }
  
  // Add unlimited range
  ranges.push({
    value: 999999,
    translationKey: 'filters.priceRange.unlimited',
    min: 0,
    max: 999999
  });
  
  return ranges;
};
