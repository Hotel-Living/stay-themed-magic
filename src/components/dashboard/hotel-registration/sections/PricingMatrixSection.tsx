import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';
import { HotelRegistrationFormData } from '../NewHotelRegistrationForm';

interface PricingMatrixSectionProps {
  form: UseFormReturn<HotelRegistrationFormData>;
}

export const PricingMatrixSection = ({ form }: PricingMatrixSectionProps) => {
  const { t } = useTranslation('dashboard/hotel-registration');
  const stayLengths = form.watch('stayLengths') || [];
  const classification = form.watch('classification');
  const pricingMatrix = form.watch('pricingMatrix') || [];

  const getPriceLimit = (classification: string) => {
    switch (classification) {
      case '***': return 1500;
      case '****': return 2500;
      case '*****': return 5000;
      default: return 1500;
    }
  };

  const priceLimit = getPriceLimit(classification);

  const updatePricing = (duration: number, field: 'doubleRoom' | 'singleRoom', value: number) => {
    const updated = [...pricingMatrix];
    const existingIndex = updated.findIndex(p => p.duration === duration);
    
    if (existingIndex >= 0) {
      updated[existingIndex] = { ...updated[existingIndex], [field]: value };
    } else {
      updated.push({ duration, doubleRoom: field === 'doubleRoom' ? value : 0, singleRoom: field === 'singleRoom' ? value : 0 });
    }
    
    form.setValue('pricingMatrix', updated);
  };

  const getPriceForDuration = (duration: number, field: 'doubleRoom' | 'singleRoom') => {
    const pricing = pricingMatrix.find(p => p.duration === duration);
    return pricing?.[field] || 0;
  };

  const calculateLowestMonthlyPrice = () => {
    if (stayLengths.length === 0) return 0;
    
    const proportionalPrices = [];
    
    // Calculate proportional price for each selected duration
    for (const length of stayLengths) {
      const duration = parseInt(length);
      const pricing = pricingMatrix.find(p => p.duration === duration);
      
      if (pricing?.doubleRoom && pricing.doubleRoom > 0) {
        // Formula: (double_room_price / duration) × 29
        const proportionalPrice = Math.round((pricing.doubleRoom / duration) * 29);
        proportionalPrices.push(proportionalPrice);
      }
    }
    
    // Return the lowest proportional price, or 0 if no valid prices
    return proportionalPrices.length > 0 ? Math.min(...proportionalPrices) : 0;
  };

  // Calculate and update price_per_month whenever pricing matrix changes
  React.useEffect(() => {
    const monthlyPrice = calculateLowestMonthlyPrice();
    if (monthlyPrice > 0) {
      form.setValue('price_per_month', monthlyPrice);
    }
  }, [pricingMatrix, stayLengths, form]);

  const lowestMonthlyPrice = calculateLowestMonthlyPrice();

  return (
    <AccordionItem value="pricing-matrix" className="bg-white/5 border-white/20 rounded-lg">
      <AccordionTrigger className="px-6 py-4 text-white hover:no-underline">
        <div className="flex items-center space-x-3">
          <span className="bg-fuchsia-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">16</span>
          <span>{t('pricingMatrix.title')}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6">
        <div className="space-y-4">
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
            <p className="text-yellow-200 text-sm">
              {t('pricingMatrix.priceLimit', { classification, limit: priceLimit })}
            </p>
          </div>

          {stayLengths.length === 0 ? (
            <p className="text-white/70">{t('pricingMatrix.selectStayLengthsFirst')}</p>
          ) : (
              <div className="space-y-6">
                {lowestMonthlyPrice > 0 && (
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                    <p className="text-blue-200 text-sm">
                      Your lowest proportional monthly price is estimated at: €{lowestMonthlyPrice}
                    </p>
                  </div>
                )}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left text-white p-2">{t('pricingMatrix.duration')}</th>
                      <th className="text-left text-white p-2">{t('pricingMatrix.doubleRoom')}</th>
                      <th className="text-left text-white p-2">{t('pricingMatrix.singleRoom')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stayLengths.map((length) => {
                      const duration = parseInt(length);
                      return (
                        <tr key={duration} className="border-b border-white/10">
                          <td className="text-white p-2">{duration} {t('pricingMatrix.days')}</td>
                          <td className="p-2">
                            <Input
                              type="number"
                              placeholder="€"
                              value={getPriceForDuration(duration, 'doubleRoom')}
                              onChange={(e) => updatePricing(duration, 'doubleRoom', parseInt(e.target.value) || 0)}
                              className="bg-white/10 border-white/30 text-white"
                              max={priceLimit}
                            />
                          </td>
                          <td className="p-2">
                            <Input
                              type="number"
                              placeholder="€"
                              value={getPriceForDuration(duration, 'singleRoom')}
                              onChange={(e) => updatePricing(duration, 'singleRoom', parseInt(e.target.value) || 0)}
                              className="bg-white/10 border-white/30 text-white"
                              max={priceLimit}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};