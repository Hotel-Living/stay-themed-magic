
import React from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { HierarchicalThemeSelector } from "@/components/filters/HierarchicalThemeSelector";
import { HierarchicalActivitySelector } from "@/components/filters/HierarchicalActivitySelector";
import { FeaturesList } from "../../PropertySteps/features/FeaturesList";
import { hotelFeatures, roomFeatures } from "../../PropertySteps/features/featuresData";
import { useTranslation } from "@/hooks/useTranslation";

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

  const handleAffinityChange = (affinity: string, isChecked: boolean) => {
    const currentAffinities = formData.selectedAffinities || [];
    let updatedAffinities;
    
    if (isChecked) {
      updatedAffinities = [...currentAffinities, affinity];
    } else {
      updatedAffinities = currentAffinities.filter((a: string) => a !== affinity);
    }
    
    updateFormData('selectedAffinities', updatedAffinities);
  };

  const handleActivityChange = (activity: string, isChecked: boolean) => {
    const currentActivities = formData.selectedActivities || [];
    let updatedActivities;
    
    if (isChecked) {
      updatedActivities = [...currentActivities, activity];
    } else {
      updatedActivities = currentActivities.filter((a: string) => a !== activity);
    }
    
    updateFormData('selectedActivities', updatedActivities);
  };

  const handleHotelFeatureChange = (feature: string) => {
    const currentFeatures = formData.selectedHotelFeatures || [];
    const isCurrentlySelected = currentFeatures.includes(feature);
    let updatedFeatures;
    
    if (isCurrentlySelected) {
      updatedFeatures = currentFeatures.filter((f: string) => f !== feature);
    } else {
      updatedFeatures = [...currentFeatures, feature];
    }
    
    updateFormData('selectedHotelFeatures', updatedFeatures);
  };

  const handleRoomFeatureChange = (feature: string) => {
    const currentFeatures = formData.selectedRoomFeatures || [];
    const isCurrentlySelected = currentFeatures.includes(feature);
    let updatedFeatures;
    
    if (isCurrentlySelected) {
      updatedFeatures = currentFeatures.filter((f: string) => f !== feature);
    } else {
      updatedFeatures = [...currentFeatures, feature];
    }
    
    updateFormData('selectedRoomFeatures', updatedFeatures);
  };

  // Indoor activities as shown in the screenshot
  const indoorActivities = [
    "Art & Creativity",
    "Cinema & Media", 
    "Cooking & Food",
    "Fitness & Movement",
    "Games & Entertainment",
    "Language Activities"
  ];

  // Outdoor activities as shown in the screenshot
  const outdoorActivities = [
    "Animal Encounters",
    "Adventure",
    "Gardening & Green Living", 
    "Live Culture",
    "Nature & Trails",
    "Outdoor Wellness"
  ];

  return (
    <div className="space-y-6">
      {/* 2.1 - Affinities Section */}
      <Collapsible defaultOpen={false} className="w-full">
        <div className="bg-[#6c0686]">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2">
            <label className="block text-xl font-bold text-foreground/90 uppercase">
              {t('dashboard.affinities')}
            </label>
            <ChevronDown className="h-5 w-5 text-white" />
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent>
          <p className="text-sm text-foreground/90 mb-4">
            Select the affinities that best describe your hotel's target audience and atmosphere
          </p>
          
          <div className="bg-[#5A1876]/20 rounded-lg p-4 border border-fuchsia-800/20 max-h-96 overflow-y-auto">
            <HierarchicalThemeSelector
              selectedThemes={formData.selectedAffinities || []}
              onThemeSelect={handleAffinityChange}
              allowMultiple={true}
              className="space-y-1"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* 2.2 - Activities Section */}
      <Collapsible defaultOpen={false} className="w-full">
        <div className="bg-[#6c0686]">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2">
            <label className="block text-xl font-bold text-foreground/90 uppercase">
              {t('dashboard.activities')}
            </label>
            <ChevronDown className="h-5 w-5 text-white" />
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent>
          <p className="text-sm text-foreground/90 mb-4">
            Select activities available at your hotel or in the surrounding area
          </p>
          
          <div className="bg-[#5A1876]/20 rounded-lg p-4 border border-fuchsia-800/20 max-h-96 overflow-y-auto space-y-4">
            {/* Indoor Activities */}
            <Collapsible defaultOpen={false} className="w-full">
              <div className="bg-[#6c0686]">
                <CollapsibleTrigger className="flex items-center justify-between w-full p-2">
                  <span className="text-white font-semibold uppercase">INDOOR</span>
                  <ChevronDown className="h-4 w-4 text-white" />
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="pt-2 pl-4 space-y-1">
                {indoorActivities.map((activity) => (
                  <label key={activity} className="flex items-center space-x-2 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(formData.selectedActivities || []).includes(activity)}
                      onChange={(e) => handleActivityChange(activity, e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{activity}</span>
                  </label>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Outdoor Activities */}
            <Collapsible defaultOpen={false} className="w-full">
              <div className="bg-[#6c0686]">
                <CollapsibleTrigger className="flex items-center justify-between w-full p-2">
                  <span className="text-white font-semibold uppercase">OUTDOOR</span>
                  <ChevronDown className="h-4 w-4 text-white" />
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="pt-2 pl-4 space-y-1">
                {outdoorActivities.map((activity) => (
                  <label key={activity} className="flex items-center space-x-2 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(formData.selectedActivities || []).includes(activity)}
                      onChange={(e) => handleActivityChange(activity, e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{activity}</span>
                  </label>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* 2.3 - Hotel Features Section */}
      <Collapsible defaultOpen={false} className="w-full">
        <div className="bg-[#6c0686]">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2">
            <label className="block text-xl font-bold text-foreground/90 uppercase">
              Hotel Features
            </label>
            <ChevronDown className="h-5 w-5 text-white" />
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent>
          <p className="text-sm text-foreground/90 mb-4">
            Select the features and amenities available at your hotel
          </p>
          
          <div className="bg-[#5A1876]/20 rounded-lg p-4 border border-fuchsia-800/20 max-h-96 overflow-y-auto">
            <FeaturesList
              features={hotelFeatures}
              selectedFeatures={formData.selectedHotelFeatures || []}
              onToggle={handleHotelFeatureChange}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* 2.4 - Room Features Section */}
      <Collapsible defaultOpen={false} className="w-full">
        <div className="bg-[#6c0686]">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2">
            <label className="block text-xl font-bold text-foreground/90 uppercase">
              Room Features
            </label>
            <ChevronDown className="h-5 w-5 text-white" />
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent>
          <p className="text-sm text-foreground/90 mb-4">
            Select the features and amenities available in the rooms
          </p>
          
          <div className="bg-[#5A1876]/20 rounded-lg p-4 border border-fuchsia-800/20 max-h-96 overflow-y-auto">
            <FeaturesList
              features={roomFeatures}
              selectedFeatures={formData.selectedRoomFeatures || []}
              onToggle={handleRoomFeatureChange}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
