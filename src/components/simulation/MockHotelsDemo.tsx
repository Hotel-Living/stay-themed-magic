
import React from "react";
import { HotelCard } from "@/components/HotelCard/HotelCard";
import { FilterState } from "@/components/filters/FilterTypes";
import { mockHotels } from "./MockFilterData";

interface MockHotelsDemoProps {
  activeFilters: FilterState;
}

export function MockHotelsDemo({ activeFilters }: MockHotelsDemoProps) {
  console.log('MockHotelsDemo - Active filters:', activeFilters);
  
  // Apply all filters to hotels
  const filteredHotels = mockHotels.filter(hotel => {
    console.log(`Checking hotel: ${hotel.name}`);
    
    // Country filter
    if (activeFilters.country && hotel.country !== activeFilters.country) {
      console.log(`❌ Country filter failed: ${hotel.country} !== ${activeFilters.country}`);
      return false;
    }
    
    // Location (city) filter
    if (activeFilters.location && hotel.city !== activeFilters.location) {
      console.log(`❌ Location filter failed: ${hotel.city} !== ${activeFilters.location}`);
      return false;
    }
    
    // Theme filter
    if (activeFilters.theme && hotel.theme !== activeFilters.theme.id) {
      console.log(`❌ Theme filter failed: ${hotel.theme} !== ${activeFilters.theme.id}`);
      return false;
    }
    
    // Activities filter
    if (activeFilters.activities && activeFilters.activities.length > 0) {
      const hasMatchingActivity = activeFilters.activities.some(activity => 
        hotel.activities.includes(activity)
      );
      if (!hasMatchingActivity) {
        console.log(`❌ Activities filter failed: ${hotel.activities} doesn't include any of ${activeFilters.activities}`);
        return false;
      }
    }
    
    // Price filter
    if (activeFilters.priceRange) {
      let priceMatches = false;
      switch (activeFilters.priceRange) {
        case 1000:
          priceMatches = hotel.pricePerMonth <= 1000;
          break;
        case 1500:
          priceMatches = hotel.pricePerMonth > 1000 && hotel.pricePerMonth <= 1500;
          break;
        case 2000:
          priceMatches = hotel.pricePerMonth > 1500 && hotel.pricePerMonth <= 2000;
          break;
        case 3000:
          priceMatches = hotel.pricePerMonth > 2000;
          break;
      }
      if (!priceMatches) {
        console.log(`❌ Price filter failed: ${hotel.pricePerMonth} doesn't match range ${activeFilters.priceRange}`);
        return false;
      }
    }
    
    // Month filter
    if (activeFilters.month && !hotel.availableMonths.includes(activeFilters.month)) {
      console.log(`❌ Month filter failed: ${hotel.availableMonths} doesn't include ${activeFilters.month}`);
      return false;
    }
    
    // Day range filter
    if (activeFilters.dayRange && hotel.dayRange !== activeFilters.dayRange) {
      console.log(`❌ Day range filter failed: ${hotel.dayRange} !== ${activeFilters.dayRange}`);
      return false;
    }
    
    // Meal plan filter
    if (activeFilters.mealPlan && hotel.mealPlan !== activeFilters.mealPlan) {
      console.log(`❌ Meal plan filter failed: ${hotel.mealPlan} !== ${activeFilters.mealPlan}`);
      return false;
    }
    
    // Property type filter
    if (activeFilters.propertyType && hotel.propertyType !== activeFilters.propertyType) {
      console.log(`❌ Property type filter failed: ${hotel.propertyType} !== ${activeFilters.propertyType}`);
      return false;
    }
    
    // Property style filter
    if (activeFilters.propertyStyle && hotel.propertyStyle !== activeFilters.propertyStyle) {
      console.log(`❌ Property style filter failed: ${hotel.propertyStyle} !== ${activeFilters.propertyStyle}`);
      return false;
    }
    
    // Category (stars) filter
    if (activeFilters.stars && activeFilters.stars.length > 0) {
      const categoryMatch = activeFilters.stars.some(star => {
        if (star === "5-star") return hotel.category === 5;
        if (star === "4-star") return hotel.category === 4;
        if (star === "3-star") return hotel.category === 3;
        return false;
      });
      if (!categoryMatch) {
        console.log(`❌ Category filter failed: ${hotel.category} stars doesn't match ${activeFilters.stars}`);
        return false;
      }
    }
    
    // Room types filter
    if (activeFilters.roomTypes && activeFilters.roomTypes.length > 0) {
      const hasMatchingRoomType = activeFilters.roomTypes.some(roomType => 
        hotel.roomTypes.includes(roomType)
      );
      if (!hasMatchingRoomType) {
        console.log(`❌ Room types filter failed: ${hotel.roomTypes} doesn't include any of ${activeFilters.roomTypes}`);
        return false;
      }
    }
    
    // Hotel services filter
    if (activeFilters.hotelServices && activeFilters.hotelServices.length > 0) {
      const hasMatchingService = activeFilters.hotelServices.some(service => 
        hotel.hotelServices.includes(service)
      );
      if (!hasMatchingService) {
        console.log(`❌ Hotel services filter failed: ${hotel.hotelServices} doesn't include any of ${activeFilters.hotelServices}`);
        return false;
      }
    }
    
    // Room services filter
    if (activeFilters.roomServices && activeFilters.roomServices.length > 0) {
      const hasMatchingRoomService = activeFilters.roomServices.some(service => 
        hotel.roomServices.includes(service)
      );
      if (!hasMatchingRoomService) {
        console.log(`❌ Room services filter failed: ${hotel.roomServices} doesn't include any of ${activeFilters.roomServices}`);
        return false;
      }
    }
    
    console.log(`✅ Hotel ${hotel.name} passed all filters`);
    return true;
  });

  console.log(`Filtered hotels count: ${filteredHotels.length}`);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          Hotels Found: {filteredHotels.length}
        </h2>
      </div>
      
      {filteredHotels.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-white/70 text-lg">
            No hotels match your current filters.
          </div>
          <div className="text-white/50 text-sm mt-2">
            Try adjusting your search criteria.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              id={hotel.id}
              name={hotel.name}
              location={`${hotel.city}, ${hotel.country}`}
              pricePerMonth={hotel.pricePerMonth}
              mainImageUrl={hotel.mainImageUrl}
              category={hotel.category}
              propertyType={hotel.propertyType}
              propertyStyle={hotel.propertyStyle}
              availableMonths={hotel.availableMonths}
              dayRange={hotel.dayRange}
              mealPlan={hotel.mealPlan}
              roomTypes={hotel.roomTypes}
              hotelServices={hotel.hotelServices}
              roomServices={hotel.roomServices}
              theme={hotel.theme}
              activities={hotel.activities}
            />
          ))}
        </div>
      )}
    </div>
  );
}
