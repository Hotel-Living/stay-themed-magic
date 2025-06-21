
import React from "react";

interface StepIndicatorENProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
}

export default function StepIndicatorEN({ currentStep, totalSteps, stepTitle }: StepIndicatorENProps) {
  const getTranslatedTitle = (title: string) => {
    if (title === "HOTEL PROFILE") {
      return "Hotel Profile";
    }
    if (title === "ACCOMMODATION TERMS") {
      return "Accommodation Terms";
    }
    if (title === "FAQ & TÉRMINOS Y CONDICIONES") {
      return "FAQ & Terms and Conditions";
    }
    return title;
  };
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-white">{getTranslatedTitle(stepTitle)}</h1>
        <span className="text-white/70">Step {currentStep} of {totalSteps}</span>
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
