
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

export const CleaningContent: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4 text-white/90">
      <h3 className="text-lg font-bold text-center mb-6" dangerouslySetInnerHTML={{ __html: t('dashboard.ratesCalculator.cleaningContent.title') }} />
      
      <div className="space-y-4">
        <div>
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.cleaningContent.newStandard')}</p>
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.cleaningContent.feelsLikeHome')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.cleaningContent.approachDescription')}</p>
        </div>
        
        <p className="text-sm">{t('dashboard.ratesCalculator.cleaningContent.lightHelp')}</p>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.cleaningContent.completeCleaning')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.cleaningContent.completeCleaningDesc')}</p>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.cleaningContent.lightRefresh')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.cleaningContent.lightRefreshDesc')}</p>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.cleaningContent.beddingChange')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.cleaningContent.beddingChangeDesc')}</p>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.cleaningContent.operationalBenefits')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.cleaningContent.benefitsDescription')}</p>
          <div className="ml-4 text-sm">
            <p>{t('dashboard.ratesCalculator.cleaningContent.fewerInterruptions')}</p>
            <p>{t('dashboard.ratesCalculator.cleaningContent.morePrivacy')}</p>
            <p>{t('dashboard.ratesCalculator.cleaningContent.feelingBelonging')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
