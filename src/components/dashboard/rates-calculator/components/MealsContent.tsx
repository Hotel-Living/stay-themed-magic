
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

export const MealsContent: React.FC = () => {
  const { t } = useTranslation("dashboard");
  
  return (
    <div className="space-y-4 text-white/90">
      <h3 className="text-lg font-bold text-center mb-4">{t('ratesCalculator.mealsContent.title')}</h3>
      
      <div className="space-y-4">
        <p className="text-sm">{t('ratesCalculator.mealsContent.description')}</p>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('ratesCalculator.mealsContent.practicalApproach.title')}</p>
          <p className="text-sm">{t('ratesCalculator.mealsContent.practicalApproach.description')}</p>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('ratesCalculator.mealsContent.operationalAdvantages.title')}</p>
          <div className="ml-4 text-sm space-y-1">
            {t('ratesCalculator.mealsContent.operationalAdvantages.items', { returnObjects: true }).map((item: string, index: number) => (
              <p key={index}>• {item}</p>
            ))}
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('ratesCalculator.mealsContent.costEfficiency.title')}</p>
          <p className="text-sm">{t('ratesCalculator.mealsContent.costEfficiency.description')}</p>
          <div className="ml-4 text-sm space-y-1">
            {t('ratesCalculator.mealsContent.costEfficiency.items', { returnObjects: true }).map((item: string, index: number) => (
              <p key={index}>• {item}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
