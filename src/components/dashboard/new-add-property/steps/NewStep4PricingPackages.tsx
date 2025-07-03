import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface NewStep4PricingPackagesProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

export function NewStep4PricingPackages({
  formData,
  updateFormData,
  onValidationChange
}: NewStep4PricingPackagesProps) {
  
  const selectedDurations = formData.selectedStayDurations || [];
  const [enablePriceIncrease, setEnablePriceIncrease] = useState(formData.enablePriceIncrease || false);
  const [priceIncreaseCap, setPriceIncreaseCap] = useState(formData.priceIncreaseCap || 20);

  // Validation - all selected durations must have pricing
  useEffect(() => {
    const durationPricing = formData.durationPricing || {};
    
    const allDurationsHavePricing = selectedDurations.every((duration: number) => {
      const pricing = durationPricing[duration.toString()];
      return pricing && (pricing.double > 0 || pricing.single > 0);
    });
    
    console.log('✅ Step 4 validation:', allDurationsHavePricing);
    onValidationChange(allDurationsHavePricing);
  }, [formData.durationPricing, selectedDurations, onValidationChange]);

  const updateDurationPricing = (duration: number, occupancy: 'double' | 'single', price: string) => {
    const currentPricing = formData.durationPricing || {};
    const durationKey = duration.toString();
    
    const updatedPricing = {
      ...currentPricing,
      [durationKey]: {
        ...currentPricing[durationKey],
        [occupancy]: parseFloat(price) || 0
      }
    };
    
    updateFormData('durationPricing', updatedPricing);
  };

  const handlePriceIncreaseToggle = (checked: boolean) => {
    setEnablePriceIncrease(checked);
    updateFormData('enablePriceIncrease', checked);
  };

  // Initialize pricing structure for selected durations
  useEffect(() => {
    const currentPricing = formData.durationPricing || {};
    let needsUpdate = false;
    
    selectedDurations.forEach((duration: number) => {
      const key = duration.toString();
      if (!currentPricing[key]) {
        currentPricing[key] = { double: 0, single: 0 };
        needsUpdate = true;
      }
    });
    
    if (needsUpdate) {
      updateFormData('durationPricing', currentPricing);
    }
  }, [selectedDurations]);

  const durationPricing = formData.durationPricing || {};

  return (
    <div className="space-y-6 bg-purple-900 text-white p-6 rounded-lg">
      
      <Card className="bg-purple-800 border-purple-600">
        <CardHeader>
          <CardTitle className="text-white">Step 4: Pricing & Packages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Duration-based Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Duration-based Pricing *</h3>
            <p className="text-purple-200">Set prices for your selected stay durations:</p>
            
            {selectedDurations.length === 0 ? (
              <p className="text-purple-200">Please select stay durations in Step 3 first.</p>
            ) : (
              <div className="space-y-4">
                {selectedDurations.map((duration: number) => (
                  <div key={duration} className="p-4 border border-purple-500 rounded-lg bg-purple-700/30">
                    <h4 className="font-medium mb-4 text-white">{duration} Days Stay</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-white">Double Occupancy Price (€)</Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={durationPricing[duration.toString()]?.double || ''}
                          onChange={(e) => updateDurationPricing(duration, 'double', e.target.value)}
                          placeholder="0.00"
                          className="bg-purple-700 border-purple-500 text-white placeholder:text-purple-300"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-white">Single Occupancy Price (€)</Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={durationPricing[duration.toString()]?.single || ''}
                          onChange={(e) => updateDurationPricing(duration, 'single', e.target.value)}
                          placeholder="0.00"
                          className="bg-purple-700 border-purple-500 text-white placeholder:text-purple-300"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dynamic Pricing Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Dynamic Pricing Settings</h3>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="enablePriceIncrease"
                checked={enablePriceIncrease}
                onCheckedChange={handlePriceIncreaseToggle}
                className="border-purple-400 data-[state=checked]:bg-purple-600"
              />
              <Label htmlFor="enablePriceIncrease" className="text-white">Enable automatic price increases based on demand</Label>
            </div>

            {enablePriceIncrease && (
              <div className="ml-6 space-y-2">
                <Label htmlFor="priceIncreaseCap" className="text-white">Maximum price increase (%)</Label>
                <Input
                  id="priceIncreaseCap"
                  type="number"
                  min="0"
                  max="100"
                  value={priceIncreaseCap}
                  onChange={(e) => setPriceIncreaseCap(parseInt(e.target.value) || 0)}
                  className="w-32 bg-purple-700 border-purple-500 text-white"
                />
              </div>
            )}
          </div>

          {/* Pricing Summary */}
          {Object.keys(durationPricing).length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Pricing Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(durationPricing).map(([duration, pricing]: [string, any]) => (
                  <div key={duration} className="p-3 bg-purple-700/50 rounded border border-purple-500">
                    <p className="font-medium text-white">{duration} Days</p>
                    {pricing.double > 0 && <p className="text-sm text-purple-200">Double: €{pricing.double}</p>}
                    {pricing.single > 0 && <p className="text-sm text-purple-200">Single: €{pricing.single}</p>}
                  </div>
                ))}
              </div>
              
              {enablePriceIncrease && (
                <p className="mt-3 text-sm text-purple-200">
                  Dynamic pricing enabled with {priceIncreaseCap}% maximum increase
                </p>
              )}
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}