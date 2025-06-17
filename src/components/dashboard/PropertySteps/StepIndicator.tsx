
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
}

export default function StepIndicator({ currentStep, totalSteps, stepTitle }: StepIndicatorProps) {
  const { t } = useTranslation();
  
  // Translate step titles to Spanish
  const getSpanishTitle = (title: string) => {
    const translations = {
      "ACCOMMODATION TERMS": "CONDICIONES DE LA ESTANCIA",
      "GENERAL INFORMATION": "INFORMACIÓN GENERAL",
      "PACKAGES BUILDER": "CONSTRUCTOR DE PAQUETES",
      "FINAL TERMS": "TÉRMINOS FINALES"
    };
    return translations[title] || title;
  };
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-white">{getSpanishTitle(stepTitle)}</h1>
        <span className="text-white/70">Paso {currentStep} de {totalSteps}</span>
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
