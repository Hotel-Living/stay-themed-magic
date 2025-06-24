
import React from "react";

interface StepIndicatorESProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
}

export default function StepIndicatorES({ currentStep, totalSteps, stepTitle }: StepIndicatorESProps) {
  const getTranslatedTitle = (title: string) => {
    if (title === "HOTEL PROFILE") {
      return "Perfil del Hotel";
    }
    if (title === "ACCOMMODATION TERMS") {
      return "Términos de Alojamiento";
    }
    if (title === "FAQ & TÉRMINOS Y CONDICIONES") {
      return "FAQ y Términos y Condiciones";
    }
    return title;
  };
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-white flex-1">{getTranslatedTitle(stepTitle)}</h1>
        <span className="text-white/70 ml-4 flex-shrink-0">Paso {currentStep} de {totalSteps}</span>
      </div>
      
      <div className="w-full bg-white/20 rounded-full h-2">
        <div 
          className="bg-fuchsia-500 h-2 rounded-full transition-all duration-300" 
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
