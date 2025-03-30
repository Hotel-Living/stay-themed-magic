
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Theme } from "@/utils/themes";
import { FilterState, FilterSectionProps } from "./FilterTypes";
import { FilterDropdown } from "./FilterDropdown";
import { ThemeOptions } from "./ThemeOptions";
import { months, availableCountries, priceRanges } from "./FilterUtils";

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
  }
}: FilterSectionProps) => {
  const [filters, setFilters] = useState<FilterState>({
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
      priceRange: null
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };
  
  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (filters.country) params.append("country", filters.country);
    if (filters.month) params.append("month", filters.month);
    if (filters.theme) params.append("theme", filters.theme.id);
    if (filters.priceRange) params.append("price", filters.priceRange.toString());
    
    navigate(`/search?${params.toString()}`);
  };
  
  const hasActiveFilters = () => {
    return filters.country !== null || filters.month !== null || filters.theme !== null || filters.priceRange !== null;
  };

  const formWrapperBgColor = usePurpleFilterBackground ? 'bg-[#9C23A5]/80' : 'bg-[#5A1876]/80';
  const filterBgColor = usePurpleFilterBackground ? 'bg-[#5A1876]/90' : 'bg-fuchsia-950/50';
  const searchBgColor = usePurpleFilterBackground ? 'bg-[#5A1876]' : 'bg-fuchsia-600';
  const searchHoverBgColor = usePurpleFilterBackground ? 'hover:bg-[#4a1166]' : 'hover:bg-fuchsia-500';
  
  // Render dropdown options based on filter type
  const renderDropdownOptions = (type: keyof FilterState) => {
    switch (type) {
      case 'country':
        return availableCountries.map(country => (
          <button
            key={country.value}
            onClick={() => updateFilter("country", country.value)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              filters.country === country.value
                ? "bg-fuchsia-500/20 text-white"
                : "hover:bg-fuchsia-900/40"
            }`}
          >
            {country.label}
          </button>
        ));
        
      case 'month':
        return (
          <div className="grid grid-cols-2">
            {months.map(month => (
              <button
                key={month}
                onClick={() => updateFilter("month", month)}
                className={`text-left px-3 py-2 rounded-md text-sm transition-colors capitalize ${
                  filters.month === month
                    ? "bg-fuchsia-500/20 text-white"
                    : "hover:bg-fuchsia-900/40"
                }`}
              >
                {month}
              </button>
            ))}
          </div>
        );
        
      case 'theme':
        return (
          <ThemeOptions
            themeQuery={themeQuery}
            setThemeQuery={setThemeQuery}
            activeTheme={filters.theme}
            updateFilter={updateFilter}
            useCollapsibleThemes={useCollapsibleThemes}
            openThemeCategory={openThemeCategory}
            toggleThemeCategory={toggleThemeCategory}
          />
        );
        
      case 'priceRange':
        return priceRanges.map(price => (
          <button
            key={price.value}
            onClick={() => updateFilter("priceRange", price.value)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              filters.priceRange === price.value
                ? "bg-fuchsia-500/20 text-white"
                : "hover:bg-fuchsia-900/40"
            }`}
          >
            {price.label}
          </button>
        ));
        
      default:
        return null;
    }
  };
  
  return (
    <div className={`glass-card filter-dropdown-container rounded-xl ${compactSpacing ? 'p-3 md:p-4' : 'p-4 md:p-5'} ${formWrapperBgColor}`}>
      <div className={`flex ${verticalLayout ? "flex-col space-y-3" : expandedLayout ? "flex-row gap-3 w-full" : "flex-wrap gap-3"} ${compactSpacing ? 'gap-2' : ''}`}>
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
          renderOptions={renderDropdownOptions}
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
          renderOptions={renderDropdownOptions}
        />
        
        <FilterDropdown
          type="theme"
          label={placeholders.theme || "Theme"}
          value={filters.theme}
          options={[]}
          onChange={updateFilter}
          onClear={clearFilter}
          isOpen={openDropdown === "theme"}
          toggleOpen={toggleDropdown}
          filterBgColor={filterBgColor}
          compactSpacing={compactSpacing}
          useBoldLabels={useBoldLabels}
          renderOptions={renderDropdownOptions}
        />
        
        <FilterDropdown
          type="priceRange"
          label={placeholders.priceRange || "Price per Month"}
          value={filters.priceRange}
          options={priceRanges}
          onChange={updateFilter}
          onClear={clearFilter}
          isOpen={openDropdown === "price"}
          toggleOpen={toggleDropdown}
          filterBgColor={filterBgColor}
          compactSpacing={compactSpacing}
          useBoldLabels={useBoldLabels}
          renderOptions={renderDropdownOptions}
        />
      </div>
      
      {(showSearchButton || verticalLayout) && (
        <div className={`flex ${verticalLayout ? "mt-4" : compactSpacing ? "mt-2" : "mt-3"} gap-2`}>
          {hasActiveFilters() && (
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 rounded-lg bg-fuchsia-950/50 text-foreground/80 hover:bg-fuchsia-900/30 text-sm transition-colors"
            >
              Clear All
            </button>
          )}
          <button
            onClick={handleSearch}
            className={`flex-1 px-4 py-2 rounded-lg ${searchBgColor} text-white ${searchHoverBgColor} text-sm font-medium transition-colors flex items-center justify-center`}
          >
            <Search className="w-4 h-4 mr-2" /> Search
          </button>
        </div>
      )}
    </div>
  );
};
