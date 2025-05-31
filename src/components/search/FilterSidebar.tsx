import { PriceRangeFilter } from "./PriceRangeFilter";
import { LengthOfStayFilter } from "./LengthOfStayFilter";
import { MonthFilter } from "./MonthFilter";
import { ThemeFilter } from "./ThemeFilter";
import { CategoryFilter } from "./CategoryFilter";
import { CountryFilter } from "./CountryFilter";
import { LocationFilter } from "./LocationFilter";
import { CheckboxFilter } from "./CheckboxFilter";
import { PropertyTypeFilter } from "./PropertyTypeFilter";
import { PropertyStyleFilter } from "./PropertyStyleFilter";
import { ActivityFilter } from "./ActivityFilter";
import { Theme } from "@/utils/themes";
import { hotelFeatures, roomFeatures } from "@/components/dashboard/PropertySteps/features/featuresData";
import { Button } from "@/components/ui/button";
import { ExpertFilters } from "./ExpertFilters";
import { useExpertMode } from "@/hooks/useExpertMode";

interface FilterSidebarProps {
  activeFilters: {
    country: string | null;
    month: string | null;
    theme: Theme | null;
    priceRange: number | null;
    propertyType: string | null;
    propertyStyle: string | null;
    roomTypes: string[];
    hotelFeatures: string[];
    roomFeatures: string[];
    meals: string[]; // Keep as 'meals' for backward compatibility with FilterSidebar
    lengthOfStay: string | null;
    activities: string[];
    location: string | null;
    category: string | null;
    stayLengths?: number[];
    mealPlans?: string[];
    atmosphere?: string | null;
    fiveAffinityMatches?: boolean;
    next60DaysOnly?: boolean;
    bestValueSort?: boolean;
  };
  handleFilterChange: (filterType: string, value: any) => void;
  handleArrayFilterChange: (filterType: string, value: string, isChecked: boolean) => void;
  onResetAllFilters: () => void;
}

export function FilterSidebar({
  activeFilters,
  handleFilterChange,
  handleArrayFilterChange,
  onResetAllFilters
}: FilterSidebarProps) {
  const { isExpert } = useExpertMode();
  
  // Room types
  const roomTypes = ["Single", "Double", "Suite", "Studio", "Penthouse", "Family Room"];

  // Updated meal options to match exactly with the database
  const mealOptions = ["Breakfast Included", "Half Board", "Full Board", "All Inclusive", "Laundry", "External Laundry Service Available"];

  // Handle meal filter changes with proper mapping to mealPlans
  const handleMealFilterChange = (value: string, isChecked: boolean) => {
    // Map to mealPlans for the backend query
    handleArrayFilterChange("mealPlans", value, isChecked);
  };

  return (
    <div className="glass-card rounded-xl p-4 space-y-3 py-[14px] px-[14px] bg-[#8e069b]">
      {/* Reset All Filters Button - Top */}
      <Button onClick={onResetAllFilters} variant="outline" className="w-full mb-4 text-[#6213ba] bg-[#fcdefd] rounded-full">
        Reset All Filters
      </Button>

      {/* Expert Filters - Only show for expert users */}
      {isExpert && (
        <ExpertFilters 
          activeFilters={{
            fiveAffinityMatches: activeFilters.fiveAffinityMatches,
            next60DaysOnly: activeFilters.next60DaysOnly,
            bestValueSort: activeFilters.bestValueSort
          }}
          onFilterChange={handleFilterChange}
        />
      )}

      <ThemeFilter activeTheme={activeFilters.theme} onChange={value => handleFilterChange("theme", value)} />
      
      <ActivityFilter activeActivities={activeFilters.activities || []} onChange={(value, isChecked) => handleArrayFilterChange("activities", value, isChecked)} />
      
      <LengthOfStayFilter activeLength={activeFilters.lengthOfStay} onChange={value => handleFilterChange("lengthOfStay", value)} />
      
      <PriceRangeFilter activePrice={activeFilters.priceRange} onChange={value => handleFilterChange("priceRange", value)} />
      
      <MonthFilter activeMonth={activeFilters.month} onChange={value => handleFilterChange("month", value)} />
      
      <CheckboxFilter 
        title="MEALS" 
        options={mealOptions} 
        selectedOptions={activeFilters.mealPlans || activeFilters.meals || []} 
        onChange={handleMealFilterChange} 
      />
      
      <PropertyStyleFilter activePropertyStyle={activeFilters.propertyStyle} onChange={value => handleFilterChange("propertyStyle", value)} />
      
      <CategoryFilter activeCategory={activeFilters.category} onChange={value => handleFilterChange("category", value)} />
      
      <CountryFilter activeCountry={activeFilters.country} onChange={value => handleFilterChange("country", value)} />
      
      <LocationFilter activeLocation={activeFilters.location} onChange={value => handleFilterChange("location", value)} />
      
      <PropertyTypeFilter activePropertyType={activeFilters.propertyType} onChange={value => handleFilterChange("propertyType", value)} />
      
      <CheckboxFilter title="ROOM TYPES" options={roomTypes} selectedOptions={activeFilters.roomTypes} onChange={(value, isChecked) => handleArrayFilterChange("roomTypes", value, isChecked)} />
      
      <CheckboxFilter title="HOTEL FEATURES" options={hotelFeatures} selectedOptions={activeFilters.hotelFeatures} onChange={(value, isChecked) => handleArrayFilterChange("hotelFeatures", value, isChecked)} />
      
      <CheckboxFilter title="ROOM FEATURES" options={roomFeatures} selectedOptions={activeFilters.roomFeatures} onChange={(value, isChecked) => handleArrayFilterChange("roomFeatures", value, isChecked)} />

      {/* Reset All Filters Button - Bottom */}
      <Button onClick={onResetAllFilters} variant="outline" className="w-full mt-4 text-purple-700 bg-[#fae7fb] rounded-3xl">
        Reset All Filters
      </Button>
    </div>
  );
}
