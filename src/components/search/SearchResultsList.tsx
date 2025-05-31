
import React from "react";
import { HotelCard } from "@/components/HotelCard";
import { Loader2 } from "lucide-react";

interface SearchResultsListProps {
  filteredHotels: any[];
  isLoading: boolean;
  error: Error | null;
}

export function SearchResultsList({
  filteredHotels,
  isLoading,
  error
}: SearchResultsListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 sm:p-12">
        <Loader2 className="w-6 h-6 animate-spin text-fuchsia-500" />
        <span className="ml-2 text-sm sm:text-base">Loading hotels...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 sm:p-12">
        <p className="text-red-400 text-sm sm:text-base">Error loading hotels: {error.message}</p>
      </div>
    );
  }

  if (!filteredHotels || filteredHotels.length === 0) {
    return (
      <div className="text-center p-8 sm:p-12">
        <p className="text-gray-400 text-sm sm:text-base">No hotels found matching your criteria.</p>
        <p className="text-gray-500 text-xs sm:text-sm mt-2">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
      {filteredHotels.map((hotel) => (
        <HotelCard
          key={hotel.id}
          id={hotel.id}
          name={hotel.name}
          city={hotel.city || ''}
          country={hotel.country || ''}
          stars={5}
          pricePerMonth={hotel.price_per_month}
          themes={hotel.hotel_themes?.map(ht => ({ 
            id: ht.themes?.name || '', 
            name: ht.themes?.name || '' 
          })) || []}
          image={hotel.thumbnail || hotel.hotel_images?.[0]?.image_url || "/placeholder.svg"}
          availableMonths={hotel.available_months || []}
          rates={hotel.rates || {}}
          onClick={() => window.open(`/hotel/${hotel.id}`, '_self')}
          hotel_themes={hotel.hotel_themes}
          hotel_activities={hotel.hotel_activities}
          meal_plans={hotel.meal_plans}
          location={hotel.location}
          thumbnail={hotel.thumbnail}
        />
      ))}
    </div>
  );
}
