
import React, { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { HierarchicalThemeSelector } from "@/components/filters/HierarchicalThemeSelector";
import { HierarchicalActivitySelector } from "@/components/filters/HierarchicalActivitySelector";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FeaturesList } from "@/components/dashboard/PropertySteps/features/FeaturesList";
import { featuresData } from "@/components/dashboard/PropertySteps/features/featuresData";

interface NewStep2PropertyDetailsProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

export function NewStep2PropertyDetails({
  formData,
  updateFormData,
  onValidationChange
}: NewStep2PropertyDetailsProps) {
  const { t } = useTranslation();
  const [selectedThemes, setSelectedThemes] = useState<string[]>(formData.themes || []);
  const [selectedActivities, setSelectedActivities] = useState<string[]>(formData.activities || []);
  const [selectedHotelFeatures, setSelectedHotelFeatures] = useState<string[]>(formData.hotelFeatures || []);
  const [selectedRoomFeatures, setSelectedRoomFeatures] = useState<string[]>(formData.roomFeatures || []);

  // Update local state when formData changes
  useEffect(() => {
    if (formData.themes && formData.themes.length > 0) {
      setSelectedThemes(formData.themes);
    }
    
    if (formData.activities && formData.activities.length > 0) {
      setSelectedActivities(formData.activities);
    }

    if (formData.hotelFeatures && formData.hotelFeatures.length > 0) {
      setSelectedHotelFeatures(formData.hotelFeatures);
    }

    if (formData.roomFeatures && formData.roomFeatures.length > 0) {
      setSelectedRoomFeatures(formData.roomFeatures);
    }
  }, [formData.themes, formData.activities, formData.hotelFeatures, formData.roomFeatures]);

  // Update parent form data when local state changes
  useEffect(() => {
    updateFormData('themes', selectedThemes);
    updateFormData('activities', selectedActivities);
    updateFormData('hotelFeatures', selectedHotelFeatures);
    updateFormData('roomFeatures', selectedRoomFeatures);
    onValidationChange(true); // Step is optional
  }, [selectedThemes, selectedActivities, selectedHotelFeatures, selectedRoomFeatures, updateFormData, onValidationChange]);

  const handleThemeSelect = (themeId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedThemes(prev => [...prev, themeId]);
    } else {
      setSelectedThemes(prev => prev.filter(id => id !== themeId));
    }
  };

  const handleActivityChange = (activity: string, isChecked: boolean) => {
    setSelectedActivities(prev => 
      isChecked 
        ? [...prev, activity]
        : prev.filter(a => a !== activity)
    );
  };

  const handleHotelFeatureToggle = (feature: string) => {
    setSelectedHotelFeatures(prev => 
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const handleRoomFeatureToggle = (feature: string) => {
    setSelectedRoomFeatures(prev => 
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  return (
    <div className="space-y-8 max-w-[80%]">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Hotel Profile & Character</h2>
        <p className="text-gray-300">Define your hotel's personality, activities, and features</p>
      </div>

      {/* 2.1 - Affinities Section */}
      <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 rounded-lg p-6 border border-purple-500/20">
        <Collapsible defaultOpen={false} className="w-full">
          <div className="bg-gradient-to-r from-purple-700 to-purple-600 rounded-t-lg">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4">
              <h3 className="text-xl font-bold text-white uppercase tracking-wide">2.1 - AFFINITIES</h3>
              <ChevronDown className="h-5 w-5 text-white" />
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent className="bg-purple-900/30 rounded-b-lg p-4">
            <p className="text-white/90 mb-4 text-sm">
              Choose the interests and activities that align with your property's character
            </p>
            
            <Link 
              to="/themes-information" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center rounded-lg text-white text-sm font-medium transition-colors mb-6 bg-fuchsia-600/80 hover:bg-fuchsia-600 px-4 py-2"
            >
              More Information
            </Link>
            
            <div className="bg-purple-900/40 rounded-lg p-4 border border-purple-600/30 max-h-96 overflow-y-auto">
              <HierarchicalThemeSelector
                selectedThemes={selectedThemes}
                onThemeSelect={handleThemeSelect}
                allowMultiple={true}
                className="space-y-2"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* 2.2 - Activities Section */}
      <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 rounded-lg p-6 border border-purple-500/20">
        <Collapsible defaultOpen={false} className="w-full">
          <div className="bg-gradient-to-r from-purple-700 to-purple-600 rounded-t-lg">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4">
              <h3 className="text-xl font-bold text-white uppercase tracking-wide">2.2 - ACTIVITIES</h3>
              <ChevronDown className="h-5 w-5 text-white" />
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent className="bg-purple-900/30 rounded-b-lg p-4">
            <p className="text-white/90 mb-4 text-sm">
              Select activities available at your hotel or in the surrounding area
            </p>
            
            {/* Indoor Activities */}
            <div className="mb-6">
              <Collapsible defaultOpen={false} className="w-full">
                <div className="bg-gradient-to-r from-purple-800 to-purple-700 rounded-t-lg">
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-3">
                    <h4 className="text-lg font-semibold text-white uppercase">INDOOR</h4>
                    <ChevronRight className="h-4 w-4 text-white" />
                  </CollapsibleTrigger>
                </div>
                
                <CollapsibleContent className="bg-purple-900/40 rounded-b-lg p-4 border border-purple-600/30">
                  <div className="max-h-48 overflow-y-auto">
                    <HierarchicalActivitySelector
                      selectedActivities={selectedActivities}
                      onActivitySelect={handleActivityChange}
                      allowMultiple={true}
                      className="space-y-1"
                      filterType="indoor"
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Outdoor Activities */}
            <div>
              <Collapsible defaultOpen={false} className="w-full">
                <div className="bg-gradient-to-r from-purple-800 to-purple-700 rounded-t-lg">
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-3">
                    <h4 className="text-lg font-semibold text-white uppercase">OUTDOOR</h4>
                    <ChevronRight className="h-4 w-4 text-white" />
                  </CollapsibleTrigger>
                </div>
                
                <CollapsibleContent className="bg-purple-900/40 rounded-b-lg p-4 border border-purple-600/30">
                  <div className="max-h-48 overflow-y-auto">
                    <HierarchicalActivitySelector
                      selectedActivities={selectedActivities}
                      onActivitySelect={handleActivityChange}
                      allowMultiple={true}
                      className="space-y-1"
                      filterType="outdoor"
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* 2.3 - Hotel Features Section */}
      <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 rounded-lg p-6 border border-purple-500/20">
        <Collapsible defaultOpen={false} className="w-full">
          <div className="bg-gradient-to-r from-purple-700 to-purple-600 rounded-t-lg">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4">
              <h3 className="text-xl font-bold text-white uppercase tracking-wide">2.3 - HOTEL FEATURES</h3>
              <ChevronDown className="h-5 w-5 text-white" />
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent className="bg-purple-900/30 rounded-b-lg p-4">
            <p className="text-white/90 mb-4 text-sm">
              Select the features and amenities available at your hotel
            </p>
            
            <div className="bg-purple-900/40 rounded-lg p-4 border border-purple-600/30 max-h-96 overflow-y-auto">
              <FeaturesList
                features={featuresData.hotel}
                selectedFeatures={selectedHotelFeatures}
                onToggle={handleHotelFeatureToggle}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* 2.4 - Room Features Section */}
      <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 rounded-lg p-6 border border-purple-500/20">
        <Collapsible defaultOpen={false} className="w-full">
          <div className="bg-gradient-to-r from-purple-700 to-purple-600 rounded-t-lg">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4">
              <h3 className="text-xl font-bold text-white uppercase tracking-wide">2.4 - ROOM FEATURES</h3>
              <ChevronDown className="h-5 w-5 text-white" />
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent className="bg-purple-900/30 rounded-b-lg p-4">
            <p className="text-white/90 mb-4 text-sm">
              Select the features and amenities available in your rooms
            </p>
            
            <div className="bg-purple-900/40 rounded-lg p-4 border border-purple-600/30 max-h-96 overflow-y-auto">
              <FeaturesList
                features={featuresData.room}
                selectedFeatures={selectedRoomFeatures}
                onToggle={handleRoomFeatureToggle}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
