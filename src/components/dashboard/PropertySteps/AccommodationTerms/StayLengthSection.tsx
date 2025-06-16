
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface StayLengthSectionProps {
  selectedLengths: number[];
  onLengthToggle: (length: number) => void;
}

export default function StayLengthSection({ 
  selectedLengths, 
  onLengthToggle 
}: StayLengthSectionProps) {
  const { t } = useTranslation();
  const stayOptions = [8, 16, 24, 32];

  return (
    <div className="glass-card rounded-xl p-6 space-y-4 bg-[#690695]/40">
      <h3 className="text-lg font-semibold text-white uppercase">
        3.1- {t('dashboard.lengthOfStay')}
      </h3>
      
      <p className="text-white/80 mb-4">
        {t('dashboard.selectAllStayDurations')}
      </p>
      
      <div className="flex flex-wrap gap-4">
        {stayOptions.map((days) => (
          <button
            key={days}
            onClick={() => onLengthToggle(days)}
            className={`px-6 py-3 rounded-lg border-2 transition-all ${
              selectedLengths.includes(days)
                ? 'bg-fuchsia-600 border-fuchsia-500 text-white'
                : 'bg-transparent border-fuchsia-500/50 text-white hover:border-fuchsia-500'
            }`}
          >
            {t(`stayDurations.${days}days`)}
          </button>
        ))}
      </div>
    </div>
  );
}
