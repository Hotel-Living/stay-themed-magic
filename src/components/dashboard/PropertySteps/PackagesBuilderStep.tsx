import React, { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PackagesBuilderStepProps {
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function PackagesBuilderStep({
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {}
}: PackagesBuilderStepProps) {
  const { t } = useTranslation();
  const [enablePriceIncrease, setEnablePriceIncrease] = useState(true);
  const [priceIncreaseCap, setPriceIncreaseCap] = useState(20);
  const [pricingData, setPricingData] = useState<{[key: string]: {double: string, single: string}}>({});

  // Get selected durations and meal plan from previous steps
  const selectedDurations = formData?.selectedStayDurations || [];
  const selectedMealPlan = formData?.selectedMealPlan || '';

  const handlePriceChange = (duration: number, occupancy: 'double' | 'single', value: string) => {
    setPricingData(prev => ({
      ...prev,
      [duration]: {
        ...prev[duration],
        [occupancy]: value
      }
    }));
  };

  useEffect(() => {
    // Update form data with pricing settings and prices
    if (updateFormData) {
      updateFormData('enablePriceIncrease', enablePriceIncrease);
      updateFormData('priceIncreaseCap', priceIncreaseCap);
      updateFormData('durationPricing', pricingData);
    }

    // Validate step based on required data from previous steps and pricing completion
    const hasSelectedDurations = selectedDurations && selectedDurations.length > 0;
    const hasMealPlan = selectedMealPlan && selectedMealPlan !== '';
    
    // Check if all selected durations have both double and single prices set
    const allPricesSet = selectedDurations.every((duration: number) => {
      const pricing = pricingData[duration];
      return pricing && pricing.double && pricing.single && 
             Number(pricing.double) > 0 && Number(pricing.single) > 0;
    });

    const isValid = hasSelectedDurations && hasMealPlan && allPricesSet;
    onValidationChange(isValid);
  }, [enablePriceIncrease, priceIncreaseCap, pricingData, selectedDurations, selectedMealPlan, updateFormData, onValidationChange]);

  if (!selectedDurations.length || !selectedMealPlan) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">{t('dashboard.packagesAndRates')}</h2>
          <p className="text-gray-300">Set your pricing structure</p>
        </div>
        <div className="bg-yellow-900/30 p-4 rounded-lg border border-yellow-500/30">
          <p className="text-yellow-300">
            Please define stay durations and meal plan in Step 3 before establishing prices.
          </p>
        </div>
      </div>
    );
  }

  const getMealPlanLabel = (plan: string) => {
    const labels: {[key: string]: string} = {
      'breakfast': 'Breakfast Included',
      'half-board': 'Half Board',
      'full-board': 'Full Board',
      'all-inclusive': 'All Inclusive'
    };
    return labels[plan] || plan;
  };
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">PAQUETES Y PRECIOS</h2>
        <p className="text-gray-300">Set your pricing structure</p>
      </div>
      
      {/* Meal Plan Display */}
      <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-medium text-white mb-2">Meal Plan Included:</h3>
        <p className="text-xl text-purple-300 font-semibold">{getMealPlanLabel(selectedMealPlan)}</p>
      </div>

      {/* Pricing Table */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="text-white">Pricing by Stay Duration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4">Stay Duration</th>
                  <th className="text-left py-3 px-4">Double Occupancy ($)</th>
                  <th className="text-left py-3 px-4">Single Occupancy ($)</th>
                </tr>
              </thead>
              <tbody>
                {selectedDurations.map((duration: number) => (
                  <tr key={duration} className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">{duration} nights</td>
                    <td className="py-3 px-4">
                      <Input
                        type="number"
                        placeholder="0"
                        value={pricingData[duration]?.double || ''}
                        onChange={(e) => handlePriceChange(duration, 'double', e.target.value)}
                        className="w-32"
                        min="0"
                        step="1"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <Input
                        type="number"
                        placeholder="0"
                        value={pricingData[duration]?.single || ''}
                        onChange={(e) => handlePriceChange(duration, 'single', e.target.value)}
                        className="w-32"
                        min="0"
                        step="1"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Dynamic Pricing Settings */}
      <div className="bg-fuchsia-900/10 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4 uppercase text-white">Dynamic Pricing Settings</h3>
        <p className="text-gray-300 mb-4">
          Configure automatic price adjustments based on demand
        </p>
        
        <div className="flex items-center space-x-2 mb-4">
          <input 
            type="checkbox" 
            id="enable-dynamic-pricing" 
            checked={enablePriceIncrease} 
            onChange={e => setEnablePriceIncrease(e.target.checked)} 
            className="w-4 h-4" 
          />
          <label htmlFor="enable-dynamic-pricing" className="text-white">
            Enable dynamic pricing
          </label>
        </div>

        {enablePriceIncrease && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Maximum price increase: {priceIncreaseCap}%
              </label>
              <input 
                type="range" 
                min="0" 
                max="50" 
                value={priceIncreaseCap} 
                onChange={e => setPriceIncreaseCap(Number(e.target.value))} 
                className="w-full" 
              />
              <p className="text-sm text-gray-300 mt-2">
                Set the maximum percentage your prices can increase during high demand periods
              </p>
            </div>

            <div className="bg-fuchsia-950/30 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">How Dynamic Pricing Works</h4>
              <p className="text-sm text-gray-300 mb-2">
                Prices increase gradually as more nights are booked in a month
              </p>
              <div className="bg-black/30 p-2 rounded font-mono text-sm">
                Price increase = (Total nights in month) ÷ 20 × {priceIncreaseCap}%
              </div>
              <p className="text-sm text-gray-300 mt-2">
                Example: At {priceIncreaseCap}% max increase, prices reach maximum after {Math.round(2000 / priceIncreaseCap)} nights are booked in the month
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}