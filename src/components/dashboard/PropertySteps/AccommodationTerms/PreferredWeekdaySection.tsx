
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface PreferredWeekdaySectionProps {
  preferredWeekday?: string;
  selectedWeekday?: string;
  onWeekdayChange: (weekday: string) => void;
}

export default function PreferredWeekdaySection({ 
  preferredWeekday,
  selectedWeekday, 
  onWeekdayChange 
}: PreferredWeekdaySectionProps) {
  const { t } = useTranslation();
  const weekdays = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
  ];

  const currentWeekday = selectedWeekday || preferredWeekday || 'monday';

  return (
    <div className="glass-card rounded-xl p-6 space-y-4 bg-[#690695]/40">
      <h3 className="text-lg font-semibold text-white uppercase">
        3.2- {t('dashboard.weekdayCheckInOut')}
      </h3>
      
      <p className="text-white/80 mb-4">
        {t('dashboard.selectWeekdayCheckInOut')}
      </p>
      
      <div className="flex flex-wrap gap-3">
        {weekdays.map((day) => (
          <button
            key={day}
            onClick={() => onWeekdayChange(day)}
            className={`px-4 py-2 rounded-lg border-2 transition-all capitalize ${
              currentWeekday === day
                ? 'bg-fuchsia-600 border-fuchsia-500 text-white'
                : 'bg-transparent border-fuchsia-500/50 text-white hover:border-fuchsia-500'
            }`}
          >
            {t(`weekdays.${day}`)}
          </button>
        ))}
      </div>
    </div>
  );
}
