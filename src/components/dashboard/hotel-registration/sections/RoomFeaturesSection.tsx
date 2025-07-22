import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslation } from '@/hooks/useTranslation';
import { HotelRegistrationFormData } from '../NewHotelRegistrationForm';

interface RoomFeaturesSectionProps {
  form: UseFormReturn<HotelRegistrationFormData>;
}

const ROOM_FEATURES = [
  'airConditioning', 'heating', 'balcony', 'terrace', 'kitchenette',
  'minibar', 'safe', 'tv', 'wifi', 'workDesk', 'seatingArea',
  'privateBalcony', 'soundproofing', 'ironingFacilities', 'coffeemaker',
  'refrigerator', 'bathtub', 'shower', 'hairdryer', 'slippers'
];

export const RoomFeaturesSection = ({ form }: RoomFeaturesSectionProps) => {
  const { t } = useTranslation('dashboard/hotel-registration');
  const selectedFeatures = form.watch('roomFeatures') || [];

  const handleFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      form.setValue('roomFeatures', [...selectedFeatures, feature]);
    } else {
      form.setValue('roomFeatures', selectedFeatures.filter(f => f !== feature));
    }
  };

  return (
    <AccordionItem value="room-features" className="bg-white/5 border-white/20 rounded-lg">
      <AccordionTrigger className="px-6 py-4 text-white hover:no-underline">
        <div className="flex items-center space-x-3">
          <span className="bg-fuchsia-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">9</span>
          <span>{t('roomFeatures.title')}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6">
        <FormField
          control={form.control}
          name="roomFeatures"
          render={() => (
            <FormItem>
              <FormLabel className="text-white">{t('roomFeatures.label')} <span className="text-white/50">({t('optional')})</span></FormLabel>
              <FormControl>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {ROOM_FEATURES.map((feature) => (
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
                        {t(`roomFeatures.${feature}`)}
                      </label>
                    </div>
                  ))}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </AccordionContent>
    </AccordionItem>
  );
};