
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
  }>;
  stay_lengths?: number[];
}

interface SearchResultsListProps {
  filteredHotels: Hotel[];
  isLoading: boolean;
  error: Error | null;
}

// Helper function to get the pricing info from hotel's dashboard pricing section
const getHotelPricingInfo = (hotel: Hotel) => {
  console.log(`Processing pricing for hotel: ${hotel.name}`, {
    room_types: hotel.room_types,
    stay_lengths: hotel.stay_lengths
  });

  // Get the longest available stay duration from stay_lengths
  const longestStay = hotel.stay_lengths && hotel.stay_lengths.length > 0 
    ? Math.max(...hotel.stay_lengths)
    : null;

  console.log(`Longest stay for ${hotel.name}:`, longestStay);

  if (!longestStay || !hotel.room_types || hotel.room_types.length === 0) {
    console.log(`No pricing data available for ${hotel.name}`);
    return { stayText: null, priceText: null };
  }

  // Find double rooms and get their prices for the longest stay duration
  const doubleRoomPrices = [];
  
  for (const room of hotel.room_types) {
    // Check if this is a double room
    const isDoubleRoom = room.name && room.name.toLowerCase().includes('double');
    
    if (isDoubleRoom && room.rates) {
      // Get the price for the longest stay duration
      const priceForDuration = room.rates[longestStay.toString()];
      if (priceForDuration && priceForDuration > 0) {
        doubleRoomPrices.push(priceForDuration);
        console.log(`Found double room price for ${hotel.name}, ${longestStay} days:`, priceForDuration);
      }
    }
  }

  // Get the lowest price from double rooms
  let lowestPrice = null;
  if (doubleRoomPrices.length > 0) {
    lowestPrice = Math.min(...doubleRoomPrices);
  }

  console.log(`Final pricing for ${hotel.name}:`, {
    longestStay,
    lowestPrice,
    doubleRoomPrices
  });

  if (!lowestPrice) {
    return { stayText: null, priceText: null };
  }

  const stayText = `${longestStay}-night stay`;
  const priceText = `from ${lowestPrice} p/person`;

  return { stayText, priceText };
};

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredHotels.map((hotel, index) => {
        const { stayText, priceText } = getHotelPricingInfo(hotel);
        
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
                    {stayText && priceText ? (
                      <>
                        <div className="text-purple-900">{stayText}</div>
                        <div className="text-purple-900">{priceText}</div>
                      </>
                    ) : (
                      <div className="text-purple-900">Price unavailable</div>
                    )}
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
