import React, { useEffect, useState, useCallback, useRef } from "react";
import { FeaturesList } from "./features/FeaturesList";
import { hotelFeatures, roomFeatures } from "./features/featuresData";
import { useTranslation } from "@/hooks/useTranslation";

interface HotelFeaturesStepProps {
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function HotelFeaturesStep({
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {}
}: HotelFeaturesStepProps) {
  const { t } = useTranslation();
  
  // Local state for features selection
  const [selectedHotelFeatures, setSelectedHotelFeatures] = useState<Record<string, boolean>>({});
  const [selectedRoomFeatures, setSelectedRoomFeatures] = useState<Record<string, boolean>>({});

  // Store formData in ref to avoid re-renders when it changes
  const formDataRef = useRef(formData);
  const initializedRef = useRef(false);
  const isDirtyRef = useRef(false);

  // Only run once on mount to initialize from formData
  useEffect(() => {
    // Initialize from formData
    if (formData.featuresHotel && typeof formData.featuresHotel === 'object') {
      console.log("Setting hotel features from formData:", formData.featuresHotel);
      setSelectedHotelFeatures(formData.featuresHotel);
    }
    if (formData.featuresRoom && typeof formData.featuresRoom === 'object') {
      console.log("Setting room features from formData:", formData.featuresRoom);
      setSelectedRoomFeatures(formData.featuresRoom);
    }

    // Update ref
    formDataRef.current = formData;
    initializedRef.current = true;

    // This step is always valid
    onValidationChange(true);
  }, []); // Empty dependency array - only run once on mount

  // Handle updates to formData without re-rendering
  useEffect(() => {
    // Update saved data when component unmounts
    return () => {
      if (isDirtyRef.current) {
        console.log("Saving features on unmount");
        updateFormData('featuresHotel', selectedHotelFeatures);
        updateFormData('featuresRoom', selectedRoomFeatures);
      }
    };
  }, [selectedHotelFeatures, selectedRoomFeatures, updateFormData]);

  // Save data periodically if dirty
  useEffect(() => {
    if (!initializedRef.current) return;

    // Only update if something changed
    if (!isDirtyRef.current) return;

    // Save data every 2 seconds if dirty (much less frequent than toggles)
    const saveInterval = setInterval(() => {
      if (isDirtyRef.current) {
        console.log("Periodic saving of features");
        updateFormData('featuresHotel', selectedHotelFeatures);
        updateFormData('featuresRoom', selectedRoomFeatures);
        isDirtyRef.current = false;
      }
    }, 2000);
    return () => clearInterval(saveInterval);
  }, [selectedHotelFeatures, selectedRoomFeatures, updateFormData]);
  
  const handleHotelFeatureToggle = useCallback((featureId: string) => {
    setSelectedHotelFeatures(prev => {
      isDirtyRef.current = true;
      return {
        ...prev,
        [featureId]: !prev[featureId]
      };
    });
  }, []);
  
  const handleRoomFeatureToggle = useCallback((featureId: string) => {
    setSelectedRoomFeatures(prev => {
      isDirtyRef.current = true;
      return {
        ...prev,
        [featureId]: !prev[featureId]
      };
    });
  }, []);

  // Hotel features select/deselect all functions
  const handleHotelSelectAll = useCallback(() => {
    const allSelected = hotelFeatures.reduce((acc, feature) => {
      acc[feature] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setSelectedHotelFeatures(allSelected);
    isDirtyRef.current = true;
  }, []);

  const handleHotelDeselectAll = useCallback(() => {
    setSelectedHotelFeatures({});
    isDirtyRef.current = true;
  }, []);

  // Room features select/deselect all functions
  const handleRoomSelectAll = useCallback(() => {
    const allSelected = roomFeatures.reduce((acc, feature) => {
      acc[feature] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setSelectedRoomFeatures(allSelected);
    isDirtyRef.current = true;
  }, []);

  const handleRoomDeselectAll = useCallback(() => {
    setSelectedRoomFeatures({});
    isDirtyRef.current = true;
  }, []);

  // Manual save method for blur events
  const handleSectionBlur = useCallback(() => {
    if (isDirtyRef.current) {
      console.log("Saving features on blur");
      updateFormData('featuresHotel', selectedHotelFeatures);
      updateFormData('featuresRoom', selectedRoomFeatures);
      isDirtyRef.current = false;
    }
  }, [selectedHotelFeatures, selectedRoomFeatures, updateFormData]);

  // Convert record to array for FeaturesList component
  const getSelectedFeaturesArray = (featuresRecord: Record<string, boolean>): string[] => {
    return Object.entries(featuresRecord).filter(([_, isSelected]) => isSelected).map(([feature, _]) => feature);
  };
  
  return (
    <div className="space-y-6" onBlur={handleSectionBlur}>
      <div>
        <h3 className="text-lg font-semibold mb-3">2.3- {t('hotelFeatures.title')}</h3>
        <FeaturesList 
          features={hotelFeatures} 
          selectedFeatures={getSelectedFeaturesArray(selectedHotelFeatures)} 
          onToggle={handleHotelFeatureToggle}
          onSelectAll={handleHotelSelectAll}
          onDeselectAll={handleHotelDeselectAll}
          featureType="hotel"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">2.4- {t('roomFeatures.title')}</h3>
        <FeaturesList 
          features={roomFeatures} 
          selectedFeatures={getSelectedFeaturesArray(selectedRoomFeatures)} 
          onToggle={handleRoomFeatureToggle}
          onSelectAll={handleRoomSelectAll}
          onDeselectAll={handleRoomDeselectAll}
          featureType="room"
        />
      </div>
    </div>
  );
}
