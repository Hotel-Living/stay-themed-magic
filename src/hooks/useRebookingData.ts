
import { useState, useEffect } from 'react';

interface RebookingData {
  duration: number;
  mealPlan?: string;
  guestCount?: number;
}

export const useRebookingData = () => {
  const [rebookingData, setRebookingData] = useState<RebookingData | null>(null);

  useEffect(() => {
    // Check for rebooking data in localStorage
    const storedData = localStorage.getItem('rebookingData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setRebookingData(parsedData);
        // Clear the data after using it
        localStorage.removeItem('rebookingData');
      } catch (error) {
        console.error('Error parsing rebooking data:', error);
        localStorage.removeItem('rebookingData');
      }
    }
  }, []);

  const clearRebookingData = () => {
    setRebookingData(null);
    localStorage.removeItem('rebookingData');
  };

  return {
    rebookingData,
    hasRebookingData: !!rebookingData,
    clearRebookingData
  };
};
