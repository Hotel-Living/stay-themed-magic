
import React from 'react';
import { ModelRatesTabs } from './rates-calculator/ModelRatesTabs';
import { useTranslation } from '@/hooks/useTranslation';

export const RatesCalculatorContent = () => {
  const { t, language } = useTranslation();

  return (
    <div className="space-y-8">
      <div className="glass-card rounded-2xl p-8 bg-[#7a0486]">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {language === 'es' ? t('dashboard.standardEconomicModel') : 'STANDARD HOTEL-LIVING ECONOMIC MODEL'}
        </h2>
        <p className="text-sm text-center mb-8 opacity-90">
          {language === 'es' ? t('dashboard.costsAndBenefits') : 'COSTS & BENEFITS | CREATE YOUR OWN MODEL AND RATES'}
        </p>
        <p className="text-xs text-center mb-8 opacity-75 max-w-4xl mx-auto">
          {language === 'es' 
            ? t('dashboard.figuresRepresent')
            : 'These figures represent an example of average incremental costs per additional occupied room for standard 3-4-5 star hotels in Western markets. Actual costs may vary and should be adjusted based on each hotel\'s specific category, service level, positioning, and operational model.'
          }
        </p>
        <ModelRatesTabs />
      </div>
    </div>
  );
};
