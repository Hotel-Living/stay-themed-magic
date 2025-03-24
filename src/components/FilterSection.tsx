
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Search, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { allThemes, Theme, themeCategories, countries } from "@/utils/data";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

// Define the structure of filter state
export interface FilterState {
  country: "spain" | "france" | "italy" | "usa" | "egypt" | "turkey" | null;
  month: "january" | "february" | "march" | "april" | "may" | "june" | "july" | "august" | "september" | "october" | "november" | "december" | null;
  theme: Theme | null;
  priceRange: number | null;
}

// Props interface for the FilterSection component
interface FilterSectionProps {
  onFilterChange: (filters: FilterState) => void;
  showSearchButton?: boolean;
  verticalLayout?: boolean;
  useCollapsibleThemes?: boolean;
  expandedLayout?: boolean;
  placeholders?: {
    country?: string;
    month?: string;
    theme?: string;
    priceRange?: string;
  };
}

// Main FilterSection component
export const FilterSection = ({ 
  onFilterChange, 
  showSearchButton = false, 
  verticalLayout = false,
  useCollapsibleThemes = false,
  expandedLayout = false,
  placeholders = {
    country: "Country",
    month: "Month",
    theme: "Theme",
    priceRange: "Price per Month"
  }
}: FilterSectionProps) => {
  // Filter states
  const [filters, setFilters] = useState<FilterState>({
    country: null,
    month: null,
    theme: null,
    priceRange: null
  });
  
  // Dropdown open states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Refs for dropdown containers to detect outside clicks
  const countryRef = useRef<HTMLDivElement>(null);
  const monthRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  
  // Theme search query
  const [themeQuery, setThemeQuery] = useState("");
  
  // Open theme category state
  const [openThemeCategory, setOpenThemeCategory] = useState<string | null>(null);
  
  // Navigation hook
  const navigate = useNavigate();
  
  // All available months
  const months = [
    "january", "february", "march", "april", "may", "june", 
    "july", "august", "september", "october", "november", "december"
  ];
  
  // Available countries - updated to include Egypt and Turkey
  const availableCountries = [
    { value: "spain", label: "Spain 🇪🇸" },
    { value: "france", label: "France 🇫🇷" },
    { value: "italy", label: "Italy 🇮🇹" },
    { value: "usa", label: "USA 🇺🇸" },
    { value: "egypt", label: "Egypt 🇪🇬" },
    { value: "turkey", label: "Turkey 🇹🇷" }
  ];
  
  // Updated price ranges
  const priceRanges = [
    { value: 1000, label: "Up to 1.000 $" },
    { value: 1500, label: "1.000 $ to 1.500 $" },
    { value: 2000, label: "1.500 $ to 2.000 $" },
    { value: 3000, label: "More than 2.000 $" }
  ];
  
  // Toggle dropdown visibility
  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };
  
  // Toggle theme category
  const toggleThemeCategory = (category: string) => {
    setOpenThemeCategory(openThemeCategory === category ? null : category);
  };
  
  // Update filters and notify parent component
  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
    setOpenDropdown(null);
  };
  
  // Clear a specific filter
  const clearFilter = (key: keyof FilterState) => {
    const newFilters = { ...filters, [key]: null };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  // Clear all filters
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
  
  // Handle search button click
  const handleSearch = () => {
    // Construct query parameters
    const params = new URLSearchParams();
    
    if (filters.country) params.append("country", filters.country);
    if (filters.month) params.append("month", filters.month);
    if (filters.theme) params.append("theme", filters.theme.id);
    if (filters.priceRange) params.append("price", filters.priceRange.toString());
    
    // Navigate to search page with filters
    navigate(`/search?${params.toString()}`);
  };
  
  // Filter themes based on search query
  const filteredThemes = allThemes.filter(theme => 
    theme.name.toLowerCase().includes(themeQuery.toLowerCase()) ||
    theme.category.toLowerCase().includes(themeQuery.toLowerCase())
  );
  
  // Close dropdowns when clicking outside
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
  
  // Function to determine if any filters are active
  const hasActiveFilters = () => {
    return filters.country !== null || filters.month !== null || filters.theme !== null || filters.priceRange !== null;
  };
  
  return (
    <div className={`glass-card filter-dropdown-container rounded-xl p-4 md:p-5 ${verticalLayout ? "" : "relative z-20"}`}>
      <div className={`flex ${verticalLayout ? "flex-col space-y-3" : expandedLayout ? "flex-row gap-3 w-full" : "flex-wrap gap-3"}`}>
        {/* Country filter */}
        <div 
          ref={countryRef}
          className={`filter-dropdown relative ${verticalLayout ? "w-full" : expandedLayout ? "flex-1" : "flex-1 min-w-[160px]"}`}
        >
          <button
            onClick={() => toggleDropdown("country")}
            className="w-full flex items-center justify-between bg-fuchsia-950/50 rounded-lg p-3 text-sm hover:bg-fuchsia-900/50 transition-colors"
          >
            <div className="flex items-center">
              {filters.country ? (
                <>
                  <span className="truncate mr-2">
                    {availableCountries.find(c => c.value === filters.country)?.label || filters.country}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFilter("country");
                    }}
                    className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <span className="text-foreground/70">{placeholders.country}</span>
              )}
            </div>
            <ChevronDown className={cn("w-4 h-4 transition-transform", openDropdown === "country" ? "rotate-180" : "")} />
          </button>
          
          {openDropdown === "country" && (
            <div className="absolute top-full left-0 right-0 mt-2 p-2 rounded-lg bg-fuchsia-950/95 border border-fuchsia-800/30 shadow-xl backdrop-blur-xl z-10">
              {availableCountries.map((country) => (
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
              ))}
            </div>
          )}
        </div>
        
        {/* Month filter */}
        <div 
          ref={monthRef}
          className={`filter-dropdown relative ${verticalLayout ? "w-full" : expandedLayout ? "flex-1" : "flex-1 min-w-[160px]"}`}
        >
          <button
            onClick={() => toggleDropdown("month")}
            className="w-full flex items-center justify-between bg-fuchsia-950/50 rounded-lg p-3 text-sm hover:bg-fuchsia-900/50 transition-colors"
          >
            <div className="flex items-center">
              {filters.month ? (
                <>
                  <span className="capitalize truncate mr-2">
                    {filters.month}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFilter("month");
                    }}
                    className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <span className="text-foreground/70">{placeholders.month}</span>
              )}
            </div>
            <ChevronDown className={cn("w-4 h-4 transition-transform", openDropdown === "month" ? "rotate-180" : "")} />
          </button>
          
          {openDropdown === "month" && (
            <div className="absolute top-full left-0 right-0 mt-2 p-2 rounded-lg bg-fuchsia-950/95 border border-fuchsia-800/30 shadow-xl backdrop-blur-xl z-10 max-h-60 overflow-y-auto">
              <div className="grid grid-cols-2">
                {months.map((month) => (
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
            </div>
          )}
        </div>
        
        {/* Theme filter */}
        <div 
          ref={themeRef}
          className={`filter-dropdown relative ${verticalLayout ? "w-full" : expandedLayout ? "flex-1" : "flex-1 min-w-[160px]"}`}
        >
          <button
            onClick={() => toggleDropdown("theme")}
            className="w-full flex items-center justify-between bg-fuchsia-950/50 rounded-lg p-3 text-sm hover:bg-fuchsia-900/50 transition-colors"
          >
            <div className="flex items-center">
              {filters.theme ? (
                <>
                  <span className="truncate mr-2">
                    {filters.theme.name}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFilter("theme");
                    }}
                    className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <span className="text-foreground/70">{placeholders.theme}</span>
              )}
            </div>
            <ChevronDown className={cn("w-4 h-4 transition-transform", openDropdown === "theme" ? "rotate-180" : "")} />
          </button>
          
          {openDropdown === "theme" && (
            <div className="absolute top-full left-0 right-0 mt-2 p-2 rounded-lg bg-fuchsia-950/95 border border-fuchsia-800/30 shadow-xl backdrop-blur-xl z-10 max-h-60 overflow-y-auto">
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Search themes..."
                  value={themeQuery}
                  onChange={(e) => setThemeQuery(e.target.value)}
                  className="w-full px-3 py-2 bg-fuchsia-900/30 border border-fuchsia-800/20 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-fuchsia-500/50"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              
              {filteredThemes.length === 0 ? (
                <div className="text-center py-3 text-sm text-foreground/60">
                  No themes found
                </div>
              ) : useCollapsibleThemes ? (
                <div className="space-y-2">
                  {/* Group themes by category with collapsible sections */}
                  {themeCategories.map(category => (
                    <Collapsible key={category.category}>
                      <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-xs uppercase rounded-md hover:bg-fuchsia-900/40">
                        <span>{category.category}</span>
                        <ChevronRight className={`h-4 w-4 transform transition-transform ${openThemeCategory === category.category ? 'rotate-90' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="pt-1 pl-3 space-y-1">
                          {category.themes.map(theme => (
                            <button
                              key={theme.id}
                              onClick={() => updateFilter("theme", theme)}
                              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                                filters.theme?.id === theme.id
                                  ? "bg-fuchsia-500/20 text-white"
                                  : "hover:bg-fuchsia-900/40"
                              }`}
                            >
                              {theme.name}
                            </button>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {/* Group themes by category */}
                  {Array.from(
                    new Set(filteredThemes.map(theme => theme.category))
                  ).map(category => (
                    <div key={category} className="mb-2">
                      <div className="text-xs uppercase text-foreground/60 mb-1 px-3">{category}</div>
                      {filteredThemes
                        .filter(theme => theme.category === category)
                        .map(theme => (
                          <button
                            key={theme.id}
                            onClick={() => updateFilter("theme", theme)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                              filters.theme?.id === theme.id
                                ? "bg-fuchsia-500/20 text-white"
                                : "hover:bg-fuchsia-900/40"
                            }`}
                          >
                            {theme.name}
                          </button>
                        ))
                      }
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Price filter */}
        <div 
          ref={priceRef}
          className={`filter-dropdown relative ${verticalLayout ? "w-full" : expandedLayout ? "flex-1" : "flex-1 min-w-[160px]"}`}
        >
          <button
            onClick={() => toggleDropdown("price")}
            className="w-full flex items-center justify-between bg-fuchsia-950/50 rounded-lg p-3 text-sm hover:bg-fuchsia-900/50 transition-colors"
          >
            <div className="flex items-center">
              {filters.priceRange ? (
                <>
                  <span className="truncate mr-2">
                    {priceRanges.find(p => p.value === filters.priceRange)?.label || `$${filters.priceRange}`}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFilter("priceRange");
                    }}
                    className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <span className="text-foreground/70">{placeholders.priceRange}</span>
              )}
            </div>
            <ChevronDown className={cn("w-4 h-4 transition-transform", openDropdown === "price" ? "rotate-180" : "")} />
          </button>
          
          {openDropdown === "price" && (
            <div className="absolute top-full left-0 right-0 mt-2 p-2 rounded-lg bg-fuchsia-950/95 border border-fuchsia-800/30 shadow-xl backdrop-blur-xl z-10">
              {priceRanges.map((price) => (
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
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Button row - only show if requested or in vertical layout */}
      {(showSearchButton || verticalLayout) && (
        <div className={`flex ${verticalLayout ? "mt-4" : "mt-3"} gap-2`}>
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
            className="flex-1 px-4 py-2 rounded-lg bg-fuchsia-600 text-white hover:bg-fuchsia-500 text-sm font-medium transition-colors flex items-center justify-center"
          >
            <Search className="w-4 h-4 mr-2" /> Search
          </button>
        </div>
      )}
    </div>
  );
};
