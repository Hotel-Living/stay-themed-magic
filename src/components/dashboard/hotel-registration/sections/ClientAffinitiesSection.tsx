import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';
import { HotelRegistrationFormData } from '../NewHotelRegistrationForm';

interface ClientAffinitiesSectionProps {
  form: UseFormReturn<HotelRegistrationFormData>;
}

const CLIENT_AFFINITIES = [
  'nature', 'culture', 'adventure', 'wellness', 'gastronomy', 'history',
  'art', 'sports', 'beach', 'mountains', 'photography', 'wine',
  'music', 'shopping', 'nightlife', 'family', 'couples', 'solo',
  'luxury', 'budget', 'eco-friendly', 'business', 'relaxation',
  'fitness', 'spa', 'golf', 'cycling', 'hiking', 'water-sports',
  'winter-sports', 'festivals', 'events', 'museums', 'architecture'
];

export const ClientAffinitiesSection = ({ form }: ClientAffinitiesSectionProps) => {
  const { t } = useTranslation('dashboard/hotel-registration');
  const [searchTerm, setSearchTerm] = useState('');
  const selectedAffinities = form.watch('clientAffinities') || [];

  const filteredAffinities = CLIENT_AFFINITIES.filter(affinity =>
    affinity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAffinityChange = (affinity: string, checked: boolean) => {
    if (checked) {
      form.setValue('clientAffinities', [...selectedAffinities, affinity]);
    } else {
      form.setValue('clientAffinities', selectedAffinities.filter(a => a !== affinity));
    }
  };

  return (
    <AccordionItem value="client-affinities" className="bg-white/5 border-white/20 rounded-lg">
      <AccordionTrigger className="px-6 py-4 text-white hover:no-underline">
        <div className="flex items-center space-x-3">
          <span className="bg-fuchsia-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">10</span>
          <span>{t('clientAffinities.title')}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6">
        <FormField
          control={form.control}
          name="clientAffinities"
          render={() => (
            <FormItem>
              <FormLabel className="text-white">{t('clientAffinities.label')} <span className="text-white/50">({t('optional')})</span></FormLabel>
              
              <div className="mt-4 space-y-4">
                <Input
                  placeholder={t('clientAffinities.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                />

                <FormControl>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-80 overflow-y-auto">
                    {filteredAffinities.map((affinity) => (
                      <div key={affinity} className="flex items-center space-x-2">
                        <Checkbox
                          id={affinity}
                          checked={selectedAffinities.includes(affinity)}
                          onCheckedChange={(checked) => handleAffinityChange(affinity, checked as boolean)}
                          className="border-white/30"
                        />
                        <label
                          htmlFor={affinity}
                          className="text-white text-sm cursor-pointer"
                        >
                          {t(`clientAffinities.${affinity}`)}
                        </label>
                      </div>
                    ))}
                  </div>
                </FormControl>
              </div>
            </FormItem>
          )}
        />
      </AccordionContent>
    </AccordionItem>
  );
};