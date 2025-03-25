
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { FilterState, FilterSectionProps } from "./FilterTypes";
import { CountryDropdown } from "./CountryDropdown";
import { MonthDropdown } from "./MonthDropdown";
import { ThemeDropdown } from "./ThemeDropdown";
import { PriceDropdown } from "./PriceDropdown";

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
  const [filters, setFilters] = useState<FilterState>({
    country: null,
    month: null,
    theme: null,
    priceRange: null
  });
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const countryRef = useRef<HTMLDivElement>(null);
  const monthRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  
  const navigate = useNavigate();
  
  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
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
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown === "country" && countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
      if (openDropdown === "month" && monthRef.current && !monthRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
      if (openDropdown === "theme" && themeRef.current && !themeRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
      if (openDropdown === "price" && priceRef.current && !priceRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);
  
  const hasActiveFilters = () => {
    return filters.country !== null || filters.month !== null || filters.theme !== null || filters.priceRange !== null;
  };

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
          onSelect={(value) => updateFilter("theme", value)}
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
