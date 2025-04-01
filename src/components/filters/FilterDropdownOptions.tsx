
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
      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors hover:bg-[#460F54]`}
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
          className={`text-left px-3 py-2 rounded-md text-sm transition-colors capitalize hover:bg-[#460F54]`}
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

  // Show only main theme categories if !useCollapsibleThemes
  if (!useCollapsibleThemes) {
    const themeCategories = [
      "Art", "Business", "Culture", "Education", "Entertainment", 
      "Food and Drinks", "Health and Wellness", "History", "Hobbies", 
      "Languages", "Lifestyle", "Nature", "Personal Development", 
      "Relationships", "Science and Technology", "Social Impact", "Sports"
    ];
    
    return (
      <div className="grid grid-cols-1">
        {themeCategories.map((category) => (
          <button
            key={category}
            onClick={() => document.dispatchEvent(new CustomEvent('updateFilter', { 
              detail: { key: 'theme', value: { id: category, name: category } } 
            }))}
            className={`text-left px-3 py-2 rounded-md text-sm transition-colors hover:bg-[#460F54]`}
          >
            {category}
          </button>
        ))}
      </div>
    );
  }
  
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
  const pricingOptions = [
    { value: 1000, label: "Up to 1.000 $" },
    { value: 1500, label: "1.000 $ to 1.500 $" },
    { value: 2000, label: "1.500 $ to 2.000 $" },
    { value: 3000, label: "More than 2.000 $" }
  ];
  
  return pricingOptions.map((price) => (
    <button
      key={price.value}
      onClick={() => document.dispatchEvent(new CustomEvent('updateFilter', { 
        detail: { key: type, value: price.value } 
      }))}
      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors hover:bg-[#460F54]`}
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
