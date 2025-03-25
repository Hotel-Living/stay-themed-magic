
import { useSearchFilters } from "./context/SearchFiltersContext";
import { FilterSidebar } from "./FilterSidebar";

export function SearchFilters() {
  const { filters, handleFilterChange, handleArrayFilterChange } = useSearchFilters();
  
  return (
    <div className="w-full md:w-1/3 lg:w-1/4">
      <div className="sticky top-20">
        <FilterSidebar 
          activeFilters={{
            ...filters,
            propertyType: null,
            propertyStyle: null,
            roomTypes: [],
            hotelFeatures: [],
            roomFeatures: [],
            meals: [],
            lengthOfStay: null,
            activities: [],
            location: null,
            category: null
          }}
          handleFilterChange={handleFilterChange}
          handleArrayFilterChange={handleArrayFilterChange}
        />
      </div>
    </div>
  );
}
