
import React, { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from '@/hooks/useTranslation';

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
  
  const [newRoomType, setNewRoomType] = useState({ name: '', count: 1 });

  const mealPlanOptions = [
    'Breakfast Only', 'Half Board', 'Full Board', 'All Inclusive', 'Room Only'
  ];

  const stayDurationOptions = [7, 14, 21, 28, 30, 60, 90];
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Validation logic
  useEffect(() => {
    const hasRoomTypes = formData.roomTypes && formData.roomTypes.length > 0;
    const hasMealPlans = formData.mealPlans && formData.mealPlans.length > 0;
    const hasStayDurations = formData.selectedStayDurations && formData.selectedStayDurations.length > 0;
    const hasPreferredWeekday = formData.preferredWeekday && formData.preferredWeekday !== '';

    const isValid = hasRoomTypes && hasMealPlans && hasStayDurations && hasPreferredWeekday;
    onValidationChange(isValid);
  }, [formData.roomTypes, formData.mealPlans, formData.selectedStayDurations, formData.preferredWeekday, onValidationChange]);

  const addRoomType = () => {
    if (newRoomType.name.trim()) {
      const currentRoomTypes = formData.roomTypes || [];
      updateFormData('roomTypes', [...currentRoomTypes, { ...newRoomType, id: Date.now() }]);
      setNewRoomType({ name: '', count: 1 });
    }
  };

  const removeRoomType = (id: number) => {
    const currentRoomTypes = formData.roomTypes || [];
    updateFormData('roomTypes', currentRoomTypes.filter((room: any) => room.id !== id));
  };

  const toggleMealPlan = (mealPlan: string) => {
    const currentMealPlans = formData.mealPlans || [];
    const newMealPlans = currentMealPlans.includes(mealPlan)
      ? currentMealPlans.filter((plan: string) => plan !== mealPlan)
      : [...currentMealPlans, mealPlan];
    
    updateFormData('mealPlans', newMealPlans);
  };

  const toggleStayDuration = (duration: number) => {
    const currentDurations = formData.selectedStayDurations || [];
    const newDurations = currentDurations.includes(duration)
      ? currentDurations.filter((d: number) => d !== duration)
      : [...currentDurations, duration];
    
    updateFormData('selectedStayDurations', newDurations);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">{t('dashboard.accommodationTerms')}</h2>
      </div>

      {/* Room Types */}
      <div className="space-y-4">
        <Label className="text-white text-lg font-semibold">
          {t('dashboard.roomTypes')} <span className="text-red-500">*</span>
        </Label>
        
        <div className="flex gap-2">
          <Input
            value={newRoomType.name}
            onChange={(e) => setNewRoomType({ ...newRoomType, name: e.target.value })}
            placeholder={t('dashboard.propertyForm.enterRoomTypeName') || 'Enter room type name'}
            className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/60"
          />
          <Input
            type="number"
            min="1"
            value={newRoomType.count}
            onChange={(e) => setNewRoomType({ ...newRoomType, count: parseInt(e.target.value) || 1 })}
            className="bg-purple-800/50 border-purple-600 text-white w-24"
          />
          <Button
            type="button"
            onClick={addRoomType}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {t('dashboard.add') || 'Add'}
          </Button>
        </div>

        <div className="space-y-2">
          {(formData.roomTypes || []).map((room: any) => (
            <div key={room.id} className="flex justify-between items-center bg-purple-800/30 p-3 rounded">
              <span className="text-white">{room.name} (x{room.count})</span>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeRoomType(room.id)}
              >
                {t('dashboard.remove') || 'Remove'}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Meal Plans */}
      <div className="space-y-4">
        <Label className="text-white text-lg font-semibold">
          {t('dashboard.mealPlans')} <span className="text-red-500">*</span>
        </Label>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {mealPlanOptions.map((mealPlan) => (
            <button
              key={mealPlan}
              type="button"
              onClick={() => toggleMealPlan(mealPlan)}
              className={`p-3 rounded-lg text-sm font-medium border transition-all ${
                (formData.mealPlans || []).includes(mealPlan)
                  ? 'bg-purple-600 border-purple-400 text-white'
                  : 'bg-purple-800/50 border-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {mealPlan}
            </button>
          ))}
        </div>
      </div>

      {/* Stay Durations */}
      <div className="space-y-4">
        <Label className="text-white text-lg font-semibold">
          {t('dashboard.stayDurations')} <span className="text-red-500">*</span>
        </Label>
        
        <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
          {stayDurationOptions.map((duration) => (
            <button
              key={duration}
              type="button"
              onClick={() => toggleStayDuration(duration)}
              className={`p-3 rounded-lg text-sm font-medium border transition-all ${
                (formData.selectedStayDurations || []).includes(duration)
                  ? 'bg-purple-600 border-purple-400 text-white'
                  : 'bg-purple-800/50 border-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {duration} {t('dashboard.days') || 'days'}
            </button>
          ))}
        </div>
      </div>

      {/* Preferred Weekday */}
      <div className="space-y-4">
        <Label className="text-white text-lg font-semibold">
          {t('dashboard.preferredWeekday')} <span className="text-red-500">*</span>
        </Label>
        <Select value={formData.preferredWeekday || ''} onValueChange={(value) => updateFormData('preferredWeekday', value)}>
          <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
            <SelectValue placeholder={t('dashboard.selectPreferredWeekday') || 'Select preferred weekday'} />
          </SelectTrigger>
          <SelectContent className="bg-purple-800 border-purple-600">
            {weekdays.map((day) => (
              <SelectItem key={day} value={day} className="text-white">
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Laundry Options */}
      <div className="space-y-4">
        <Label className="text-white text-lg font-semibold">
          {t('dashboard.laundryOptions') || 'Laundry Options'}
        </Label>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="laundryIncluded"
              checked={formData.laundryIncluded || false}
              onCheckedChange={(checked) => updateFormData('laundryIncluded', checked)}
              className="border-purple-600"
            />
            <Label htmlFor="laundryIncluded" className="text-white">
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
            <Label htmlFor="externalLaundryAvailable" className="text-white">
              {t('dashboard.externalLaundryAvailable')}
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};
