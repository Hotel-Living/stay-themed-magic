
import React, { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface NewStep4PricingPackagesProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

export const NewStep4PricingPackages: React.FC<NewStep4PricingPackagesProps> = ({
  formData,
  updateFormData,
  onValidationChange
}) => {
  const { t } = useTranslation();
  const [enablePriceIncrease, setEnablePriceIncrease] = useState(formData.enablePriceIncrease || false);
  const [priceIncreaseCap, setPriceIncreaseCap] = useState(formData.priceIncreaseCap || 20);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Check if Step 3 data is actually present - ONLY check stay durations and meal plans
  const hasStayDurations = formData.selectedStayDurations && formData.selectedStayDurations.length > 0;
  const hasMealPlans = formData.selectedMealPlans && formData.selectedMealPlans.length > 0;

  const hasRequiredStep3Data = hasStayDurations && hasMealPlans;

  useEffect(() => {
    // Update form data when pricing settings change
    updateFormData('enablePriceIncrease', enablePriceIncrease);
    updateFormData('priceIncreaseCap', priceIncreaseCap);

    // Validate the step - only check stay durations and meal plans
    const errors: string[] = [];
    
    if (!hasRequiredStep3Data) {
      errors.push(t('dashboard.defineRoomTypesStayDurations'));
    }

    setValidationErrors(errors);
    onValidationChange(errors.length === 0);
  }, [enablePriceIncrease, priceIncreaseCap, hasRequiredStep3Data, updateFormData, onValidationChange, t]);

  const handlePriceIncreaseToggle = (checked: boolean) => {
    setEnablePriceIncrease(checked);
  };

  const handlePriceIncreaseCapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Math.max(parseInt(e.target.value) || 0, 0), 100);
    setPriceIncreaseCap(value);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">
          {t('dashboard.packagesAndRates')}
        </h3>
      </div>

      {!hasRequiredStep3Data ? (
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 text-center">
          <p className="text-yellow-200 mb-4">
            {t('dashboard.defineRoomTypesStayDurations')}
          </p>
          <div className="text-sm text-yellow-300/70 space-y-1">
            {!hasStayDurations && <p>• {t('dashboard.stayDuration')} missing</p>}
            {!hasMealPlans && <p>• {t('dashboard.mealPlans')} missing</p>}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Dynamic Pricing Section */}
          <div className="bg-fuchsia-900/10 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Checkbox
                id="enable-dynamic-pricing"
                checked={enablePriceIncrease}
                onCheckedChange={handlePriceIncreaseToggle}
              />
              <Label htmlFor="enable-dynamic-pricing" className="text-white font-medium">
                {t('dashboard.enableDynamicPricing')}
              </Label>
            </div>

            {enablePriceIncrease && (
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="price-increase-cap" className="text-white mb-2 block">
                    {t('dashboard.maximumPriceIncrease')} (%)
                  </Label>
                  <Input
                    id="price-increase-cap"
                    type="number"
                    min="0"
                    max="100"
                    value={priceIncreaseCap}
                    onChange={handlePriceIncreaseCapChange}
                    className="w-32 bg-fuchsia-950/30 border-fuchsia-500/30 text-white"
                  />
                  <p className="text-sm text-gray-300 mt-1">
                    {t('dashboard.maxPriceIncreaseDescription')}
                  </p>
                </div>

                <div className="bg-fuchsia-950/20 rounded p-4">
                  <h4 className="text-sm font-medium text-white mb-2">
                    {t('dashboard.howDynamicPricingWorks')}
                  </h4>
                  <p className="text-sm text-gray-300 mb-2">
                    {t('dashboard.priceIncreaseDescription')}
                  </p>
                  <p className="text-sm text-gray-400">
                    {t('dashboard.priceIncreaseExample', { 
                      percent: priceIncreaseCap, 
                      nights: Math.floor(900 / priceIncreaseCap) 
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Display validation errors */}
      {validationErrors.length > 0 && (
        <div className="space-y-2">
          {validationErrors.map((error, index) => (
            <p key={index} className="text-red-400 text-sm bg-red-900/20 px-3 py-2 rounded">
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
