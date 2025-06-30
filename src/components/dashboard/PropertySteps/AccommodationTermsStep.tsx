
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { validateAccommodationTerms, formatMonths } from "./AccommodationTerms/utils/validation";
import { useAvailabilityDates } from "./AccommodationTerms/hooks/useAvailabilityDates";
import { weekdays } from "@/utils/constants";
import RoomTypeSection from "./rooms/roomTypes/RoomTypeSection";
import AvailabilitySection from "./AccommodationTerms/AvailabilitySection";
import { useTranslation } from "@/hooks/useTranslation";

export interface AccommodationTermsStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export const AccommodationTermsStep: React.FC<AccommodationTermsStepProps> = ({
  formData,
  updateFormData,
  onValidationChange = () => {}
}) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [stayDurations, setStayDurations] = useState<number[]>(formData.stayLengths || []);
  const [checkinDay, setCheckinDay] = useState<string>(formData.preferredWeekday || "Monday");
  const [mealPlans, setMealPlans] = useState<string[]>(formData.mealPlans || []);
  const [showErrors, setShowErrors] = useState(false);
  const [availabilityValid, setAvailabilityValid] = useState(false);
  const [availabilityOpen, setAvailabilityOpen] = useState(false);

  // Initialize availabilityDates from formData if present
  useEffect(() => {
    if (!formData.availabilityDates) {
      updateFormData("availabilityDates", []);
    }
  }, [formData, updateFormData]);

  // Updated meal plan options to match the public filter exactly
  const mealPlanOptions = [
    { id: "breakfast-included", label: t('dashboard.breakfastIncluded') },
    { id: "half-board", label: t('dashboard.halfBoard') },
    { id: "full-board", label: t('dashboard.fullBoard') },
    { id: "all-inclusive", label: t('dashboard.allInclusive') },
    { id: "laundry", label: t('dashboard.laundry') },
    { id: "external-laundry", label: t('dashboard.externalLaundryService') }
  ];

  // Duration options in days
  const durationOptions = [8, 16, 24, 32];

  // Spanish weekday translations
  const spanishWeekdays = [
    t('dashboard.monday'),
    t('dashboard.tuesday'),
    t('dashboard.wednesday'),
    t('dashboard.thursday'),
    t('dashboard.friday'),
    t('dashboard.saturday'),
    t('dashboard.sunday')
  ];

  useEffect(() => {
    // Update parent form with local state values
    updateFormData("stayLengths", stayDurations);
    updateFormData("preferredWeekday", checkinDay);
    updateFormData("mealPlans", mealPlans);

    // Validate the step
    const isValid = validateAccommodationTerms(stayDurations, mealPlans, formData.roomTypes || [], formData.available_months);
    onValidationChange(isValid && availabilityValid);
  }, [stayDurations, checkinDay, mealPlans, formData.available_months, formData.roomTypes, updateFormData, onValidationChange, availabilityValid]);

  const toggleDuration = (duration: number) => {
    setStayDurations(prev => 
      prev.includes(duration) 
        ? prev.filter(d => d !== duration) 
        : [...prev, duration]
    );
  };

  const toggleMealPlan = (planId: string) => {
    setMealPlans(prev => 
      prev.includes(planId) 
        ? prev.filter(p => p !== planId) 
        : [...prev, planId]
    );
  };

  const handleRoomTypesValidation = (isValid: boolean) => {
    // This will be called from the RoomTypeSection component
    onValidationChange(isValid && stayDurations.length > 0 && mealPlans.length > 0 && availabilityValid);
  };

  return (
    <div className="space-y-6">
      {/* Duration Section */}
      <Card className="p-4 bg-fuchsia-950/30">
        <h3 className="font-medium mb-3">3.1— {t('dashboard.stayDuration')}</h3>
        <p className="text-sm text-gray-300 mb-4">{t('dashboard.selectStayDurations')}</p>
        <div className="flex flex-wrap gap-3">
          {durationOptions.map(duration => (
            <button
              key={duration}
              onClick={() => toggleDuration(duration)}
              className={`px-4 py-2 rounded-full text-sm ${
                stayDurations.includes(duration)
                  ? "bg-fuchsia-600 text-white"
                  : "bg-fuchsia-900/30 text-gray-300"
              }`}
            >
              {duration} {t('dashboard.days')}
            </button>
          ))}
        </div>
        {showErrors && stayDurations.length === 0 && (
          <p className="text-red-400 text-sm mt-2">Por favor seleccione al menos una duración de estancia</p>
        )}
      </Card>

      {/* Check-in Day Section */}
      <Card className="p-4 bg-fuchsia-950/30">
        <h3 className="font-medium mb-3">3.2— {t('dashboard.singleCheckinCheckout')}</h3>
        <p className="text-sm text-gray-300 mb-4">{t('dashboard.selectCheckinDay')}</p>
        <div className="flex flex-wrap gap-3">
          {weekdays.map((day, index) => (
            <button
              key={day}
              onClick={() => setCheckinDay(day)}
              className={`px-4 py-2 rounded-full text-sm ${
                checkinDay === day
                  ? "bg-fuchsia-600 text-white"
                  : "bg-fuchsia-900/30 text-gray-300"
              }`}
            >
              {spanishWeekdays[index]}
            </button>
          ))}
        </div>
      </Card>

      {/* Available Months Section - Using full calendar functionality */}
      <Card className="p-4 bg-fuchsia-950/30">
        <h3 className="font-medium mb-3">3.3— {t('dashboard.availabilityDates')}</h3>
        
      </Card>

      {/* Meal Plans Section */}
      <Card className="p-4 bg-fuchsia-950/30">
        <h3 className="font-medium mb-3">3.4— {t('dashboard.mealPlans')}</h3>
        
        <div className="flex flex-wrap gap-3">
          {mealPlanOptions.map(plan => (
            <button
              key={plan.id}
              onClick={() => toggleMealPlan(plan.id)}
              className={`px-4 py-2 rounded-full text-sm ${
                mealPlans.includes(plan.id)
                  ? "bg-fuchsia-600 text-white"
                  : "bg-fuchsia-900/30 text-gray-300"
              }`}
            >
              {plan.label}
            </button>
          ))}
        </div>
        {showErrors && mealPlans.length === 0 && (
          <p className="text-red-400 text-sm mt-2">Por favor seleccione al menos un plan de comidas</p>
        )}
      </Card>

      {/* Room Types Section */}
      <Card className="p-4 bg-fuchsia-950/30">
        <h3 className="font-medium mb-3">3.5— {t('dashboard.roomTypes')}</h3>
        <p className="text-sm text-gray-300 mb-4">{t('dashboard.defineRoomTypes')}</p>
        <RoomTypeSection 
          onValidationChange={handleRoomTypesValidation} 
          formData={formData} 
          updateFormData={updateFormData} 
          fullWidth={true} 
          showHeader={false} 
        />
        {showErrors && (!formData.roomTypes || formData.roomTypes.length === 0) && (
          <p className="text-red-400 text-sm mt-2">Por favor añada al menos un tipo de habitación</p>
        )}
      </Card>

      {/* Validation Button */}
      <div className="mt-6">
        
      </div>
    </div>
  );
};
