
// CONTROLLED DEMO DATA - 10 TEST HOTELS WITH PRICE DISTRIBUTION
// This is the ONLY active data for the single-filter demo

export interface MockHotel {
  id: string;
  name: string;
  city: string;
  country: string;
  pricePerMonth: number;
  category: number;
  propertyType: string;
  propertyStyle: string;
  mainImageUrl: string;
}

// 10 TEST HOTELS - EXACTLY DISTRIBUTED ACROSS PRICE BRACKETS
export const mockHotels: MockHotel[] = [
  // BRACKET 1: Up to $1,000 (3 hotels)
  {
    id: "hotel-1",
    name: "Budget City Hotel",
    city: "Barcelona",
    country: "Spain",
    pricePerMonth: 800,
    category: 3,
    propertyType: "Hotel",
    propertyStyle: "Urban",
    mainImageUrl: "/lovable-uploads/hotel-1.jpg"
  },
  {
    id: "hotel-2", 
    name: "Economy Inn",
    city: "Lisbon",
    country: "Portugal",
    pricePerMonth: 950,
    category: 2,
    propertyType: "Inn",
    propertyStyle: "Traditional",
    mainImageUrl: "/lovable-uploads/hotel-2.jpg"
  },
  {
    id: "hotel-3",
    name: "Cozy Hostel",
    city: "Prague",
    country: "Czech Republic", 
    pricePerMonth: 650,
    category: 2,
    propertyType: "Hostel",
    propertyStyle: "Modern",
    mainImageUrl: "/lovable-uploads/hotel-3.jpg"
  },

  // BRACKET 2: $1,000 to $1,500 (3 hotels)
  {
    id: "hotel-4",
    name: "Mid-Range Resort",
    city: "Valencia",
    country: "Spain",
    pricePerMonth: 1200,
    category: 4,
    propertyType: "Resort",
    propertyStyle: "Beach",
    mainImageUrl: "/lovable-uploads/hotel-4.jpg"
  },
  {
    id: "hotel-5",
    name: "Business Hotel",
    city: "Madrid",
    country: "Spain",
    pricePerMonth: 1350,
    category: 4,
    propertyType: "Hotel",
    propertyStyle: "Business",
    mainImageUrl: "/lovable-uploads/hotel-5.jpg"
  },
  {
    id: "hotel-6",
    name: "Boutique Stay",
    city: "Porto",
    country: "Portugal",
    pricePerMonth: 1100,
    category: 4,
    propertyType: "Boutique",
    propertyStyle: "Artistic",
    mainImageUrl: "/lovable-uploads/hotel-6.jpg"
  },

  // BRACKET 3: $1,500 to $2,000 (2 hotels)
  {
    id: "hotel-7",
    name: "Premium Hotel",
    city: "Seville",
    country: "Spain", 
    pricePerMonth: 1750,
    category: 5,
    propertyType: "Hotel",
    propertyStyle: "Luxury",
    mainImageUrl: "/lovable-uploads/hotel-7.jpg"
  },
  {
    id: "hotel-8",
    name: "Upscale Resort",
    city: "Costa Brava",
    country: "Spain",
    pricePerMonth: 1900,
    category: 5,
    propertyType: "Resort",
    propertyStyle: "Beachfront",
    mainImageUrl: "/lovable-uploads/hotel-8.jpg"
  },

  // BRACKET 4: More than $2,000 (2 hotels)
  {
    id: "hotel-9",
    name: "Luxury Palace",
    city: "Barcelona",
    country: "Spain",
    pricePerMonth: 2500,
    category: 5,
    propertyType: "Palace",
    propertyStyle: "Historic",
    mainImageUrl: "/lovable-uploads/hotel-9.jpg"
  },
  {
    id: "hotel-10",
    name: "Elite Resort",
    city: "Ibiza",
    country: "Spain",
    pricePerMonth: 3200,
    category: 5,
    propertyType: "Resort",
    propertyStyle: "Exclusive",
    mainImageUrl: "/lovable-uploads/hotel-10.jpg"
  }
];

// PLACEHOLDER DATA FOR DISABLED COMPONENTS
// These are kept to prevent build errors but are not used in the demo

export const mockActivities = [
  { id: "activity-1", name: "Swimming", count: 5 },
  { id: "activity-2", name: "Spa", count: 3 },
  { id: "activity-3", name: "Gym", count: 8 }
];

export const mockCountries = [
  { id: "spain", name: "Spain" },
  { id: "portugal", name: "Portugal" }
];

export const mockCities = [
  { id: "barcelona", name: "Barcelona" },
  { id: "madrid", name: "Madrid" }
];

export const mockPropertyTypes = [
  "Hotel", "Resort", "Inn", "Boutique"
];

export const mockPropertyStyles = [
  "Urban", "Beach", "Modern", "Traditional"
];

export const mockThemes = [
  { id: "theme-1", name: "Beach", level: 1 as const, category: "Location" },
  { id: "theme-2", name: "City", level: 1 as const, category: "Location" },
  { id: "theme-3", name: "Luxury", level: 2 as const, category: "Style" }
];

export const mockRoomTypes = [
  "Single Room",
  "Double Room", 
  "Suite",
  "Apartment"
];
