// RUTA: src/components/dashboard/property/AddPropertyForm.tsx

import React from "react";
import StepIndicator from "./StepIndicator";
import StepContent from "./StepContent";
import { usePropertyForm } from "./hooks/usePropertyForm";
import { usePropertySubmission } from "./hooks/usePropertySubmission";
import { useHotelEditing } from "./hooks/useHotelEditing";
import { useSearchParams } from "react-router-dom";
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

  useHotelEditing();
  usePropertySubmission({ formData });

  const handleUpdate = async () => {
    if (!editId || !formData?.hotelName) return;

    const { error } = await supabase
      .from("hotels")
      .update({ ...formData })
      .eq("id", editId);

    if (error) {
      toast({
        title: "Error al actualizar",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Propiedad actualizada",
        description: "Los datos se han guardado correctamente",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <StepIndicator currentStep={currentStep} />
      <StepContent
        currentStep={currentStep}
        formData={formData}
        setFormData={setFormData}
        onNext={goToNextStep}
        onPrevious={goToPreviousStep}
        validateStep={validateStep}
      />
      {editId && (
        <button
          onClick={handleUpdate}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Guardar cambios
        </button>
      )}
    </div>
  );
}
