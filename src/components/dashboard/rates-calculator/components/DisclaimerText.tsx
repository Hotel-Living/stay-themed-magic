
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

export const DisclaimerText: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <p className="font-bold">
      {t('dashboard.ratesCalculator.disclaimer')}
    </p>
  );
};
