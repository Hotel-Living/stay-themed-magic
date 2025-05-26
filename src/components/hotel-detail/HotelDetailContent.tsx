import React, { useState } from "react";
import { HotelDetailProps } from "@/types/hotel";
import { useToast } from "@/hooks/use-toast";
import { HotelHeader } from "./HotelHeader";
import { HotelImageGallery } from "./HotelImageGallery";
import { HotelBookingSection } from "./HotelBookingSection";
import { HotelFeaturesInfo } from "./HotelFeaturesInfo";
import { HotelLocation } from "./HotelLocation";
import { HotelSkeletonLoader } from "./HotelSkeletonLoader";
import { HotelStarfield } from "./HotelStarfield";
import { buildPricingMatrix } from "@/utils/buildPricingMatrix";
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
    roomTypes: hotel.room_types,
    availableMonths: hotel.available_months,
    // LOG DYNAMIC PRICING SETTINGS WITH CORRECT FIELD NAMES
    enable_price_increase: hotel.enable_price_increase,
    price_increase_cap: hotel.price_increase_cap
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

  // Enhanced rates preparation with proper parsing of complex rate keys
  const preparedRates = (() => {
    console.log("Preparing rates from hotel data:", {
      hotelRates: hotel.rates,
      roomTypes: hotel.room_types
    });

    // First check if hotel has direct rates
    if (hotel.rates && typeof hotel.rates === 'object' && Object.keys(hotel.rates).length > 0) {
      console.log("Processing hotel.rates:", hotel.rates);
      
      // Parse complex rate keys like "double-8 days-fullBoard": "360"
      const simplifiedRates: Record<string, number> = {};
      
      Object.entries(hotel.rates).forEach(([key, value]) => {
        // Extract duration from keys like "double-8 days-fullBoard" or "single-16 days-fullBoard"
        const durationMatch = key.match(/(\d+)\s*days?/i);
        if (durationMatch) {
          const duration = durationMatch[1];
          const numericValue = typeof value === 'string' ? parseFloat(value) : value;
          
          // If we don't have a rate for this duration yet, or this one is lower, use it
          if (!simplifiedRates[duration] || numericValue < simplifiedRates[duration]) {
            simplifiedRates[duration] = numericValue;
          }
        }
      });
      
      console.log("Simplified rates from complex keys:", simplifiedRates);
      return simplifiedRates;
    }

    // If no direct rates, try to extract from room_types
    if (hotel.room_types && Array.isArray(hotel.room_types) && hotel.room_types.length > 0) {
      for (const room of hotel.room_types) {
        if (room.rates && typeof room.rates === 'object' && Object.keys(room.rates).length > 0) {
          console.log("Using rates from room type:", room.name, room.rates);
          return room.rates;
        }
      }
    }

    console.log("No rates found, returning empty object");
    return {};
  })();

  // Build pricing matrix from hotel data
  const pricingMatrix = (() => {
    console.log("Building pricing matrix from hotel data:", {
      hotelRates: hotel.rates,
      stayLengths: hotel.stay_lengths,
      mealPlans: hotel.meal_plans
    });

    if (!hotel.stay_lengths || !hotel.meal_plans) {
      console.log("Missing required data for pricing matrix");
      return [];
    }

    // Transform meal plans to the required format
    const formattedMealPlans = hotel.meal_plans.map(plan => ({
      id: plan.toLowerCase().replace(/\s+/g, '-'),
      label: plan
    }));

    // Parse hotel-level rates and organize by room type
    const roomTypesWithRates: { [key: string]: { name: string; rates: Record<string, number> } } = {};

    if (hotel.rates && typeof hotel.rates === 'object') {
      Object.entries(hotel.rates).forEach(([key, price]) => {
        // Parse keys like "double-8 days-fullBoard" or "single-16 days-breakfast"
        const parts = key.split('-');
        if (parts.length >= 3) {
          const roomType = parts[0]; // "double", "single", etc.
          const stayLengthMatch = parts[1].match(/(\d+)/); // Extract number from "8 days"
          const mealPlan = parts.slice(2).join('-').replace(/\s*days?\s*/i, ''); // "fullBoard", "breakfast", etc.
          
          if (stayLengthMatch) {
            const stayLength = stayLengthMatch[1];
            const mealPlanFormatted = mealPlan.toLowerCase().replace(/\s+/g, '-');
            
            // Initialize room type if not exists
            if (!roomTypesWithRates[roomType]) {
              roomTypesWithRates[roomType] = {
                name: roomType,
                rates: {}
              };
            }
            
            // Create rate key in format expected by buildPricingMatrix: "stayLength-mealPlan"
            const rateKey = `${stayLength}-${mealPlanFormatted}`;
            roomTypesWithRates[roomType].rates[rateKey] = Number(price);
            
            console.log(`Parsed rate: ${roomType} - ${stayLength} days - ${mealPlanFormatted} = ${price}`);
          }
        }
      });
    }

    // Convert to array format expected by buildPricingMatrix
    const formattedRoomTypes = Object.values(roomTypesWithRates);

    if (formattedRoomTypes.length === 0) {
      console.log("No room types found from hotel rates");
      return [];
    }

    const matrix = buildPricingMatrix({
      roomTypes: formattedRoomTypes,
      stayLengths: hotel.stay_lengths,
      mealPlans: formattedMealPlans
    });

    console.log("Built pricing matrix:", matrix);
    return matrix;
  })();

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

  // Get the correct field values, trying multiple possible field names
  const getIdealGuestsText = () => {
    return hotel.idealGuests || "memorable experiences";
  };

  const getPerfectLocationText = () => {
    return hotel.perfectLocation || "exploring the local area and attractions";
  };

  const getAtmosphereText = () => {
    return hotel.atmosphere || "welcoming and comfortable";
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Enhanced gradient background with #0000A3 blue */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0000A3] via-[#000095] to-[#000087] animate-gradient-x"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-blue-300/10"></div>
      
      {/* Add the dynamic starfield effect */}
      <HotelStarfield />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Main content card with enhanced styling */}
        <div className="max-w-5xl mx-auto">
          {/* Header card */}
          <div className="bg-gradient-to-r from-[#7B1C92] via-[#8B1FA3] to-[#7B1C92] rounded-t-2xl p-6 shadow-2xl border border-white/10">
            <HotelHeader 
              hotel={hotel} 
              handleAddToFavorites={handleAddToFavorites} 
            />
            
            {/* Image gallery with enhanced container */}
            <div className="mt-6 rounded-xl overflow-hidden shadow-inner bg-black/20 backdrop-blur-sm border border-white/10">
              <HotelImageGallery 
                hotelImages={hotel.hotel_images || []} 
                hotelName={hotel.name} 
              />
            </div>

            {/* AT A GLANCE section with premium card styling */}
            <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-purple-800/30 via-fuchsia-800/20 to-purple-900/30 backdrop-blur-sm border border-white/20 shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-white text-left">AT A GLANCE...</h2>
              
              {/* Content with diagonal purple-to-gold animated backgrounds */}
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-gradient-to-br from-[#B400FF]/50 via-[#D032FF]/40 to-[#E5B80B]/30 backdrop-blur-sm border border-white/15 shadow-md bg-size-200 animate-gradient-x" style={{ backgroundSize: '400% 400%', animationDuration: '8s' }}>
                  <p className="text-white">
                    This {hotel.property_type ? hotel.property_type.toLowerCase() : "property"} is {hotel.style || "welcoming"} and offers extended stay options of {formatStayLengths()}.
                  </p>
                </div>
                
                <div className="p-3 rounded-lg bg-gradient-to-br from-[#B400FF]/50 via-[#D032FF]/40 to-[#E5B80B]/30 backdrop-blur-sm border border-white/15 shadow-md bg-size-200 animate-gradient-x" style={{ backgroundSize: '400% 400%', animationDuration: '8s', animationDelay: '0.4s' }}>
                  <p className="text-white">
                    It's ideal for guests who enjoy {lowercase(getIdealGuestsText())}.
                  </p>
                </div>
                
                <div className="p-3 rounded-lg bg-gradient-to-br from-[#B400FF]/50 via-[#D032FF]/40 to-[#E5B80B]/30 backdrop-blur-sm border border-white/15 shadow-md bg-size-200 animate-gradient-x" style={{ backgroundSize: '400% 400%', animationDuration: '8s', animationDelay: '0.8s' }}>
                  <p className="text-white">
                    The vibe of this hotel is {lowercase(getAtmosphereText())}.
                  </p>
                </div>
                
                <div className="p-3 rounded-lg bg-gradient-to-br from-[#B400FF]/50 via-[#D032FF]/40 to-[#E5B80B]/30 backdrop-blur-sm border border-white/15 shadow-md bg-size-200 animate-gradient-x" style={{ backgroundSize: '400% 400%', animationDuration: '8s', animationDelay: '1.2s' }}>
                  <p className="text-white">
                    Our location is perfect for {lowercase(getPerfectLocationText())}.
                  </p>
                </div>
                
                {/* Description with enhanced styling - NOW WITH SAME ANIMATED BACKGROUND */}
                {hotel.description && (
                  <div className="p-3 rounded-lg bg-gradient-to-br from-[#B400FF]/50 via-[#D032FF]/40 to-[#E5B80B]/30 backdrop-blur-sm border border-white/15 shadow-md bg-size-200 animate-gradient-x" style={{ backgroundSize: '400% 400%', animationDuration: '8s', animationDelay: '1.6s' }}>
                    <p className="text-white leading-relaxed">
                      {hotel.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main content grid with enhanced cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {/* Left content area */}
            <div className="md:col-span-2 space-y-6">
              {/* Features card with enhanced styling */}
              <div className="bg-gradient-to-br from-[#7B1C92] via-[#6B1A87] to-[#5A1575] rounded-xl shadow-2xl border border-white/10 overflow-hidden">
                <HotelFeaturesInfo
                  hotelFeatures={hotel.hotelFeatures || []}
                  roomFeatures={hotel.roomFeatures || []}
                />
              </div>
              
              {/* Location card with enhanced styling */}
              <div className="bg-gradient-to-br from-[#7B1C92] via-[#6B1A87] to-[#5A1575] rounded-xl shadow-2xl border border-white/10 overflow-hidden">
                <HotelLocation 
                  latitude={Number(hotel.latitude)} 
                  longitude={Number(hotel.longitude)} 
                  hotelName={hotel.name} 
                  address={hotel.address || ""}
                />
              </div>
            </div>

            {/* Booking section with enhanced styling and CORRECT DYNAMIC PRICING FIELD NAMES */}
            <div className="bg-gradient-to-br from-[#7B1C92] via-[#8B1FA3] to-[#6B1A87] rounded-xl shadow-2xl border border-white/10 p-1">
              <div className="bg-gradient-to-br from-purple-900/40 to-fuchsia-900/30 rounded-lg backdrop-blur-sm border border-white/10">
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
                  enable_price_increase={hotel.enable_price_increase}
                  price_increase_cap={hotel.price_increase_cap}
                  availableMonths={hotel.available_months}
                  pricingMatrix={pricingMatrix}
                  mealPlans={hotel.meal_plans}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtle animated background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-fuchsia-400/5 rounded-full blur-lg animate-pulse delay-500"></div>
    </div>
  );
}
