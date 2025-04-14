
import { ReactNode } from "react";
import { Theme } from "@/utils/themes";

export interface FilterState {
  country?: string | null;
  month?: string | null;
  theme?: Theme | null;
  priceRange?: number | { min: number; max: number } | null;
  searchTerm?: string | null;
  minPrice?: number;
  maxPrice?: number;
  stars?: string[];
  location?: string | null;
  propertyType?: string | null; // Added property type field
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
  textColor?: string;
  labelTextSize?: string; // Added the labelTextSize property
}

export interface FilterContainerProps {
  children: ReactNode;
  verticalLayout?: boolean;
  expandedLayout?: boolean;
  compactSpacing?: boolean;
  formWrapperBgColor?: string;
}
