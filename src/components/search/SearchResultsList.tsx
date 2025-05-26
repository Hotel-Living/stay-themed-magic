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
}

interface SearchResultsListProps {
  filteredHotels: Hotel[];
  isLoading: boolean;
  error: Error | null;
}

// Helper function to get the pricing info from hotel's dashboard pricing section
const getHotelPricingInfo = (hotel: Hotel) => {
  console.log(`Processing pricing for hotel: ${hotel.name}`, {
    pricingMatrix: hotel.pricingMatrix,
    pricingmatrix: hotel.pricingmatrix,
    rates: hotel.rates,
    price_per_month: hotel.price_per_month
  });

  let lowestPrice = null;
  let correspondingStayLength = null;
  const allPriceOptions: Array<{price: number, stayLength: number}> = [];

  // First priority: use pricingMatrix (either camelCase or lowercase version)
  const pricingMatrix = hotel.pricingMatrix || hotel.pricingmatrix;
  if (pricingMatrix && pricingMatrix.length > 0) {
    console.log(`Found pricingMatrix for ${hotel.name}:`, pricingMatrix);
    
    for (const pricing of pricingMatrix) {
      if (pricing.price && pricing.price > 0 && pricing.stayLength) {
        // Extract numeric value from stay length
        const stayLengthMatch = pricing.stayLength.match(/(\d+)/);
        if (stayLengthMatch) {
          const stayLength = parseInt(stayLengthMatch[1]);
          allPriceOptions.push({ price: pricing.price, stayLength });
          console.log(`Found pricing matrix option for ${hotel.name}: ${pricing.price} for ${stayLength} nights`);
        }
      }
    }
  }

  // Second priority: use rates if pricingMatrix is empty or not available
  if (allPriceOptions.length === 0 && hotel.rates && typeof hotel.rates === 'object' && Object.keys(hotel.rates).length > 0) {
    console.log(`Found hotel-level rates for ${hotel.name}:`, hotel.rates);
    
    for (const [key, price] of Object.entries(hotel.rates)) {
      if (price && price > 0) {
        let stayLength = null;
        
        // Handle different key formats:
        // 1. "RoomType-StayLength-MealPlan" format like "double-32 days-breakfast"
        // 2. Simple stay length format like "8", "16", "24", "32"
        if (key.includes('-')) {
          // Split and check each part for stay length
          const parts = key.split('-');
          for (const part of parts) {
            // Look for patterns like "32 days" or just "32"
            const daysMatch = part.match(/(\d+)\s*days?/i);
            const numMatch = part.match(/^(\d+)$/);
            
            if (daysMatch) {
              stayLength = parseInt(daysMatch[1]);
              break;
            } else if (numMatch) {
              stayLength = parseInt(numMatch[1]);
              break;
            }
          }
        } else {
          // Direct stay length format
          const stayLengthMatch = key.match(/(\d+)/);
          if (stayLengthMatch) {
            stayLength = parseInt(stayLengthMatch[1]);
          }
        }
        
        if (stayLength && stayLength > 0) {
          allPriceOptions.push({ price, stayLength });
          console.log(`Found rates option for ${hotel.name}: ${price} for ${stayLength} nights (from key: ${key})`);
        }
      }
    }
  }

  // Third priority: try room_types with rates
  if (allPriceOptions.length === 0 && hotel.room_types && hotel.room_types.length > 0) {
    console.log(`Checking room types for ${hotel.name}`);
    
    for (const room of hotel.room_types) {
      if (room.rates && Object.keys(room.rates).length > 0) {
        for (const [key, price] of Object.entries(room.rates)) {
          if (price && price > 0) {
            let stayLength = null;
            
            if (key.includes('-')) {
              const parts = key.split('-');
              for (const part of parts) {
                const daysMatch = part.match(/(\d+)\s*days?/i);
                const numMatch = part.match(/^(\d+)$/);
                
                if (daysMatch) {
                  stayLength = parseInt(daysMatch[1]);
                  break;
                } else if (numMatch) {
                  stayLength = parseInt(numMatch[1]);
                  break;
                }
              }
            } else {
              const stayLengthMatch = key.match(/(\d+)/);
              if (stayLengthMatch) {
                stayLength = parseInt(stayLengthMatch[1]);
              }
            }
            
            if (stayLength && stayLength > 0) {
              allPriceOptions.push({ price, stayLength });
            }
          }
        }
      }
      
      // Also check basePrice and baseRate as fallbacks
      if (room.basePrice && room.basePrice > 0 && hotel.stay_lengths && hotel.stay_lengths.length > 0) {
        const longestStay = Math.max(...hotel.stay_lengths);
        allPriceOptions.push({ price: room.basePrice, stayLength: longestStay });
      }
      if (room.baseRate && room.baseRate > 0 && hotel.stay_lengths && hotel.stay_lengths.length > 0) {
        const longestStay = Math.max(...hotel.stay_lengths);
        allPriceOptions.push({ price: room.baseRate, stayLength: longestStay });
      }
    }
  }

  // Fallback: use price_per_month if available
  if (allPriceOptions.length === 0 && hotel.price_per_month && hotel.price_per_month > 0) {
    console.log(`Using price_per_month fallback for ${hotel.name}: ${hotel.price_per_month}`);
    // Assume monthly price corresponds to approximately 30 nights
    allPriceOptions.push({ price: hotel.price_per_month, stayLength: 30 });
  }

  // Find the option with the lowest price
  if (allPriceOptions.length > 0) {
    const cheapestOption = allPriceOptions.reduce((prev, current) => 
      current.price < prev.price ? current : prev
    );
    
    lowestPrice = cheapestOption.price;
    correspondingStayLength = cheapestOption.stayLength;
    
    console.log(`Final pricing for ${hotel.name}:`, {
      lowestPrice,
      correspondingStayLength,
      allOptions: allPriceOptions
    });
  } else {
    console.log(`No valid pricing found for ${hotel.name}`);
  }

  if (!lowestPrice || lowestPrice <= 0 || !correspondingStayLength) {
    console.log(`No valid pricing found for ${hotel.name}`);
    return { stayText: null, priceText: null };
  }

  const stayText = `${correspondingStayLength} nights`;
  const priceText = `From ${lowestPrice} p/person`;

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
