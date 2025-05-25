
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

  // Helper function to get stay info for each individual hotel
  const getHotelDisplayInfo = (hotel: Hotel) => {
    console.log("Processing hotel:", hotel.name, "with room_types:", hotel.room_types);
    
    if (!hotel?.room_types || hotel.room_types.length === 0) {
      console.log("No room_types found for hotel:", hotel.name);
      // Fallback to basic hotel data if room_types are not available
      return { 
        stayText: "32-night stay", 
        priceText: `from ${hotel.price_per_month || 990} p/person` 
      };
    }

    const durations = ["32", "24", "16", "8"];

    for (const duration of durations) {
      console.log(`Checking duration ${duration} for hotel ${hotel.name}`);
      
      // Filter for double rooms using multiple possible field names
      const doubleRooms = hotel.room_types.filter(rt => {
        const isDouble = rt.room_type?.toLowerCase().includes("double") || 
                        rt.name?.toLowerCase().includes("double") ||
                        rt.room_type?.toLowerCase().includes("shared");
        console.log("Room:", rt, "isDouble:", isDouble);
        return isDouble;
      });

      console.log(`Found ${doubleRooms.length} double rooms for duration ${duration}`);

      if (doubleRooms.length === 0) continue;

      // Get prices for this duration
      const prices = doubleRooms
        .map(rt => {
          const rate = rt.rates?.[duration];
          console.log(`Room rates for duration ${duration}:`, rt.rates, "rate:", rate);
          return rate;
        })
        .filter(rate => typeof rate === "number" && rate > 0);

      console.log(`Valid prices found for duration ${duration}:`, prices);

      if (prices.length > 0) {
        const lowest = Math.min(...prices);
        console.log(`Lowest price for ${hotel.name}: ${lowest}`);
        return {
          stayText: `${duration}-night stay`,
          priceText: `from ${lowest} p/person`
        };
      }
    }

    console.log("No valid pricing found, using fallback for hotel:", hotel.name);
    // Fallback if no room_types pricing is found
    return { 
      stayText: "32-night stay", 
      priceText: `from ${hotel.price_per_month || 990} p/person` 
    };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredHotels.map((hotel, index) => {
        const { stayText, priceText } = getHotelDisplayInfo(hotel);
        
        console.log(`Hotel ${hotel.name} display info:`, { stayText, priceText });
        
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
