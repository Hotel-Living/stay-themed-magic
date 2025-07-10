
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

export const UtilitiesContent: React.FC = () => {
  const { t } = useTranslation("dashboard");
  
  return (
    <div className="space-y-4 text-white/90">
      <h3 className="text-lg font-bold text-center mb-6" dangerouslySetInnerHTML={{ __html: t('ratesCalculator.utilitiesTitle') }} />
      
      <div className="space-y-4">
        <div>
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.utilitiesGuestsNotTransients')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.utilitiesDescription1')}</p>
        </div>
        
        <div>
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.utilitiesSmartGuestsTitle')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.utilitiesDescription2')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.utilitiesDescription3')}</p>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.utilitiesLowerConsumption')}</p>
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.utilitiesEnergyEfficiency')}</p>
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.utilitiesConservativeHabits')}</p>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.utilitiesSharedResponsibility')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.utilitiesResponsibilityDescription')}</p>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.utilitiesOptimizedOperations')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.utilitiesOptimizedDescription')}</p>
        </div>
      </div>
    </div>
  );
};
