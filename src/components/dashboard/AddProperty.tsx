
import { useState } from "react";
import BasicInfoStep from "./PropertySteps/BasicInfoStep";
import LocationStep from "./PropertySteps/LocationStep";
import PicturesStep from "./PropertySteps/PicturesStep";
import RoomsAndPricingStep from "./PropertySteps/RoomsAndPricingStep";
import ThemesAndActivitiesStep from "./PropertySteps/ThemesAndActivitiesStep";
import HotelFeaturesStep from "./PropertySteps/HotelFeaturesStep";
import StayRatesStep from "./PropertySteps/StayRatesStep";
import HotelFaqAndTermsStep from "./PropertySteps/HotelFaqAndTermsStep";

export default function AddProperty() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;
  
  // Step titles in all caps
  const stepTitles = [
    "BASIC INFO",
    "LOCATION & PICTURES",
    "ROOMS & PRICING",
    "HOTEL FEATURES",
    "THEMES",
    "STAYS RATES",
    "FAQ & TERMS"
  ];
  
  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">ADD A NEW PROPERTY</h2>
        <div className="text-sm text-foreground/60">
          Step {currentStep} of {totalSteps}
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-fuchsia-950/50 rounded-full h-2 mb-6">
        <div 
          className="bg-fuchsia-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
      
      {/* Step Title */}
      <h3 className="text-lg font-semibold mb-6">{stepTitles[currentStep - 1]}</h3>
      
      {/* Step Content */}
      <div className="mb-8">
        {currentStep === 1 && <BasicInfoStep />}
        {currentStep === 2 && (
          <div className="space-y-8">
            <LocationStep />
            <PicturesStep />
          </div>
        )}
        {currentStep === 3 && <RoomsAndPricingStep />}
        {currentStep === 4 && <HotelFeaturesStep />}
        {currentStep === 5 && <ThemesAndActivitiesStep />}
        {currentStep === 6 && <StayRatesStep />}
        {currentStep === 7 && <HotelFaqAndTermsStep />}
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={goToPreviousStep}
          className={`rounded-lg px-6 py-2 text-sm font-medium transition-colors ${
            currentStep === 1 
              ? "bg-fuchsia-800/20 text-fuchsia-300/50 cursor-not-allowed" 
              : "bg-fuchsia-950/80 hover:bg-fuchsia-900/80 text-fuchsia-100"
          }`}
          disabled={currentStep === 1}
        >
          Previous
        </button>
        
        {currentStep === totalSteps ? (
          <button
            className="rounded-lg px-6 py-2 bg-green-600/80 hover:bg-green-600 text-white text-sm font-medium transition-colors"
          >
            Submit Property
          </button>
        ) : (
          <button
            onClick={goToNextStep}
            className="rounded-lg px-6 py-2 bg-fuchsia-600/80 hover:bg-fuchsia-600 text-white text-sm font-medium transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
