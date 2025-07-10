
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { RatesCalculatorCard } from "./components/RatesCalculatorCard";
import { RatesCalculatorHeader } from "./components/RatesCalculatorHeader";

export const RatesCalculatorTab: React.FC = () => {
  const { t } = useTranslation("dashboard");
  
  return (
    <div className="space-y-4">
      <RatesCalculatorCard>
        <RatesCalculatorHeader
          title={t('dashboard.ratesCalculator.buildYourModel.title')}
          description={t('dashboard.ratesCalculator.buildYourModel.description')}
        />
      </RatesCalculatorCard>
    </div>
  );
};
