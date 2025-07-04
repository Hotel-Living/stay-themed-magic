
import React, { useEffect } from "react";
import { NewStep1HotelInfo } from "./NewStep1HotelInfo";

interface NewStepContentProps {
  currentStep: number;
  onValidationChange: (isValid: boolean) => void;
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export const NewStepContent: React.FC<NewStepContentProps> = ({
  currentStep,
  onValidationChange,
  formData,
  updateFormData
}) => {
  
  // Ensure validation is called when step loads
  useEffect(() => {
    console.log('NewStepContent loaded for step:', currentStep);
    // Set validation to true by default to allow navigation
    onValidationChange(true);
  }, [currentStep, onValidationChange]);

  switch (currentStep) {
    case 1:
      return (
        <NewStep1HotelInfo
          formData={formData}
          updateFormData={updateFormData}
          onValidationChange={onValidationChange}
        />
      );
    case 2:
      return (
        <div className="p-6 border rounded-md bg-white/10">
          <h3 className="text-lg font-medium mb-4">Step 2: General Information</h3>
          <p className="text-white/80">Step 2 content coming soon...</p>
        </div>
      );
    case 3:
      return (
        <div className="p-6 border rounded-md bg-white/10">
          <h3 className="text-lg font-medium mb-4">Step 3: Accommodation Terms</h3>
          <p className="text-white/80">Step 3 content coming soon...</p>
        </div>
      );
    case 4:
      return (
        <div className="p-6 border rounded-md bg-white/10">
          <h3 className="text-lg font-medium mb-4">Step 4: Packages Builder</h3>
          <p className="text-white/80">Step 4 content coming soon...</p>
        </div>
      );
    case 5:
      return (
        <div className="p-6 border rounded-md bg-white/10">
          <h3 className="text-lg font-medium mb-4">Step 5: FAQ & Terms</h3>
          <p className="text-white/80">Step 5 content coming soon...</p>
        </div>
      );
    default:
      return <div>Step not found</div>;
  }
};
