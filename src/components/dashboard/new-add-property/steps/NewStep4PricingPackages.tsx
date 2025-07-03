
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

  const handleEnablePriceIncreaseChange = (checked: boolean) => {
    setEnablePriceIncrease(checked);
    updateFormData('enablePriceIncrease', checked);
  };

  const handlePriceIncreaseCapChange = (value: string) => {
    const cap = parseInt(value) || 20;
    setPriceIncreaseCap(cap);
    updateFormData('priceIncreaseCap', cap);
  };

  if (selectedDurations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Step 4: Pricing Packages</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Please select stay durations in Step 3 to configure pricing.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      
      <Card>
        <CardHeader>
          <CardTitle>Step 4: Pricing by Duration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Dynamic Pricing Settings */}
          <div className="p-4 border rounded-lg bg-blue-50">
            <h4 className="font-semibold mb-4">Dynamic Pricing Settings</h4>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="enablePriceIncrease"
                  checked={enablePriceIncrease}
                  onCheckedChange={handleEnablePriceIncreaseChange}
                />
                <Label htmlFor="enablePriceIncrease">
                  Enable dynamic price increase based on demand
                </Label>
              </div>
              
              {enablePriceIncrease && (
                <div className="space-y-2">
                  <Label htmlFor="priceIncreaseCap">Maximum price increase (%)</Label>
                  <Input
                    id="priceIncreaseCap"
                    type="number"
                    min="0"
                    max="100"
                    value={priceIncreaseCap}
                    onChange={(e) => handlePriceIncreaseCapChange(e.target.value)}
                    className="w-32"
                  />
                  <p className="text-sm text-gray-600">
                    Prices can increase up to {priceIncreaseCap}% during high demand periods
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Pricing Matrix */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Set Pricing for Selected Durations</h4>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 p-3 text-left">Stay Duration</th>
                    <th className="border border-gray-300 p-3 text-center">Double Occupancy (€)</th>
                    <th className="border border-gray-300 p-3 text-center">Single Occupancy (€)</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedDurations.map((duration: number) => {
                    const currentPricing = formData.durationPricing?.[duration.toString()] || { double: 0, single: 0 };
                    
                    return (
                      <tr key={duration} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-3 font-medium">
                          {duration} days
                        </td>
                        <td className="border border-gray-300 p-3">
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={currentPricing.double || ''}
                            onChange={(e) => updateDurationPricing(duration, 'double', e.target.value)}
                            placeholder="0.00"
                            className="w-full"
                          />
                        </td>
                        <td className="border border-gray-300 p-3">
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={currentPricing.single || ''}
                            onChange={(e) => updateDurationPricing(duration, 'single', e.target.value)}
                            placeholder="0.00"
                            className="w-full"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="text-sm text-gray-600 space-y-1">
              <p>• Set prices for each stay duration and occupancy type</p>
              <p>• Double occupancy: Price for two guests sharing a room</p>
              <p>• Single occupancy: Price for one guest in a room</p>
              <p>• At least one occupancy type must have a price for each duration</p>
            </div>
          </div>

          {/* Pricing Preview */}
          {selectedDurations.length > 0 && (
            <div className="p-4 border rounded-lg bg-green-50">
              <h4 className="font-semibold mb-3">Pricing Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedDurations.map((duration: number) => {
                  const pricing = formData.durationPricing?.[duration.toString()];
                  if (!pricing || (pricing.double === 0 && pricing.single === 0)) return null;
                  
                  return (
                    <div key={duration} className="p-3 bg-white rounded border">
                      <p className="font-medium">{duration} Days Package</p>
                      {pricing.double > 0 && (
                        <p className="text-sm text-gray-600">Double: €{pricing.double}</p>
                      )}
                      {pricing.single > 0 && (
                        <p className="text-sm text-gray-600">Single: €{pricing.single}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
