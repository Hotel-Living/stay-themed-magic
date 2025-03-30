
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
import { Theme } from "@/utils/themes";

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
    meals: string[];
    lengthOfStay: string | null;
    activities: string[];
    location: string | null;
    category: string | null;
  };
  handleFilterChange: (filterType: string, value: any) => void;
  handleArrayFilterChange: (filterType: string, value: string, isChecked: boolean) => void;
}

export function FilterSidebar({ 
  activeFilters, 
  handleFilterChange,
  handleArrayFilterChange 
}: FilterSidebarProps) {
  // Room types, hotel features, etc.
  const roomTypes = ["Single", "Double", "Suite", "Studio", "Penthouse", "Family Room"];
  const hotelFeatures = ["Free WiFi", "Parking", "Restaurant", "Pool", "Spa", "Gym", "24/7 Reception", "Room Service"];
  const roomFeatures = ["Air Conditioning", "TV", "Mini Bar", "Balcony", "Sea View", "Mountain View", "Kitchen", "Workspace"];
  const mealOptions = ["Breakfast Included", "Half Board", "Full Board", "All Inclusive", "Self Catering"];

  return (
    <div className="glass-card rounded-xl p-4 space-y-3">
      <PriceRangeFilter 
        activePrice={activeFilters.priceRange}
        onChange={(value) => handleFilterChange("priceRange", value)}
      />
      
      <LengthOfStayFilter 
        activeLength={activeFilters.lengthOfStay}
        onChange={(value) => handleFilterChange("lengthOfStay", value)}
      />
      
      <MonthFilter 
        activeMonth={activeFilters.month}
        onChange={(value) => handleFilterChange("month", value)}
      />
      
      <ThemeFilter 
        activeTheme={activeFilters.theme}
        onChange={(value) => handleFilterChange("theme", value)}
      />
      
      <CategoryFilter 
        activeCategory={activeFilters.category}
        onChange={(value) => handleFilterChange("category", value)}
      />
      
      <CountryFilter 
        activeCountry={activeFilters.country}
        onChange={(value) => handleFilterChange("country", value)}
      />
      
      <LocationFilter 
        activeLocation={activeFilters.location}
        onChange={(value) => handleFilterChange("location", value)}
      />
      
      <CheckboxFilter 
        title="MEALS"
        options={mealOptions}
        selectedOptions={activeFilters.meals}
        onChange={(value, isChecked) => handleArrayFilterChange("meals", value, isChecked)}
      />
      
      <PropertyTypeFilter 
        activePropertyType={activeFilters.propertyType}
        onChange={(value) => handleFilterChange("propertyType", value)}
      />
      
      <PropertyStyleFilter 
        activePropertyStyle={activeFilters.propertyStyle}
        onChange={(value) => handleFilterChange("propertyStyle", value)}
      />
      
      <CheckboxFilter 
        title="ROOM TYPES"
        options={roomTypes}
        selectedOptions={activeFilters.roomTypes}
        onChange={(value, isChecked) => handleArrayFilterChange("roomTypes", value, isChecked)}
      />
      
      <CheckboxFilter 
        title="HOTEL FEATURES"
        options={hotelFeatures}
        selectedOptions={activeFilters.hotelFeatures}
        onChange={(value, isChecked) => handleArrayFilterChange("hotelFeatures", value, isChecked)}
      />
      
      <CheckboxFilter 
        title="ROOM FEATURES"
        options={roomFeatures}
        selectedOptions={activeFilters.roomFeatures}
        onChange={(value, isChecked) => handleArrayFilterChange("roomFeatures", value, isChecked)}
      />
    </div>
  );
}
