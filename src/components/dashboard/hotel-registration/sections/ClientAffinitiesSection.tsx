import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';
import { useThemesWithTranslations } from '@/hooks/useThemesWithTranslations';
import { HotelRegistrationFormData } from '../NewHotelRegistrationForm';

interface ClientAffinitiesSectionProps {
  form: UseFormReturn<HotelRegistrationFormData>;
}

export const ClientAffinitiesSection = ({ form }: ClientAffinitiesSectionProps) => {
  const { t } = useTranslation('dashboard/hotel-registration');
  const [searchTerm, setSearchTerm] = useState('');
  const selectedAffinities = form.watch('clientAffinities') || [];
  
  const { data: themes = [], isLoading } = useThemesWithTranslations();

  const filteredThemes = themes.filter(theme =>
    theme.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAffinityChange = (themeId: string, checked: boolean) => {
    if (checked) {
      form.setValue('clientAffinities', [...selectedAffinities, themeId]);
    } else {
      form.setValue('clientAffinities', selectedAffinities.filter(a => a !== themeId));
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
              <FormLabel className="text-white">{t('clientAffinities.selectAffinities')}</FormLabel>
              
              <div className="mt-4 space-y-4">
                <Input
                  placeholder="Buscar afinidades..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                />

                <FormControl>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-80 overflow-y-auto">
                    {isLoading ? (
                      <div className="text-white/50">Cargando afinidades...</div>
                    ) : (
                      filteredThemes.map((theme) => (
                        <div key={theme.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={theme.id}
                            checked={selectedAffinities.includes(theme.id)}
                            onCheckedChange={(checked) => handleAffinityChange(theme.id, checked as boolean)}
                            className="border-white/30"
                          />
                          <label
                            htmlFor={theme.id}
                            className="text-white text-sm cursor-pointer"
                          >
                            {theme.name}
                          </label>
                        </div>
                      ))
                    )}
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