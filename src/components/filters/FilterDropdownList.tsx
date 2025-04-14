
import React from "react";
import { FilterState } from "./FilterTypes";
import { FilterDropdown } from "./FilterDropdown";
import { renderDropdownOptions } from "./FilterDropdownOptions";

interface FilterDropdownListProps {
  filters: FilterState;
  openDropdown: string | null;
  toggleDropdown: (dropdown: string) => void;
  updateFilter: (key: keyof FilterState, value: any) => void;
  clearFilter: (key: keyof FilterState) => void;
  placeholders: {
    country?: string;
    month?: string;
    theme?: string;
    priceRange?: string;
  };
  filterBgColor: string;
  compactSpacing: boolean;
  useBoldLabels: boolean;
  useLargerMobileText: boolean;
  themeQuery: string;
  setThemeQuery: (query: string) => void;
  useCollapsibleThemes: boolean;
  openThemeCategory: string | null;
  toggleThemeCategory: (category: string) => void;
  textColor: string;
  availableThemes: string[];
  labelTextSize?: string; // Added labelTextSize prop
}

export const FilterDropdownList: React.FC<FilterDropdownListProps> = ({
  filters,
  openDropdown,
  toggleDropdown,
  updateFilter,
  clearFilter,
  placeholders,
  filterBgColor,
  compactSpacing,
  useBoldLabels,
  useLargerMobileText,
  themeQuery,
  setThemeQuery,
  useCollapsibleThemes,
  openThemeCategory,
  toggleThemeCategory,
  textColor,
  availableThemes,
  labelTextSize = "text-sm" // Added default value
}) => {
  return (
    <>
      <FilterDropdown
        type="country"
        label={placeholders.country || "Country"}
        value={filters.country}
        options={availableThemes} // This is intentional, the options are passed to renderOptions
        onChange={(key, value) => updateFilter(key as keyof FilterState, value)}
        onClear={clearFilter}
        isOpen={openDropdown === "country"}
        toggleOpen={toggleDropdown}
        filterBgColor={filterBgColor}
        compactSpacing={compactSpacing}
        useBoldLabels={useBoldLabels}
        useLargerMobileText={useLargerMobileText}
        renderOptions={renderDropdownOptions}
        textColor={textColor}
        labelTextSize={labelTextSize} // Pass labelTextSize to FilterDropdown
      />
      
      <FilterDropdown
        type="month"
        label={placeholders.month || "Month"}
        value={filters.month}
        options={availableThemes} // This is intentional, the options are passed to renderOptions
        onChange={(key, value) => updateFilter(key as keyof FilterState, value)}
        onClear={clearFilter}
        isOpen={openDropdown === "month"}
        toggleOpen={toggleDropdown}
        filterBgColor={filterBgColor}
        compactSpacing={compactSpacing}
        useBoldLabels={useBoldLabels}
        useLargerMobileText={useLargerMobileText}
        renderOptions={renderDropdownOptions}
        textColor={textColor}
        labelTextSize={labelTextSize} // Pass labelTextSize to FilterDropdown
      />
      
      <FilterDropdown
        type="theme"
        label={placeholders.theme || "Affinity"}
        value={filters.theme}
        options={availableThemes}
        onChange={(key, value) => updateFilter(key as keyof FilterState, value)}
        onClear={clearFilter}
        isOpen={openDropdown === "theme"}
        toggleOpen={toggleDropdown}
        filterBgColor={filterBgColor}
        compactSpacing={compactSpacing}
        useBoldLabels={useBoldLabels}
        useLargerMobileText={useLargerMobileText}
        renderOptions={(type) => renderDropdownOptions(type as keyof FilterState, {
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
        labelTextSize={labelTextSize} // Pass labelTextSize to FilterDropdown
      />
      
      <FilterDropdown
        type="priceRange"
        label={placeholders.priceRange || "Price per Month"}
        value={filters.priceRange}
        options={availableThemes} // This is intentional, the options are passed to renderOptions
        onChange={(key, value) => updateFilter(key as keyof FilterState, value)}
        onClear={clearFilter}
        isOpen={openDropdown === "priceRange"}
        toggleOpen={toggleDropdown}
        filterBgColor={filterBgColor}
        compactSpacing={compactSpacing}
        useBoldLabels={useBoldLabels}
        useLargerMobileText={useLargerMobileText}
        renderOptions={renderDropdownOptions}
        textColor={textColor}
        labelTextSize={labelTextSize} // Pass labelTextSize to FilterDropdown
      />
    </>
  );
};
