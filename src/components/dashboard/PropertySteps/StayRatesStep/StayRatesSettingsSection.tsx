
import React from "react";
import { Slider } from "@/components/ui/slider";
import { useTranslation } from "@/hooks/useTranslation";

interface StayRatesSettingsSectionProps {
  enablePriceIncrease: boolean;
  setEnablePriceIncrease: (value: boolean) => void;
  priceIncreaseCap: number;
  setPriceIncreaseCap: (value: number) => void;
}

export const StayRatesSettingsSection: React.FC<StayRatesSettingsSectionProps> = ({
  enablePriceIncrease,
  setEnablePriceIncrease,
  priceIncreaseCap,
  setPriceIncreaseCap
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="enableDynamicPricing"
          checked={enablePriceIncrease}
          onChange={(e) => setEnablePriceIncrease(e.target.checked)}
          className="w-4 h-4 text-fuchsia-600 bg-gray-100 border-gray-300 rounded focus:ring-fuchsia-500"
        />
        <label htmlFor="enableDynamicPricing" className="text-white font-medium">
          {t('dashboard.enableDynamicPricing')}
        </label>
      </div>

      {enablePriceIncrease && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">
              {t('dashboard.maximumPriceIncrease')}: {priceIncreaseCap}%
            </span>
          </div>
          
          <Slider
            value={[priceIncreaseCap]}
            onValueChange={(value) => setPriceIncreaseCap(value[0])}
            max={100}
            min={0}
            step={5}
            className="w-full"
          />
          
          <p className="text-sm text-gray-300">
            {t('dashboard.maxPriceIncreaseDescription')}
          </p>
          
          <div className="mt-4 p-4 bg-purple-900/30 rounded-lg">
            <h4 className="text-white font-semibold mb-2">
              {t('dashboard.howDynamicPricingWorks')}
            </h4>
            <p className="text-sm text-gray-300">
              Dynamic pricing automatically adjusts room rates based on demand, occupancy levels, and booking patterns while respecting your maximum increase limit.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
