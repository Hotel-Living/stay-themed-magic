
import React, { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import AffinitiesSection from "./themes/AffinitiesSection";
import ActivitiesSection from "./activities/ActivitiesSection";
import FeaturesList from "./features/FeaturesList";
import { featuresData } from "./features/featuresData";

interface GeneralInformationStep2Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

const GeneralInformationStep2: React.FC<GeneralInformationStep2Props> = ({
  formData,
  updateFormData,
  onValidationChange
}) => {
  const { t } = useTranslation();
  const [validationState, setValidationState] = useState({
    affinities: false,
    activities: false
  });

  // Validate step completion
  useEffect(() => {
    const hasAffinities = formData.themes && formData.themes.length > 0;
    const hasActivities = formData.activities && formData.activities.length > 0;
    
    const newValidationState = {
      affinities: hasAffinities,
      activities: hasActivities
    };
    
    setValidationState(newValidationState);
    
    // Step is valid if both sections have data
    const isValid = hasAffinities && hasActivities;
    onValidationChange(isValid);
  }, [formData.themes, formData.activities, onValidationChange]);

  return (
    <div className="space-y-8 max-w-[80%]">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">{t('dashboard.stepTitles.hotelProfile')}</h2>
        <p className="text-gray-300">Define your hotel's personality, activities, and features</p>
      </div>

      {/* Affinities Section */}
      <div className="bg-purple-900/30 rounded-lg p-6">
        <AffinitiesSection
          formData={formData}
          updateFormData={updateFormData}
          isValid={validationState.affinities}
        />
      </div>

      {/* Activities Section */}
      <div className="bg-purple-900/30 rounded-lg p-6">
        <ActivitiesSection
          formData={formData}
          updateFormData={updateFormData}
          isValid={validationState.activities}
        />
      </div>

      {/* Hotel Features */}
      <div className="bg-purple-900/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">{t('dashboard.hotelFeatures')}</h3>
        <FeaturesList
          features={featuresData.hotel}
          selectedFeatures={formData.featuresHotel || {}}
          onFeatureChange={(featureKey: string, checked: boolean) => {
            const updatedFeatures = {
              ...formData.featuresHotel,
              [featureKey]: checked
            };
            updateFormData('featuresHotel', updatedFeatures);
          }}
        />
      </div>

      {/* Room Features */}
      <div className="bg-purple-900/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">{t('dashboard.roomFeatures')}</h3>
        <FeaturesList
          features={featuresData.room}
          selectedFeatures={formData.featuresRoom || {}}
          onFeatureChange={(featureKey: string, checked: boolean) => {
            const updatedFeatures = {
              ...formData.featuresRoom,
              [featureKey]: checked
            };
            updateFormData('featuresRoom', updatedFeatures);
          }}
        />
      </div>
    </div>
  );
};

export default GeneralInformationStep2;
