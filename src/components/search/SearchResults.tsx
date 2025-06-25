
import React from "react";
import { HotelCard } from "@/components/HotelCard";

interface Hotel {
  id: string;
  name: string;
  location: string;
  price_per_month: number;
  thumbnail?: string;
  theme?: string;
  category?: number;
  hotel_images?: Array<{ image_url: string, is_main?: boolean }>;
}

interface SearchResultsProps {
  hotels: Hotel[];
  loading: boolean;
  error: Error | null;
}

export function SearchResults({ hotels, loading, error }: SearchResultsProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-white">Loading hotels...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-500">Error loading hotels: {error.message}</div>
      </div>
    );
  }

  if (!hotels || hotels.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-white">No hotels found matching your criteria.</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-white text-lg font-semibold">
        {hotels.length} hotel{hotels.length !== 1 ? 's' : ''} found
      </div>
      <div className="grid gap-6">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}
