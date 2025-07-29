import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { HotelRegistrationFormData } from '../NewHotelRegistrationForm';

interface ActivitiesSectionProps {
  form: UseFormReturn<HotelRegistrationFormData>;
}

const fetchActivities = async () => {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data || [];
};

export const ActivitiesSection = ({ form }: ActivitiesSectionProps) => {
  const { t } = useTranslation('dashboard/hotel-registration');
  const [searchTerm, setSearchTerm] = useState('');
  const selectedActivities = form.watch('activities') || [];
  
  const { data: activities = [], isLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: fetchActivities,
  });

  const filteredActivities = activities.filter(activity =>
    activity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleActivityChange = (activityId: string, checked: boolean) => {
    if (checked) {
      form.setValue('activities', [...selectedActivities, activityId]);
    } else {
      form.setValue('activities', selectedActivities.filter(a => a !== activityId));
    }
  };

  return (
    <AccordionItem value="activities" className="bg-white/5 border-white/20 rounded-lg">
      <AccordionTrigger className="px-6 py-4 text-white hover:no-underline">
        <div className="flex items-center space-x-3">
          <span className="bg-fuchsia-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">11</span>
          <span>{t('activities.title')}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6">
        <FormField
          control={form.control}
          name="activities"
          render={() => (
            <FormItem>
              <FormLabel className="text-white">{t('activities.selectActivities')}</FormLabel>
              <p className="text-white/60 text-sm">Optional, but strongly recommended to highlight unique experiences and make your property more appealing. This can be modified anytime.</p>
              
              <div className="mt-4 space-y-4">
                <Input
                  placeholder={t('activities.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                />

                <FormControl>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-80 overflow-y-auto">
                    {isLoading ? (
                      <div className="text-white/50">{t('activities.loading')}</div>
                    ) : (
                      filteredActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={activity.id}
                            checked={selectedActivities.includes(activity.id)}
                            onCheckedChange={(checked) => handleActivityChange(activity.id, checked as boolean)}
                            className="border-white/30"
                          />
                          <label
                            htmlFor={activity.id}
                            className="text-white text-sm cursor-pointer"
                          >
                            {activity.name}
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