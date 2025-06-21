
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import StepNavigationEN from "./StepNavigation.en";
import StepNavigationES from "./StepNavigation.es";
import StepNavigationPT from "./StepNavigation.pt";
import StepNavigationRO from "./StepNavigation.ro";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  showPrevious: boolean;
  isNextDisabled?: boolean;
}

export default function StepNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  showPrevious,
  isNextDisabled = false
}: StepNavigationProps) {
  const { language } = useTranslation();
  
  if (language === 'en') return <StepNavigationEN currentStep={currentStep} totalSteps={totalSteps} onPrevious={onPrevious} onNext={onNext} onSubmit={onSubmit} showPrevious={showPrevious} isNextDisabled={isNextDisabled} />;
  if (language === 'es') return <StepNavigationES currentStep={currentStep} totalSteps={totalSteps} onPrevious={onPrevious} onNext={onNext} onSubmit={onSubmit} showPrevious={showPrevious} isNextDisabled={isNextDisabled} />;
  if (language === 'pt') return <StepNavigationPT currentStep={currentStep} totalSteps={totalSteps} onPrevious={onPrevious} onNext={onNext} onSubmit={onSubmit} showPrevious={showPrevious} isNextDisabled={isNextDisabled} />;
  if (language === 'ro') return <StepNavigationRO currentStep={currentStep} totalSteps={totalSteps} onPrevious={onPrevious} onNext={onNext} onSubmit={onSubmit} showPrevious={showPrevious} isNextDisabled={isNextDisabled} />;
  
  // Default fallback to English
  return <StepNavigationEN currentStep={currentStep} totalSteps={totalSteps} onPrevious={onPrevious} onNext={onNext} onSubmit={onSubmit} showPrevious={showPrevious} isNextDisabled={isNextDisabled} />;
}
