
import React, { useState, useEffect } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
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
  updateFormData = () => {}
}: HotelFeaturesStepProps) {
  // Initialize state with values from formData or empty objects
  const [selectedHotelFeatures, setSelectedHotelFeatures] = useState<Record<string, boolean>>(
    formData.features_hotel || {}
  );
  const [selectedRoomFeatures, setSelectedRoomFeatures] = useState<Record<string, boolean>>(
    formData.features_room || {}
  );

  // Update local state when formData changes
  useEffect(() => {
    if (formData.features_hotel) {
      console.log("Setting hotel features from formData:", formData.features_hotel);
      setSelectedHotelFeatures(formData.features_hotel);
    }
    
    if (formData.features_room) {
      console.log("Setting room features from formData:", formData.features_room);
      setSelectedRoomFeatures(formData.features_room);
    }
  }, [formData.features_hotel, formData.features_room]);

  // Update parent form data and validation state when local state changes
  useEffect(() => {
    console.log("Updating features_hotel in formData:", selectedHotelFeatures);
    updateFormData('features_hotel', selectedHotelFeatures);
    console.log("Updating features_room in formData:", selectedRoomFeatures);
    updateFormData('features_room', selectedRoomFeatures);
    
    // Validate - at least one feature in each category must be selected
    const hasHotelFeature = Object.values(selectedHotelFeatures).some(value => value);
    const hasRoomFeature = Object.values(selectedRoomFeatures).some(value => value);
    
    const isValid = hasHotelFeature && hasRoomFeature;
    onValidationChange(isValid);
  }, [selectedHotelFeatures, selectedRoomFeatures, updateFormData, onValidationChange]);

  // Handle hotel feature selection
  const handleHotelFeatureChange = (featureName: string, isChecked: boolean) => {
    console.log(`Hotel feature ${featureName} changed to ${isChecked}`);
    setSelectedHotelFeatures(prev => ({
      ...prev,
      [featureName]: isChecked
    }));
  };

  // Handle room feature selection
  const handleRoomFeatureChange = (featureName: string, isChecked: boolean) => {
    console.log(`Room feature ${featureName} changed to ${isChecked}`);
    setSelectedRoomFeatures(prev => ({
      ...prev,
      [featureName]: isChecked
    }));
  };

  // Convert Record<string, boolean> to string[] for FeaturesList component
  const getSelectedFeaturesArray = (featuresRecord: Record<string, boolean>): string[] => {
    return Object.entries(featuresRecord)
      .filter(([_, isSelected]) => isSelected)
      .map(([feature]) => feature);
  };

  return (
    <Collapsible defaultOpen={false} className="w-full">
      <div className="bg-[#6c0686]">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2">
          <label className="block text-xl font-bold text-foreground/90 uppercase">
            FEATURES
          </label>
          <ChevronDown className="h-5 w-5 text-white" />
        </CollapsibleTrigger>
      </div>
      
      <CollapsibleContent className="space-y-6 pt-4">
        <div>
          <h3 className="text-lg font-semibold mb-3">Hotel Features</h3>
          <p className="text-sm text-gray-400 mb-4">
            Select the features that your hotel offers to guests. These are features available in common areas or as
            general hotel amenities.
          </p>
          <FeaturesList
            features={hotelFeatures}
            selectedFeatures={getSelectedFeaturesArray(selectedHotelFeatures)}
            onFeatureChange={handleHotelFeatureChange}
          />
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">Room Features</h3>
          <p className="text-sm text-gray-400 mb-4">
            Select the features that are available in your rooms. These are amenities that guests will have access to
            in their individual rooms.
          </p>
          <FeaturesList
            features={roomFeatures}
            selectedFeatures={getSelectedFeaturesArray(selectedRoomFeatures)}
            onFeatureChange={handleRoomFeatureChange}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
