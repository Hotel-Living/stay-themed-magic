
import { useNavigate } from "react-router-dom";
import { FilterSectionProps } from "./FilterTypes";
import { FilterContainer } from "./FilterContainer";
import { useFilterState } from "./hooks/useFilterState";
import { FilterEventHandler } from "./FilterEventHandler";
import { FilterSearchButton } from "./FilterSearchButton";
import { FilterDropdownList } from "./FilterDropdownList";

export const FilterSection = ({ 
  onFilterChange, 
  showSearchButton = false, 
  verticalLayout = false,
  useCollapsibleThemes = false,
  expandedLayout = false,
  compactSpacing = false,
  useBoldLabels = false,
  usePurpleFilterBackground = false,
  filterBgColor,
  placeholders = {
    country: "Country",
    month: "Month",
    theme: "Affinity",
    priceRange: "Price per Month"
  },
  availableThemes = [],
  useLargerMobileText = false,
  textColor = "#3300B0",
  labelTextSize = "text-sm" // Added default value for labelTextSize
}: FilterSectionProps) => {
  const navigate = useNavigate();
  
  const {
    filters,
    openDropdown,
    themeQuery,
    openThemeCategory,
    setThemeQuery,
    toggleDropdown,
    toggleThemeCategory,
    updateFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters
  } = useFilterState(onFilterChange);
  
  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (filters.country) params.append("country", filters.country);
    if (filters.month) params.append("month", filters.month);
    if (filters.theme && filters.theme.id) params.append("theme", filters.theme.id);
    if (typeof filters.priceRange === 'number') params.append("price", filters.priceRange.toString());
    
    console.log("Search filters applied:", filters);
    
    navigate(`/search?${params.toString()}`);
  };

  const formWrapperBgColor = 'bg-[#AACAFE]';
  const defaultFilterBgColor = 'bg-[#FFFBCC]'; // Default if not provided
  const searchBgColor = 'bg-white';
  const searchHoverBgColor = 'hover:bg-white/90';
  
  // Use the filterBgColor prop if provided, otherwise use the default
  const actualFilterBgColor = filterBgColor || defaultFilterBgColor;
  
  return (
    <FilterContainer
      verticalLayout={verticalLayout}
      expandedLayout={expandedLayout}
      compactSpacing={compactSpacing}
      formWrapperBgColor={formWrapperBgColor}
    >
      <FilterDropdownList 
        filters={filters}
        openDropdown={openDropdown}
        toggleDropdown={toggleDropdown}
        updateFilter={updateFilter}
        clearFilter={clearFilter}
        placeholders={placeholders}
        filterBgColor={actualFilterBgColor}
        compactSpacing={compactSpacing}
        useBoldLabels={useBoldLabels}
        useLargerMobileText={useLargerMobileText}
        themeQuery={themeQuery}
        setThemeQuery={setThemeQuery}
        useCollapsibleThemes={useCollapsibleThemes}
        openThemeCategory={openThemeCategory}
        toggleThemeCategory={toggleThemeCategory}
        textColor={textColor}
        availableThemes={availableThemes}
        labelTextSize={labelTextSize}
      />
      
      <FilterSearchButton 
        hasActiveFilters={hasActiveFilters()}
        onClearAllFilters={clearAllFilters}
        onSearch={handleSearch}
        showSearchButton={showSearchButton}
        verticalLayout={verticalLayout}
        compactSpacing={compactSpacing}
        searchBgColor={searchBgColor}
        searchHoverBgColor={searchHoverBgColor}
      />
      
      <FilterEventHandler updateFilter={updateFilter} />
    </FilterContainer>
  );
};
