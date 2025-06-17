
import React, { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";

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

  useEffect(() => {
    console.log("StayRatesSettingsSection - enablePriceIncrease:", enablePriceIncrease);
    console.log("StayRatesSettingsSection - priceIncreaseCap:", priceIncreaseCap);
    
    // Update form data with pricing settings
    if (updateFormData) {
      updateFormData('enablePriceIncrease', enablePriceIncrease);
      updateFormData('priceIncreaseCap', priceIncreaseCap);
    }

    // Validate step based on required data
    const hasRoomTypes = formData?.roomTypes && formData.roomTypes.length > 0;
    const hasMealPlans = formData?.mealPlans && formData.mealPlans.length > 0;
    const hasStayLengths = formData?.stayLengths && formData.stayLengths.length > 0;
    
    const isValid = hasRoomTypes && hasMealPlans && hasStayLengths;
    console.log("Step 4 validation:", isValid);
    onValidationChange(isValid);
  }, [enablePriceIncrease, priceIncreaseCap, formData, updateFormData, onValidationChange]);

  if (!formData?.roomTypes || !formData?.mealPlans || !formData?.stayLengths) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold mb-4 text-white">PACKAGES AND RATES</h2>
        <div className="bg-yellow-900/30 p-4 rounded-lg border border-yellow-500/30">
          <p className="text-yellow-300">
            Please define room types, stay durations, and meal plans in Step 3 before setting prices.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4 text-white">PACKAGES AND RATES</h2>
      
      <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4 mb-6">
        <p className="text-yellow-300 mb-4">
          Please define room types, stay durations, and meal plans in Step 3 before setting prices.
        </p>
      </div>

      <div className="bg-fuchsia-900/10 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4 uppercase text-white">IMPORTANT</h3>
        <p className="text-gray-300 mb-4">
          All fields marked as required must be completed before continuing. If you add new elements, 
          your property publication will require administrator approval before being published.
        </p>
        
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            id="enable-dynamic-pricing"
            checked={enablePriceIncrease}
            onChange={(e) => setEnablePriceIncrease(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="enable-dynamic-pricing" className="text-white">
            ENABLE DYNAMIC PRICING BASED ON NIGHTS SOLD
          </label>
        </div>

        {enablePriceIncrease && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                MAXIMUM PRICE INCREASE: {priceIncreaseCap}%
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={priceIncreaseCap}
                onChange={(e) => setPriceIncreaseCap(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-sm text-gray-300 mt-2">
                This is the maximum percentage prices can increase due to demand.
              </p>
            </div>

            <div className="bg-fuchsia-950/30 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">How Dynamic Pricing Works</h4>
              <p className="text-sm text-gray-300 mb-2">
                The price increases 1% for every X nights sold in a month, where X is calculated as:
              </p>
              <div className="bg-black/30 p-2 rounded font-mono text-sm">
                X = (Total nights in month) ÷ 20
              </div>
              <p className="text-sm text-gray-300 mt-2">
                For example, with 30 rooms × 30 days = 900 total nights and a 20% maximum increase, 
                the price would increase 1% for every 45 nights sold.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
