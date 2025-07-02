
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { DisclaimerText } from "./components/DisclaimerText";
import { CostTableImage } from "./components/CostTableImage";

export const DefaultCostsTab: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4">
      <div className="glass-card rounded-lg p-8 text-center text-white/80 border-fuchsia-500/20 bg-[#5f098a]">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-4">
            {t('dashboard.ratesCalculator.strategicContent.title')}
          </h3>
          <p className="text-white/90 leading-relaxed mb-6">
            {t('dashboard.ratesCalculator.strategicContent.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <span className="bg-fuchsia-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {t('dashboard.ratesCalculator.strategicContent.benefits.predictability')}
            </span>
            <span className="bg-fuchsia-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {t('dashboard.ratesCalculator.strategicContent.benefits.responsibility')}
            </span>
            <span className="bg-fuchsia-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {t('dashboard.ratesCalculator.strategicContent.benefits.efficiency')}
            </span>
          </div>
          <p className="text-white/80 text-sm leading-relaxed">
            {t('dashboard.ratesCalculator.strategicContent.guestDescription')}
          </p>
        </div>
        
        <DisclaimerText />
        <CostTableImage 
          src="/lovable-uploads/589c396e-8094-48ec-956c-aeb87a21450a.png"
          alt="Cost Per Additional Occupied Room Table"
        />
      </div>
    </div>
  );
};
