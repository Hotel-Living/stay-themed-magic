
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FilterState, FilterSectionProps } from "./FilterTypes";
import { FilterDropdown } from "./FilterDropdown";
import { FilterButton } from "./FilterButton";
import { FilterContainer } from "./FilterContainer";
import { availableCountries, months, priceRanges } from "./FilterUtils";
import { renderDropdownOptions } from "./FilterDropdownOptions";

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
  availableThemes = [],
  useLargerMobileText = false,
  textColor = "inherit"
}: FilterSectionProps) => {
  const [filters, setFilters] = useState<FilterState>({
    themes: [],
    amenities: [],
    country: null,
    month: null,
    theme: null,
    priceRange: null
  });
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [themeQuery, setThemeQuery] = useState("");
  const [openThemeCategory, setOpenThemeCategory] = useState<string | null>(null);
  
  const navigate = useNavigate();
  
  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };
  
  const toggleThemeCategory = (category: string) => {
    setOpenThemeCategory(openThemeCategory === category ? null : category);
  };
  
  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
    setOpenDropdown(null);
  };
  
  const clearFilter = (key: keyof FilterState) => {
    const newFilters = { ...filters, [key]: null };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const clearAllFilters = () => {
    const clearedFilters = {
      country: null,
      month: null,
      theme: null,
      priceRange: null,
      themes: [],
      amenities: []
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };
  
  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (filters.country) params.append("country", filters.country);
    if (filters.month) params.append("month", filters.month);
    if (filters.theme) params.append("theme", filters.theme.id);
    if (typeof filters.priceRange === 'number') params.append("price", filters.priceRange.toString());
    
    navigate(`/search?${params.toString()}`);
  };
  
  const hasActiveFilters = () => {
    return filters.country !== null || filters.month !== null || filters.theme !== null || filters.priceRange !== null;
  };

  const formWrapperBgColor = usePurpleFilterBackground ? 'bg-[#981DA1]/90' : 'bg-[#5A1876]/80';
  const filterBgColor = usePurpleFilterBackground ? 'bg-[#981DA1]' : 'bg-fuchsia-950/50';
  const searchBgColor = usePurpleFilterBackground ? 'bg-[#981DA1]' : 'bg-fuchsia-600';
  const searchHoverBgColor = usePurpleFilterBackground ? 'hover:bg-[#460F54]' : 'hover:bg-fuchsia-500';
  
  return (
    <FilterContainer
      verticalLayout={verticalLayout}
      expandedLayout={expandedLayout}
      compactSpacing={compactSpacing}
      formWrapperBgColor={formWrapperBgColor}
    >
      <FilterDropdown
        type="country"
        label={placeholders.country || "Country"}
        value={filters.country}
        options={availableCountries}
        onChange={updateFilter}
        onClear={clearFilter}
        isOpen={openDropdown === "country"}
        toggleOpen={toggleDropdown}
        filterBgColor={filterBgColor}
        compactSpacing={compactSpacing}
        useBoldLabels={useBoldLabels}
        useLargerMobileText={useLargerMobileText}
        renderOptions={renderDropdownOptions}
        textColor={textColor}
      />
      
      <FilterDropdown
        type="month"
        label={placeholders.month || "Month"}
        value={filters.month}
        options={months}
        onChange={updateFilter}
        onClear={clearFilter}
        isOpen={openDropdown === "month"}
        toggleOpen={toggleDropdown}
        filterBgColor={filterBgColor}
        compactSpacing={compactSpacing}
        useBoldLabels={useBoldLabels}
        useLargerMobileText={useLargerMobileText}
        renderOptions={renderDropdownOptions}
        textColor={textColor}
      />
      
      <FilterDropdown
        type="theme"
        label={placeholders.theme || "Theme"}
        value={filters.theme}
        options={availableThemes}
        onChange={updateFilter}
        onClear={clearFilter}
        isOpen={openDropdown === "theme"}
        toggleOpen={toggleDropdown}
        filterBgColor={filterBgColor}
        compactSpacing={compactSpacing}
        useBoldLabels={useBoldLabels}
        useLargerMobileText={useLargerMobileText}
        renderOptions={(type) => renderDropdownOptions(type, {
          filters,
          updateFilter,
          themeQuery,
          setThemeQuery,
          useCollapsibleThemes,
          openThemeCategory,
          toggleThemeCategory,
          useLargerMobileText
        })}
        textColor={textColor}
      />
      
      <FilterDropdown
        type="priceRange"
        label={placeholders.priceRange || "Price per Month"}
        value={filters.priceRange}
        options={priceRanges}
        onChange={updateFilter}
        onClear={clearFilter}
        isOpen={openDropdown === "priceRange"}
        toggleOpen={toggleDropdown}
        filterBgColor={filterBgColor}
        compactSpacing={compactSpacing}
        useBoldLabels={useBoldLabels}
        useLargerMobileText={useLargerMobileText}
        renderOptions={renderDropdownOptions}
        textColor={textColor}
      />
      
      {(showSearchButton || verticalLayout) && (
        <div className={`${verticalLayout ? "mt-3" : compactSpacing ? "mt-1" : "mt-2"} w-full`}>
          <FilterButton
            hasActiveFilters={hasActiveFilters()}
            onClearAllFilters={clearAllFilters}
            onSearch={handleSearch}
            searchBgColor={searchBgColor}
            searchHoverBgColor={searchHoverBgColor}
          />
        </div>
      )}
    </FilterContainer>
  );
};
