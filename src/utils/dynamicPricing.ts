
/**
 * Calculates a dynamic price based on the base price and how many nights have been sold
 * The price increases by 1% for every X nights sold, up to a maximum of 20%
 * 
 * @param basePrice The original base price
 * @param totalNightsInMonth Total nights available in the month (rooms × days)
 * @param nightsSold Number of nights already sold in the month
 * @param maxIncreasePercent Maximum percentage to increase the price (default: 20%)
 * @returns The calculated price with dynamic increase
 */
export function calculateDynamicPrice(
  basePrice: number, 
  totalNightsInMonth: number, 
  nightsSold: number, 
  maxIncreasePercent: number = 20
): number {
  // Calculate how many nights per step (1% increase)
  const nightsPerStep = totalNightsInMonth / maxIncreasePercent;
  
  // Calculate which step we've reached
  const stepReached = Math.floor(nightsSold / nightsPerStep);
  
  // Ensure percentage doesn't exceed the maximum
  const percentIncrease = Math.min(stepReached, maxIncreasePercent);
  
  // Calculate the final price with increase
  const finalPrice = basePrice * (1 + percentIncrease / 100);
  
  return Number(finalPrice.toFixed(2));
}

/**
 * Format a price to display with appropriate currency symbol
 * 
 * @param price The price to format
 * @param currency The currency code (default: USD)
 * @returns Formatted price string
 */
export function formatCurrency(price: number, currency: string = 'USD'): string {
  const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CNY: '¥'
  };

  const symbol = currencySymbols[currency] || '$';
  return `${symbol}${price.toFixed(2)}`;
}
