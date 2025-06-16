
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface PreferredWeekdaySectionProps {
  selectedWeekday: string;
  onWeekdayChange: (weekday: string) => void;
}

export const PreferredWeekdaySection: React.FC<PreferredWeekdaySectionProps> = ({
  selectedWeekday,
  onWeekdayChange
}) => {
  const { t } = useTranslation();
  
  const weekdays = [
    { value: "monday", label: t('common.monday') },
    { value: "tuesday", label: t('common.tuesday') },
    { value: "wednesday", label: t('common.wednesday') },
    { value: "thursday", label: t('common.thursday') },
    { value: "friday", label: t('common.friday') },
    { value: "saturday", label: t('common.saturday') },
    { value: "sunday", label: t('common.sunday') }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">3.2- {t('accommodation.onlyWeekdayForCheckIns')}</h3>
      <p className="text-white/80 text-sm">{t('accommodation.selectCheckInDay')}</p>
      
      <div className="flex flex-wrap gap-2">
        {weekdays.map((weekday) => (
          <button
            key={weekday.value}
            type="button"
            onClick={() => onWeekdayChange(weekday.value)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              selectedWeekday === weekday.value
                ? 'bg-fuchsia-600 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {weekday.label}
          </button>
        ))}
      </div>
    </div>
  );
};
