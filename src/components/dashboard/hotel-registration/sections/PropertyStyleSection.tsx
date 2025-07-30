import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from '@/hooks/useTranslation';
import { HotelRegistrationFormData } from '../NewHotelRegistrationForm';

interface PropertyStyleSectionProps {
  form: UseFormReturn<HotelRegistrationFormData>;
}

export const PropertyStyleSection = ({ form }: PropertyStyleSectionProps) => {
  const { t } = useTranslation('dashboard/hotel-registration');

  return (
    <AccordionItem value="property-style" className="bg-white/5 border-white/20 rounded-lg">
      <AccordionTrigger className="px-6 py-4 text-white hover:no-underline">
        <div className="flex items-center space-x-3">
          <span className="bg-fuchsia-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">4</span>
          <span>{t('propertyStyle.title')}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6">
        <FormField
          control={form.control}
          name="propertyStyle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{t('propertyStyle.label')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white/10 border-white/30 text-white">
                    <SelectValue placeholder={t('propertyStyle.placeholder')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Classic">{t('propertyStyle.classic')}</SelectItem>
                  <SelectItem value="Classic Elegant">{t('propertyStyle.classicElegant')}</SelectItem>
                  <SelectItem value="Modern">{t('propertyStyle.modern')}</SelectItem>
                  <SelectItem value="Fusion">{t('propertyStyle.fusion')}</SelectItem>
                  <SelectItem value="Urban">{t('propertyStyle.urban')}</SelectItem>
                  <SelectItem value="Rural">{t('propertyStyle.rural')}</SelectItem>
                  <SelectItem value="Minimalist">{t('propertyStyle.minimalist')}</SelectItem>
                  <SelectItem value="Luxury">{t('propertyStyle.luxury')}</SelectItem>
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