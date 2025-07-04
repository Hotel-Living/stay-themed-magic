
import React, { memo } from "react";
import { PlusCircle } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface FeaturesListProps {
  features: string[];
  selectedFeatures: string[];
  onToggle: (feature: string) => void;
  onAddNewFeature?: () => void;
  onSelectAll?: () => void;
  onDeselectAll?: () => void;
}

export const FeaturesList = memo(function FeaturesList({ 
  features, 
  selectedFeatures,
  onToggle,
  onAddNewFeature,
  onSelectAll,
  onDeselectAll
}: FeaturesListProps) {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4">
      {/* Select All / Deselect All buttons */}
      {(onSelectAll || onDeselectAll) && (
        <div className="flex gap-2 mb-4">
          {onSelectAll && (
            <button
              type="button"
              onClick={onSelectAll}
              className="px-3 py-1 text-sm bg-fuchsia-600 text-white rounded hover:bg-fuchsia-700 transition-colors"
            >
              {t('dashboard.selectAll')}
            </button>
          )}
          {onDeselectAll && (
            <button
              type="button"
              onClick={onDeselectAll}
              className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              {t('dashboard.deselectAll')}
            </button>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {features.map((feature) => (
          <label key={feature} className="flex items-start">
            <input 
              type="checkbox" 
              className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5"
              checked={selectedFeatures.includes(feature)}
              onChange={() => onToggle(feature)}
            />
            <span className="text-sm">{feature}</span>
          </label>
        ))}
        {onAddNewFeature && (
          <div 
            className="flex items-center cursor-pointer"
            onClick={onAddNewFeature}
          >
            <PlusCircle className="w-4 h-4 mr-2 text-fuchsia-400" />
            <span className="text-sm text-fuchsia-400">Add new feature</span>
          </div>
        )}
      </div>
    </div>
  );
});
