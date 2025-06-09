
import React, { useState } from "react";
import { HotelDetailProps } from "@/types/hotel";
import { useToast } from "@/hooks/use-toast";
import { HotelHeader } from "./HotelHeader";
import { HotelImageGallery } from "../HotelImageGallery";
import { HotelAtAGlanceSection } from "./HotelAtAGlanceSection";
import { HotelMainContentGrid } from "./HotelMainContentGrid";
import { HotelSkeletonLoader } from "../HotelSkeletonLoader";
import { HotelStarfield } from "../HotelStarfield";
import { buildPricingMatrix } from "@/utils/buildPricingMatrix";

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
    return hotel.ideal_guests || "memorable experiences";
  };

  const getPerfectLocationText = () => {
    return hotel.perfect_location || "exploring the local area and attractions";
  };

  const getAtmosphereText = () => {
    return hotel.atmosphere || "welcoming and comfortable";
  };

  // Check if hotel is currently available (simplified logic)
  const isHotelAvailable = hotel.available_months && hotel.available_months.length > 0;

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
            <HotelHeader hotel={hotel} />
            
            {/* Image gallery with enhanced container */}
            <div className="mt-6 rounded-xl overflow-hidden shadow-inner bg-black/20 backdrop-blur-sm border border-white/10">
              <HotelImageGallery 
                hotelImages={hotel.hotel_images || []} 
                hotelName={hotel.name} 
              />
            </div>

            {/* AT A GLANCE section with premium card styling */}
            <HotelAtAGlanceSection
              hotel={hotel}
              formatStayLengths={formatStayLengths}
              getIdealGuestsText={getIdealGuestsText}
              getPerfectLocationText={getPerfectLocationText}
              getAtmosphereText={getAtmosphereText}
              lowercase={lowercase}
            />
          </div>

          {/* Main content grid with enhanced cards */}
          <HotelMainContentGrid
            hotel={hotel}
            checkInDate={checkInDate}
            setCheckInDate={setCheckInDate}
            selectedDuration={selectedDuration}
            setSelectedDuration={setSelectedDuration}
            stayDurations={stayDurations}
            preparedRates={preparedRates}
            handleBookClick={handleBookClick}
            checkInWeekday={checkInWeekday}
            pricingMatrix={pricingMatrix}
            isHotelAvailable={isHotelAvailable}
          />
        </div>
      </div>
      
      {/* Subtle animated background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-fuchsia-400/5 rounded-full blur-lg animate-pulse delay-500"></div>
    </div>
  );
}
