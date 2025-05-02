
import React, { useEffect, useState, useCallback, useRef } from "react";
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
  const [isInitialized, setIsInitialized] = useState(false);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize from formData once
  useEffect(() => {
    // Always initialize from formData, regardless of if we've already initialized
    if (formData.featuresHotel && typeof formData.featuresHotel === 'object') {
      console.log("Setting hotel features from formData:", formData.featuresHotel);
      setSelectedHotelFeatures(formData.featuresHotel);
    }
    
    if (formData.featuresRoom && typeof formData.featuresRoom === 'object') {
      console.log("Setting room features from formData:", formData.featuresRoom);
      setSelectedRoomFeatures(formData.featuresRoom);
    }

    setIsInitialized(true);
    // This step is always valid
    onValidationChange(true);
  }, [formData]); // Add formData as dependency to reinitialize when it changes

  // Debounce form updates to prevent flickering
  useEffect(() => {
    // Skip the initial render to avoid resetting form data
    if (!isInitialized) return;
    
    // Clear any existing timeout
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    
    // Use a timeout to batch update parent form only after user stops making changes
    updateTimeoutRef.current = setTimeout(() => {
      console.log("Updating form data with hotel features:", selectedHotelFeatures);
      updateFormData('featuresHotel', selectedHotelFeatures);
      
      console.log("Updating form data with room features:", selectedRoomFeatures);
      updateFormData('featuresRoom', selectedRoomFeatures);
    }, 300); // 300ms debounce delay
    
    // Cleanup function that ensures updates happen before unmount
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
        // Force update on unmount to ensure data is saved
        console.log("Forcing update on unmount");
        updateFormData('featuresHotel', selectedHotelFeatures);
        updateFormData('featuresRoom', selectedRoomFeatures);
      }
    };
  }, [selectedHotelFeatures, selectedRoomFeatures, updateFormData, isInitialized]);

  const handleHotelFeatureToggle = useCallback((featureId: string) => {
    setSelectedHotelFeatures(prev => ({
      ...prev,
      [featureId]: !prev[featureId]
    }));
  }, []);

  const handleRoomFeatureToggle = useCallback((featureId: string) => {
    setSelectedRoomFeatures(prev => ({
      ...prev,
      [featureId]: !prev[featureId]
    }));
  }, []);

  // Convert record to array for FeaturesList component
  const getSelectedFeaturesArray = (featuresRecord: Record<string, boolean>): string[] => {
    return Object.entries(featuresRecord)
      .filter(([_, isSelected]) => isSelected)
      .map(([feature, _]) => feature);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Hotel Features</h3>
        <FeaturesList 
          features={hotelFeatures} 
          selectedFeatures={getSelectedFeaturesArray(selectedHotelFeatures)}
          onToggle={handleHotelFeatureToggle}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Room Features</h3>
        <FeaturesList 
          features={roomFeatures}
          selectedFeatures={getSelectedFeaturesArray(selectedRoomFeatures)}
          onToggle={handleRoomFeatureToggle}
        />
      </div>
    </div>
  );
}
