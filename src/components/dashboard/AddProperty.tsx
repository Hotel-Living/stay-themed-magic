
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
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
            <div className="pt-4">
              <div className="mb-4">
                <div className="grid grid-cols-7 gap-2">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                    <button 
                      key={day}
                      className="py-2 px-1 text-xs border border-fuchsia-500/30 rounded-lg hover:bg-fuchsia-500/20 focus:bg-fuchsia-500/30 focus:border-fuchsia-500/50"
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold uppercase mb-2">Room Types</h3>
              <div className="bg-fuchsia-900/20 p-4 rounded-lg mb-3">
                <h4 className="font-medium mb-2">Single Room</h4>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="text-xs mb-1 block">Maximum Occupancy</label>
                    <input type="number" min="1" className="w-full text-sm bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-2" placeholder="1" />
                  </div>
                  <div>
                    <label className="text-xs mb-1 block">Room Size (sq ft/m)</label>
                    <input type="number" min="1" className="w-full text-sm bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-2" placeholder="Size" />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="text-xs mb-1 block">Description</label>
                  <textarea className="w-full text-sm bg-fuchsia-950/50 border border-fuchsia-500/30 rounded-lg p-2" rows={2} placeholder="Describe this room type"></textarea>
                </div>
                <div>
                  <label className="text-xs mb-1 block">Upload Images</label>
                  <div className="border-2 border-dashed border-fuchsia-500/30 rounded-lg p-4 text-center">
                    <p className="text-sm text-foreground/60">Drag & drop or click to upload</p>
                  </div>
                </div>
              </div>
              <button className="w-full py-2 text-sm bg-fuchsia-900/30 hover:bg-fuchsia-900/50 border border-fuchsia-500/30 rounded-lg">
                + Add Room Type
              </button>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div className="space-y-6">
            <Collapsible open={hotelFeaturesOpen} onOpenChange={setHotelFeaturesOpen} className="w-full">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-fuchsia-900/30 hover:bg-fuchsia-900/40 rounded-lg text-left">
                <h3 className="text-lg font-semibold">Hotel Features</h3>
                {hotelFeaturesOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4 pb-2">
                <HotelFeaturesStep />
              </CollapsibleContent>
            </Collapsible>
            
            <Collapsible open={roomFeaturesOpen} onOpenChange={setRoomFeaturesOpen} className="w-full">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-fuchsia-900/30 hover:bg-fuchsia-900/40 rounded-lg text-left">
                <h3 className="text-lg font-semibold">Room Features</h3>
                {roomFeaturesOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4 pb-2">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["Private Bathroom", "TV", "Safe", "Mini Fridge", "Air Conditioning", "Heating", "Desk", "Wardrobe", "Iron", "Hairdryer", "Coffee Machine", "Balcony"].map(feature => (
                      <div key={feature} className="flex items-center space-x-2">
                        <input type="checkbox" id={`room-${feature.toLowerCase().replace(/\s/g, '-')}`} className="rounded-sm bg-fuchsia-950/50 border-fuchsia-500/50 text-fuchsia-500" />
                        <label htmlFor={`room-${feature.toLowerCase().replace(/\s/g, '-')}`} className="text-sm">{feature}</label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-2">
                    <button className="text-sm text-fuchsia-400 hover:text-fuchsia-300">
                      + Add New Feature
                    </button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        )}
        {currentStep === 4 && (
          <div className="space-y-8">
            <ThemesAndActivitiesStep />
          </div>
        )}
        {currentStep === 5 && (
          <div className="space-y-8">
            <h3 className="text-lg font-semibold mb-4">Stay Rates</h3>
            <div className="bg-fuchsia-900/20 rounded-lg p-4 mb-4">
              <h4 className="font-medium mb-3">Currency</h4>
              <div className="grid grid-cols-3 gap-3">
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
              <h4 className="font-medium mb-2">Automatic Price Increase</h4>
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
