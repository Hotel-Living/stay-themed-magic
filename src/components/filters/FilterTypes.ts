
import { Theme } from "@/utils/data";

// Country type for better type safety
export type CountryType = "spain" | "france" | "italy" | "usa" | "egypt" | "turkey" | null;

// Month type for better type safety
export type MonthType = "january" | "february" | "march" | "april" | "may" | "june" | 
                       "july" | "august" | "september" | "october" | "november" | "december" | null;

// Define the structure of filter state
export interface FilterState {
  country: CountryType;
  month: MonthType;
  theme: Theme | null;
  priceRange: number | null;
}

// Base interface for filter dropdowns
export interface BaseFilterProps {
  placeholder: string;
  isOpen: boolean;
  toggleDropdown: () => void;
  clearFilter: () => void;
  filterBgColor: string;
  compactSpacing?: boolean;
  useBoldLabels?: boolean;
}

// Props interface for the FilterDropdown component
export interface FilterDropdownProps extends BaseFilterProps {
  label: string;
  value: any;
}

// Props interface for the FilterSection component
export interface FilterSectionProps {
  onFilterChange: (filters: FilterState) => void;
  showSearchButton?: boolean;
  verticalLayout?: boolean;
  useCollapsibleThemes?: boolean;
  expandedLayout?: boolean;
  compactSpacing?: boolean;
  useBoldLabels?: boolean;
  usePurpleFilterBackground?: boolean;
  placeholders?: {
    country?: string;
    month?: string;
    theme?: string;
    priceRange?: string;
  };
  availableThemes?: string[];
}
