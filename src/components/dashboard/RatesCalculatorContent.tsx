import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

export const RatesCalculatorContent: React.FC = () => {
  const { t } = useTranslation("dashboard");
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-lg p-6 text-white border-fuchsia-500/20 bg-[#0807a0]">
        <h2 className="text-xl font-bold text-center">
          {t('ratesCalculator.standardEconomicModel')}
        </h2>
      </div>

      {/* Before Starting Disclaimer */}
      <div className="mb-6 text-white bg-gradient-to-r from-blue-700/60 to-fuchsia-800/60 rounded-lg p-6 border border-fuchsia-400/15 shadow backdrop-blur-sm">
        <h3 className="font-extrabold text-base uppercase mb-2 tracking-wider text-fuchsia-200">
          {t('ratesCalculator.beforeStartingTitle')}
        </h3>
        <div 
          className="text-[15px] leading-relaxed font-medium" 
          dangerouslySetInnerHTML={{
            __html: t('ratesCalculator.beforeStartingDescription')
          }} 
        />
      </div>
    </div>
  );
};