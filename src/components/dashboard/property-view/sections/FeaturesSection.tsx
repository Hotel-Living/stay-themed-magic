
import React from 'react';
import { Card } from "@/components/ui/card";
import { Hotel } from "@/integrations/supabase/types-custom";

interface FeaturesSectionProps {
  hotel: Hotel;
}

export const FeaturesSection = ({ hotel }: FeaturesSectionProps) => {
  const renderFeatures = (features: Record<string, boolean> | undefined) => {
    if (!features || Object.keys(features).length === 0) {
      return <p>No features specified</p>;
    }

    return (
      <div className="flex flex-wrap gap-2">
        {Object.entries(features)
          .filter(([_, selected]) => selected)
          .map(([featureId]) => (
            <span 
              key={featureId} 
              className="px-3 py-1 bg-[#AACAFE]/70 rounded-full text-sm text-[#3300B0]"
            >
              {featureId.replace(/_/g, ' ')}
            </span>
          ))}
      </div>
    );
  };

  return (
    <Card className="p-6 bg-[#AACAFE]/30">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-[#3300B0]/30 text-[#3300B0]">Features</h3>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <h4 className="font-medium text-lg text-[#3300B0] mb-2">Hotel Features</h4>
          {renderFeatures(hotel.features_hotel)}
        </div>
        <div>
          <h4 className="font-medium text-lg text-[#3300B0] mb-2">Room Features</h4>
          {renderFeatures(hotel.features_room)}
        </div>
      </div>
    </Card>
  );
};
