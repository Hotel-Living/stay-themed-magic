
import React from "react";
import { FilterState } from "./FilterTypes";
import { ThemeOptions } from "./ThemeOptions";
import { availableCountries, months, priceRanges } from "./FilterUtils";

interface ThemeOptionsProps {
  filters: FilterState;
  updateFilter: (key: keyof FilterState, value: any) => void;
  themeQuery: string;
  setThemeQuery: (query: string) => void;
  useCollapsibleThemes: boolean;
  openThemeCategory: string | null;
  toggleThemeCategory: (category: string) => void;
}

export const renderDropdownOptions = (
  type: keyof FilterState,
  props?: ThemeOptionsProps
) => {
  switch (type) {
    case "country":
      return renderCountryOptions(type);
    case "month":
      return renderMonthOptions(type);
    case "theme":
      if (props) {
        return renderThemeOptions(props);
      }
      return null;
    case "priceRange":
      return renderPriceOptions(type);
    default:
      return null;
  }
};

const renderCountryOptions = (type: keyof FilterState) => {
  return availableCountries.map((country) => (
    <button
      key={country.value}
      onClick={() => document.dispatchEvent(new CustomEvent('updateFilter', { 
        detail: { key: type, value: country.value } 
      }))}
      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors hover:bg-fuchsia-900/40`}
    >
      {country.label}
    </button>
  ));
};

const renderMonthOptions = (type: keyof FilterState) => {
  return (
    <div className="grid grid-cols-2">
      {months.map((month) => (
        <button
          key={month}
          onClick={() => document.dispatchEvent(new CustomEvent('updateFilter', { 
            detail: { key: type, value: month } 
          }))}
          className={`text-left px-3 py-2 rounded-md text-sm transition-colors capitalize hover:bg-fuchsia-900/40`}
        >
          {month}
        </button>
      ))}
    </div>
  );
};

const renderThemeOptions = (props: ThemeOptionsProps) => {
  const { 
    filters, 
    updateFilter, 
    themeQuery, 
    setThemeQuery, 
    useCollapsibleThemes, 
    openThemeCategory, 
    toggleThemeCategory 
  } = props;

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
};

const renderPriceOptions = (type: keyof FilterState) => {
  return priceRanges.map((price) => (
    <button
      key={price.value}
      onClick={() => document.dispatchEvent(new CustomEvent('updateFilter', { 
        detail: { key: type, value: price.value } 
      }))}
      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors hover:bg-fuchsia-900/40`}
    >
      {price.label}
    </button>
  ));
};

// Setup global event handlers for the filter options
document.addEventListener('updateFilter', (e: any) => {
  const customEvent = e as CustomEvent<{ key: keyof FilterState; value: any }>;
  const filterDropdown = document.querySelector('.filter-dropdown-container');
  
  if (filterDropdown) {
    const updateFilterEvent = new CustomEvent('filter:update', { 
      detail: customEvent.detail,
      bubbles: true
    });
    filterDropdown.dispatchEvent(updateFilterEvent);
  }
});
