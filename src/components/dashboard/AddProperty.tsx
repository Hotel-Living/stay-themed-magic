
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import StepContent from "./PropertySteps/StepContent";
import { usePropertyFormData, PropertyFormData } from "./property/hooks/usePropertyFormData";
import { useHotelEditing } from "./property/hooks/useHotelEditing";
import { usePropertySubmission } from "./property/hooks/usePropertySubmission";

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

        <StepContent
          currentStep={currentStep}
          onValidationChange={handleValidationChange}
          formData={formData}
          updateFormData={updateFormData}
        />
      </div>
    </div>
  );
}
