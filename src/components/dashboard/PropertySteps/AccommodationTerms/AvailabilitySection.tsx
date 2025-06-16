
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { useTranslation } from "@/hooks/useTranslation";

interface AvailabilitySectionProps {
  availableDates: Date[];
  onDateSelect: (dates: Date[] | undefined) => void;
}

export const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  availableDates,
  onDateSelect
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">3.3- {t('accommodation.availabilityDates')}</h3>
      <p className="text-white/80 text-sm">{t('accommodation.selectAvailableDates')}</p>
      
      <div className="bg-white/5 p-4 rounded-lg">
        <Calendar
          mode="multiple"
          selected={availableDates}
          onSelect={onDateSelect}
          className="rounded-md border border-white/10"
        />
      </div>
    </div>
  );
};
