import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { CountryFilter } from "./CountryFilter";
import { MonthFilter } from "./MonthFilter";
import { PriceFilter } from "./PriceFilter";
import { RoomTypesFilter } from "./RoomTypesFilter";
import { HotelFeaturesFilter } from "./HotelFeaturesFilter";
import { RoomFeaturesFilter } from "./RoomFeaturesFilter";
import { MealPlansFilter } from "./MealPlansFilter";
import { NewLengthOfStayFilter } from "./NewLengthOfStayFilter";

interface SecondFilterSidebarProps {
  selectedCountry: string | null;
  onCountryChange: (country: string | null) => void;
  selectedMonth: string | null;
  onMonthChange: (month: string | null) => void;
  selectedPriceRange: string | null;
  onPriceRangeChange: (priceRange: string | null) => void;
  selectedRoomTypes: string[];
  onRoomTypesChange: (roomTypes: string[]) => void;
  selectedHotelFeatures: string[];
  onHotelFeaturesChange: (hotelFeatures: string[]) => void;
  selectedRoomFeatures: string[];
  onRoomFeaturesChange: (roomFeatures: string[]) => void;
  selectedMealPlans: string[];
  onMealPlansChange: (mealPlans: string[]) => void;
  selectedLengthOfStay: string | null;
  onLengthOfStayChange: (value: string | null) => void;
  selectedNewLengthOfStay: string | null;
  onNewLengthOfStayChange: (value: string | null) => void;
  onClearAll: () => void;
}

export function SecondFilterSidebar({ 
  selectedCountry, 
  onCountryChange, 
  selectedMonth, 
  onMonthChange, 
  selectedPriceRange, 
  onPriceRangeChange, 
  selectedRoomTypes, 
  onRoomTypesChange, 
  selectedHotelFeatures, 
  onHotelFeaturesChange, 
  selectedRoomFeatures, 
  onRoomFeaturesChange, 
  selectedMealPlans, 
  onMealPlansChange, 
  selectedLengthOfStay, 
  onLengthOfStayChange, 
  selectedNewLengthOfStay, 
  onNewLengthOfStayChange, 
  onClearAll 
}: SecondFilterSidebarProps) {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-sm bg-gradient-to-br from-fuchsia-950 via-purple-900 to-pink-900 p-4 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-white text-lg font-bold mb-4">{t('filters.all')}</h2>
        
        <div className="space-y-4">
          <CountryFilter 
            selectedCountry={selectedCountry} 
            onChange={onCountryChange} 
          />
          
          <MonthFilter 
            selectedMonth={selectedMonth} 
            onChange={onMonthChange} 
          />
          
          <NewLengthOfStayFilter 
            activeLength={selectedNewLengthOfStay} 
            onChange={onNewLengthOfStayChange} 
          />
          
          <PriceFilter 
            selectedPriceRange={selectedPriceRange} 
            onChange={onPriceRangeChange} 
          />
          
          <RoomTypesFilter 
            selectedRoomTypes={selectedRoomTypes} 
            onChange={onRoomTypesChange} 
          />
          
          <HotelFeaturesFilter 
            selectedHotelFeatures={selectedHotelFeatures} 
            onChange={onHotelFeaturesChange} 
          />
          
          <RoomFeaturesFilter 
            selectedRoomFeatures={selectedRoomFeatures} 
            onChange={onRoomFeaturesChange} 
          />
          
          <MealPlansFilter 
            selectedMealPlans={selectedMealPlans} 
            onChange={onMealPlansChange} 
          />
        </div>
        
        <button 
          onClick={onClearAll}
          className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          {t('filters.clearAll')}
        </button>
      </div>
    </div>
  );
}
