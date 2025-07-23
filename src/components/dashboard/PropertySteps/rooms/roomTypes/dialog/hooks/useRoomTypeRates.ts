
import { useState, useEffect } from 'react';

export function useRoomTypeRates(availableStayLengths: number[] = []) {
  const [stayLengths, setStayLengths] = useState<number[]>([]);
  const [rates, setRates] = useState<Record<number, number>>({});
  
  // Update stay lengths when availableStayLengths changes
  useEffect(() => {
    if (availableStayLengths && availableStayLengths.length > 0) {
      setStayLengths(availableStayLengths);
      
      // Initialize rates object with empty values if not already set
      const initialRates: Record<number, number> = {};
      availableStayLengths.forEach(days => {
        if (!rates[days]) {
          initialRates[days] = 0;
        }
      });
      
      if (Object.keys(initialRates).length > 0) {
        setRates(prev => ({ ...prev, ...initialRates }));
      }
    }
  }, [availableStayLengths]);

  const handleRateChange = (stayLength: number, value: string) => {
    setRates(prev => ({
      ...prev,
      [stayLength]: Number(value) || 0
    }));
  };

  return {
    rates,
    stayLengths,
    handleRateChange,
    setRates // Expose this setter to allow external updates
  };
}
