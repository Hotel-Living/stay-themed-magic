
import { useState, useEffect } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import BasicInfoStep from "./PropertySteps/BasicInfoStep";
import LocationStep from "./PropertySteps/LocationStep";
import PicturesStep from "./PropertySteps/PicturesStep";
import RoomsAndPricingStep from "./PropertySteps/RoomsAndPricingStep";
import ThemesAndActivitiesStep from "./PropertySteps/ThemesAndActivitiesStep";
import HotelFeaturesStep from "./PropertySteps/HotelFeaturesStep";
import StayRatesStep from "./PropertySteps/StayRatesStep";
import HotelFaqAndTermsStep from "./PropertySteps/HotelFaqAndTermsStep";
import { useToast } from "@/hooks/use-toast";

export default function AddProperty() {
  const [currentStep, setCurrentStep] = useState(1);
  const [hasNewItems, setHasNewItems] = useState(false);
  const totalSteps = 6;
  
  // Step titles in all caps
  const stepTitles = [
    "ADD A NEW PROPERTY",
    "ADD A NEW PROPERTY",
    "ADD A NEW PROPERTY",
    "ADD A NEW PROPERTY",
    "ADD A NEW PROPERTY",
    "ADD A NEW PROPERTY"
  ];
  
  const [hotelFeaturesOpen, setHotelFeaturesOpen] = useState(false);
  const [roomFeaturesOpen, setRoomFeaturesOpen] = useState(false);
  
  const { toast } = useToast();
  
  const goToNextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      }
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive",
      });
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const validateCurrentStep = () => {
    // This is a placeholder for form validation logic
    // In a real application, we would validate all required fields
    return true;
  };
  
  const handleSubmitProperty = () => {
    if (validateCurrentStep()) {
      if (hasNewItems) {
        toast({
          title: "Property Submitted for Review",
          description: "Your property has been submitted and is awaiting administrator approval.",
          duration: 5000,
        });
      } else {
        toast({
          title: "Property Published",
          description: "Your property has been successfully published!",
          duration: 5000,
        });
      }
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields before submitting.",
        variant: "destructive",
      });
    }
  };

  // Helper function to render price table
  const renderPriceTable = (roomType: string, mealTypes: string[], stayDurations: number[]) => {
    return (
      <div className="mb-8 border border-fuchsia-700/30 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-fuchsia-900/50">
              <th colSpan={stayDurations.length + 1} className="px-4 py-3 text-center font-bold uppercase">
                {roomType}
              </th>
            </tr>
            <tr className="bg-fuchsia-900/50">
              <th colSpan={stayDurations.length + 1} className="px-4 py-2 text-center text-sm">
                (Rates per person)
              </th>
            </tr>
            <tr className="bg-fuchsia-900/30">
              <th className="px-4 py-2"></th>
              <th colSpan={stayDurations.length} className="px-4 py-2 text-right font-bold uppercase">DAYS</th>
            </tr>
            <tr className="bg-fuchsia-900/30">
              <th className="px-4 py-2"></th>
              {stayDurations.map(days => (
                <th key={days} className="px-4 py-2 text-center font-bold">{days}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mealTypes.map((meal, index) => (
              <tr key={meal} className={index % 2 === 0 ? "bg-fuchsia-900/10" : "bg-fuchsia-900/20"}>
                <td className="px-4 py-3 font-bold uppercase">{meal}</td>
                {stayDurations.map(days => (
                  <td key={days} className="px-4 py-3 text-center">XX</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold uppercase">{stepTitles[currentStep - 1]}</h2>
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
      
      {/* Top Navigation Controls */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousStep}
          className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
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
            onClick={handleSubmitProperty}
            className="rounded-lg px-4 py-1.5 bg-green-600/80 hover:bg-green-600 text-white text-sm font-medium transition-colors"
          >
            Submit Property
          </button>
        ) : (
          <button
            onClick={goToNextStep}
            className="rounded-lg px-4 py-1.5 bg-fuchsia-600/80 hover:bg-fuchsia-600 text-white text-sm font-medium transition-colors"
          >
            Next
          </button>
        )}
      </div>
      
      {/* Step Content */}
      <div className="mb-8">
        {currentStep === 1 && (
          <div className="space-y-8">
            <BasicInfoStep />
            <LocationStep />
            <PicturesStep />
          </div>
        )}
        {currentStep === 2 && (
          <div className="space-y-8">
            <RoomsAndPricingStep />
          </div>
        )}
        {currentStep === 3 && (
          <div className="space-y-6">
            <HotelFeaturesStep />
          </div>
        )}
        {currentStep === 4 && (
          <div className="space-y-8">
            <ThemesAndActivitiesStep />
          </div>
        )}
        {currentStep === 5 && (
          <div className="space-y-8">
            <h3 className="text-lg font-semibold uppercase mb-4">STAY RATES</h3>
            <div className="bg-fuchsia-900/20 rounded-lg p-4 mb-4">
              <h4 className="font-medium mb-3 uppercase">CURRENCY</h4>
              <div className="flex flex-wrap gap-2">
                {["USD", "EUR", "GBP", "JPY", "CNY"].map(currency => (
                  <button 
                    key={currency}
                    className="py-2 px-3 text-sm border border-fuchsia-500/30 rounded-lg hover:bg-fuchsia-500/20 focus:bg-fuchsia-500/30 focus:border-fuchsia-500/50"
                  >
                    {currency}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Automatic Price Increase Section */}
            <div className="bg-fuchsia-900/20 rounded-lg p-4 mb-4">
              <h4 className="font-medium mb-2 uppercase">AUTOMATIC PRICE INCREASE</h4>
              <p className="text-sm text-foreground/70 mb-3">Set a percentage increase that will automatically apply as rooms get booked</p>
              
              <div className="flex items-center mb-3">
                <input 
                  type="checkbox" 
                  id="enable-price-increase" 
                  className="rounded-sm bg-fuchsia-950/50 border-fuchsia-500/50 text-fuchsia-500 mr-2" 
                />
                <label htmlFor="enable-price-increase" className="text-sm">Enable automatic price increase</label>
              </div>
              
              <div className="flex items-center">
                <span className="text-sm mr-2">Increase percentage:</span>
                <input 
                  type="number" 
                  min="1" 
                  max="100" 
                  className="w-16 text-sm bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-1 text-center" 
                  placeholder="20" 
                />
                <span className="text-sm ml-1">%</span>
              </div>
            </div>
            
            {/* Price Tables */}
            {renderPriceTable("SINGLE ROOM", ["HALF BOARD"], [8, 16, 24, 32])}
            {renderPriceTable("DOUBLE ROOM", ["HALF BOARD", "FULL BOARD"], [8, 16])}
          </div>
        )}
        {currentStep === 6 && <HotelFaqAndTermsStep />}
      </div>
      
      {/* Required Fields Notification */}
      <div className="bg-amber-900/20 border border-amber-500/30 p-3 rounded-lg mb-6 flex items-start">
        <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium uppercase">IMPORTANT</p>
          <p className="text-xs text-foreground/80">All fields marked as required must be completed before proceeding. If you add any new items, your property submission will require administrator approval before being published.</p>
        </div>
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
            onClick={handleSubmitProperty}
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
