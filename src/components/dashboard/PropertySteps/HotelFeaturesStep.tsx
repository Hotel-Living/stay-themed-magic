
import React, { useEffect, useState } from "react";
import { FeaturesList } from "./features/FeaturesList";
import { hotelFeatures, roomFeatures } from "./features/featuresData";

interface HotelFeaturesStepProps {
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function HotelFeaturesStep({
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {},
}: HotelFeaturesStepProps) {
  const [selectedHotelFeatures, setSelectedHotelFeatures] = useState<Record<string, boolean>>({});
  const [selectedRoomFeatures, setSelectedRoomFeatures] = useState<Record<string, boolean>>({});

  // Initialize from formData
  useEffect(() => {
    if (formData.featuresHotel && typeof formData.featuresHotel === 'object') {
      console.log("Setting hotel features from formData:", formData.featuresHotel);
      setSelectedHotelFeatures(formData.featuresHotel);
    }
    
    if (formData.featuresRoom && typeof formData.featuresRoom === 'object') {
      console.log("Setting room features from formData:", formData.featuresRoom);
      setSelectedRoomFeatures(formData.featuresRoom);
    }
  }, [formData.featuresHotel, formData.featuresRoom]);

  // Update parent form data when selected features change
  useEffect(() => {
    if (updateFormData) {
      console.log("Updating form data with hotel features:", selectedHotelFeatures);
      updateFormData('featuresHotel', selectedHotelFeatures);
      console.log("Updating form data with room features:", selectedRoomFeatures);
      updateFormData('featuresRoom', selectedRoomFeatures);
    }
    
    // This step is always valid
    onValidationChange(true);
  }, [selectedHotelFeatures, selectedRoomFeatures, updateFormData, onValidationChange]);

  const handleHotelFeatureToggle = (featureId: string) => {
    setSelectedHotelFeatures(prev => ({
      ...prev,
      [featureId]: !prev[featureId]
    }));
  };

  const handleRoomFeatureToggle = (featureId: string) => {
    setSelectedRoomFeatures(prev => ({
      ...prev,
      [featureId]: !prev[featureId]
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Hotel Features</h3>
        <FeaturesList 
          features={hotelFeatures} 
          selectedFeatures={selectedHotelFeatures}
          onToggle={handleHotelFeatureToggle}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Room Features</h3>
        <FeaturesList 
          features={roomFeatures}
          selectedFeatures={selectedRoomFeatures}
          onToggle={handleRoomFeatureToggle}
        />
      </div>
    </div>
  );
}
