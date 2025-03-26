
import { FilterState, FilterSectionProps } from "./FilterTypes";
import { CountryDropdown } from "./CountryDropdown";
import { MonthDropdown } from "./MonthDropdown";
import { ThemeDropdown } from "./ThemeDropdown";
import { PriceDropdown } from "./PriceDropdown";
import { FilterActions } from "./FilterActions";
import { useFilterState } from "@/hooks/useFilterState";
import { Theme } from "@/utils/data";

export const FilterSection = ({ 
  onFilterChange, 
  showSearchButton = false, 
  verticalLayout = false,
  useCollapsibleThemes = false,
  expandedLayout = false,
  compactSpacing = false,
  useBoldLabels = false,
  usePurpleFilterBackground = false,
  placeholders = {
    country: "Country",
    month: "Month",
    theme: "Theme",
    priceRange: "Price per Month"
  },
  availableThemes = []
}: FilterSectionProps) => {
  const {
    filters,
    openDropdown,
    countryRef,
    monthRef,
    themeRef,
    priceRef,
    toggleDropdown,
    updateFilter,
    clearFilter,
    clearAllFilters,
    handleSearch,
    hasActiveFilters
  } = useFilterState({ onFilterChange });

  // Color settings based on props
  const formWrapperBgColor = usePurpleFilterBackground ? 'bg-[#9C23A5]/80' : 'bg-[#5A1876]/80';
  const filterBgColor = usePurpleFilterBackground ? 'bg-[#5A1876]/90' : 'bg-fuchsia-950/50';
  const searchBgColor = usePurpleFilterBackground ? 'bg-[#5A1876]' : 'bg-fuchsia-600';
  const searchHoverBgColor = usePurpleFilterBackground ? 'hover:bg-[#4a1166]' : 'hover:bg-fuchsia-500';
  
  return (
    <div className={`glass-card filter-dropdown-container rounded-xl ${compactSpacing ? 'p-3 md:p-4' : 'p-4 md:p-5'} ${formWrapperBgColor}`}>
      <div className={`flex ${verticalLayout ? "flex-col space-y-3" : expandedLayout ? "flex-row gap-3 w-full" : "flex-wrap gap-3"} ${compactSpacing ? 'gap-2' : ''}`}>
        {/* Country Dropdown */}
        <CountryDropdown
          value={filters.country}
          placeholder={placeholders.country || "Country"}
          isOpen={openDropdown === "country"}
          toggleDropdown={() => toggleDropdown("country")}
          clearFilter={() => clearFilter("country")}
          filterBgColor={filterBgColor}
          compactSpacing={compactSpacing}
          useBoldLabels={useBoldLabels}
          onSelect={(value) => updateFilter("country", value)}
          countryRef={countryRef}
        />
        
        {/* Month Dropdown */}
        <MonthDropdown
          value={filters.month}
          placeholder={placeholders.month || "Month"}
          isOpen={openDropdown === "month"}
          toggleDropdown={() => toggleDropdown("month")}
          clearFilter={() => clearFilter("month")}
          filterBgColor={filterBgColor}
          compactSpacing={compactSpacing}
          useBoldLabels={useBoldLabels}
          onSelect={(value) => updateFilter("month", value)}
          monthRef={monthRef}
        />
        
        {/* Theme Dropdown */}
        <ThemeDropdown
          value={filters.theme}
          placeholder={placeholders.theme || "Theme"}
          isOpen={openDropdown === "theme"}
          toggleDropdown={() => toggleDropdown("theme")}
          clearFilter={() => clearFilter("theme")}
          filterBgColor={filterBgColor}
          compactSpacing={compactSpacing}
          useBoldLabels={useBoldLabels}
          onSelect={(value) => {
            // Extract the ID if it's a Theme object, otherwise use the value directly
            const themeValue = typeof value === 'object' && value !== null && 'id' in value
              ? value.id 
              : value as string;
            updateFilter("theme", themeValue);
          }}
          themeRef={themeRef}
          useCollapsibleThemes={useCollapsibleThemes}
        />
        
        {/* Price Dropdown */}
        <PriceDropdown
          value={filters.priceRange}
          placeholder={placeholders.priceRange || "Price per Month"}
          isOpen={openDropdown === "price"}
          toggleDropdown={() => toggleDropdown("price")}
          clearFilter={() => clearFilter("priceRange")}
          filterBgColor={filterBgColor}
          compactSpacing={compactSpacing}
          useBoldLabels={useBoldLabels}
          onSelect={(value) => updateFilter("priceRange", value)}
          priceRef={priceRef}
        />
      </div>
      
      {/* Show search button if needed */}
      {(showSearchButton || verticalLayout) && (
        <FilterActions
          hasActiveFilters={hasActiveFilters()}
          clearAllFilters={clearAllFilters}
          handleSearch={handleSearch}
          verticalLayout={verticalLayout}
          compactSpacing={compactSpacing}
          searchBgColor={searchBgColor}
          searchHoverBgColor={searchHoverBgColor}
        />
      )}
    </div>
  );
};
