
import React from "react";
import BasicInfoStep from "./BasicInfoStep";
import LocationStep from "./LocationStep";
import PicturesStep from "./PicturesStep";
import RoomsAndPricingStep from "./RoomsAndPricingStep";
import ThemesAndActivitiesStep from "./ThemesAndActivitiesStep";
import HotelFeaturesStep from "./HotelFeaturesStep";
import StayRatesStep from "./StayRatesStep";
import HotelFaqAndTermsStep from "./HotelFaqAndTermsStep";

interface StepContentProps {
  currentStep: number;
  renderPriceTable?: (roomType: string, mealTypes: string[], stayDurations: number[]) => React.ReactNode;
}

export default function StepContent({ currentStep, renderPriceTable }: StepContentProps) {
  return (
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
          {renderPriceTable && (
            <>
              {renderPriceTable("SINGLE ROOM", ["HALF BOARD"], [8, 16, 24, 32])}
              {renderPriceTable("DOUBLE ROOM", ["HALF BOARD", "FULL BOARD"], [8, 16])}
            </>
          )}
        </div>
      )}
      {currentStep === 6 && <HotelFaqAndTermsStep />}
    </div>
  );
}
