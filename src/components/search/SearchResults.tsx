
import React from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  console.log("🔍 SearchResults component - received hotels:", hotels?.length || 0);

  if (loading) {
    console.log("⏳ SearchResults - showing loading state");
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-white">Loading hotels...</div>
      </div>
    );
  }

  if (error) {
    console.error("❌ SearchResults - showing error state:", error);
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-500">Error loading hotels: {error.message}</div>
      </div>
    );
  }

  if (!hotels || hotels.length === 0) {
    console.warn("⚠️ SearchResults - no hotels to display");
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-white text-center">
          <h3 className="text-xl font-semibold mb-2">No hotels found matching your criteria</h3>
          <p className="text-gray-300">Try adjusting your filters or search terms</p>
        </div>
      </div>
    );
  }

  const handleHotelClick = (hotelId: string) => {
    console.log("🏨 Navigating to hotel:", hotelId);
    navigate(`/hotel/${hotelId}`);
  };

  console.log("✅ SearchResults - rendering", hotels.length, "hotels");

  return (
    <div className="space-y-6">
      <div className="text-white text-lg font-semibold">
        {hotels.length} hotel{hotels.length !== 1 ? 's' : ''} found
      </div>
      {/* Grid with exactly 3 columns for 3 hotels per row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

          console.log("🏨 Rendering hotel card for:", hotel.name);

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
              onClick={() => handleHotelClick(hotel.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
