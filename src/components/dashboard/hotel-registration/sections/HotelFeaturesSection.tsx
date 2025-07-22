import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslation } from '@/hooks/useTranslation';
import { HotelRegistrationFormData } from '../NewHotelRegistrationForm';

interface HotelFeaturesSectionProps {
  form: UseFormReturn<HotelRegistrationFormData>;
}

const HOTEL_FEATURES = [
  'wifi', 'pool', 'gym', 'spa', 'restaurant', 'bar', 'businessCenter',
  'meetingRooms', 'laundry', 'roomService', 'concierge', 'parking',
  'petFriendly', 'airportShuttle', 'freeCancellation', 'elevator',
  'garden', 'terrace', 'library', 'gameRoom', 'childcare', 'playground'
];

export const HotelFeaturesSection = ({ form }: HotelFeaturesSectionProps) => {
  const { t } = useTranslation('dashboard/hotel-registration');
  const selectedFeatures = form.watch('hotelFeatures') || [];

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
              <FormLabel className="text-white">{t('hotelFeatures.label')}</FormLabel>
              <FormControl>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {HOTEL_FEATURES.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature}
                        checked={selectedFeatures.includes(feature)}
                        onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                        className="border-white/30"
                      />
                      <label
                        htmlFor={feature}
                        className="text-white text-sm cursor-pointer"
                      >
                        {t(`hotelFeatures.${feature}`)}
                      </label>
                    </div>
                  ))}
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