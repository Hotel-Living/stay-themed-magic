
import React, { useState, useEffect } from "react";
import { StayRatesSettingsSection } from "./StayRatesStep/StayRatesSettingsSection";
import { StayRatesTableSection } from "./StayRatesStep/StayRatesTableSection";
import { toast } from "sonner";

interface StayRatesStepProps {
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function StayRatesStep({
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {}
}: StayRatesStepProps) {
  const [ratesFilled, setRatesFilled] = useState(false);
  const [rates, setRates] = useState<Record<string, number | string>>({});

  // Settings state
  const [currency, setCurrency] = useState("USD");
  const [enablePriceIncrease, setEnablePriceIncrease] = useState(false);
  const [priceIncreaseCap, setPriceIncreaseCap] = useState(20);

  // Use room types from formData if available, otherwise use defaults
  const roomTypes = formData.roomTypes?.length > 0 
    ? formData.roomTypes.map((rt: any) => rt.name || rt.selectedRoomType) 
    : ["Single", "Double", "Suite", "Apartment"];
    
  const stayOptions = formData.stayLengths?.length > 0
    ? formData.stayLengths.map((days: number) => `${days} days`)
    : ["8 days", "16 days", "24 days", "32 days"];
    
  const mealOptions = formData.mealPlans?.length > 0
    ? formData.mealPlans
    : ["Breakfast only", "Half board", "Full board", "All inclusive", "No Meals Included"];

  // Initialize from formData
  useEffect(() => {
    console.log("StayRatesStep - received formData:", formData);
    
    // Initialize currency
    if (formData.currency) {
      setCurrency(formData.currency);
    }
    
    // Initialize price increase settings
    if (formData.enablePriceIncrease !== undefined) {
      setEnablePriceIncrease(formData.enablePriceIncrease);
    }
    
    if (formData.priceIncreaseCap) {
      setPriceIncreaseCap(formData.priceIncreaseCap);
    }
    
    // Initialize rates from formData
    const initialRates: Record<string, number | string> = {};
    
    // Helper to convert stay length format
    const formatStayLength = (days: number | string) => {
      if (typeof days === 'number') return `${days} days`;
      return days;
    };
    
    // If we have rates in formData
    if (formData.rates && typeof formData.rates === 'object') {
      console.log("Found rates in formData:", formData.rates);
      
      // Create rate keys for all combinations
      roomTypes.forEach(roomType => {
        // Extract number values from stay options (e.g., '8 days' -> 8)
        Object.entries(formData.rates).forEach(([dayStr, price]) => {
          // For compatibility with different formats of stay lengths
          const dayNum = parseInt(dayStr);
          if (!isNaN(dayNum)) {
            const stayLength = formatStayLength(dayNum);
            
            mealOptions.forEach(mealOption => {
              const key = `${roomType}-${stayLength}-${mealOption}`;
              // Fix: Ensure price is cast to a number or string type
              initialRates[key] = Number(price) || String(price);
            });
          }
        });
      });

      if (Object.keys(initialRates).length > 0) {
        console.log("Initialized rates:", initialRates);
        setRates(initialRates);
        setRatesFilled(true);
      }
    } else {
      console.log("No rates found in formData");
    }
  }, [formData, roomTypes, mealOptions]);

  // When rates, currency or other settings change, update formData
  useEffect(() => {
    // Save currency
    updateFormData('currency', currency);
    
    // Save price increase settings
    updateFormData('enablePriceIncrease', enablePriceIncrease);
    updateFormData('priceIncreaseCap', priceIncreaseCap);
    
    // Convert rates to specific price fields
    const priceFields: Record<string, number> = {};
    const ratesObject: Record<string, number> = {};
    
    // Extract prices for each stay length
    for (const key in rates) {
      const parts = key.split('-');
      if (parts.length === 3) {
        const stayLength = parts[1];
        const price = Number(rates[key]);
        
        if (!isNaN(price) && price > 0) {
          // Get the day count as a number
          const days = parseInt(stayLength.split(' ')[0]);
          
          // Update the price field for this stay length if higher than existing
          const fieldName = `price_${days}`;
          if (!priceFields[fieldName] || price > priceFields[fieldName]) {
            priceFields[fieldName] = price;
            ratesObject[days.toString()] = price;
          }
        }
      }
    }
    
    // Update all price fields in formData
    Object.entries(priceFields).forEach(([field, value]) => {
      updateFormData(field, value);
    });
    
    // Also update the rates object with the same values
    updateFormData('rates', ratesObject);
    
    // Update validation state
    onValidationChange(ratesFilled);
  }, [rates, currency, enablePriceIncrease, priceIncreaseCap, ratesFilled, updateFormData, onValidationChange]);

  const handleRateChange = (roomType: string, stayLength: string, mealOption: string, value: string) => {
    const key = `${roomType}-${stayLength}-${mealOption}`;
    setRates(prev => ({
      ...prev,
      [key]: value
    }));

    // Check if at least one rate has been entered
    if (value) {
      setRatesFilled(true);
    }
    
    // Show toast for feedback
    toast.success(`Rate updated for ${roomType}, ${stayLength}, ${mealOption}`);
  };

  return (
    <div className="space-y-6">
      <StayRatesSettingsSection
        currency={currency}
        setCurrency={setCurrency}
        enablePriceIncrease={enablePriceIncrease}
        setEnablePriceIncrease={setEnablePriceIncrease}
        priceIncreaseCap={priceIncreaseCap}
        setPriceIncreaseCap={setPriceIncreaseCap}
      />

      <StayRatesTableSection
        ratesFilled={ratesFilled}
        enablePriceIncrease={enablePriceIncrease}
        priceIncreaseCap={priceIncreaseCap}
        rates={rates}
        roomTypes={roomTypes}
        stayOptions={stayOptions}
        mealOptions={mealOptions}
        handleRateChange={handleRateChange}
      />
    </div>
  );
}
