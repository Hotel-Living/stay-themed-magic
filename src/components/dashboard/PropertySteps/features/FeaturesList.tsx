
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { mapHotelFeatureToKey, mapRoomFeatureToKey } from "@/utils/featureKeyMapping";

interface FeaturesListProps {
  features: string[];
  selectedFeatures: string[];
  onToggle: (feature: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  featureType?: 'hotel' | 'room';
}

export const FeaturesList: React.FC<FeaturesListProps> = ({
  features,
  selectedFeatures,
  onToggle,
  onSelectAll,
  onDeselectAll,
  featureType = 'hotel'
}) => {
  const { t } = useTranslation();

  const getFeatureTranslation = (feature: string) => {
    const key = featureType === 'hotel' 
      ? mapHotelFeatureToKey(feature)
      : mapRoomFeatureToKey(feature);
    
    const translation = t(key);
    return translation !== key ? translation : feature;
  };

  const selectAllKey = featureType === 'hotel' ? 'hotelFeatures.selectAll' : 'roomFeatures.selectAll';
  const deselectAllKey = featureType === 'hotel' ? 'hotelFeatures.deselectAll' : 'roomFeatures.deselectAll';

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onSelectAll}
          className="px-4 py-2 bg-fuchsia-600 text-white rounded hover:bg-fuchsia-700 text-sm"
        >
          {t(selectAllKey)}
        </button>
        <button
          type="button"
          onClick={onDeselectAll}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
        >
          {t(deselectAllKey)}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {features.map((feature) => (
          <label
            key={feature}
            className="flex items-center space-x-2 p-2 rounded hover:bg-white/10 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedFeatures.includes(feature)}
              onChange={() => onToggle(feature)}
              className="rounded border-gray-300"
            />
            <span className="text-sm text-white">{getFeatureTranslation(feature)}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
