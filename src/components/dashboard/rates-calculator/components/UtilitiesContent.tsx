
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

export const UtilitiesContent: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4 text-white/90">
      <h3 className="text-lg font-bold text-center mb-6" dangerouslySetInnerHTML={{ __html: t('dashboard.ratesCalculator.utilitiesContent.title') }} />
      
      <div className="space-y-4">
        <div>
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.utilitiesContent.hotelLivingGuests')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.utilitiesContent.respectfulResidents')}</p>
        </div>
        
        <div>
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.utilitiesContent.smarterGuests')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.utilitiesContent.consciousUse')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.utilitiesContent.temporaryTenants')}</p>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.utilitiesContent.utilityConsumption')}</p>
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.utilitiesContent.energyEfficiency')}</p>
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.utilitiesContent.feelingAtHome')}</p>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.utilitiesContent.sharedResponsibility')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.utilitiesContent.accessibleRates')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.utilitiesContent.balanceAndCare')}</p>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.utilitiesContent.optimizedOperations')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.utilitiesContent.lowerTurnover')}</p>
        </div>
      </div>
    </div>
  );
};
