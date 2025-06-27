
import { ReactNode } from "react";

export interface Theme {
  id: string;
  name: string;
  description?: string;
}

export interface FilterState {
  country?: string;
  location?: string;
  propertyType?: string;
  propertyStyle?: string;
  theme?: Theme;
  activities?: string[];
  stars?: string[];
  priceRange?: number;
  month?: string;
  dayRange?: number;
  mealPlan?: string;
  roomTypes?: string[];
  hotelServices?: string[];
  roomServices?: string[];
  // Legacy properties for backward compatibility
  maxPrice?: number;
  minPrice?: number;
  searchTerm?: string;
  stayLengths?: number;
  hotelFeatures?: string[];
  roomFeatures?: string[];
  mealPlans?: string[];
  atmosphere?: string;
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
  labelTextSize?: string;
  filterBgColor?: string;
}

export interface FilterContainerProps {
  children: ReactNode;
  verticalLayout?: boolean;
  expandedLayout?: boolean;
  compactSpacing?: boolean;
  formWrapperBgColor?: string;
}
