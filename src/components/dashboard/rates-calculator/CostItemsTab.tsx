
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

export const CostItemsTab: React.FC = () => {
  const { t } = useTranslation();

  const utilitiesText = t('utilitiesText');
  const cleaningText = t('cleaningText');
  const mealsText = t('mealsText');

  return (
    <div className="space-y-6">
      {/* Utilities Section */}
      <div className="glass-card rounded-lg p-6 text-white border-blue-500/20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-4 text-blue-200">
          {t('utilities')}
        </h3>
        <div className="text-sm leading-relaxed whitespace-pre-line">
          {utilitiesText}
        </div>
      </div>

      {/* Cleaning Section */}
      <div className="glass-card rounded-lg p-6 text-white border-blue-500/20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-4 text-blue-200">
          {t('cleaning')}
        </h3>
        <div className="text-sm leading-relaxed whitespace-pre-line">
          {cleaningText}
        </div>
      </div>

      {/* Meals Section */}
      <div className="glass-card rounded-lg p-6 text-white border-blue-500/20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-4 text-blue-200">
          {t('meals')}
        </h3>
        <div className="text-sm leading-relaxed text-center text-lg font-semibold">
          {mealsText}
        </div>
      </div>

      {/* Total Cost Summary */}
      <div className="glass-card rounded-lg p-6 text-white border-fuchsia-500/20 bg-gradient-to-br from-fuchsia-900/40 to-purple-900/40 backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-center text-fuchsia-200">
          {t('totalCost')}
        </h3>
        <div className="text-center mt-4">
          <p className="text-lg opacity-80">
            {t('ratesCalculator.disclaimer')}
          </p>
        </div>
      </div>
    </div>
  );
};
