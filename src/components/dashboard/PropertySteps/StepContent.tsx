
import React, { useEffect } from "react";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSix from "./StepSix";
import PriceTable from "./PriceTable";

interface StepContentProps {
  currentStep: number;
  renderPriceTable?: (roomType: string, mealTypes: string[], stayDurations: number[]) => React.ReactNode;
  onValidationChange?: (isValid: boolean) => void;
}

export default function StepContent({ 
  currentStep, 
  renderPriceTable, 
  onValidationChange = () => {} 
}: StepContentProps) {
  // Create default price table renderer if one wasn't provided
  const defaultRenderPriceTable = (roomType: string, mealTypes: string[], stayDurations: number[]) => (
    <PriceTable 
      roomType={roomType} 
      mealTypes={mealTypes} 
      stayDurations={stayDurations} 
    />
  );

  const tableFn = renderPriceTable || defaultRenderPriceTable;
  
  // For demo purposes, set each step to be valid after 2 seconds
  // In a real app, this would come from form validation in each step
  useEffect(() => {
    const timer = setTimeout(() => {
      onValidationChange(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [currentStep, onValidationChange]);

  return (
    <div className="mb-8">
      {currentStep === 1 && <StepOne onValidationChange={onValidationChange} />}
      {currentStep === 2 && <StepThree onValidationChange={onValidationChange} />}
      {currentStep === 3 && <StepFour onValidationChange={onValidationChange} />}
      {currentStep === 4 && <StepFive renderPriceTable={tableFn} onValidationChange={onValidationChange} />}
      {currentStep === 5 && <StepSix onValidationChange={onValidationChange} />}
    </div>
  );
}
