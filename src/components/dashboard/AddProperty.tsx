import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { StepContent } from "./property/StepContent";
import { usePropertyFormData } from "./property/hooks/usePropertyFormData";
import { useHotelEditing } from "./property/hooks/useHotelEditing";
import { useFormValidation } from "./property/hooks/useFormValidation";
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
  const { formData, setFormData, updateFormData } = usePropertyFormData();
  const { isValidationEnabled, enableValidation } = useFormValidation();
  
  // Load hotel data for editing
  const { isLoading: isLoadingHotel } = useHotelEditing({
    editingHotelId,
    setFormData,
    setCurrentStep
  });

  const {
    isSubmitting,
    handleSubmit: submitProperty
  } = usePropertySubmission({
    formData,
    editingHotelId,
    onSuccess: () => {
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
          setCurrentStep={setCurrentStep}
          formData={formData}
          updateFormData={updateFormData}
          isValidationEnabled={isValidationEnabled}
          enableValidation={enableValidation}
          onSubmit={submitProperty}
          isSubmitting={isSubmitting}
          editingHotelId={editingHotelId}
        />
      </div>
    </div>
  );
}
