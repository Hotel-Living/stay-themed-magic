
// Mock data for simulation filters

export const mockCountries = [
  { id: "ES", name: "Spain", count: 6 },
  { id: "FR", name: "France", count: 0 },
  { id: "IT", name: "Italy", count: 0 },
  { id: "US", name: "USA", count: 0 }
];

export const mockCities = [
  { id: "Barcelona", name: "Barcelona", count: 1 },
  { id: "Valencia", name: "Valencia", count: 1 },
  { id: "Madrid", name: "Madrid", count: 1 },
  { id: "Seville", name: "Seville", count: 1 },
  { id: "Granada", name: "Granada", count: 1 },
  { id: "Palma", name: "Palma", count: 1 }
];

export const mockThemes = [
  { 
    id: "urban-exploration", 
    name: "Urban Exploration", 
    category: "LIFESTYLE",
    level: 1 as const,
    count: 1 
  },
  { 
    id: "beach-sun", 
    name: "Beach & Sun", 
    category: "NATURE",
    level: 1 as const,
    count: 1 
  },
  { 
    id: "business-networking", 
    name: "Business & Networking", 
    category: "BUSINESS",
    level: 1 as const,
    count: 1 
  },
  { 
    id: "cultural-heritage", 
    name: "Cultural Heritage", 
    category: "CULTURE",
    level: 1 as const,
    count: 1 
  },
  { 
    id: "art-creativity", 
    name: "Art & Creativity", 
    category: "ART",
    level: 1 as const,
    count: 1 
  },
  { 
    id: "wellness-health", 
    name: "Wellness & Health", 
    category: "HEALTH",
    level: 1 as const,
    count: 1 
  }
];

export const mockActivities = [
  { id: "city-tours", name: "City Tours", count: 1 },
  { id: "cultural-visits", name: "Cultural Visits", count: 1 },
  { id: "beach-activities", name: "Beach Activities", count: 1 },
  { id: "water-sports", name: "Water Sports", count: 1 },
  { id: "business-centers", name: "Business Centers", count: 1 },
  { id: "networking-events", name: "Networking Events", count: 1 },
  { id: "historical-tours", name: "Historical Tours", count: 1 },
  { id: "museums", name: "Museums", count: 1 },
  { id: "art-galleries", name: "Art Galleries", count: 1 },
  { id: "creative-workshops", name: "Creative Workshops", count: 1 },
  { id: "yoga", name: "Yoga", count: 1 },
  { id: "meditation", name: "Meditation", count: 1 }
];

export const mockPropertyTypes = [
  { id: "Hotel", name: "Hotel", count: 3 },
  { id: "Resort", name: "Resort", count: 2 },
  { id: "Boutique Hotel", name: "Boutique Hotel", count: 1 },
  { id: "Villa", name: "Villa", count: 0 },
  { id: "Apartment", name: "Apartment", count: 0 }
];

// Official property styles as defined in the system
export const mockPropertyStyles = [
  { id: "Modern", name: "Modern", count: 2 },
  { id: "Classic", name: "Classic", count: 1 },
  { id: "Luxury", name: "Luxury", count: 2 },
  { id: "Budget", name: "Budget", count: 1 },
  { id: "Boutique", name: "Boutique", count: 1 },
  { id: "Historic", name: "Historic", count: 1 },
  { id: "Eco-friendly", name: "Eco-friendly", count: 1 }
];

export const mockRoomTypes = [
  "Double Room",
  "Single Room"
];

export const mockHotelServices = [
  "wifi",
  "pool", 
  "restaurant",
  "bar",
  "spa",
  "gym",
  "organic-restaurant"
];

export const mockRoomServices = [
  "air-conditioning",
  "tv",
  "balcony",
  "minibar",
  "room-service",
  "concierge",
  "organic-amenities"
];

export const mockMealPlans = [
  { id: "no-meals", name: "No meals", count: 1 },
  { id: "breakfast-only", name: "Breakfast only", count: 2 },
  { id: "half-board", name: "Half board", count: 2 },
  { id: "full-board", name: "Full board", count: 1 }
];

export const mockDayRanges = [
  { id: 32, name: "32 days", count: 2 },
  { id: 24, name: "24 days", count: 1 },
  { id: 16, name: "16 days", count: 2 },
  { id: 8, name: "8 days", count: 1 }
];
