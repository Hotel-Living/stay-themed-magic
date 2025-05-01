// RUTA: src/components/dashboard/property/AddPropertyForm.tsx

import React, { useState } from "react";
import StepIndicator from "./StepIndicator";
import StepContent from "./StepContent";
import { usePropertyForm } from "./hooks/usePropertyForm";
import { usePropertySubmission } from "./hooks/usePropertySubmission";
import { useHotelEditing } from "./hooks/useHotelEditing";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";

export default function AddPropertyForm() {
  const {
    formData,
    setFormData,
    currentStep,
    setCurrentStep,
    validateStep,
    goToNextStep,
    goToPreviousStep,
  } = usePropertyForm();

  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const { toast } = useToast();
  const navigate = useNavigate();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useHotelEditing();
  if (!editId) {
    usePropertySubmission({ formData });
  }

  const handleUpdate = async () => {
    if (!editId || !formData?.hotelName) return;

    setIsSaving(true);

    const { error } = await supabase
      .from("hotels")
      .update({ ...formData })
      .eq("id", editId);

    setIsSaving(false);

    if (error) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Property updated",
        description: "Changes have been saved successfully",
      });
      setUpdateSuccess(true);
      setTimeout(() => {
        const isAdmin = window.location.pathname.includes("/admin");
        navigate(isAdmin ? "/admin" : "/hotel-dashboard");
      }, 1500);
    }
  };

  const stepTitles = [
    "Basic Information",
    "Accommodation & Features",
    "Themes & Activities",
    "FAQ & Terms"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4">
      <StepIndicator 
        currentStep={currentStep} 
        totalSteps={4} 
        stepTitle={stepTitles[currentStep - 1]} 
      />
      <StepContent
        currentStep={currentStep}
        formData={formData}
        setFormData={setFormData}
        onNext={goToNextStep}
        onPrevious={goToPreviousStep}
        validateStep={validateStep}
      />
      {editId && (
        <div className="mt-6">
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save changes"}
          </button>
          {updateSuccess && (
            <p className="mt-3 text-green-600 font-medium">
              ✅ Changes saved successfully.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
