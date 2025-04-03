
import { Theme } from "@/utils/themes";

// Update FilterState interface to match what's being used
export interface FilterState {
  themes?: string[];
  amenities?: string[];
  priceRange?: { min: number; max: number } | number | null;
  rating?: number;
  searchTerm?: string;
  theme?: Theme | null;
  minPrice?: number;
  maxPrice?: number;
  stars?: number[];
  country?: string | null;
  month?: string | null;
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
  placeholders?: {
    country?: string;
    month?: string;
    theme?: string;
    priceRange?: string;
  };
  availableThemes?: string[];
  useLargerMobileText?: boolean;
}
