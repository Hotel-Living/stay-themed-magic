
import React from "react";
import { Loader2 } from "lucide-react";
import { CompareButton } from "@/components/comparison/CompareButton";
import { SearchResultCard } from "./SearchResultCard";
import { NoResultsView } from "./NoResultsView";
import { SkeletonLoader } from "@/components/ui/skeleton-loader";

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
  // Add hotel themes and activities data
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
  // Add country field
  country?: string;
}

interface SearchResultsListProps {
  filteredHotels: Hotel[];
  isLoading: boolean;
  error: Error | null;
}

export const SearchResultsList: React.FC<SearchResultsListProps> = ({
  filteredHotels,
  isLoading,
  error
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SkeletonLoader variant="card" count={6} />
      </div>
    );
  }

  const hasResults = filteredHotels.length > 0;

  return (
    <>
      <NoResultsView 
        isLoading={isLoading} 
        error={error} 
        hasResults={hasResults} 
      />
      
      {hasResults && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {filteredHotels.map((hotel) => (
            <SearchResultCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
      
      {/* Add the floating compare button */}
      <CompareButton />
    </>
  );
};
