
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

// Helper function to get the longest available stay and lowest total price for double room
const getStayInfo = (hotel: Hotel) => {
  // Get the longest available stay length (default to 32 if none specified)
  const longestStay = hotel.stay_lengths && hotel.stay_lengths.length > 0 
    ? Math.max(...hotel.stay_lengths)
    : 32;

  // Get pricing using the corrected logic
  const displayRates = (hotel: Hotel): { longestStay: number; lowestTotalPrice: number } => {
    if (!hotel?.room_types || hotel.room_types.length === 0) {
      return { longestStay, lowestTotalPrice: 990 }; // fallback
    }

    // Filter only double rooms - using 'name' field instead of 'room_type'
    const doubleRooms = hotel.room_types.filter(rt =>
      rt.name?.toLowerCase().includes("double")
    );

    if (doubleRooms.length === 0) {
      return { longestStay, lowestTotalPrice: 990 }; // fallback
    }

    // Get all available stay durations with valid rates
    const validDurations = ["8", "16", "24", "32"];
    const availableDurations = validDurations.filter(duration =>
      doubleRooms.some(room => room.rates && room.rates[duration])
    );

    if (availableDurations.length === 0) {
      return { longestStay, lowestTotalPrice: 990 }; // fallback
    }

    // Select the longest duration
    const selectedStay = availableDurations.sort((a, b) => Number(b) - Number(a))[0];

    // Find the lowest price among double rooms for that duration
    const prices = doubleRooms
      .map(room => room.rates?.[selectedStay])
      .filter(Boolean) as number[];

    if (prices.length === 0) {
      return { longestStay, lowestTotalPrice: 990 }; // fallback
    }

    const lowestPrice = Math.min(...prices);
    return { longestStay: Number(selectedStay), lowestTotalPrice: lowestPrice };
  };

  return displayRates(hotel);
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
        const { longestStay, lowestTotalPrice } = getStayInfo(hotel);
        
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
                    <div className="text-purple-900">
                      {longestStay}-night stay
                    </div>
                    <div className="text-purple-900">
                      from {lowestTotalPrice} p/person
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
