import { useState, useEffect } from "react";
import { Check, ChevronDown, X, Search, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Month, 
  allMonths, 
  countries, 
  themeCategories, 
  priceRanges,
  Country,
  Theme,
  durations,
  locationCategories,
  activities,
  mealPlans,
  propertyTypes,
  propertyStyles,
  starRatings,
  hotelFeatures,
  roomFeatures
} from "@/utils/data";
import { Link } from "react-router-dom";

interface FilterSectionProps {
  onFilterChange: (filters: FilterState) => void;
  showSearchButton?: boolean;
  verticalLayout?: boolean;
}

export interface FilterState {
  country: Country | null;
  month: Month | null;
  theme: Theme | null;
  priceRange: number | null;
}

export function FilterSection({ onFilterChange, showSearchButton = true, verticalLayout = false }: FilterSectionProps) {
  const [filters, setFilters] = useState<FilterState>({
    country: null,
    month: null,
    theme: null,
    priceRange: null
  });
  
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  useEffect(() => {
    if (activeDropdown && verticalLayout) {
      setTimeout(() => {
        const dropdown = document.getElementById(`dropdown-${activeDropdown}`);
        if (dropdown) {
          dropdown.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    }
  }, [activeDropdown, verticalLayout]);
  
  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };
  
  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
    if (!verticalLayout) {
      setActiveDropdown(null);
    }
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

  const getBasicFilters = () => (
    <>
      <FilterDropdown 
        label="Country"
        value={filters.country} 
        isOpen={activeDropdown === 'country'}
        onClick={() => toggleDropdown('country')}
        onClear={() => clearFilter('country')}
        vertical={verticalLayout}
      >
        <div className="grid grid-cols-1 gap-1 p-1" id="dropdown-country">
          {countries.map(country => (
            <DropdownItem 
              key={country}
              label={country}
              selected={filters.country === country}
              onClick={() => updateFilter('country', country)}
              vertical={verticalLayout}
            />
          ))}
        </div>
      </FilterDropdown>
      
      <FilterDropdown 
        label="Month" 
        value={filters.month}
        isOpen={activeDropdown === 'month'}
        onClick={() => toggleDropdown('month')}
        onClear={() => clearFilter('month')}
        vertical={verticalLayout}
      >
        <div className="grid grid-cols-2 gap-1 p-1" id="dropdown-month">
          {allMonths.map(month => (
            <DropdownItem 
              key={month}
              label={month}
              selected={filters.month === month}
              onClick={() => updateFilter('month', month)}
              vertical={verticalLayout}
            />
          ))}
        </div>
      </FilterDropdown>
      
      <FilterDropdown 
        label="Theme"
        value={filters.theme?.name}
        isOpen={activeDropdown === 'theme'}
        onClick={() => toggleDropdown('theme')}
        onClear={() => clearFilter('theme')}
        vertical={verticalLayout}
      >
        <div className="max-h-[300px] overflow-y-auto p-1" id="dropdown-theme">
          {themeCategories.map(category => (
            <div key={category.category} className="mb-2">
              <div className={cn(
                "text-xs font-medium mb-1 px-2",
                verticalLayout ? "text-white" : "text-fuchsia-400"
              )}>{category.category}</div>
              <div className="grid grid-cols-1 gap-1">
                {category.themes.map(theme => (
                  <DropdownItem 
                    key={theme.id}
                    label={theme.name}
                    selected={filters.theme?.id === theme.id}
                    onClick={() => updateFilter('theme', theme)}
                    vertical={verticalLayout}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </FilterDropdown>
      
      <FilterDropdown 
        label="Price per Month"
        value={filters.priceRange !== null ? 
          (filters.priceRange > 2000 ? 'Over $2000' : `Up to $${filters.priceRange}`) : null}
        isOpen={activeDropdown === 'price'}
        onClick={() => toggleDropdown('price')}
        onClear={() => clearFilter('priceRange')}
        vertical={verticalLayout}
      >
        <div className="grid grid-cols-1 gap-1 p-1" id="dropdown-price">
          {priceRanges.map(range => (
            <DropdownItem 
              key={range.value}
              label={range.label}
              selected={filters.priceRange === range.value}
              onClick={() => updateFilter('priceRange', range.value)}
              vertical={verticalLayout}
            />
          ))}
        </div>
      </FilterDropdown>
    </>
  );

  const getAdvancedFilters = () => (
    <>
      <FilterDropdown 
        label="Location"
        value={null}
        isOpen={activeDropdown === 'location'}
        onClick={() => toggleDropdown('location')}
        onClear={() => {}}
        vertical={verticalLayout}
      >
        <div className="max-h-[300px] overflow-y-auto p-1" id="dropdown-location">
          {locationCategories.map(location => (
            <div key={location.country} className="mb-2">
              <div className="text-xs font-medium mb-1 px-2 text-white">
                {location.country}
              </div>
              <div className="grid grid-cols-1 gap-1 pl-4">
                {location.cities.map(city => (
                  <DropdownItem 
                    key={`${location.country}-${city}`}
                    label={city}
                    selected={false}
                    onClick={() => {}}
                    vertical={verticalLayout}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </FilterDropdown>

      <FilterDropdown 
        label="Duration of Stay"
        value={null}
        isOpen={activeDropdown === 'duration'}
        onClick={() => toggleDropdown('duration')}
        onClear={() => {}}
        vertical={verticalLayout}
      >
        <div className="grid grid-cols-1 gap-1 p-1" id="dropdown-duration">
          {durations.map(days => (
            <DropdownItem 
              key={days}
              label={`${days} Days`}
              selected={false}
              onClick={() => {}}
              vertical={verticalLayout}
            />
          ))}
        </div>
      </FilterDropdown>

      <FilterDropdown 
        label="Activities"
        value={null}
        isOpen={activeDropdown === 'activities'}
        onClick={() => toggleDropdown('activities')}
        onClear={() => {}}
        vertical={verticalLayout}
      >
        <div className="grid grid-cols-1 gap-1 p-1" id="dropdown-activities">
          {activities.map(activity => (
            <DropdownItem 
              key={activity.id}
              label={activity.name}
              selected={false}
              onClick={() => {}}
              vertical={verticalLayout}
            />
          ))}
        </div>
      </FilterDropdown>

      <FilterDropdown 
        label="Meals"
        value={null}
        isOpen={activeDropdown === 'meals'}
        onClick={() => toggleDropdown('meals')}
        onClear={() => {}}
        vertical={verticalLayout}
      >
        <div className="grid grid-cols-1 gap-1 p-1" id="dropdown-meals">
          {mealPlans.map(meal => (
            <DropdownItem 
              key={meal}
              label={meal}
              selected={false}
              onClick={() => {}}
              vertical={verticalLayout}
            />
          ))}
        </div>
      </FilterDropdown>

      <FilterDropdown 
        label="Property Type"
        value={null}
        isOpen={activeDropdown === 'property-type'}
        onClick={() => toggleDropdown('property-type')}
        onClear={() => {}}
        vertical={verticalLayout}
      >
        <div className="grid grid-cols-1 gap-1 p-1" id="dropdown-property-type">
          {propertyTypes.map(type => (
            <DropdownItem 
              key={type}
              label={type}
              selected={false}
              onClick={() => {}}
              vertical={verticalLayout}
            />
          ))}
        </div>
      </FilterDropdown>

      <FilterDropdown 
        label="Style of Property"
        value={null}
        isOpen={activeDropdown === 'property-style'}
        onClick={() => toggleDropdown('property-style')}
        onClear={() => {}}
        vertical={verticalLayout}
      >
        <div className="grid grid-cols-1 gap-1 p-1" id="dropdown-property-style">
          {propertyStyles.map(style => (
            <DropdownItem 
              key={style}
              label={style}
              selected={false}
              onClick={() => {}}
              vertical={verticalLayout}
            />
          ))}
        </div>
      </FilterDropdown>

      <FilterDropdown 
        label="Stars"
        value={null}
        isOpen={activeDropdown === 'stars'}
        onClick={() => toggleDropdown('stars')}
        onClear={() => {}}
        vertical={verticalLayout}
      >
        <div className="grid grid-cols-1 gap-1 p-1" id="dropdown-stars">
          {starRatings.map(stars => (
            <DropdownItem 
              key={stars}
              label={stars === 0 ? "Not Rated" : `${stars} Star${stars > 1 ? 's' : ''}`}
              selected={false}
              onClick={() => {}}
              vertical={verticalLayout}
            />
          ))}
        </div>
      </FilterDropdown>

      <FilterDropdown 
        label="Hotel Features"
        value={null}
        isOpen={activeDropdown === 'hotel-features'}
        onClick={() => toggleDropdown('hotel-features')}
        onClear={() => {}}
        vertical={verticalLayout}
      >
        <div className="max-h-[300px] overflow-y-auto p-1" id="dropdown-hotel-features">
          {hotelFeatures.map(feature => (
            <DropdownItem 
              key={feature.id}
              label={feature.name}
              selected={false}
              onClick={() => {}}
              vertical={verticalLayout}
            />
          ))}
        </div>
      </FilterDropdown>

      <FilterDropdown 
        label="Room Features"
        value={null}
        isOpen={activeDropdown === 'room-features'}
        onClick={() => toggleDropdown('room-features')}
        onClear={() => {}}
        vertical={verticalLayout}
      >
        <div className="max-h-[300px] overflow-y-auto p-1" id="dropdown-room-features">
          {roomFeatures.map(feature => (
            <DropdownItem 
              key={feature.id}
              label={feature.name}
              selected={false}
              onClick={() => {}}
              vertical={verticalLayout}
            />
          ))}
        </div>
      </FilterDropdown>
    </>
  );
  
  return (
    <div className={cn(
      "w-full overflow-visible filter-dropdown-container",
      verticalLayout ? "bg-transparent backdrop-blur-md p-4 rounded-lg border border-white/20" : "rounded-2xl backdrop-blur-md border border-white/20"
    )}>
      <div className={cn(
        verticalLayout ? "flex flex-col gap-2" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-2"
      )}>
        {verticalLayout && (
          <div className="text-white text-base font-bold mb-2 text-center">Filter By</div>
        )}
        
        {getBasicFilters()}
        
        {verticalLayout && getAdvancedFilters()}
      </div>
      
      {showSearchButton && (
        <div className="mt-2 flex justify-center p-2">
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
            className="py-2 px-6 rounded-none bg-[#9C048B] hover:bg-[#9C048B]/90 text-white text-sm font-medium transition-all duration-300 flex items-center gap-2"
          >
            Search <Search className="w-4 h-4" />
          </Link>
        </div>
      )}
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
  vertical?: boolean;
}

function FilterDropdown({ label, value, isOpen, onClick, onClear, children, vertical = false }: FilterDropdownProps) {
  return (
    <div className="relative">
      <div
        onClick={onClick}
        className={cn(
          "w-full flex items-center justify-between p-2 cursor-pointer text-sm",
          vertical ? 
            "bg-[#07074f] text-white border border-white/40 mb-1" : 
            "bg-[#e6f7fa] text-[#9E0078] border border-[#9E0078]/20",
          isOpen && vertical ? "border-b-0" : ""
        )}
      >
        <div className="flex items-center gap-2 font-medium">
          <span>{label}</span>
          {value && !vertical && (
            <span 
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              className="p-0.5 rounded-full hover:bg-fuchsia-500/10 cursor-pointer"
            >
              <X className="w-3 h-3" />
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {value && <span className="text-xs">{value}</span>}
          {vertical ? 
            (isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />) : 
            <ChevronDown className={cn("w-3 h-3 transition-transform", isOpen ? "rotate-180" : "")} />
          }
        </div>
      </div>
      
      {isOpen && (
        <div className={cn(
          "w-full text-xs",
          vertical ? 
            "border border-t-0 border-white/40 bg-[#07074f] mb-2" : 
            "absolute z-10 mt-1 rounded-lg border border-gray-200 bg-white shadow-lg"
        )}>
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
  vertical?: boolean;
}

function DropdownItem({ label, selected, onClick, vertical = false }: DropdownItemProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "w-full flex items-center px-2 py-1 text-xs transition cursor-pointer",
        selected 
          ? vertical ? "text-white bg-[#9E0078]/50" : "text-white bg-[#9E0078]"
          : vertical ? "text-white/80 hover:bg-[#9E0078]/30" : "text-gray-700 hover:bg-gray-100"
      )}
    >
      <div className="flex items-center gap-2 w-full">
        {vertical && (
          <div className="w-3 h-3 flex items-center justify-center border border-white">
            {selected && <div className="w-1.5 h-1.5 bg-white"></div>}
          </div>
        )}
        <span>{label}</span>
        {!vertical && selected && <Check className="w-3 h-3 ml-auto" />}
      </div>
    </div>
  );
}
