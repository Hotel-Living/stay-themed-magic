
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface LocationControlsProps {
  geocodeError?: string | null;
}

export const LocationControls: React.FC<LocationControlsProps> = ({ geocodeError }) => {
  const { t } = useTranslation();

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-foreground/90 uppercase mb-2">
        {t('dashboard.locationOnMap')} ({t('dashboard.clickToSelectLocation')})
      </label>
      {geocodeError && (
        <div className="text-red-400 text-sm mb-2">
          {geocodeError}
        </div>
      )}
    </div>
  );
};
