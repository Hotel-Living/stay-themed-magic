
import { useState, useEffect } from 'react';

export function useRoomTypeRates(availableStayLengths: number[] = []) {
  const [stayLengths, setStayLengths] = useState<string[]>([]);
  const [rates, setRates] = useState<Record<string, string>>({});
  
  // Update stay lengths when availableStayLengths changes
  useEffect(() => {
    if (availableStayLengths && availableStayLengths.length > 0) {
      const formattedStayLengths = availableStayLengths.map(days => `${days} days`);
      setStayLengths(formattedStayLengths);
      
      // Initialize rates object with empty values if not already set
      const initialRates: Record<string, string> = {};
      formattedStayLengths.forEach(stayLength => {
        if (!rates[stayLength]) {
          initialRates[stayLength] = '';
        }
      });
      
      if (Object.keys(initialRates).length > 0) {
        setRates(prev => ({ ...prev, ...initialRates }));
      }
    }
  }, [availableStayLengths]);

  const handleRateChange = (stayLength: string, value: string) => {
    setRates(prev => ({
      ...prev,
      [stayLength]: value
    }));
  };

  return {
    rates,
    stayLengths,
    handleRateChange,
    setRates // Expose this setter to allow external updates
  };
}
