
import { Theme } from "@/utils/data";

export type CountryType = string;
export type MonthType = string;
export type ThemeType = string | Theme;
export type PriceRangeType = string | number;

export interface FilterState {
  country: CountryType | null;
  month: MonthType | null;
  theme: ThemeType | null;
  priceRange: PriceRangeType | null;
}

export type FilterKey = keyof FilterState;
export type DropdownType = FilterKey | null;

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
  availableThemes?: Theme[];
}

export interface FilterDropdownProps {
  label: string;
  value: any;
  placeholder: string;
  isOpen: boolean;
  toggleDropdown: () => void;
  clearFilter: () => void;
  filterBgColor: string;
  compactSpacing: boolean;
  useBoldLabels: boolean;
  dropdownRef?: React.RefObject<HTMLDivElement>;
  children?: React.ReactNode;
}
