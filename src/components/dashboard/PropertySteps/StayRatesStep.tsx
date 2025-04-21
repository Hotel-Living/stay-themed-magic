
// This refactored file uses two subcomponents: StayRatesSettingsSection and StayRatesTableSection

import React, { useState } from "react";
import { StayRatesSettingsSection } from "./StayRatesStep/StayRatesSettingsSection";
import { StayRatesTableSection } from "./StayRatesStep/StayRatesTableSection";

export default function StayRatesStep() {
  const [ratesFilled, setRatesFilled] = useState(false);
  const [rates, setRates] = useState({});

  // Settings state moved to new section
  const [currency, setCurrency] = useState("USD");
  const [enablePriceIncrease, setEnablePriceIncrease] = useState(false);
  const [priceIncreaseCap, setPriceIncreaseCap] = useState(20);

  const roomTypes = ["Single", "Double", "Suite", "Apartment"];
  const stayOptions = ["8 days", "16 days", "24 days", "32 days"];
  const mealOptions = ["Breakfast only", "Half board", "Full board", "All inclusive", "No Meals Included"];

  const handleRateChange = (roomType, stayLength, mealOption, value) => {
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
