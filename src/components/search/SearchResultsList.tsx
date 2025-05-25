
import React from "react";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

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
    room_type?: string;
  }>;
  stay_lengths?: number[];
  rates?: Record<string, number>;
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
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-fuchsia-400 rounded-lg p-8 text-center bg-[#460F54]/50 backdrop-blur-sm">
        <h3 className="text-2xl font-semibold mb-4 text-white">No results. Please, Search Again. Thanks!</h3>
      </div>
    );
  }

  if (filteredHotels.length === 0) {
    return (
      <div className="border border-fuchsia-400 rounded-lg p-8 text-center bg-[#460F54]/50 backdrop-blur-sm">
        <h3 className="text-2xl font-semibold mb-4 text-white">No results. Please, Search Again. Thanks!</h3>
      </div>
    );
  }

  // Helper function to get the correct pricing from hotel's room_types data
  const getHotelDisplayInfo = (hotel: Hotel) => {
    console.log("=== Processing hotel:", hotel.name);
    console.log("Hotel room_types:", hotel.room_types);
    console.log("Hotel rates:", hotel.rates);
    console.log("Hotel stay_lengths:", hotel.stay_lengths);
    
    // If hotel has room_types with rates, use that data
    if (hotel.room_types && hotel.room_types.length > 0) {
      const durations = ["32", "24", "16", "8"];
      
      // Find the longest duration with available pricing
      for (const duration of durations) {
        const roomsWithPricing = hotel.room_types.filter(rt => {
          // Check if this room type has rates for this duration
          return rt.rates && rt.rates[duration] && rt.rates[duration] > 0;
        });
        
        console.log(`Duration ${duration} - rooms with pricing:`, roomsWithPricing);
        
        if (roomsWithPricing.length > 0) {
          // Filter for double/shared rooms first
          const doubleRooms = roomsWithPricing.filter(rt => {
            const roomTypeName = (rt.room_type || rt.name || "").toLowerCase();
            return roomTypeName.includes("double") || roomTypeName.includes("shared");
          });
          
          console.log(`Duration ${duration} - double rooms:`, doubleRooms);
          
          // Use double rooms if available, otherwise use any available room
          const roomsToUse = doubleRooms.length > 0 ? doubleRooms : roomsWithPricing;
          
          // Get the lowest price for this duration
          const prices = roomsToUse.map(rt => rt.rates![duration]).filter(price => price > 0);
          
          if (prices.length > 0) {
            const lowestPrice = Math.min(...prices);
            console.log(`Found price for ${duration} nights: ${lowestPrice}`);
            return {
              stayText: `${duration}-night stay`,
              priceText: `from ${lowestPrice} p/person`
            };
          }
        }
      }
    }
    
    // If hotel has top-level rates, use those
    if (hotel.rates && Object.keys(hotel.rates).length > 0) {
      console.log("Using hotel-level rates:", hotel.rates);
      const durations = ["32", "24", "16", "8"];
      
      for (const duration of durations) {
        const rate = hotel.rates[duration];
        if (typeof rate === "number" && rate > 0) {
          console.log(`Using hotel rate for ${duration} nights: ${rate}`);
          return {
            stayText: `${duration}-night stay`,
            priceText: `from ${rate} p/person`
          };
        }
      }
    }
    
    // If hotel has stay_lengths, use the longest one with price_per_month
    if (hotel.stay_lengths && hotel.stay_lengths.length > 0) {
      const longestStay = Math.max(...hotel.stay_lengths);
      const price = hotel.price_per_month || 990;
      
      console.log(`Using stay_lengths fallback: ${longestStay} nights, price: ${price}`);
      return {
        stayText: `${longestStay}-night stay`,
        priceText: `from ${price} p/person`
      };
    }
    
    // Final fallback using price_per_month
    console.log("Using final fallback with price_per_month:", hotel.price_per_month);
    return {
      stayText: "32-night stay",
      priceText: `from ${hotel.price_per_month || 990} p/person`
    };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredHotels.map((hotel, index) => {
        const { stayText, priceText } = getHotelDisplayInfo(hotel);
        
        console.log(`Final display for ${hotel.name}:`, { stayText, priceText });
        
        return (
          <Link key={hotel.id} to={`/hotel/${hotel.id}`}>
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video bg-muted relative overflow-hidden">
                <img 
                  src={hotel.thumbnail} 
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                {hotel.theme && (
                  <div className="absolute bottom-2 left-2 bg-purple-900 text-white text-xs px-2 py-1 rounded-full">
                    {hotel.theme}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2 text-purple-900 text-center">{hotel.name}</h3>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-purple-900">{hotel.location || "Location unavailable"}</span>
                  <div className="text-right text-sm">
                    <div className="text-purple-900 font-medium">
                      {stayText}
                    </div>
                    <div className="text-purple-900 font-semibold">
                      {priceText}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
