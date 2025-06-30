
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

export const CostItemsTab: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      {/* Utilities Section */}
      <div className="glass-card rounded-lg p-8 text-center text-white border-fuchsia-500/20 bg-[#5f098a]">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-fuchsia-200 mb-4">
            {t('ratesCalculator.utilitiesTitle')}
          </h2>
          <p className="text-lg font-semibold text-white mb-2">
            {t('ratesCalculator.utilitiesGuestsNotTransients')}
          </p>
          <p className="text-white/80 mb-4">
            {t('ratesCalculator.utilitiesDescription1')}
          </p>
          <p className="text-lg font-semibold text-fuchsia-200 mb-2">
            {t('ratesCalculator.utilitiesSmartGuestsTitle')}
          </p>
          <p className="text-white/80 mb-2">
            {t('ratesCalculator.utilitiesDescription2')}
          </p>
          <p className="text-white/80">
            {t('ratesCalculator.utilitiesDescription3')}
          </p>
        </div>
        
        <div className="mt-8 rounded-lg p-4 bg-[#0807a0]">
          <img 
            src="/lovable-uploads/589c396e-8094-48ec-956c-aeb87a21450a.png"
            alt="Utilities Cost Analysis"
            className="w-full h-auto rounded-lg mx-auto"
          />
        </div>
      </div>

      {/* Cleaning Section */}
      <div className="glass-card rounded-lg p-8 text-center text-white border-fuchsia-500/20 bg-[#5f098a]">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-fuchsia-200 mb-4">
            {t('ratesCalculator.cleaningModelTitle')}
          </h2>
          <p className="text-lg font-semibold text-white mb-2">
            {t('ratesCalculator.cleaningHotelLivingStandard')}
          </p>
          <p className="text-lg font-semibold text-fuchsia-200 mb-4">
            {t('ratesCalculator.cleaningFeelsLikeHome')}
          </p>
          <p className="text-white/80 mb-4">
            {t('ratesCalculator.cleaningDescription1')}
          </p>
          <p className="text-white/80 mb-4">
            {t('ratesCalculator.cleaningDescription2')}
          </p>
          <p className="text-lg font-semibold text-fuchsia-200">
            {t('ratesCalculator.cleaningCompleteTitle')}
          </p>
        </div>
        
        <div className="mt-8 rounded-lg p-4 bg-[#0807a0]">
          <img 
            src="/lovable-uploads/589c396e-8094-48ec-956c-aeb87a21450a.png"
            alt="Cleaning Cost Analysis"
            className="w-full h-auto rounded-lg mx-auto"
          />
        </div>
      </div>

      {/* Meals Section */}
      <div className="glass-card rounded-lg p-8 text-center text-white border-fuchsia-500/20 bg-[#5f098a]">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-fuchsia-200 mb-4">
            {t('ratesCalculator.mealsModelTitle')}
          </h2>
          <p className="text-white/80 mb-4">
            {t('ratesCalculator.mealsModelDescription1')}
          </p>
          <p className="text-white/80 mb-4">
            {t('ratesCalculator.mealsModelDescription2')}
          </p>
          <p className="text-white/80 mb-4">
            {t('ratesCalculator.mealsModelDescription3')}
          </p>
          <p className="text-white/80">
            {t('ratesCalculator.mealsModelDescription4')}
          </p>
        </div>
        
        <div className="mt-8 rounded-lg p-4 bg-[#0807a0]">
          <img 
            src="/lovable-uploads/fcfc71f6-35b0-4f42-b2c4-4a1761439989.png"
            alt="Meals Cost Analysis"
            className="rounded-lg shadow-lg border border-purple-400/20"
          />
        </div>
      </div>
    </div>
  );
};
