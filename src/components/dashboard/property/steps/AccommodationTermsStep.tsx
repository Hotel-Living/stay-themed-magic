
import React, { useEffect, useState } from "react";
import { PropertyFormData } from "../hooks/usePropertyFormData";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface AccommodationTermsStepProps {
  formData: PropertyFormData;
  updateFormData: (field: string, value: any) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export const AccommodationTermsStep = ({
  formData,
  updateFormData,
  onValidationChange = () => {}
}: AccommodationTermsStepProps) => {
  // Local state
  const [selectedStayLengths, setSelectedStayLengths] = useState<number[]>(formData.stayLengths || []);
  const [selectedMealPlans, setSelectedMealPlans] = useState<string[]>(formData.mealPlans || []);
  const [preferredWeekday, setPreferredWeekday] = useState<string>(formData.preferredWeekday || 'Monday');
  const [availableMonths, setAvailableMonths] = useState<string[]>(formData.available_months || []);
  const [isValid, setIsValid] = useState(false);

  // Month options
  const monthOptions = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Weekday options
  const weekdayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Stay duration options
  const stayLengthOptions = [
    { value: 8, label: '8 nights' },
    { value: 16, label: '16 nights' },
    { value: 24, label: '24 nights' },
    { value: 32, label: '32 nights' }
  ];

  // Meal plan options
  const mealPlanOptions = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'halfBoard', label: 'Half Board' },
    { value: 'fullBoard', label: 'Full Board' },
    { value: 'allInclusive', label: 'All Inclusive' }
  ];

  useEffect(() => {
    // Update local state from formData
    if (formData.stayLengths?.length) {
      setSelectedStayLengths(formData.stayLengths);
    }
    if (formData.mealPlans?.length) {
      setSelectedMealPlans(formData.mealPlans);
    }
    if (formData.preferredWeekday) {
      setPreferredWeekday(formData.preferredWeekday);
    }
    if (formData.available_months?.length) {
      setAvailableMonths(formData.available_months);
    }
  }, [formData]);

  useEffect(() => {
    // Update form data
    updateFormData('stayLengths', selectedStayLengths);
    updateFormData('mealPlans', selectedMealPlans);
    updateFormData('preferredWeekday', preferredWeekday);
    updateFormData('available_months', availableMonths);
    updateFormData('checkinDay', preferredWeekday); // Ensure backward compatibility

    // Validate
    const hasStayLengths = selectedStayLengths.length > 0;
    const hasMealPlans = selectedMealPlans.length > 0;
    const hasAvailability = availableMonths.length > 0;

    const valid = hasStayLengths && hasMealPlans && hasAvailability;
    setIsValid(valid);
    onValidationChange(valid);
  }, [selectedStayLengths, selectedMealPlans, preferredWeekday, availableMonths, updateFormData, onValidationChange]);

  const handleStayLengthChange = (length: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedStayLengths(prev => [...prev, length]);
    } else {
      setSelectedStayLengths(prev => prev.filter(item => item !== length));
    }
  };

  const handleMealPlanChange = (plan: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedMealPlans(prev => [...prev, plan]);
    } else {
      setSelectedMealPlans(prev => prev.filter(item => item !== plan));
    }
  };

  const handleMonthChange = (month: string, isChecked: boolean) => {
    if (isChecked) {
      setAvailableMonths(prev => [...prev, month]);
    } else {
      setAvailableMonths(prev => prev.filter(item => item !== month));
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Stay Duration Options</h3>
        <p className="text-sm text-gray-400">
          Select the stay durations you want to offer (in nights)
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {stayLengthOptions.map(option => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox 
                id={`stay-${option.value}`}
                checked={selectedStayLengths.includes(option.value)}
                onCheckedChange={(checked) => 
                  handleStayLengthChange(option.value, checked === true)
                }
              />
              <Label htmlFor={`stay-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Check-in Day</h3>
        <p className="text-sm text-gray-400">
          Select the preferred day of the week for guest check-in
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {weekdayOptions.map(day => (
            <div key={day} className="flex items-center space-x-2">
              <input
                type="radio"
                id={`weekday-${day}`}
                name="preferredWeekday"
                checked={preferredWeekday === day}
                onChange={() => setPreferredWeekday(day)}
                className="border-[#7A0486] text-[#7A0486] focus:ring-[#7A0486]"
              />
              <Label htmlFor={`weekday-${day}`}>{day}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Meal Plans</h3>
        <p className="text-sm text-gray-400">
          Select the meal plans you offer to guests
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {mealPlanOptions.map(option => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox 
                id={`meal-${option.value}`}
                checked={selectedMealPlans.includes(option.value)}
                onCheckedChange={(checked) => 
                  handleMealPlanChange(option.value, checked === true)
                }
              />
              <Label htmlFor={`meal-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Availability</h3>
        <p className="text-sm text-gray-400">
          Select the months when your property is available for booking
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {monthOptions.map(month => (
            <div key={month} className="flex items-center space-x-2">
              <Checkbox 
                id={`month-${month}`}
                checked={availableMonths.includes(month)}
                onCheckedChange={(checked) => 
                  handleMonthChange(month, checked === true)
                }
              />
              <Label htmlFor={`month-${month}`}>{month}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
