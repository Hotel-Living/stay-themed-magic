
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface AvailabilitySectionProps {
  selectedMonths: string[];
  onMonthToggle: (month: string) => void;
}

export default function AvailabilitySection({ 
  selectedMonths, 
  onMonthToggle 
}: AvailabilitySectionProps) {
  const { t } = useTranslation();
  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];

  return (
    <div className="glass-card rounded-xl p-6 space-y-4 bg-[#690695]/40">
      <h3 className="text-lg font-semibold text-white uppercase">
        3.3- {t('propertySteps.availableMonths')}
      </h3>
      
      <p className="text-white/80 mb-4">
        {t('propertySteps.selectAvailableMonths')}
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {months.map((month) => (
          <button
            key={month}
            onClick={() => onMonthToggle(month)}
            className={`px-4 py-3 rounded-lg border-2 transition-all ${
              selectedMonths.includes(month)
                ? 'bg-fuchsia-600 border-fuchsia-500 text-white'
                : 'bg-transparent border-fuchsia-500/50 text-white hover:border-fuchsia-500'
            }`}
          >
            {t(`months.${month}`)}
          </button>
        ))}
      </div>
    </div>
  );
}
