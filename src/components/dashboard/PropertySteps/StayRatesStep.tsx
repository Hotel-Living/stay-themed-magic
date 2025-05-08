
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

  const [currency, setCurrency] = useState("USD");
  const [enablePriceIncrease, setEnablePriceIncrease] = useState(false);
  const [priceIncreaseCap, setPriceIncreaseCap] = useState(20);

  const roomTypes = formData.roomTypes?.length > 0
    ? formData.roomTypes.map((rt: any) => rt.name || rt.selectedRoomType)
    : ["Single", "Double", "Suite", "Apartment"];

  const stayOptions = formData.stayLengths?.length > 0
    ? formData.stayLengths.map((days: number) => `${days} days`)
    : ["8 days", "16 days", "24 days", "32 days"];

  const mealOptions = formData.mealPlans?.length > 0
    ? formData.mealPlans
    : ["Breakfast only", "Half board", "Full board", "All inclusive", "No Meals Included"];

  useEffect(() => {
    if (formData.currency) setCurrency(formData.currency);
    if (formData.enablePriceIncrease !== undefined) setEnablePriceIncrease(formData.enablePriceIncrease);
    if (formData.priceIncreaseCap) setPriceIncreaseCap(formData.priceIncreaseCap);

    const initialRates: Record<string, number | string> = {};
    const formatStayLength = (days: number | string) => typeof days === 'number' ? `${days} days` : days;

    if (formData.rates && typeof formData.rates === 'object') {
      roomTypes.forEach(roomType => {
        Object.entries(formData.rates).forEach(([dayStr, price]) => {
          const dayNum = parseInt(dayStr);
          if (!isNaN(dayNum)) {
            const stayLength = formatStayLength(dayNum);
            mealOptions.forEach(mealOption => {
              const key = `${roomType}-${stayLength}-${mealOption}`;
              initialRates[key] = Number(price) || String(price);
            });
          }
        });
      });

      if (Object.keys(initialRates).length > 0) {
        setRates(initialRates);
        setRatesFilled(true);
      }
    }
  }, [formData, roomTypes, mealOptions]);

  useEffect(() => {
    updateFormData('currency', currency);
    updateFormData('enablePriceIncrease', enablePriceIncrease);
    updateFormData('priceIncreaseCap', priceIncreaseCap);

    const priceFields: Record<string, number> = {};
    const ratesObject: Record<string, number> = {};

    for (const key in rates) {
      const parts = key.split('-');
      if (parts.length === 3) {
        const stayLength = parts[1];
        const price = Number(rates[key]);
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

    Object.entries(priceFields).forEach(([field, value]) => {
      updateFormData(field, value);
    });

    updateFormData('rates', ratesObject);
    onValidationChange(ratesFilled);
  }, [rates, currency, enablePriceIncrease, priceIncreaseCap, ratesFilled, updateFormData, onValidationChange]);

  const handleRateChange = (roomType: string, stayLength: string, mealOption: string, value: string) => {
    const key = `${roomType}-${stayLength}-${mealOption}`;
    setRates(prev => ({
      ...prev,
      [key]: value
    }));

    if (value) setRatesFilled(true);
    toast.success(`Rate updated for ${roomType}, ${stayLength}, ${mealOption}`);
  };

  return (
    <div className="space-y-6">
      <StayRatesSettingsSection
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
