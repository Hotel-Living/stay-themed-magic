
import React from "react";
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
  const [ratesFilled, setRatesFilled] = React.useState(false);

  // Use only room types that have been explicitly defined
  const hasValidRoomTypes = formData.roomTypes && Array.isArray(formData.roomTypes) && formData.roomTypes.length > 0;
  
  // Only use defined room types, no fallbacks
  const roomTypes = hasValidRoomTypes
    ? formData.roomTypes.map((rt: any) => rt.name || rt.selectedRoomType)
    : [];

  // Only use defined stay lengths, no fallbacks
  const hasValidStayLengths = formData.stayLengths && Array.isArray(formData.stayLengths) && formData.stayLengths.length > 0;
  const stayOptions = hasValidStayLengths
    ? formData.stayLengths.map((days: number) => `${days} days`)
    : [];

  // Only use defined meal plans, no fallbacks
  const hasValidMealPlans = formData.mealPlans && Array.isArray(formData.mealPlans) && formData.mealPlans.length > 0;
  const mealOptions = hasValidMealPlans
    ? formData.mealPlans
    : [];

  React.useEffect(() => {
    // Check if rates exist in formData to determine if rates are filled
    const rates = formData.rates || {};
    const hasValidRates = Object.values(rates).some((value) => {
      const numValue = Number(value);
      return !isNaN(numValue) && numValue > 0;
    });
    
    setRatesFilled(hasValidRates);
    onValidationChange(hasValidRates);
  }, [formData.rates, onValidationChange]);

  const handleRateChange = (roomType: string, stayLength: string, mealOption: string, value: string) => {
    const key = `${roomType}-${stayLength}-${mealOption}`;
    
    // Skip update if value hasn't changed
    if (formData.rates?.[key] === value) return;
    
    // Update the rates as before
    updateFormData("rates", {
      ...(formData.rates || {}),
      [key]: value
    });

    // Update the pricingMatrix structure as well
    const updatedMatrix = [...(formData.pricingMatrix || [])];
    const existingIndex = updatedMatrix.findIndex(
      (entry: any) =>
        entry.roomType === roomType &&
        entry.stayLength === stayLength &&
        entry.mealPlan === mealOption
    );

    const priceValue = Number(value);
    
    if (existingIndex !== -1) {
      if (priceValue > 0) {
        updatedMatrix[existingIndex].price = priceValue;
      } else {
        // Remove entry if price is 0 or invalid
        updatedMatrix.splice(existingIndex, 1);
      }
    } else if (priceValue > 0) {
      updatedMatrix.push({
        roomType,
        stayLength,
        mealPlan: mealOption,
        price: priceValue
      });
    }

    console.log("Updated pricing matrix:", updatedMatrix);
    updateFormData("pricingMatrix", updatedMatrix);

    if (value && !isNaN(Number(value))) {
      setRatesFilled(true);
      toast.success(`Rate updated for ${roomType}, ${stayLength}, ${mealOption}`);
    }
  };

  React.useEffect(() => {
    // ... keep existing code (currency and rates effects)
    updateFormData('currency', formData.currency || "USD");
    
    const priceFields: Record<string, number> = {};
    const ratesObject: Record<string, number> = {};

    if (formData.rates) {
      for (const key in formData.rates) {
        const parts = key.split('-');
        if (parts.length === 3) {
          const stayLength = parts[1];
          const price = Number(formData.rates[key]);
          const days = parseInt(stayLength.split(' ')[0]);
          if (!isNaN(price) && price > 0) {
            const fieldName = `price_${days}`;
            if (!priceFields[fieldName] || price > priceFields[fieldName]) {
              priceFields[fieldName] = price;
              ratesObject[days.toString()] = price;
            }
          }
        }
      }
    }

    Object.entries(priceFields).forEach(([field, value]) => {
      updateFormData(field, value);
    });

    updateFormData('rates', formData.rates || {});
  }, [formData.currency, updateFormData]);

  return (
    <div className="space-y-6">
      <StayRatesSettingsSection
        enablePriceIncrease={formData.enablePriceIncrease ?? false}
        setEnablePriceIncrease={(val) => updateFormData("enablePriceIncrease", val)}
        priceIncreaseCap={formData.priceIncreaseCap ?? 20}
        setPriceIncreaseCap={(val) => updateFormData("priceIncreaseCap", val)}
      />

      {/* Show warning if any of the required data is missing */}
      {(!hasValidRoomTypes || !hasValidStayLengths || !hasValidMealPlans) ? (
        <div className="bg-fuchsia-950/30 p-4 rounded-lg border border-fuchsia-800/30">
          <p className="text-yellow-300">Please define room types, stay lengths, and meal plans in Step 3 before setting rates.</p>
        </div>
      ) : (
        <StayRatesTableSection
          ratesFilled={ratesFilled}
          enablePriceIncrease={formData.enablePriceIncrease ?? false}
          priceIncreaseCap={formData.priceIncreaseCap ?? 20}
          rates={formData.rates || {}}
          roomTypes={roomTypes}
          stayOptions={stayOptions}
          mealOptions={mealOptions}
          handleRateChange={handleRateChange}
        />
      )}
    </div>
  );
}
