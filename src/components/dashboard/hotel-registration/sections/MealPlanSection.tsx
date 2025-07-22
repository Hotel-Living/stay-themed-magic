
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslation } from '@/hooks/useTranslation';
import { HotelRegistrationFormData } from '../NewHotelRegistrationForm';

interface MealPlanSectionProps {
  form: UseFormReturn<HotelRegistrationFormData>;
}

export const MealPlanSection = ({ form }: MealPlanSectionProps) => {
  const { t } = useTranslation('dashboard/hotel-registration');

  return (
    <AccordionItem value="meal-plan" className="bg-white/5 border-white/20 rounded-lg">
      <AccordionTrigger className="px-6 py-4 text-white hover:no-underline">
        <div className="flex items-center space-x-3">
          <span className="bg-fuchsia-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">12</span>
          <span>{t('mealPlans.title')}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6 space-y-6">
        <FormField
          control={form.control}
          name="mealPlan"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{t('mealPlans.label')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white/10 border-white/30 text-white">
                    <SelectValue placeholder={t('mealPlans.placeholder')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Solo alojamiento">{t('mealPlans.roomOnly')}</SelectItem>
                  <SelectItem value="Desayuno incluido">{t('mealPlans.breakfast')}</SelectItem>
                  <SelectItem value="Media pensión">{t('mealPlans.halfBoard')}</SelectItem>
                  <SelectItem value="Pensión completa">{t('mealPlans.fullBoard')}</SelectItem>
                  <SelectItem value="Todo incluido">{t('mealPlans.allInclusive')}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-4">
          <FormLabel className="text-white">Servicios de Lavandería (Opcional)</FormLabel>
          
          <FormField
            control={form.control}
            name="weeklyLaundryIncluded"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-white/30"
                  />
                </FormControl>
                <FormLabel className="text-white text-sm cursor-pointer">
                  Lavandería semanal incluída
                </FormLabel>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="externalLaundryAvailable"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-white/30"
                  />
                </FormControl>
                <FormLabel className="text-white text-sm cursor-pointer">
                  Lavandería exterior disponible
                </FormLabel>
              </FormItem>
            )}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
