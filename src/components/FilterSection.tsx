
import { useState } from "react";
import { Check, ChevronDown, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Month, 
  allMonths, 
  countries, 
  themeCategories, 
  priceRanges,
  Country,
  Theme
} from "@/utils/data";
import { Link } from "react-router-dom";

interface FilterSectionProps {
  onFilterChange: (filters: FilterState) => void;
  showSearchButton?: boolean;
}

export interface FilterState {
  country: Country | null;
  month: Month | null;
  theme: Theme | null;
  priceRange: number | null;
}

export function FilterSection({ onFilterChange, showSearchButton = true }: FilterSectionProps) {
  const [filters, setFilters] = useState<FilterState>({
    country: null,
    month: null,
    theme: null,
    priceRange: null
  });
  
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };
  
  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
    setActiveDropdown(null);
  };
  
  const clearFilter = (key: keyof FilterState) => {
    const newFilters = { ...filters, [key]: null };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const clearAllFilters = () => {
    const newFilters = {
      country: null,
      month: null,
      theme: null,
      priceRange: null
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const hasActiveFilters = Object.values(filters).some(filter => filter !== null);
  
  return (
    <div className="w-full glass-card rounded-2xl overflow-hidden animate-fade-in">
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <h2 className="text-xl font-bold text-gradient">Find your perfect thematic stay</h2>
          
          {hasActiveFilters && (
            <button 
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-sm text-fuchsia-400 hover:text-fuchsia-300 transition"
            >
              <X className="w-4 h-4" />
              Clear all filters
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Country Filter */}
          <FilterDropdown 
            label="Country"
            value={filters.country} 
            isOpen={activeDropdown === 'country'}
            onClick={() => toggleDropdown('country')}
            onClear={() => clearFilter('country')}
          >
            <div className="grid grid-cols-1 gap-1 p-1">
              {countries.map(country => (
                <DropdownItem 
                  key={country}
                  label={country}
                  selected={filters.country === country}
                  onClick={() => updateFilter('country', country)}
                />
              ))}
            </div>
          </FilterDropdown>
          
          {/* Month Filter */}
          <FilterDropdown 
            label="Month" 
            value={filters.month}
            isOpen={activeDropdown === 'month'}
            onClick={() => toggleDropdown('month')}
            onClear={() => clearFilter('month')}
          >
            <div className="grid grid-cols-2 gap-1 p-1">
              {allMonths.map(month => (
                <DropdownItem 
                  key={month}
                  label={month}
                  selected={filters.month === month}
                  onClick={() => updateFilter('month', month)}
                />
              ))}
            </div>
          </FilterDropdown>
          
          {/* Theme Filter */}
          <FilterDropdown 
            label="Theme"
            value={filters.theme?.name}
            isOpen={activeDropdown === 'theme'}
            onClick={() => toggleDropdown('theme')}
            onClear={() => clearFilter('theme')}
          >
            <div className="max-h-[300px] overflow-y-auto p-1">
              {themeCategories.map(category => (
                <div key={category.category} className="mb-2">
                  <div className="text-sm font-medium text-fuchsia-400 mb-1 px-2">{category.category}</div>
                  <div className="grid grid-cols-1 gap-1">
                    {category.themes.map(theme => (
                      <DropdownItem 
                        key={theme.id}
                        label={theme.name}
                        selected={filters.theme?.id === theme.id}
                        onClick={() => updateFilter('theme', theme)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FilterDropdown>
          
          {/* Price Filter */}
          <FilterDropdown 
            label="Price per Month"
            value={filters.priceRange !== null ? 
              (filters.priceRange > 2000 ? 'Over $2000' : `Up to $${filters.priceRange}`) : null}
            isOpen={activeDropdown === 'price'}
            onClick={() => toggleDropdown('price')}
            onClear={() => clearFilter('priceRange')}
          >
            <div className="grid grid-cols-1 gap-1 p-1">
              {priceRanges.map(range => (
                <DropdownItem 
                  key={range.value}
                  label={range.label}
                  selected={filters.priceRange === range.value}
                  onClick={() => updateFilter('priceRange', range.value)}
                />
              ))}
            </div>
          </FilterDropdown>
        </div>
        
        {showSearchButton && (
          <div className="mt-4 flex justify-center">
            <Link
              to={{
                pathname: "/search",
                search: new URLSearchParams({
                  country: filters.country || "",
                  month: filters.month || "",
                  theme: filters.theme ? String(filters.theme.id) : "",
                  price: filters.priceRange ? String(filters.priceRange) : ""
                }).toString()
              }}
              className="py-3 px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-medium transition-all duration-300 flex items-center gap-2"
            >
              Search <Search className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

interface FilterDropdownProps {
  label: string;
  value: string | null;
  isOpen: boolean;
  onClick: () => void;
  onClear: () => void;
  children: React.ReactNode;
}

function FilterDropdown({ label, value, isOpen, onClick, onClear, children }: FilterDropdownProps) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "w-full flex items-center justify-between rounded-lg border p-3 transition-all text-lg",
          isOpen 
            ? "border-fuchsia-500 bg-fuchsia-500/10" 
            : "border-border hover:border-fuchsia-500/50 hover:bg-fuchsia-500/5",
          value ? "text-foreground" : "text-muted-foreground"
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium uppercase tracking-wide text-fuchsia-400">{label}</span>
          {value && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              className="p-0.5 rounded-full hover:bg-fuchsia-500/10"
            >
              <X className="w-3 h-3 text-fuchsia-300" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">{value || "Any"}</span>
          <ChevronDown className={cn(
            "w-4 h-4 transition-transform", 
            isOpen ? "rotate-180" : ""
          )} />
        </div>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 rounded-lg border border-border bg-card/95 backdrop-blur-xl shadow-lg animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}

interface DropdownItemProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

function DropdownItem({ label, selected, onClick }: DropdownItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between rounded px-3 py-1.5 text-base transition",
        selected 
          ? "bg-fuchsia-500/20 text-fuchsia-200" 
          : "hover:bg-fuchsia-500/10 text-foreground/80 hover:text-foreground"
      )}
    >
      {label}
      {selected && <Check className="w-4 h-4 text-fuchsia-400" />}
    </button>
  );
}
