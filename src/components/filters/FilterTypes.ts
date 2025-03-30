
// Update FilterState interface to match what's being used
export interface FilterState {
  themes?: string[];
  amenities?: string[];
  priceRange?: { min: number; max: number };
  rating?: number;
  searchTerm?: string;
  theme?: string;
  minPrice?: number;
  maxPrice?: number;
  stars?: number[];
}
