
import React, { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

  // State for validation error display
  const [showValidationErrors, setShowValidationErrors] = React.useState(false);

  // Listen for navigation attempts to show validation errors
  React.useEffect(() => {
    const handleAttemptNavigation = () => {
      setShowValidationErrors(true);
    };

    window.addEventListener('attemptStepNavigation', handleAttemptNavigation);
    return () => {
      window.removeEventListener('attemptStepNavigation', handleAttemptNavigation);
    };
  }, []);

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

  // Helper function to get validation errors
  const getValidationErrors = () => {
    const errors = [];
    if (!formData.selectedStayDurations || formData.selectedStayDurations.length === 0) {
      errors.push(t('dashboard.stayDurations'));
    }
    if (!formData.preferredWeekday) {
      errors.push(t('dashboard.preferredWeekday'));
    }
    if (!formData.selectedMealPlans || formData.selectedMealPlans.length === 0) {
      errors.push(t('dashboard.mealPlans'));
    }
    if (!formData.roomDescription || formData.roomDescription.trim().length === 0) {
      errors.push(t('dashboard.propertyForm.roomDescription'));
    }
    if (!formData.roomImages || formData.roomImages.length === 0) {
      errors.push(t('dashboard.propertyForm.roomPhotos'));
    }
    return errors;
  };

  const handleStayDurationChange = (duration: number, checked: boolean) => {
    const currentSelections = formData.selectedStayDurations || [];
    const newSelections = checked
      ? [...currentSelections, duration]
      : currentSelections.filter((d: number) => d !== duration);
    
    updateFormData('selectedStayDurations', newSelections);
  };

  const handleMealPlanChange = (selectedMealPlan: string) => {
    // Only allow single selection - replace current selection
    updateFormData('selectedMealPlans', [selectedMealPlan]);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">{t('dashboard.accommodationTerms')}</h2>
      </div>

      {/* Validation Error Display */}
      {showValidationErrors && getValidationErrors().length > 0 && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-4">
          <h3 className="text-red-400 font-semibold mb-2">Please complete the following required fields:</h3>
          <ul className="text-red-300 space-y-1">
            {getValidationErrors().map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

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
          {t('dashboard.selectStayDurations')}
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
                {duration} {t('dashboard.days')}
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
          {t('dashboard.selectCheckinDay')}
        </p>
        <Select
          value={formData.preferredWeekday || ''}
          onValueChange={(value) => updateFormData('preferredWeekday', value)}
        >
          <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
            <SelectValue placeholder={t('dashboard.selectCheckinDay')} />
          </SelectTrigger>
          <SelectContent>
            {weekdays.map((day) => (
              <SelectItem key={day} value={day}>
                {t(`dashboard.${day}`)}
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
        <RadioGroup
          value={(formData.selectedMealPlans || [])[0] || ''}
          onValueChange={handleMealPlanChange}
          className="space-y-3"
        >
          {mealPlanOptions.map((mealPlan) => (
            <div key={mealPlan} className="flex items-center space-x-2">
              <RadioGroupItem
                value={mealPlan}
                id={mealPlan}
                className="border-purple-600 text-purple-400"
              />
              <Label 
                htmlFor={mealPlan}
                className="text-white cursor-pointer"
              >
                {t(`dashboard.${mealPlan}`)}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Laundry Options */}
      <div className="space-y-4">
        <Label className="text-white text-lg font-semibold">{t('dashboard.laundry')}</Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="laundryIncluded"
              checked={formData.laundryIncluded || false}
              onCheckedChange={(checked) => {
                updateFormData('laundryIncluded', checked);
                // If laundry is included, reset external laundry to false
                if (checked) {
                  updateFormData('externalLaundryAvailable', false);
                }
              }}
              className="border-purple-600"
            />
            <Label htmlFor="laundryIncluded" className="text-white cursor-pointer">
              {t('dashboard.laundryIncluded')}
            </Label>
          </div>
          
          {/* Only show external laundry option if laundry is NOT included */}
          {!formData.laundryIncluded && (
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
          )}
        </div>
      </div>
    </div>
  );
};
