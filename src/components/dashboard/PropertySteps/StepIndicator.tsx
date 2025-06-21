
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import StepIndicatorEN from "./StepIndicator.en";
import StepIndicatorES from "./StepIndicator.es";
import StepIndicatorPT from "./StepIndicator.pt";
import StepIndicatorRO from "./StepIndicator.ro";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
}

export default function StepIndicator({ currentStep, totalSteps, stepTitle }: StepIndicatorProps) {
  const { language } = useTranslation();
  
  if (language === 'en') return <StepIndicatorEN currentStep={currentStep} totalSteps={totalSteps} stepTitle={stepTitle} />;
  if (language === 'es') return <StepIndicatorES currentStep={currentStep} totalSteps={totalSteps} stepTitle={stepTitle} />;
  if (language === 'pt') return <StepIndicatorPT currentStep={currentStep} totalSteps={totalSteps} stepTitle={stepTitle} />;
  if (language === 'ro') return <StepIndicatorRO currentStep={currentStep} totalSteps={totalSteps} stepTitle={stepTitle} />;
  
  // Default fallback to English
  return <StepIndicatorEN currentStep={currentStep} totalSteps={totalSteps} stepTitle={stepTitle} />;
}
