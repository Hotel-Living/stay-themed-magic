
import { useState } from "react";

interface UseRoomTypeRatesReturn {
  rates: Record<number, number>;
  stayLengths: number[];
  handleRateChange: (duration: number, value: string) => void;
}

export function useRoomTypeRates(initialStayLengths: number[] = []): UseRoomTypeRatesReturn {
  const [rates, setRates] = useState<Record<number, number>>({});
  const [stayLengths] = useState<number[]>(initialStayLengths);

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
