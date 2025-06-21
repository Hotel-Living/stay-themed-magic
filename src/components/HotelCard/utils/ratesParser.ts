
interface ParsedRates {
  [key: string]: number;
}

export const parseRatesData = (rates: Record<string, number>) => {
  const parsedRates: ParsedRates = {};
  
  Object.keys(rates).forEach(key => {
    // Check for simple numeric keys (8, 16, 24, 32)
    if (/^\d+$/.test(key)) {
      parsedRates[key] = rates[key];
    }
    // Check for complex keys like "8-breakfast-included" or "16-half-board"
    else if (key.includes('-')) {
      const parts = key.split('-');
      const stayLength = parts[0];
      if (/^\d+$/.test(stayLength)) {
        // Use the stay length as key, taking the first rate found for that duration
        if (!parsedRates[stayLength]) {
          parsedRates[stayLength] = rates[key];
        }
      }
    }
  });
  
  return parsedRates;
};
