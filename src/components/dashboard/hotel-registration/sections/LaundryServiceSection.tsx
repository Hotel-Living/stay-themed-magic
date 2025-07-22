import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslation } from '@/hooks/useTranslation';
import { HotelRegistrationFormData } from '../NewHotelRegistrationForm';

interface LaundryServiceSectionProps {
  form: UseFormReturn<HotelRegistrationFormData>;
}

export const LaundryServiceSection = ({ form }: LaundryServiceSectionProps) => {
  const { t } = useTranslation('dashboard/hotel-registration');

  return (
    <AccordionItem value="laundry-service" className="bg-white/5 border-white/20 rounded-lg">
      <AccordionTrigger className="px-6 py-4 text-white hover:no-underline">
        <div className="flex items-center space-x-3">
          <span className="bg-fuchsia-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">14</span>
          <span>{t('laundryService.title')}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="inHouseLaundryIncluded"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-white/30"
                  />
                </FormControl>
                <FormLabel className="text-white cursor-pointer">
                  {t('laundryService.inHouseIncluded')}
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="externalLaundryReferral"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-white/30"
                  />
                </FormControl>
                <FormLabel className="text-white cursor-pointer">
                  {t('laundryService.externalReferral')}
                </FormLabel>
              </FormItem>
            )}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};