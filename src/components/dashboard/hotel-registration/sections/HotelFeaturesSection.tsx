import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslation } from '@/hooks/useTranslation';
import { useFiltersByCategoryWithLanguage } from '@/hooks/useFiltersByCategoryWithLanguage';
import { HotelRegistrationFormData } from '../NewHotelRegistrationForm';
import { SelectionCounter } from '../components/SelectionCounter';

interface HotelFeaturesSectionProps {
  form: UseFormReturn<HotelRegistrationFormData>;
}

export const HotelFeaturesSection = ({ form }: HotelFeaturesSectionProps) => {
  const { t } = useTranslation('dashboard/hotel-registration');
  const selectedFeatures = form.watch('hotelFeatures') || [];
  const { data: hotelFeatures, isLoading } = useFiltersByCategoryWithLanguage('hotel_features');

  const handleFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      form.setValue('hotelFeatures', [...selectedFeatures, feature]);
    } else {
      form.setValue('hotelFeatures', selectedFeatures.filter(f => f !== feature));
    }
  };

  return (
    <AccordionItem value="hotel-features" className="bg-white/5 border-white/20 rounded-lg">
      <AccordionTrigger className="px-6 py-4 text-white hover:no-underline">
        <div className="flex items-center space-x-3">
          <span className="bg-fuchsia-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">8</span>
          <span>{t('hotelFeatures.title')}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6">
        <FormField
          control={form.control}
          name="hotelFeatures"
          render={() => (
             <FormItem>
               <div className="flex justify-between items-center mb-2">
                 <FormLabel className="text-white">{t('hotelFeatures.label')}</FormLabel>
                 <SelectionCounter selectedItems={selectedFeatures} minRequired={5} />
               </div>
               <p className="text-white/60 text-sm mb-2">Select at least 5 features.</p>
               <FormControl>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {isLoading ? (
                    <div className="text-white text-sm">{t('hotelFeatures.loading')}</div>
                  ) : (
                    hotelFeatures?.map((feature) => (
                      <div key={feature.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={feature.id}
                          checked={selectedFeatures.includes(feature.value)}
                          onCheckedChange={(checked) => handleFeatureChange(feature.value, checked as boolean)}
                          className="border-white/30"
                        />
                        <label
                          htmlFor={feature.id}
                          className="text-white text-sm cursor-pointer"
                        >
                          {feature.value}
                        </label>
                      </div>
                    ))
                  )}
                </div>
              </FormControl>
              <FormMessage />
              {selectedFeatures.length === 0 && (
                <p className="text-red-400 text-sm mt-2">{t('hotelFeatures.required')}</p>
              )}
            </FormItem>
          )}
        />
      </AccordionContent>
    </AccordionItem>
  );
};