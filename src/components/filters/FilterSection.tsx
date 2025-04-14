
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
  placeholders = {
    country: "Country",
    month: "Month",
    theme: "Affinity",
    priceRange: "Price per Month"
  },
  availableThemes = [],
  useLargerMobileText = false,
  textColor = "inherit",
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

  const formWrapperBgColor = usePurpleFilterBackground ? 'bg-[#7030A0]/90' : 'bg-[#5A1876]/80';
  const filterBgColor = usePurpleFilterBackground ? 'bg-[#7030A0]' : 'bg-fuchsia-950/50';
  const searchBgColor = usePurpleFilterBackground ? 'bg-[#7030A0]' : 'bg-fuchsia-600';
  const searchHoverBgColor = usePurpleFilterBackground ? 'hover:bg-[#5A1876]' : 'hover:bg-fuchsia-500';
  
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
        filterBgColor={filterBgColor}
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
        labelTextSize={labelTextSize} // Pass the labelTextSize to FilterDropdownList
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
