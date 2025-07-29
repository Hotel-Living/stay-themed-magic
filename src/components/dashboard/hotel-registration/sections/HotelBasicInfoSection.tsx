import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';
import { HotelRegistrationFormData } from '../NewHotelRegistrationForm';
import { CountryDropdown } from '../components/CountryDropdown';
import { AddressAutocomplete } from '../components/AddressAutocomplete';
import { SimpleAddressAutocomplete } from '../components/SimpleAddressAutocomplete';
import { MapPreview } from '../components/MapPreview';
import { EnhancedAccordionItem } from '../components/EnhancedAccordionItem';

interface HotelBasicInfoSectionProps {
  form: UseFormReturn<HotelRegistrationFormData>;
  stepValidation?: { isValid: boolean; hasErrors: boolean; isComplete: boolean };
}

export const HotelBasicInfoSection = ({ form, stepValidation }: HotelBasicInfoSectionProps) => {
  const { t } = useTranslation('dashboard/hotel-registration');

  return (
    <EnhancedAccordionItem
      value="basic-info"
      stepNumber={1}
      title={t('basicInfo.title')}
      isValid={stepValidation?.isValid || false}
      hasErrors={stepValidation?.hasErrors || false}
      isComplete={stepValidation?.isComplete || false}
    >
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="hotelName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{t('basicInfo.hotelName')}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={t('basicInfo.hotelNamePlaceholder')}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{t('basicInfo.address')}</FormLabel>
              <FormControl>
                <SimpleAddressAutocomplete
                  value={field.value}
                  onChange={field.onChange}
                  onAddressComponents={(components) => {
                    // Auto-populate other fields when Google Maps provides data
                    if (components.locality) {
                      form.setValue('city', components.locality);
                    }
                    if (components.postal_code) {
                      form.setValue('postalCode', components.postal_code);
                    }
                    if (components.country) {
                      form.setValue('country', components.country);
                    }
                  }}
                  placeholder={t('basicInfo.addressPlaceholder')}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/50 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">{t('basicInfo.city')}</FormLabel>
                <FormControl>
                  <Input 
                    placeholder={t('basicInfo.cityPlaceholder')}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">{t('basicInfo.postalCode')}</FormLabel>
                <FormControl>
                  <Input 
                    placeholder={t('basicInfo.postalCodePlaceholder')}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{t('basicInfo.country')}</FormLabel>
              <FormControl>
                <CountryDropdown
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={t('basicInfo.countryPlaceholder')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
          <p className="text-white/70 text-sm mb-2">Map Preview</p>
          <MapPreview 
            address={form.watch('address')}
            city={form.watch('city')}
            country={form.watch('country')}
          />
        </div>
      </div>
    </EnhancedAccordionItem>
  );
};