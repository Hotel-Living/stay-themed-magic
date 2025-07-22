import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';
import { HotelRegistrationFormData } from '../NewHotelRegistrationForm';

interface CompletePhrasesSectionProps {
  form: UseFormReturn<HotelRegistrationFormData>;
}

export const CompletePhraseSection = ({ form }: CompletePhrasesSectionProps) => {
  const { t } = useTranslation('dashboard/hotel-registration');

  const handleInputChange = (fieldName: keyof HotelRegistrationFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    form.setValue(fieldName, value);
  };

  return (
    <AccordionItem value="complete-phrases" className="bg-white/5 border-white/20 rounded-lg">
      <AccordionTrigger className="px-6 py-4 text-white hover:no-underline">
        <div className="flex items-center space-x-3">
          <span className="bg-fuchsia-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">7</span>
          <span>{t('completePhrases.title')}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="idealForGuests"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">{t('completePhrases.idealForGuests')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('completePhrases.idealForGuestsPlaceholder')}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                    value={field.value}
                    onChange={handleInputChange('idealForGuests')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="atmosphere"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">{t('completePhrases.atmosphere')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('completePhrases.atmospherePlaceholder')}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                    value={field.value}
                    onChange={handleInputChange('atmosphere')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="locationPerfect"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">{t('completePhrases.locationPerfect')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('completePhrases.locationPerfectPlaceholder')}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                    value={field.value}
                    onChange={handleInputChange('locationPerfect')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};