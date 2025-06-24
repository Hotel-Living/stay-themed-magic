
import React from "react";

interface StepIndicatorPTProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
}

export default function StepIndicatorPT({ currentStep, totalSteps, stepTitle }: StepIndicatorPTProps) {
  const getTranslatedTitle = (title: string) => {
    if (title === "HOTEL PROFILE") {
      return "Perfil do Hotel";
    }
    if (title === "ACCOMMODATION TERMS") {
      return "Termos de Acomodação";
    }
    if (title === "FAQ & TÉRMINOS Y CONDICIONES") {
      return "FAQ e Termos e Condições";
    }
    return title;
  };
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-white">{getTranslatedTitle(stepTitle)}</h1>
        <span className="text-white/70 ml-8">Passo {currentStep} de {totalSteps}</span>
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
