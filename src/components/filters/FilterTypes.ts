
import { ReactNode } from "react";

export interface Theme {
  id: string;
  name: string;
  description?: string;
  level: 1 | 2 | 3;
}

export interface FilterState {
  country?: string | null;
  location?: string | null;
  propertyType?: string | null;
  propertyStyle?: string | null;
  theme?: Theme | null;
  activities?: string[];
  stars?: string[];
  priceRange?: [number, number];
  month?: string | null;
  dayRange?: number | null;
  mealPlan?: string | null;
  roomTypes?: string[];
  hotelServices?: string[];
  roomServices?: string[];
  category?: string | null;
  lengthOfStay?: number | null;
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
  onFilterChange: (filters: Partial<FilterState>) => void;
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
