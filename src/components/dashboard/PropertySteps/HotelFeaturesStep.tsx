
import React, { useState, useEffect } from "react";
import { FeaturesList } from "./features/FeaturesList";
import { hotelFeatures, roomFeatures } from "./features/featuresData";

interface HotelFeaturesStepProps {
  onValidationChange: (isValid: boolean) => void;
  initialData?: {
    hotelFeatures?: string[];
    roomFeatures?: string[];
  };
}

export default function HotelFeaturesStep({ 
  onValidationChange, 
  initialData 
}: HotelFeaturesStepProps) {
  const [selectedHotelFeatures, setSelectedHotelFeatures] = useState<string[]>(
    initialData?.hotelFeatures || []
  );
  
  const [selectedRoomFeatures, setSelectedRoomFeatures] = useState<string[]>(
    initialData?.roomFeatures || []
  );
  
  const handleHotelFeatureToggle = (featureId: string) => {
    setSelectedHotelFeatures(prev => {
      if (prev.includes(featureId)) {
        return prev.filter(id => id !== featureId);
      } else {
        return [...prev, featureId];
      }
    });
  };
  
  const handleRoomFeatureToggle = (featureId: string) => {
    setSelectedRoomFeatures(prev => {
      if (prev.includes(featureId)) {
        return prev.filter(id => id !== featureId);
      } else {
        return [...prev, featureId];
      }
    });
  };
  
  // Validate when features change
  useEffect(() => {
    // Validation logic: both lists should have at least one item selected
    const isHotelFeaturesValid = selectedHotelFeatures.length > 0;
    const isRoomFeaturesValid = selectedRoomFeatures.length > 0;
    const isValid = isHotelFeaturesValid && isRoomFeaturesValid;
    
    // Pass validation state to parent
    onValidationChange(isValid);
    
  }, [selectedHotelFeatures, selectedRoomFeatures, onValidationChange]);
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Hotel Features</h3>
        <p className="text-sm mb-4">
          Select the amenities and features available at your property.
        </p>
        
        <FeaturesList 
          features={hotelFeatures} 
          selectedFeatures={selectedHotelFeatures} 
          onToggleFeature={handleHotelFeatureToggle}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Room Features</h3>
        <p className="text-sm mb-4">
          Select the amenities and features available in your rooms.
        </p>
        
        <FeaturesList 
          features={roomFeatures}
          selectedFeatures={selectedRoomFeatures}
          onToggleFeature={handleRoomFeatureToggle} 
        />
      </div>
    </div>
  );
}
