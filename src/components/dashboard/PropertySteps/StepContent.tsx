
import React from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSix from "./StepSix";
import PriceTable from "./PriceTable";

interface StepContentProps {
  currentStep: number;
  renderPriceTable?: (roomType: string, mealTypes: string[], stayDurations: number[]) => React.ReactNode;
}

export default function StepContent({ currentStep, renderPriceTable }: StepContentProps) {
  // Create default price table renderer if one wasn't provided
  const defaultRenderPriceTable = (roomType: string, mealTypes: string[], stayDurations: number[]) => (
    <PriceTable 
      roomType={roomType} 
      mealTypes={mealTypes} 
      stayDurations={stayDurations} 
    />
  );

  const tableFn = renderPriceTable || defaultRenderPriceTable;

  return (
    <div className="mb-8">
      {currentStep === 1 && <StepOne />}
      {currentStep === 2 && <StepTwo />}
      {currentStep === 3 && <StepThree />}
      {currentStep === 4 && <StepFour />}
      {currentStep === 5 && <StepFive renderPriceTable={tableFn} />}
      {currentStep === 6 && <StepSix />}
    </div>
  );
}
