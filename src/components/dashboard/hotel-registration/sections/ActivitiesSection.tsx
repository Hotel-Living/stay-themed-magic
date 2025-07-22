import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslation } from '@/hooks/useTranslation';
import { HotelRegistrationFormData } from '../NewHotelRegistrationForm';

interface ActivitiesSectionProps {
  form: UseFormReturn<HotelRegistrationFormData>;
}

const INDOOR_ACTIVITIES = [
  'spa', 'gym', 'yoga', 'meditation', 'massage', 'sauna', 'library',
  'gameRoom', 'billiards', 'tabletennis', 'bowling', 'cinema',
  'workshop', 'cooking-class', 'wine-tasting', 'conference'
];

const OUTDOOR_ACTIVITIES = [
  'swimming', 'tennis', 'golf', 'hiking', 'cycling', 'horse-riding',
  'fishing', 'kayaking', 'sailing', 'diving', 'surfing', 'skiing',
  'snowboarding', 'climbing', 'zip-lining', 'quad-biking',
  'bird-watching', 'stargazing', 'gardening', 'barbecue'
];

export const ActivitiesSection = ({ form }: ActivitiesSectionProps) => {
  const { t } = useTranslation('dashboard/hotel-registration');
  const selectedActivities = form.watch('activities') || [];

  const handleActivityChange = (activity: string, checked: boolean) => {
    if (checked) {
      form.setValue('activities', [...selectedActivities, activity]);
    } else {
      form.setValue('activities', selectedActivities.filter(a => a !== activity));
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
              <FormLabel className="text-white">{t('activities.label')} <span className="text-white/50">({t('optional')})</span></FormLabel>
              <FormControl>
                <div className="space-y-8">
                  {/* Indoor Activities */}
                  <div>
                    <h4 className="text-white font-semibold mb-4">{t('activities.indoor')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {INDOOR_ACTIVITIES.map((activity) => (
                        <div key={activity} className="flex items-center space-x-2">
                          <Checkbox
                            id={activity}
                            checked={selectedActivities.includes(activity)}
                            onCheckedChange={(checked) => handleActivityChange(activity, checked as boolean)}
                            className="border-white/30"
                          />
                          <label
                            htmlFor={activity}
                            className="text-white text-sm cursor-pointer"
                          >
                            {t(`activities.${activity}`)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outdoor Activities */}
                  <div>
                    <h4 className="text-white font-semibold mb-4">{t('activities.outdoor')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {OUTDOOR_ACTIVITIES.map((activity) => (
                        <div key={activity} className="flex items-center space-x-2">
                          <Checkbox
                            id={activity}
                            checked={selectedActivities.includes(activity)}
                            onCheckedChange={(checked) => handleActivityChange(activity, checked as boolean)}
                            className="border-white/30"
                          />
                          <label
                            htmlFor={activity}
                            className="text-white text-sm cursor-pointer"
                          >
                            {t(`activities.${activity}`)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </AccordionContent>
    </AccordionItem>
  );
};