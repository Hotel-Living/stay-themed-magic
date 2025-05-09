
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

  const roomTypes = formData.roomTypes?.length > 0
    ? formData.roomTypes.map((rt: any) => rt.name || rt.selectedRoomType)
    : ["Single", "Double", "Suite", "Apartment"];

  const stayOptions = formData.stayLengths?.length > 0
    ? formData.stayLengths.map((days: number) => `${days} days`)
    : ["8 days", "16 days", "24 days", "32 days"];

  const mealOptions = formData.mealPlans?.length > 0
    ? formData.mealPlans
    : ["Breakfast only", "Half board", "Full board", "All inclusive", "No Meals Included"];

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
    
    updateFormData("rates", {
      ...(formData.rates || {}),
      [key]: value
    });

    if (value && !isNaN(Number(value))) {
      setRatesFilled(true);
      toast.success(`Rate updated for ${roomType}, ${stayLength}, ${mealOption}`);
    }
  };

  React.useEffect(() => {
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
    </div>
  );
}
