
import React from "react";

interface StepIndicatorROProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
}

export default function StepIndicatorRO({ currentStep, totalSteps, stepTitle }: StepIndicatorROProps) {
  const getTranslatedTitle = (title: string) => {
    if (title === "HOTEL PROFILE") {
      return "Profilul Hotelului";
    }
    if (title === "ACCOMMODATION TERMS") {
      return "Termeni de Cazare";
    }
    if (title === "FAQ & TÉRMINOS Y CONDICIONES") {
      return "FAQ și Termeni și Condiții";
    }
    return title;
  };
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-white flex-1">{getTranslatedTitle(stepTitle)}</h1>
        <span className="text-white/70 ml-4 flex-shrink-0">Pasul {currentStep} din {totalSteps}</span>
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
