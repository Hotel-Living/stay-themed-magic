
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface StepIndicatorENProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
}

export default function StepIndicatorEN({ currentStep, totalSteps, stepTitle }: StepIndicatorENProps) {
  const { t } = useTranslation();
  
  const getTranslatedTitle = (title: string) => {
    if (title === "HOTEL PROFILE") {
      return t('dashboard.hotelProfile');
    }
    if (title === "ACCOMMODATION TERMS") {
      return t('dashboard.accommodationTerms');
    }
    if (title === "FAQ & TÉRMINOS Y CONDICIONES") {
      return t('dashboard-faq-terms.title');
    }
    if (title === "INFORMACIÓN GENERAL") {
      return t('dashboard.generalInformation');
    }
    return title;
  };
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-white">{getTranslatedTitle(stepTitle)}</h1>
        <span className="text-white/70 ml-8">Step {currentStep} of {totalSteps}</span>
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
