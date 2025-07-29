import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from '@/hooks/useTranslation';
import { HotelRegistrationFormData } from '../NewHotelRegistrationForm';

interface PropertyTypeSectionProps {
  form: UseFormReturn<HotelRegistrationFormData>;
}

export const PropertyTypeSection = ({ form }: PropertyTypeSectionProps) => {
  const { t } = useTranslation('dashboard/hotel-registration');

  return (
    <AccordionItem value="property-type" className="bg-white/5 border-white/20 rounded-lg">
      <AccordionTrigger className="px-6 py-4 text-white hover:no-underline">
        <div className="flex items-center space-x-3">
          <span className="bg-fuchsia-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">3</span>
          <span>{t('propertyType.title')}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6">
        <FormField
          control={form.control}
          name="propertyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{t('propertyType.label')}</FormLabel>
              <p className="text-white/60 text-sm mb-2">Please select one option to proceed.</p>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white/10 border-white/30 text-white">
                    <SelectValue placeholder={t('propertyType.placeholder')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Hotel">{t('propertyType.hotel')}</SelectItem>
                  <SelectItem value="Boutique Hotel">{t('propertyType.boutiqueHotel')}</SelectItem>
                  <SelectItem value="Resort">{t('propertyType.resort')}</SelectItem>
                  <SelectItem value="Rural House">{t('propertyType.ruralHouse')}</SelectItem>
                  <SelectItem value="Hostel">{t('propertyType.hostel')}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </AccordionContent>
    </AccordionItem>
  );
};