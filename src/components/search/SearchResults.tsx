
import React from "react";
import { SearchResultsList } from "./SearchResultsList";

interface Hotel {
  id: string;
  name: string;
  location: string;
  price_per_month: number;
  thumbnail?: string;
  theme?: string;
  room_types?: Array<{
    baseRate?: number;
    basePrice?: number;
    rates?: Record<string, number>;
    name?: string;
  }>;
  stay_lengths?: number[];
  rates?: Record<string, number>;
  pricingmatrix?: Array<{
    roomType: string;
    stayLength: string;
    mealPlan: string;
    price: number;
  }>;
  pricingMatrix?: Array<{
    roomType: string;
    stayLength: string;
    mealPlan: string;
    price: number;
  }>;
  hotel_themes?: Array<{
    themes?: {
      name: string;
    };
  }>;
  hotel_activities?: Array<{
    activities?: {
      name: string;
    };
  }>;
  country?: string;
}

interface SearchResultsProps {
  hotels: Hotel[];
  loading: boolean;
  error: Error | null;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  hotels,
  loading,
  error
}) => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          {hotels.length} hotels found
        </h2>
      </div>
      
      <SearchResultsList 
        filteredHotels={hotels}
        isLoading={loading}
        error={error}
      />
    </div>
  );
};
