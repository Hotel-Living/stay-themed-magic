
import React from "react";
import { HotelCard } from "@/components/HotelCard";

interface Hotel {
  id: string;
  name: string;
  location: string;
  city?: string;
  country?: string;
  price_per_month: number;
  thumbnail?: string;
  theme?: string;
  category?: number;
  hotel_images?: Array<{ image_url: string, is_main?: boolean }>;
  themes?: Array<{ id: string; name: string }>;
  availableMonths?: string[];
  rates?: Record<string, number>;
  hotel_themes?: Array<{ themes?: { name: string } }>;
  hotel_activities?: Array<{ activities?: { name: string } }>;
  meal_plans?: string[];
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
        {hotels.map((hotel) => {
          // Extract city and country from location if they don't exist separately
          const locationParts = hotel.location?.split(', ') || [];
          const city = hotel.city || locationParts[0] || '';
          const country = hotel.country || locationParts[1] || '';
          
          // Get main image
          const mainImage = hotel.hotel_images?.find(img => img.is_main)?.image_url || 
                           hotel.hotel_images?.[0]?.image_url || 
                           hotel.thumbnail || 
                           "/placeholder.svg";

          // Convert themes format
          const themes = hotel.hotel_themes?.map(ht => ({
            id: ht.themes?.name || '',
            name: ht.themes?.name || ''
          })) || hotel.themes || [];

          return (
            <HotelCard
              key={hotel.id}
              id={hotel.id}
              name={hotel.name}
              city={city}
              country={country}
              stars={hotel.category || 0}
              pricePerMonth={hotel.price_per_month}
              themes={themes}
              image={mainImage}
              availableMonths={hotel.availableMonths}
              rates={hotel.rates}
              hotel_themes={hotel.hotel_themes}
              hotel_activities={hotel.hotel_activities}
              meal_plans={hotel.meal_plans}
              location={hotel.location}
              thumbnail={hotel.thumbnail}
            />
          );
        })}
      </div>
    </div>
  );
}
