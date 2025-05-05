import React from "react";
interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
}
export default function StepIndicator({
  currentStep,
  totalSteps,
  stepTitle
}: StepIndicatorProps) {
  return <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold uppercase text-2xl">{stepTitle}</h2>
        <div className="text-lg font-bold text-foreground/60 rounded-none bg-[#560581] px-4 py-2">
          Step {currentStep} of {totalSteps}
        </div>
      </div>
      
      <div className="w-full bg-fuchsia-950/50 rounded-full h-2 mb-6">
        <div style={{
        width: `${currentStep / totalSteps * 100}%`
      }} className="h-2 rounded-full transition-all duration-300 bg-[#a100d0]"></div>
      </div>
    </>;
}