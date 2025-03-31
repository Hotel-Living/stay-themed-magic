
import { ReactNode } from "react";
import { Theme } from "@/utils/themes";

export interface FilterState {
  country?: string | null;
  month?: string | null;
  theme?: Theme | null;
  priceRange?: number | { min: number; max: number } | null;
  themes?: string[];
  amenities?: string[];
  rating?: number;
  // Add missing properties from the errors
  searchTerm?: string;
  minPrice?: number;
  maxPrice?: number;
  stars?: string[];
}

export interface FilterSectionProps {
  onFilterChange: (filters: FilterState) => void;
  showSearchButton?: boolean;
  verticalLayout?: boolean;
  useCollapsibleThemes?: boolean;
  expandedLayout?: boolean;
  compactSpacing?: boolean;
  useBoldLabels?: boolean;
  usePurpleFilterBackground?: boolean;
  fullHeightDropdowns?: boolean;
  placeholders?: {
    country?: string;
    month?: string;
    theme?: string;
    priceRange?: string;
  };
  availableThemes?: string[];
}

export interface FilterContainerProps {
  children: ReactNode;
  verticalLayout?: boolean;
  expandedLayout?: boolean;
  compactSpacing?: boolean;
  formWrapperBgColor?: string;
}

export interface FilterButtonProps {
  hasActiveFilters: boolean;
  onClearAllFilters: () => void;
  onSearch: () => void;
  searchBgColor?: string;
  searchHoverBgColor?: string;
}

// Add any additional types needed for the filters
