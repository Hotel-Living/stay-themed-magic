
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

export const CleaningContent: React.FC = () => {
  const { t } = useTranslation("dashboard");
  
  return (
    <div className="space-y-4 text-white/90">
      <h3 className="text-lg font-bold text-center mb-6" dangerouslySetInnerHTML={{ __html: t('dashboard.ratesCalculator.cleaningModelTitle') }} />
      
      <div className="space-y-4">
        <div>
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.cleaningHotelLivingStandard')}</p>
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.cleaningFeelsLikeHome')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.cleaningApproachDescription')}</p>
        </div>
        
        <p className="text-sm">{t('dashboard.ratesCalculator.cleaningLightHelp')}</p>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.cleaningCompleteCleaning')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.cleaningCompleteDescription')}</p>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.cleaningLightRefresh')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.cleaningLightDescription')}</p>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.cleaningBeddingChange')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.cleaningBeddingDescription')}</p>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('dashboard.ratesCalculator.cleaningOperationalBenefits')}</p>
          <p className="text-sm">{t('dashboard.ratesCalculator.cleaningBenefitsDescription')}</p>
          <div className="ml-4 text-sm">
            <p>{t('dashboard.ratesCalculator.cleaningFewerInterruptions')}</p>
            <p>{t('dashboard.ratesCalculator.cleaningMorePrivacy')}</p>
            <p>{t('dashboard.ratesCalculator.cleaningFeelingOfBelonging')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
