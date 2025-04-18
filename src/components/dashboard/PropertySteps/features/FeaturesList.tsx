
import React from "react";

interface Feature {
  id: string;
  name: string;
}

interface FeaturesListProps {
  features: Feature[];
  selectedFeatures: string[];
  onToggleFeature: (featureId: string) => void;
}

export function FeaturesList({ features, selectedFeatures, onToggleFeature }: FeaturesListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {features.map((feature) => (
        <div key={feature.id} className="flex items-start">
          <input
            type="checkbox"
            id={`feature-${feature.id}`}
            checked={selectedFeatures.includes(feature.id)}
            onChange={() => onToggleFeature(feature.id)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5"
          />
          <label htmlFor={`feature-${feature.id}`} className="text-sm cursor-pointer">
            {feature.name}
          </label>
        </div>
      ))}
    </div>
  );
}
