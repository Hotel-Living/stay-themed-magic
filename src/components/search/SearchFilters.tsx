
import { useSearchFilters } from "./context/SearchFiltersContext";
import { FilterSidebar } from "./FilterSidebar";
import { useLanguage } from "@/context/LanguageContext";

export function SearchFilters() {
  const { 
    filters, 
    handleFilterChange, 
    handleArrayFilterChange, 
    handleClearFilters 
  } = useSearchFilters();
  
  const { t } = useLanguage();
  
  return (
    <div className="w-full md:w-1/3 lg:w-1/4">
      <div className="sticky top-20">
        <FilterSidebar 
          activeFilters={filters}
          handleFilterChange={handleFilterChange}
          handleArrayFilterChange={handleArrayFilterChange}
          onClearAll={handleClearFilters}
        />
      </div>
    </div>
  );
}
