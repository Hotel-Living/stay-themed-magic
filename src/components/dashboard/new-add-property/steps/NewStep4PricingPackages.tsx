
import React, { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from '@/hooks/useTranslation';

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

  // Validation logic
  useEffect(() => {
    const hasRoomTypes = formData.roomTypes && formData.roomTypes.length > 0;
    const hasStayDurations = formData.selectedStayDurations && formData.selectedStayDurations.length > 0;
    const hasPricing = formData.durationPricing && Object.keys(formData.durationPricing).length > 0;

    // Check if pricing is set for all duration/room combinations
    let pricingComplete = true;
    if (hasRoomTypes && hasStayDurations) {
      formData.selectedStayDurations.forEach((duration: number) => {
        formData.roomTypes.forEach((roomType: any) => {
          const key = `${duration}-${roomType.name}`;
          if (!formData.durationPricing[key] || 
              !formData.durationPricing[key].double || 
              !formData.durationPricing[key].single) {
            pricingComplete = false;
          }
        });
      });
    }

    const isValid = hasRoomTypes && hasStayDurations && hasPricing && pricingComplete;
    onValidationChange(isValid);
  }, [formData.roomTypes, formData.selectedStayDurations, formData.durationPricing, onValidationChange]);

  const updatePricing = (duration: number, roomType: string, occupancy: 'double' | 'single', value: string) => {
    const key = `${duration}-${roomType}`;
    const currentPricing = formData.durationPricing || {};
    
    updateFormData('durationPricing', {
      ...currentPricing,
      [key]: {
        ...currentPricing[key],
        [occupancy]: parseFloat(value) || 0
      }
    });
  };

  const getPricing = (duration: number, roomType: string, occupancy: 'double' | 'single'): number => {
    const key = `${duration}-${roomType}`;
    return formData.durationPricing?.[key]?.[occupancy] || 0;
  };

  if (!formData.roomTypes || formData.roomTypes.length === 0) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">{t('dashboard.pricingPackages')}</h2>
        </div>
        <div className="bg-purple-800/30 p-6 rounded-lg">
          <p className="text-white text-center">
            {t('dashboard.defineRoomTypesStayDurations')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">{t('dashboard.pricingPackages')}</h2>
      </div>

      {/* Pricing Table */}
      <div className="space-y-4">
        <Label className="text-white text-lg font-semibold">
          {t('dashboard.durationPricing')} <span className="text-red-500">*</span>
        </Label>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-purple-800/50">
                <th className="border border-purple-600 p-3 text-white text-left">
                  {t('dashboard.duration') || 'Duration'}
                </th>
                <th className="border border-purple-600 p-3 text-white text-left">
                  {t('dashboard.roomType') || 'Room Type'}
                </th>
                <th className="border border-purple-600 p-3 text-white text-left">
                  {t('dashboard.doubleOccupancy') || 'Double Occupancy (€)'}
                </th>
                <th className="border border-purple-600 p-3 text-white text-left">
                  {t('dashboard.singleOccupancy') || 'Single Occupancy (€)'}
                </th>
              </tr>
            </thead>
            <tbody>
              {(formData.selectedStayDurations || []).map((duration: number) =>
                (formData.roomTypes || []).map((roomType: any, idx: number) => (
                  <tr key={`${duration}-${roomType.name}`} className="bg-purple-800/20">
                    {idx === 0 && (
                      <td 
                        className="border border-purple-600 p-3 text-white font-medium"
                        rowSpan={formData.roomTypes.length}
                      >
                        {duration} {t('dashboard.days') || 'days'}
                      </td>
                    )}
                    <td className="border border-purple-600 p-3 text-white">
                      {roomType.name}
                    </td>
                    <td className="border border-purple-600 p-3">
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={getPricing(duration, roomType.name, 'double')}
                        onChange={(e) => updatePricing(duration, roomType.name, 'double', e.target.value)}
                        className="bg-purple-800/50 border-purple-600 text-white"
                      />
                    </td>
                    <td className="border border-purple-600 p-3">
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={getPricing(duration, roomType.name, 'single')}
                        onChange={(e) => updatePricing(duration, roomType.name, 'single', e.target.value)}
                        className="bg-purple-800/50 border-purple-600 text-white"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Price Increase Settings */}
      <div className="space-y-4">
        <Label className="text-white text-lg font-semibold">
          {t('dashboard.priceSettings') || 'Price Settings'}
        </Label>
        
        <div className="space-y-4 bg-purple-800/30 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="enablePriceIncrease"
              checked={formData.enablePriceIncrease || false}
              onCheckedChange={(checked) => updateFormData('enablePriceIncrease', checked)}
              className="border-purple-600"
            />
            <Label htmlFor="enablePriceIncrease" className="text-white">
              {t('dashboard.enablePriceIncrease')}
            </Label>
          </div>

          {formData.enablePriceIncrease && (
            <div className="space-y-2">
              <Label htmlFor="priceIncreaseCap" className="text-white">
                {t('dashboard.priceIncreaseCap')} (%)
              </Label>
              <Input
                id="priceIncreaseCap"
                type="number"
                min="0"
                max="100"
                value={formData.priceIncreaseCap || 20}
                onChange={(e) => updateFormData('priceIncreaseCap', parseInt(e.target.value) || 20)}
                className="bg-purple-800/50 border-purple-600 text-white w-32"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
