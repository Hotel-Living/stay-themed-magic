
import React, { useState } from "react";
import { HotelDetailProps } from "@/types/hotel";
import { useToast } from "@/hooks/use-toast";
import { HotelHeader } from "./HotelHeader";
import { HotelImageGallery } from "./HotelImageGallery";
import { HotelBookingSection } from "./HotelBookingSection";
import { HotelFeaturesInfo } from "./HotelFeaturesInfo";
import { HotelLocation } from "./HotelLocation";
import { HotelSkeletonLoader } from "./HotelSkeletonLoader";
import { cn } from "@/lib/utils";

export interface HotelDetailContentProps {
  hotel: HotelDetailProps;
  isLoading?: boolean;
}

export function HotelDetailContent({ hotel, isLoading = false }: HotelDetailContentProps) {
  const { toast } = useToast();
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date());
  const [selectedDuration, setSelectedDuration] = useState<number>(8);
  
  // Default durations
  const stayDurations = hotel.stay_lengths || [8, 16, 24, 32];
  
  // Extract themes from hotel_themes for the header component
  const hotelThemes = hotel.themes || [];
  const hotelActivities = hotel.activities || [];

  console.log("Hotel detail content rendering with:", {
    hotelName: hotel.name,
    imagesCount: hotel.hotel_images?.length || 0,
    stayLengths: hotel.stay_lengths,
    coordinates: `${hotel.latitude}, ${hotel.longitude}`,
    rates: hotel.rates,
    roomTypes: hotel.room_types
  });

  const lowercase = (text: string | null | undefined) => {
    if (!text) return '';
    return text.charAt(0).toLowerCase() + text.slice(1);
  };
  
  const handleAddToFavorites = () => {
    toast({
      title: "Feature in development",
      description: "Adding to favorites will be available soon.",
    });
  };
  
  const handleBookClick = () => {
    toast({
      title: "Feature in development",
      description: "Online booking will be available soon.",
    });
  };
  
  if (isLoading) {
    return <HotelSkeletonLoader />;
  }

  // Get the check-in weekday from the hotel data
  const checkInWeekday = hotel.preferredWeekday || hotel.check_in_weekday || "Monday";

  // Prepare rates data - try multiple sources
  const preparedRates = (() => {
    console.log("Preparing rates from hotel data:", {
      hotelRates: hotel.rates,
      roomTypes: hotel.room_types
    });

    // Start with hotel.rates if available
    if (hotel.rates && typeof hotel.rates === 'object' && Object.keys(hotel.rates).length > 0) {
      console.log("Using hotel.rates:", hotel.rates);
      return hotel.rates;
    }

    // Try to extract rates from room_types
    if (hotel.room_types && hotel.room_types.length > 0) {
      const firstRoomWithRates = hotel.room_types.find(room => room.rates && Object.keys(room.rates).length > 0);
      if (firstRoomWithRates?.rates) {
        console.log("Using rates from first room type:", firstRoomWithRates.rates);
        return firstRoomWithRates.rates;
      }
    }

    // Fallback: create rates from individual price fields if they exist
    const fallbackRates: Record<string, number> = {};
    stayDurations.forEach(duration => {
      const priceKey = `price_${duration}`;
      if (hotel[priceKey] && hotel[priceKey] > 0) {
        fallbackRates[duration.toString()] = hotel[priceKey];
      }
    });

    if (Object.keys(fallbackRates).length > 0) {
      console.log("Using fallback rates from price fields:", fallbackRates);
      return fallbackRates;
    }

    console.log("No rates found, returning empty object");
    return {};
  })();

  // Prepare pricing matrix if available
  const pricingMatrix = hotel.pricingMatrix || (hotel.room_types && hotel.room_types.length > 0 ? 
    hotel.room_types.flatMap(room => 
      stayDurations.map(duration => ({
        roomType: room.name || "Standard",
        stayLength: `${duration} days`,
        mealPlan: "Breakfast only",
        price: room.rates?.[duration] || room.rates?.[duration.toString()] || 0
      })).filter(entry => entry.price > 0)
    ) : []);

  // Format stay lengths for display
  const formatStayLengths = () => {
    if (!stayDurations || stayDurations.length === 0) return "various durations";
    
    if (stayDurations.length === 1) {
      return `${stayDurations[0]} days`;
    }
    
    const sortedLengths = [...stayDurations].sort((a, b) => a - b);
    if (sortedLengths.length === 2) {
      return `${sortedLengths[0]} and ${sortedLengths[1]} days`;
    }
    
    const lastLength = sortedLengths.pop();
    return `${sortedLengths.join(", ")} and ${lastLength} days`;
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#B3B3FF]">
      <div className="container mx-auto px-4 py-8">
        <div className="relative z-10 max-w-5xl mx-auto p-6 rounded-2xl bg-[#761B98] text-white shadow-lg">
          {/* Header */}
          <div className="mb-6">
            <HotelHeader 
              hotel={hotel} 
              handleAddToFavorites={handleAddToFavorites} 
            />
            
            {/* Updated Image Gallery - now inside the container */}
            <HotelImageGallery 
              hotelImages={hotel.hotel_images || []} 
              hotelName={hotel.name} 
            />

            {/* New AT A GLANCE section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white text-left">AT A GLANCE</h2>
              
              {/* Dynamic property description line */}
              <p className="text-white mb-2">
                This {hotel.property_type || "Property"} is {hotel.style || "welcoming"} and offers extended stay options of {formatStayLengths()}.
              </p>
              
              {/* Rephrased lines */}
              <p className="text-white mb-2">
                It's ideal for guests who enjoy {hotel.idealGuests ? lowercase(hotel.idealGuests) : "memorable experiences"}.
              </p>
              
              <p className="text-white mb-2">
                The vibe of this hotel is {hotel.atmosphere ? lowercase(hotel.atmosphere) : "welcoming and comfortable"}.
              </p>
              
              <p className="text-white mb-4">
                Our location is perfect for {hotel.perfectLocation ? lowercase(hotel.perfectLocation) : "exploring the local area and attractions"}.
              </p>
              
              {/* Vertical space and description */}
              {hotel.description && (
                <div className="mt-6">
                  <p className="text-white">
                    {hotel.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Calendar + Price */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2">
              {/* Features */}
              <HotelFeaturesInfo
                hotelFeatures={hotel.hotelFeatures || []}
                roomFeatures={hotel.roomFeatures || []}
              />
              
              {/* Map */}
              <div className="mt-8">
                <HotelLocation 
                  latitude={Number(hotel.latitude)} 
                  longitude={Number(hotel.longitude)} 
                  hotelName={hotel.name} 
                  address={hotel.address || ""}
                />
              </div>
            </div>

            <HotelBookingSection 
              checkInDate={checkInDate}
              setCheckInDate={setCheckInDate}
              selectedDuration={selectedDuration}
              setSelectedDuration={setSelectedDuration}
              stayDurations={stayDurations}
              rates={preparedRates}
              currency={hotel.currency || "USD"}
              handleBookClick={handleBookClick}
              preferredWeekday={checkInWeekday}
              enablePriceIncrease={hotel.enablePriceIncrease}
              priceIncreaseCap={hotel.priceIncreaseCap}
              availableMonths={hotel.available_months}
              pricingMatrix={pricingMatrix}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
