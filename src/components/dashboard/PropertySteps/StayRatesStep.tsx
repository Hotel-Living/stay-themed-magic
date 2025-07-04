
import React, { useState, useEffect } from "react";
// Legacy step - PropertyFormData type removed with legacy system
import { StayRatesSettingsSection } from "./StayRatesStep/StayRatesSettingsSection";
import { StayRatesTableSection } from "./StayRatesStep/StayRatesTableSection";
import { ImportantNotice } from "./ImportantNotice";
import { useTranslation } from "@/hooks/useTranslation";

interface StayRatesStepProps {
  formData: any; // Legacy step - type simplified after PropertyFormData removal
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

export default function StayRatesStep({
  formData,
  updateFormData,
  onValidationChange
}: StayRatesStepProps) {
  const { t } = useTranslation();
  const roomTypes = formData.roomTypes ? formData.roomTypes.map((room: any) => room.name) : [];
  const stayOptions = formData.stayLengths ? formData.stayLengths.map((length: number) => `${length} ${t('dashboard.days')}`) : [];
  const mealOptions = formData.mealPlans || [];

  const [rates, setRates] = useState<Record<string, string | number>>({});
  const [enablePriceIncrease, setEnablePriceIncrease] = useState(formData.enablePriceIncrease || false);
  const [priceIncreaseCap, setPriceIncreaseCap] = useState(formData.priceIncreaseCap || 20);
  const [ratesFilled, setRatesFilled] = useState(false);

  useEffect(() => {
    // Load rates from formData
    if (formData.pricingMatrix) {
      const initialRates: Record<string, string | number> = {};
      formData.pricingMatrix.forEach((item: any) => {
        const rateKey = `${item.roomType}-${item.stayLength}-${item.mealPlan}`;
        initialRates[rateKey] = item.price;
      });
      setRates(initialRates);
      setRatesFilled(Object.keys(initialRates).length > 0);
    }

    // Load dynamic pricing settings from formData
    setEnablePriceIncrease(formData.enablePriceIncrease || false);
    setPriceIncreaseCap(formData.priceIncreaseCap || 20);
  }, [formData]);

  useEffect(() => {
    // Update formData with current rates
    const pricingMatrix = Object.entries(rates).map(([key, value]) => {
      const [roomType, stayLength, mealPlan] = key.split('-');
      return {
        roomType,
        stayLength,
        mealPlan,
        price: value
      };
    });
    updateFormData('pricingMatrix', pricingMatrix);

    // Update formData with dynamic pricing settings
    updateFormData('enablePriceIncrease', enablePriceIncrease);
    updateFormData('priceIncreaseCap', priceIncreaseCap);

    // Validate if at least one rate is filled
    setRatesFilled(Object.keys(rates).length > 0);
    onValidationChange(Object.keys(rates).length > 0);
  }, [rates, enablePriceIncrease, priceIncreaseCap, updateFormData, onValidationChange]);

  const handleRateChange = (roomType: string, stayLength: string, mealOption: string, value: string) => {
    const rateKey = `${roomType}-${stayLength}-${mealOption}`;
    setRates(prevRates => ({
      ...prevRates,
      [rateKey]: value
    }));
  };

  return (
    <div className="space-y-6">
      <ImportantNotice />
      
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
