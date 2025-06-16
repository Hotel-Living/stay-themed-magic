
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/hooks/useTranslation";

interface StayLengthSectionProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

export const StayLengthSection: React.FC<StayLengthSectionProps> = ({
  formData,
  updateFormData,
  onValidationChange
}) => {
  const { t } = useTranslation();
  
  const durations = [
    { value: "8", label: `8 ${t('common.days')}` },
    { value: "16", label: `16 ${t('common.days')}` },
    { value: "24", label: `24 ${t('common.days')}` },
    { value: "32", label: `32 ${t('common.days')}` }
  ];

  const selectedDurations = formData.stayLengths || [];

  const handleDurationChange = (duration: string, checked: boolean) => {
    let newDurations;
    if (checked) {
      newDurations = [...selectedDurations, parseInt(duration)];
    } else {
      newDurations = selectedDurations.filter((d: number) => d !== parseInt(duration));
    }
    
    updateFormData('stayLengths', newDurations);
    onValidationChange(newDurations.length > 0);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">3.1- {t('accommodation.lengthOfStay')}</h3>
      <p className="text-white/80 text-sm">{t('accommodation.selectStayDurations')}</p>
      
      <div className="flex flex-wrap gap-4">
        {durations.map((duration) => (
          <div key={duration.value} className="flex items-center space-x-2">
            <Checkbox
              id={`duration-${duration.value}`}
              checked={selectedDurations.includes(parseInt(duration.value))}
              onCheckedChange={(checked) => 
                handleDurationChange(duration.value, checked as boolean)
              }
              className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50"
            />
            <Label 
              htmlFor={`duration-${duration.value}`}
              className="text-white cursor-pointer"
            >
              {duration.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
