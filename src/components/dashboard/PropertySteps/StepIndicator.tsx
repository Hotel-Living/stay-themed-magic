
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
}

export default function StepIndicator({ currentStep, totalSteps, stepTitle }: StepIndicatorProps) {
  const { t, i18n } = useTranslation();
  
  // Translate specific section titles
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
    return title;
  };
  
  // Get step label based on language
  const getStepLabel = () => {
    return i18n.language === 'es' ? `Paso ${currentStep} de ${totalSteps}` : `Step ${currentStep} of ${totalSteps}`;
  };
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-white">{getTranslatedTitle(stepTitle)}</h1>
        <span className="text-white/70">{getStepLabel()}</span>
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
