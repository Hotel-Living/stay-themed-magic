
import React from "react";
import { PlusCircle } from "lucide-react";

interface FeaturesListProps {
  features: string[];
}

export function FeaturesList({ features }: FeaturesListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {features.map((feature) => (
        <label key={feature} className="flex items-start">
          <input 
            type="checkbox" 
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm">{feature}</span>
        </label>
      ))}
      <div className="flex items-center">
        <PlusCircle className="w-4 h-4 mr-2 text-fuchsia-400" />
        <span className="text-sm text-fuchsia-400">Add new feature</span>
      </div>
    </div>
  );
}
