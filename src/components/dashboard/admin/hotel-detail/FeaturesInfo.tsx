
import React from "react";
import { Card } from "@/components/ui/card";
import { Settings2 } from "lucide-react";

interface FeaturesInfoProps {
  hotelFeatures: Record<string, boolean>;
  roomFeatures: Record<string, boolean>;
}

export const FeaturesInfo = ({ hotelFeatures, roomFeatures }: FeaturesInfoProps) => {
  // Helper function to render features
  const renderFeatures = (features: Record<string, boolean>) => {
    if (!features || Object.keys(features).length === 0) {
      return <p className="text-gray-500 italic">No features specified</p>;
    }

    return (
      <div className="flex flex-wrap gap-2">
        {Object.entries(features)
          .filter(([_, selected]) => selected)
          .map(([featureId]) => (
            <span 
              key={featureId} 
              className="px-3 py-1 bg-fuchsia-900/50 rounded-full text-sm"
            >
              {featureId.replace(/_/g, ' ')}
            </span>
          ))
        }
      </div>
    );
  };

  return (
    <div className="rounded-xl p-6 bg-[#2A0F44]">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700 flex items-center gap-2">
        <Settings2 className="w-5 h-5 text-purple-400" />
        Features
      </h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-lg text-fuchsia-200 mb-2">Hotel Features</h4>
          {renderFeatures(hotelFeatures)}
        </div>
        
        <div>
          <h4 className="font-medium text-lg text-fuchsia-200 mb-2">Room Features</h4>
          {renderFeatures(roomFeatures)}
        </div>
      </div>
    </div>
  );
};
