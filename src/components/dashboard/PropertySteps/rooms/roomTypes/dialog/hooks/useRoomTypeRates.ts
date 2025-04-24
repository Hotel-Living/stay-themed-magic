
import { useState, useEffect } from "react";

interface UseRoomTypeRatesReturn {
  rates: Record<number, number>;
  stayLengths: number[];
  handleRateChange: (duration: number, value: string) => void;
}

export function useRoomTypeRates(initialStayLengths: number[] = []): UseRoomTypeRatesReturn {
  const [rates, setRates] = useState<Record<number, number>>({});
  const [stayLengths, setStayLengths] = useState<number[]>(initialStayLengths);

  // Initialize rates with any duration provided
  useEffect(() => {
    if (initialStayLengths && initialStayLengths.length > 0) {
      setStayLengths(initialStayLengths);
    }
  }, [initialStayLengths]);

  const handleRateChange = (duration: number, value: string) => {
    setRates(prev => ({
      ...prev,
      [duration]: parseInt(value) || 0
    }));
  };

  return {
    rates,
    stayLengths,
    handleRateChange
  };
}
