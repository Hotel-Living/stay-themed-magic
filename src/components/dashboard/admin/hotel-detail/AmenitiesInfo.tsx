
import React from "react";
import { Card } from "@/components/ui/card";

interface AmenitiesInfoProps {
  hotel: any;
  amenities?: string[];
}

export const AmenitiesInfo = ({ hotel, amenities = [] }: AmenitiesInfoProps) => {
  // Helper function to render features
  const renderFeatures = (features) => {
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
    <Card className="p-6 bg-[#2A0F44]">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">Amenities & Features</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-lg text-fuchsia-200 mb-2">Hotel Features</h4>
          {renderFeatures(hotel.features_hotel)}
        </div>
        
        <div>
          <h4 className="font-medium text-lg text-fuchsia-200 mb-2">Room Features</h4>
          {renderFeatures(hotel.features_room)}
        </div>
        
        {amenities && amenities.length > 0 && (
          <div>
            <h4 className="font-medium text-lg text-fuchsia-200 mb-2">Additional Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {amenities.map((amenity, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-fuchsia-900/50 rounded-full text-sm"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
