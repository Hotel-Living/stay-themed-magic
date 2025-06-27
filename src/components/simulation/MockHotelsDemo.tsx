
import React from "react";
import { FilterState } from "@/components/filters/FilterTypes";

interface MockHotel {
  id: string;
  name: string;
  city: string;
  country: string;
  price_per_month: number;
  category: number;
  description: string;
  property_type: string;
  property_style: string;
  theme?: { name: string; category: string };
  activities: string[];
  availableMonths: string[];
  dayRange: string;
  mealPlan: string;
  roomTypes: string[];
  hotelServices: string[];
  roomServices: string[];
}

const mockHotels: MockHotel[] = [
  {
    id: "1",
    name: "Hotel Paradise Barcelona",
    city: "Barcelona",
    country: "Spain",
    price_per_month: 1200,
    category: 4,
    description: "Modern hotel in the heart of Barcelona",
    property_type: "Hotel",
    property_style: "Modern",
    theme: { name: "Urban Exploration", category: "LIFESTYLE" },
    activities: ["city-tours", "cultural-visits"],
    availableMonths: ["01", "02", "03", "04"],
    dayRange: "8-days",
    mealPlan: "breakfast-only",
    roomTypes: ["Double Room"],
    hotelServices: ["wifi", "pool"],
    roomServices: ["air-conditioning", "tv"]
  },
  {
    id: "2",
    name: "Beach Resort Valencia",
    city: "Valencia",
    country: "Spain",
    price_per_month: 800,
    category: 3,
    description: "Relaxing beach resort",
    property_type: "Resort",
    property_style: "Classic",
    theme: { name: "Beach & Sun", category: "NATURE" },
    activities: ["beach-activities", "water-sports"],
    availableMonths: ["05", "06", "07", "08"],
    dayRange: "16-days",
    mealPlan: "half-board",
    roomTypes: ["Single Room"],
    hotelServices: ["restaurant", "bar"],
    roomServices: ["balcony", "minibar"]
  },
  {
    id: "3",
    name: "Luxury Hotel Madrid",
    city: "Madrid",
    country: "Spain", 
    price_per_month: 1800,
    category: 5,
    description: "Premium luxury accommodation",
    property_type: "Boutique Hotel",
    property_style: "Luxury",
    theme: { name: "Business & Networking", category: "BUSINESS" },
    activities: ["business-centers", "networking-events"],
    availableMonths: ["01", "09", "10", "11"],
    dayRange: "24-days",
    mealPlan: "full-board",
    roomTypes: ["Double Room", "Single Room"],
    hotelServices: ["spa", "gym"],
    roomServices: ["room-service", "concierge"]
  },
  {
    id: "4",
    name: "Budget Inn Seville",
    city: "Seville",
    country: "Spain",
    price_per_month: 600,
    category: 2,
    description: "Affordable accommodation",
    property_type: "Hotel",
    property_style: "Budget",
    theme: { name: "Cultural Heritage", category: "CULTURE" },
    activities: ["historical-tours", "museums"],
    availableMonths: ["03", "04", "05", "12"],
    dayRange: "32-days",
    mealPlan: "no-meals",
    roomTypes: ["Single Room"],
    hotelServices: ["wifi"],
    roomServices: ["tv"]
  },
  {
    id: "5",
    name: "Historic Hotel Granada",
    city: "Granada", 
    country: "Spain",
    price_per_month: 1400,
    category: 4,
    description: "Historic building converted to hotel",
    property_type: "Hotel",
    property_style: "Historic",
    theme: { name: "Art & Creativity", category: "ART" },
    activities: ["art-galleries", "creative-workshops"],
    availableMonths: ["02", "06", "07", "08"],
    dayRange: "8-days",
    mealPlan: "breakfast-only",
    roomTypes: ["Double Room"],
    hotelServices: ["restaurant", "wifi"],
    roomServices: ["air-conditioning", "room-service"]
  },
  {
    id: "6",
    name: "Eco Resort Mallorca",
    city: "Palma",
    country: "Spain",
    price_per_month: 1600,
    category: 4,
    description: "Sustainable eco-friendly resort",
    property_type: "Resort",
    property_style: "Eco-friendly",
    theme: { name: "Wellness & Health", category: "HEALTH" },
    activities: ["yoga", "meditation"],
    availableMonths: ["01", "04", "09", "10"],
    dayRange: "16-days", 
    mealPlan: "half-board",
    roomTypes: ["Double Room", "Single Room"],
    hotelServices: ["spa", "organic-restaurant"],
    roomServices: ["organic-amenities", "balcony"]
  }
];

interface MockHotelsDemoProps {
  activeFilters: FilterState;
}

export function MockHotelsDemo({ activeFilters }: MockHotelsDemoProps) {
  const filteredHotels = mockHotels.filter(hotel => {
    // Price filter
    if (activeFilters.priceRange) {
      const price = hotel.price_per_month;
      switch (activeFilters.priceRange) {
        case 1000:
          if (price > 1000) return false;
          break;
        case 1500:
          if (price < 1000 || price > 1500) return false;
          break;
        case 2000:
          if (price < 1500 || price > 2000) return false;
          break;
        case 3000:
          if (price <= 2000) return false;
          break;
      }
    }

    // Country filter
    if (activeFilters.country && hotel.country !== activeFilters.country) {
      return false;
    }

    // Location filter
    if (activeFilters.location && hotel.city !== activeFilters.location) {
      return false;
    }

    // Theme filter
    if (activeFilters.theme && (!hotel.theme || hotel.theme.name !== activeFilters.theme.name)) {
      return false;
    }

    // Activities filter
    if (activeFilters.activities && activeFilters.activities.length > 0) {
      const hasMatchingActivity = activeFilters.activities.some(activityId => 
        hotel.activities.includes(activityId)
      );
      if (!hasMatchingActivity) return false;
    }

    // Month filter - Fix this logic
    if (activeFilters.month) {
      if (!hotel.availableMonths.includes(activeFilters.month)) {
        return false;
      }
    }

    // Day range filter
    if (activeFilters.dayRange && hotel.dayRange !== activeFilters.dayRange) {
      return false;
    }

    // Meal plan filter
    if (activeFilters.mealPlan && hotel.mealPlan !== activeFilters.mealPlan) {
      return false;
    }

    // Property type filter
    if (activeFilters.propertyType && hotel.property_type !== activeFilters.propertyType) {
      return false;
    }

    // Property style filter - Fix this logic
    if (activeFilters.propertyStyle && hotel.property_style !== activeFilters.propertyStyle) {
      return false;
    }

    // Stars filter
    if (activeFilters.stars && activeFilters.stars.length > 0) {
      const hotelStars = hotel.category.toString();
      if (!activeFilters.stars.includes(hotelStars)) return false;
    }

    // Room types filter
    if (activeFilters.roomTypes && activeFilters.roomTypes.length > 0) {
      const hasMatchingRoomType = activeFilters.roomTypes.some(roomType => 
        hotel.roomTypes.includes(roomType)
      );
      if (!hasMatchingRoomType) return false;
    }

    // Hotel services filter
    if (activeFilters.hotelServices && activeFilters.hotelServices.length > 0) {
      const hasMatchingService = activeFilters.hotelServices.some(service => 
        hotel.hotelServices.includes(service)
      );
      if (!hasMatchingService) return false;
    }

    // Room services filter
    if (activeFilters.roomServices && activeFilters.roomServices.length > 0) {
      const hasMatchingRoomService = activeFilters.roomServices.some(service => 
        hotel.roomServices.includes(service)
      );
      if (!hasMatchingRoomService) return false;
    }

    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          Hotels Found: {filteredHotels.length}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map(hotel => (
          <div key={hotel.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-white">{hotel.name}</h3>
                <div className="flex">
                  {[...Array(hotel.category)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
              </div>
              
              <p className="text-white/80">{hotel.city}, {hotel.country}</p>
              <p className="text-white/70 text-sm">{hotel.description}</p>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-white/60">Type:</span>
                  <span className="text-white ml-1">{hotel.property_type}</span>
                </div>
                <div>
                  <span className="text-white/60">Style:</span>
                  <span className="text-white ml-1">{hotel.property_style}</span>
                </div>
                <div>
                  <span className="text-white/60">Duration:</span>
                  <span className="text-white ml-1">{hotel.dayRange}</span>
                </div>
                <div>
                  <span className="text-white/60">Meals:</span>
                  <span className="text-white ml-1">{hotel.mealPlan}</span>
                </div>
              </div>

              {hotel.theme && (
                <div className="bg-fuchsia-600/30 rounded-full px-3 py-1 inline-block">
                  <span className="text-white text-sm font-medium">{hotel.theme.name}</span>
                </div>
              )}

              <div className="flex justify-between items-center pt-2">
                <div>
                  <span className="text-2xl font-bold text-white">${hotel.price_per_month}</span>
                  <span className="text-white/60 text-sm">/month</span>
                </div>
              </div>

              <div className="text-xs text-white/50">
                Available: {hotel.availableMonths.map(month => {
                  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                  return monthNames[parseInt(month) - 1];
                }).join(', ')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredHotels.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/60 text-lg">No hotels match your current filters.</p>
          <p className="text-white/40 text-sm mt-2">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
}
