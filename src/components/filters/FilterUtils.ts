
import { Theme, allThemes } from "@/utils/themes";
import { FilterState } from "./FilterTypes";

// Month options
export const months = [
  "january", "february", "march", "april", 
  "may", "june", "july", "august", 
  "september", "october", "november", "december"
];

// Country options
export const availableCountries = [
  { value: "us", label: "United States" },
  { value: "es", label: "Spain" },
  { value: "fr", label: "France" },
  { value: "it", label: "Italy" },
  { value: "de", label: "Germany" },
  { value: "gb", label: "United Kingdom" },
  { value: "jp", label: "Japan" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
  { value: "br", label: "Brazil" },
  { value: "cn", label: "China" },
  { value: "au", label: "Australia" },
  { value: "nz", label: "New Zealand" }
];

// Price range options
export const priceRanges = [
  { value: 500, label: "Under $500" },
  { value: 1000, label: "$500 - $1,000" },
  { value: 1500, label: "$1,000 - $1,500" },
  { value: 2000, label: "$1,500 - $2,000" },
  { value: 2500, label: "$2,000 - $2,500" },
  { value: 3000, label: "$2,500 - $3,000" },
  { value: 3500, label: "$3,000 - $3,500" },
  { value: 4000, label: "$3,500 - $4,000" },
  { value: 4500, label: "$4,000 - $4,500" },
  { value: 5000, label: "$4,500 - $5,000" },
  { value: 10000, label: "$5,000+" }
];

// Create default filter state
export const createDefaultFilters = (): FilterState => ({
  searchTerm: '',
  theme: null,
  country: null,
  month: null,
  minPrice: 0,
  maxPrice: 1000,
  stars: [],
  themes: [],
  amenities: [],
  priceRange: null
});

// Update filter state
export const updateFiltersState = (
  currentFilters: FilterState,
  newFilters: Partial<FilterState>
): FilterState => {
  return { ...currentFilters, ...newFilters };
};

// Filter themes by search query
export const filterThemesByQuery = (query: string): Theme[] => {
  if (!query.trim()) {
    return allThemes;
  }
  
  const lowercaseQuery = query.toLowerCase();
  return allThemes.filter(theme => 
    theme.name.toLowerCase().includes(lowercaseQuery) || 
    (theme.category && theme.category.toLowerCase().includes(lowercaseQuery))
  );
};
