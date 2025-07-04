
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
  const [durationPricing, setDurationPricing] = useState(formData.durationPricing || {});
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Check if Step 3 data is actually present - ONLY check stay durations and meal plans
  const hasStayDurations = formData.selectedStayDurations && formData.selectedStayDurations.length > 0;
  const hasMealPlans = formData.selectedMealPlans && formData.selectedMealPlans.length > 0;

  const hasRequiredStep3Data = hasStayDurations && hasMealPlans;

  useEffect(() => {
    // Update form data when pricing settings change
    updateFormData('enablePriceIncrease', enablePriceIncrease);
    updateFormData('priceIncreaseCap', priceIncreaseCap);
    updateFormData('durationPricing', durationPricing);

    // Validate the step - only check stay durations and meal plans
    const errors: string[] = [];
    
    if (!hasRequiredStep3Data) {
      errors.push(t('dashboard.defineRoomTypesStayDurations'));
    }

    // Validate pricing if data is present
    if (hasRequiredStep3Data) {
      const selectedDurations = formData.selectedStayDurations || [];
      const missingPrices = selectedDurations.some((duration: number) => {
        const pricing = durationPricing[duration];
        return !pricing || !pricing.double || !pricing.single || pricing.double <= 0 || pricing.single <= 0;
      });

      if (missingPrices) {
        errors.push('Please set prices for all selected stay durations');
      }
    }

    setValidationErrors(errors);
    onValidationChange(errors.length === 0);
  }, [enablePriceIncrease, priceIncreaseCap, durationPricing, hasRequiredStep3Data, updateFormData, onValidationChange, t, formData.selectedStayDurations]);

  const handlePriceIncreaseToggle = (checked: boolean) => {
    setEnablePriceIncrease(checked);
  };

  const handlePriceIncreaseCapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Math.max(parseInt(e.target.value) || 0, 0), 100);
    setPriceIncreaseCap(value);
  };

  const handlePriceChange = (duration: number, type: 'double' | 'single', value: string) => {
    const numValue = parseFloat(value) || 0;
    setDurationPricing(prev => ({
      ...prev,
      [duration]: {
        ...prev[duration],
        [type]: numValue
      }
    }));
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
          {/* Pricing Table */}
          <div className="bg-fuchsia-900/10 rounded-lg p-6">
            <h4 className="text-lg font-medium text-white mb-4">Pricing Structure</h4>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-fuchsia-900/50">
                    <th className="p-3 text-left text-white font-medium border border-fuchsia-500/30">
                      Stay Duration
                    </th>
                    <th className="p-3 text-center text-white font-medium border border-fuchsia-500/30">
                      Double Room (per person)
                    </th>
                    <th className="p-3 text-center text-white font-medium border border-fuchsia-500/30">
                      Single Use (per person)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(formData.selectedStayDurations || []).map((duration: number) => (
                    <tr key={duration} className="bg-fuchsia-950/20">
                      <td className="p-3 text-white font-medium border border-fuchsia-500/30">
                        {duration} days
                      </td>
                      <td className="p-3 border border-fuchsia-500/30">
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          value={durationPricing[duration]?.double || ''}
                          onChange={(e) => handlePriceChange(duration, 'double', e.target.value)}
                          className="w-full bg-fuchsia-950/30 border-fuchsia-500/30 text-white text-center"
                        />
                      </td>
                      <td className="p-3 border border-fuchsia-500/30">
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          value={durationPricing[duration]?.single || ''}
                          onChange={(e) => handlePriceChange(duration, 'single', e.target.value)}
                          className="w-full bg-fuchsia-950/30 border-fuchsia-500/30 text-white text-center"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

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
