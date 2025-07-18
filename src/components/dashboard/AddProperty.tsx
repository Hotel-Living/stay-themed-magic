
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import StepContent from "./PropertySteps/StepContent";
import StepIndicator from "./PropertySteps/StepIndicator";
import StepNavigation from "./PropertySteps/StepNavigation";
import { usePropertyFormData, PropertyFormData } from "./property/hooks/usePropertyFormData";
import { useHotelEditing } from "./property/hooks/useHotelEditing";
import { usePropertySubmission } from "./property/hooks/usePropertySubmission";
import { TOTAL_STEPS, STEP_TITLES } from "./PropertySteps/constants";

interface AddPropertyProps {
  editingHotelId?: string | null;
  onDoneEditing?: () => void;
}

export default function AddProperty({ 
  editingHotelId: propEditingHotelId, 
  onDoneEditing 
}: AddPropertyProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  
  // Get editing hotel ID from URL parameter or props
  const urlEditingHotelId = searchParams.get('edit');
  const editingHotelId = urlEditingHotelId || propEditingHotelId;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isValidationEnabled, setIsValidationEnabled] = useState(false);
  const { formData, setFormData, updateFormData } = usePropertyFormData();
  
  // Load hotel data for editing
  const { isLoading: isLoadingHotel } = useHotelEditing({
    editingHotelId,
    setFormData,
    setCurrentStep
  });

  // Create wrapper function that matches expected signature
  const setFormDataWrapper = (data: Partial<PropertyFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const { handleSubmitProperty } = usePropertySubmission({
    formData,
    stepValidation: {},
    setIsSubmitted: () => {},
    setSubmitSuccess: () => {},
    setErrorFields: () => {},
    setShowValidationErrors: () => {},
    getIncompleteFields: () => [],
    setCurrentStep,
    setFormData: setFormDataWrapper,
    userId: undefined,
    onDoneEditing: () => {
      if (onDoneEditing) {
        onDoneEditing();
      } else if (urlEditingHotelId) {
        // If we came from Fernando panel, go back to it
        navigate('/panel-fernando/hotels');
      } else {
        navigate('/hotel-dashboard');
      }
    }
  });

  const handleBackNavigation = () => {
    if (onDoneEditing) {
      onDoneEditing();
    } else if (urlEditingHotelId) {
      // If we came from Fernando panel, go back to it
      navigate('/panel-fernando/hotels');
    } else {
      navigate('/hotel-dashboard');
    }
  };

  const handleValidationChange = (isValid: boolean) => {
    setIsValidationEnabled(isValid);
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      await handleSubmitProperty(editingHotelId);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  if (isLoadingHotel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading hotel data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={handleBackNavigation}
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-3xl font-bold text-white mb-2">
            {editingHotelId ? 'Edit Property' : 'Add New Property'}
          </h1>
          <p className="text-white/60">
            {editingHotelId ? 'Update your property information' : 'List your property on Hotel Living'}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <StepIndicator
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            stepTitle={STEP_TITLES[currentStep - 1]}
          />

          {/* Top Navigation */}
          <div className="flex items-center justify-between mb-6">
            {currentStep >= 2 ? (
              <Button
                onClick={handlePrevious}
                variant="outline"
                className="text-white border-white/20 hover:bg-white/10"
              >
                Back
              </Button>
            ) : (
              <div></div>
            )}
            
            {currentStep <= 4 ? (
              <Button
                onClick={handleNext}
                className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Submit
              </Button>
            )}
          </div>

          <StepContent
            currentStep={currentStep}
            onValidationChange={handleValidationChange}
            formData={formData}
            updateFormData={updateFormData}
          />

          <StepNavigation
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
            showPrevious={currentStep > 1}
            isNextDisabled={false}
          />
        </div>
      </div>
    </div>
  );
}
