
import { Theme } from "@/utils/data";

// Define the structure of filter state
export interface FilterState {
  country: "spain" | "france" | "italy" | "usa" | "egypt" | "turkey" | null;
  month: "january" | "february" | "march" | "april" | "may" | "june" | "july" | "august" | "september" | "october" | "november" | "december" | null;
  theme: Theme | null;
  priceRange: number | null;
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

export interface FilterDropdownProps {
  label: string;
  value: any;
  placeholder: string;
  isOpen: boolean;
  toggleDropdown: () => void;
  clearFilter: () => void;
  filterBgColor: string;
  compactSpacing?: boolean;
  useBoldLabels?: boolean;
}
