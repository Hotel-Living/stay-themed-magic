
import React from "react";
import { HotelCards } from "./HotelCards";
import { HotelFeatures } from "./HotelFeatures";
import { NoHotelsInCountry } from "./NoHotelsInCountry";
import { FilterState } from "@/components/filters/FilterTypes";

interface Hotel {
  id: string;
  name: string;
  location: string;
  price_per_month: number;
  thumbnail?: string;
  theme?: string;
}

interface HotelResultsGridProps {
  hotels: Hotel[];
  loading: boolean;
  error: Error | null;
  filters?: FilterState;
}

export function HotelResultsGrid({ hotels, loading, error, filters }: HotelResultsGridProps) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-400 mx-auto"></div>
        <p className="text-[#f9d3f6] mt-4">Loading hotels...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">Error loading hotels: {error.message}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Check if country filter is applied and results are empty or few
  const shouldShowNoHotelsMessage = 
    filters?.country && 
    (hotels.length === 0 || hotels.length < 5);

  if (shouldShowNoHotelsMessage) {
    return (
      <div className="space-y-12">
        <NoHotelsInCountry countryName={filters.country} />
        {/* Still show features section */}
        <HotelFeatures />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <HotelCards />
      <HotelFeatures />
    </div>
  );
}
