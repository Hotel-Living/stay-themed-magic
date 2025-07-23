
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';
import { HotelRegistrationFormData } from '../NewHotelRegistrationForm';

interface AvailabilityPackagesSectionProps {
  form: UseFormReturn<HotelRegistrationFormData>;
}

export const AvailabilityPackagesSection = ({ form }: AvailabilityPackagesSectionProps) => {
  const { t } = useTranslation('dashboard/hotel-registration');

  return (
    <AccordionItem value="availability-packages" className="bg-white/5 border-white/20 rounded-lg">
      <AccordionTrigger className="px-6 py-4 text-white hover:no-underline">
        <div className="flex items-center space-x-3">
          <span className="bg-fuchsia-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">15</span>
          <span>{t('availabilityPackages.title')}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6">
        <div className="space-y-6">
          <div className="text-white/80 text-sm">
            {t('availabilityPackages.description')}
          </div>
          
          <FormField
            control={form.control}
            name="numberOfRooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">{t('availabilityPackages.enterNumberOfRooms')}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="bg-white/10 border-white/30 text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="bg-white/5 rounded-lg p-4 border border-white/20">
            <h4 className="text-white font-semibold mb-3">{t('availabilityPackages.rulesTitle')}</h4>
            <ul className="text-white/80 text-sm space-y-2">
              <li>• {t('availabilityPackages.rule1')}</li>
              <li>• {t('availabilityPackages.rule2')}</li>
              <li>• {t('availabilityPackages.rule3')}</li>
              <li>• {t('availabilityPackages.rule4')}</li>
              <li>• {t('availabilityPackages.rule5')}</li>
              <li>• {t('availabilityPackages.rule6')}</li>
              <li>• {t('availabilityPackages.rule7')}</li>
            </ul>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
