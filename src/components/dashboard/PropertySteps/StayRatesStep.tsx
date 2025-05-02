
import React, { useState, useEffect } from "react";
import { StayRatesSettingsSection } from "./StayRatesStep/StayRatesSettingsSection";
import { StayRatesTableSection } from "./StayRatesStep/StayRatesTableSection";

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

  const roomTypes = ["Single", "Double", "Suite", "Apartment"];
  const stayOptions = ["8 days", "16 days", "24 days", "32 days"];
  const mealOptions = ["Breakfast only", "Half board", "Full board", "All inclusive", "No Meals Included"];

  // Initialize from formData
  useEffect(() => {
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
    const daysToPriceField: Record<string, string> = {
      "8 days": "price_8",
      "16 days": "price_16",
      "24 days": "price_24",
      "32 days": "price_32"
    };
    
    // Check if we have individual price fields in formData
    roomTypes.forEach(roomType => {
      stayOptions.forEach(stayLength => {
        mealOptions.forEach(mealOption => {
          const key = `${roomType}-${stayLength}-${mealOption}`;
          const dayKey = daysToPriceField[stayLength];
          
          if (formData[dayKey]) {
            initialRates[key] = formData[dayKey];
          } else if (formData.rates && formData.rates[stayLength.split(' ')[0]]) {
            // Try to get from rates object if individual fields are not set
            initialRates[key] = formData.rates[stayLength.split(' ')[0]];
          }
        });
      });
    });
    
    if (Object.keys(initialRates).length > 0) {
      setRates(initialRates);
      setRatesFilled(true);
    }
  }, [formData, roomTypes, stayOptions, mealOptions]);

  // When rates, currency or other settings change, update formData
  useEffect(() => {
    // Save currency
    updateFormData('currency', currency);
    
    // Save price increase settings
    updateFormData('enablePriceIncrease', enablePriceIncrease);
    updateFormData('priceIncreaseCap', priceIncreaseCap);
    
    // Convert rates to specific price fields
    const priceFields: Record<string, number> = {};
    
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
          }
        }
      }
    }
    
    // Update all price fields in formData
    Object.entries(priceFields).forEach(([field, value]) => {
      updateFormData(field, value);
    });
    
    // Also update the rates object with the same values
    const ratesObject: Record<string, number> = {};
    stayOptions.forEach(option => {
      const days = option.split(' ')[0];
      const fieldName = `price_${days}`;
      if (priceFields[fieldName]) {
        ratesObject[days] = priceFields[fieldName];
      }
    });
    
    updateFormData('rates', ratesObject);
    
    // Update validation state
    onValidationChange(ratesFilled);
  }, [rates, currency, enablePriceIncrease, priceIncreaseCap, ratesFilled, updateFormData, onValidationChange, stayOptions]);

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
