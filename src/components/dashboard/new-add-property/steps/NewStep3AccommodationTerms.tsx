
import React, { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from '@/hooks/useTranslation';
import { RoomTypesSection } from '../components/RoomTypesSection';

interface NewStep3AccommodationTermsProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

export const NewStep3AccommodationTerms: React.FC<NewStep3AccommodationTermsProps> = ({
  formData,
  updateFormData,
  onValidationChange
}) => {
  const { t } = useTranslation();

  // Available options
  const stayDurations = [8, 15, 22, 29];
  const weekdays = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
  ];
  const mealPlanOptions = [
    'breakfastIncluded',
    'halfBoard', 
    'fullBoard',
    'allInclusive'
  ];

  // Validation logic
  useEffect(() => {
    const hasStayDurations = formData.selectedStayDurations && formData.selectedStayDurations.length > 0;
    const hasPreferredWeekday = formData.preferredWeekday;
    const hasMealPlans = formData.selectedMealPlans && formData.selectedMealPlans.length > 0;
    const hasRoomDescription = formData.roomDescription && formData.roomDescription.trim().length > 0;
    const hasRoomImages = formData.roomImages && formData.roomImages.length > 0;

    const isValid = hasStayDurations && hasPreferredWeekday && hasMealPlans && hasRoomDescription && hasRoomImages;
    onValidationChange(isValid);
  }, [
    formData.selectedStayDurations, 
    formData.preferredWeekday, 
    formData.selectedMealPlans,
    formData.roomDescription,
    formData.roomImages,
    onValidationChange
  ]);

  const handleStayDurationChange = (duration: number, checked: boolean) => {
    const currentSelections = formData.selectedStayDurations || [];
    const newSelections = checked
      ? [...currentSelections, duration]
      : currentSelections.filter((d: number) => d !== duration);
    
    updateFormData('selectedStayDurations', newSelections);
  };

  const handleMealPlanChange = (mealPlan: string, checked: boolean) => {
    const currentSelections = formData.selectedMealPlans || [];
    const newSelections = checked
      ? [...currentSelections, mealPlan]
      : currentSelections.filter((m: string) => m !== mealPlan);
    
    updateFormData('selectedMealPlans', newSelections);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">{t('dashboard.accommodationTerms')}</h2>
      </div>

      {/* Room Types Section 3.1 */}
      <RoomTypesSection
        formData={formData}
        updateFormData={updateFormData}
      />

      {/* Stay Duration Section */}
      <div className="space-y-4">
        <Label className="text-white text-lg font-semibold">
          {t('dashboard.stayDurations')} <span className="text-red-500">*</span>
        </Label>
        <p className="text-white/70 text-sm">
          {t('dashboard.propertyForm.selectStayDurations')}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stayDurations.map((duration) => (
            <div key={duration} className="flex items-center space-x-2">
              <Checkbox
                id={`duration-${duration}`}
                checked={(formData.selectedStayDurations || []).includes(duration)}
                onCheckedChange={(checked) => handleStayDurationChange(duration, checked as boolean)}
                className="border-purple-600"
              />
              <Label 
                htmlFor={`duration-${duration}`}
                className="text-white cursor-pointer"
              >
                {duration} {t('dashboard.propertyForm.days')}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Preferred Weekday Section */}
      <div className="space-y-4">
        <Label className="text-white text-lg font-semibold">
          {t('dashboard.preferredWeekday')} <span className="text-red-500">*</span>
        </Label>
        <p className="text-white/70 text-sm">
          {t('dashboard.propertyForm.selectCheckinDay')}
        </p>
        <Select
          value={formData.preferredWeekday || ''}
          onValueChange={(value) => updateFormData('preferredWeekday', value)}
        >
          <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
            <SelectValue placeholder={t('dashboard.propertyForm.selectCheckinDay')} />
          </SelectTrigger>
          <SelectContent>
            {weekdays.map((day) => (
              <SelectItem key={day} value={day}>
                {t(`dashboard.propertyForm.${day}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Meal Plans Section */}
      <div className="space-y-4">
        <Label className="text-white text-lg font-semibold">
          {t('dashboard.mealPlans')} <span className="text-red-500">*</span>
        </Label>
        <div className="space-y-3">
          {mealPlanOptions.map((mealPlan) => (
            <div key={mealPlan} className="flex items-center space-x-2">
              <Checkbox
                id={mealPlan}
                checked={(formData.selectedMealPlans || []).includes(mealPlan)}
                onCheckedChange={(checked) => handleMealPlanChange(mealPlan, checked as boolean)}
                className="border-purple-600"
              />
              <Label 
                htmlFor={mealPlan}
                className="text-white cursor-pointer"
              >
                {t(`dashboard.propertyForm.${mealPlan}`)}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Laundry Options */}
      <div className="space-y-4">
        <Label className="text-white text-lg font-semibold">{t('dashboard.propertyForm.laundry')}</Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="laundryIncluded"
              checked={formData.laundryIncluded || false}
              onCheckedChange={(checked) => updateFormData('laundryIncluded', checked)}
              className="border-purple-600"
            />
            <Label htmlFor="laundryIncluded" className="text-white cursor-pointer">
              {t('dashboard.laundryIncluded')}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="externalLaundryAvailable"
              checked={formData.externalLaundryAvailable || false}
              onCheckedChange={(checked) => updateFormData('externalLaundryAvailable', checked)}
              className="border-purple-600"
            />
            <Label htmlFor="externalLaundryAvailable" className="text-white cursor-pointer">
              {t('dashboard.externalLaundryAvailable')}
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};
