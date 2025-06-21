
import React from "react";
import { RatesCalculatorCard } from "./components/RatesCalculatorCard";
import { RatesCalculatorHeader } from "./components/RatesCalculatorHeader";
import { RATES_CALCULATOR_CONFIG } from "./constants/calculatorConstants";

export const RatesCalculatorTab: React.FC = () => {
  return (
    <div className={RATES_CALCULATOR_CONFIG.cardSpacing}>
      <RatesCalculatorCard>
        <RatesCalculatorHeader
          title={RATES_CALCULATOR_CONFIG.defaultTitle}
          description={RATES_CALCULATOR_CONFIG.defaultDescription}
        />
      </RatesCalculatorCard>
    </div>
  );
};
