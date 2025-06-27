
// CONTROLLED TEST DATA - 10 Hotels Only
// Each hotel is specifically designed to test one price bracket

export interface MockHotel {
  id: string;
  name: string;
  country: string;
  city: string;
  pricePerMonth: number;
  availableMonths: string[];
  dayRange: number;
  mealPlan: string;
  propertyType: string;
  propertyStyle: string;
  category: number;
  theme: string;
  activities: string[];
  mainImageUrl: string;
}

// EXACTLY 10 HOTELS - DISTRIBUTED ACROSS 4 PRICE BRACKETS
export const mockHotels: MockHotel[] = [
  // BRACKET 1: Up to $1,000 (3 hotels)
  {
    id: "1",
    name: "Budget Comfort Inn",
    country: "Spain",
    city: "Valencia",
    pricePerMonth: 800,
    availableMonths: ["January", "February", "March"],
    dayRange: 16,
    mealPlan: "Breakfast",
    propertyType: "Hotel",
    propertyStyle: "Modern",
    category: 3,
    theme: "Budget Travel",
    activities: ["City Tours"],
    mainImageUrl: "/lovable-uploads/0143058c-8fff-4da1-92a4-c00ad1b52595.png"
  },
  {
    id: "2", 
    name: "Cozy Downtown Hostel",
    country: "Portugal",
    city: "Porto",
    pricePerMonth: 650,
    availableMonths: ["April", "May", "June"],
    dayRange: 32,
    mealPlan: "No Meals",
    propertyType: "Hostel",
    propertyStyle: "Boutique",
    category: 2,
    theme: "Backpacker",
    activities: ["Walking Tours"],
    mainImageUrl: "/lovable-uploads/02d9e2e1-4780-45e4-af9a-3f7f3d5bb649.png"
  },
  {
    id: "3",
    name: "Simple City Hotel",
    country: "Spain",
    city: "Seville",
    pricePerMonth: 950,
    availableMonths: ["July", "August", "September"],
    dayRange: 16,
    mealPlan: "Half Board",
    propertyType: "Hotel",
    propertyStyle: "Traditional",
    category: 3,
    theme: "Cultural",
    activities: ["Museums"],
    mainImageUrl: "/lovable-uploads/0541e858-fb70-4334-817f-640e38be5c5d.png"
  },

  // BRACKET 2: $1,000 to $1,500 (2 hotels)
  {
    id: "4",
    name: "Mid-Range Business Hotel",
    country: "Spain",
    city: "Madrid",
    pricePerMonth: 1200,
    availableMonths: ["October", "November", "December"],
    dayRange: 16,
    mealPlan: "Breakfast",
    propertyType: "Hotel",
    propertyStyle: "Business",
    category: 4,
    theme: "Business Travel",
    activities: ["Conference Rooms"],
    mainImageUrl: "/lovable-uploads/06045feb-cf93-4027-bb37-f0c3102aace4.png"
  },
  {
    id: "5",
    name: "Comfortable Beach Resort",
    country: "Portugal",
    city: "Algarve",
    pricePerMonth: 1400,
    availableMonths: ["January", "February", "March"],
    dayRange: 32,
    mealPlan: "Full Board",
    propertyType: "Resort",
    propertyStyle: "Beach",
    category: 4,
    theme: "Beach & Sun",
    activities: ["Water Sports", "Beach Activities"],
    mainImageUrl: "/lovable-uploads/0ca6645a-ece0-4075-a1c1-36bf915e4c77.png"
  },

  // BRACKET 3: $1,500 to $2,000 (3 hotels)
  {
    id: "6",
    name: "Premium Urban Hotel",
    country: "Spain",
    city: "Barcelona",
    pricePerMonth: 1750,
    availableMonths: ["April", "May", "June"],
    dayRange: 16,
    mealPlan: "Breakfast",
    propertyType: "Hotel",
    propertyStyle: "Luxury",
    category: 5,
    theme: "Urban Luxury",
    activities: ["Spa", "Fine Dining"],
    mainImageUrl: "/lovable-uploads/0cbe5a61-e3cd-4c27-979c-ae584834b91a.png"
  },
  {
    id: "7",
    name: "Wellness Mountain Lodge",
    country: "Portugal",
    city: "Sintra",
    pricePerMonth: 1650,
    availableMonths: ["July", "August", "September"],
    dayRange: 32,
    mealPlan: "Half Board",
    propertyType: "Lodge",
    propertyStyle: "Mountain",
    category: 4,
    theme: "Wellness",
    activities: ["Hiking", "Yoga"],
    mainImageUrl: "/lovable-uploads/0d3c0697-3280-440c-b107-47cdc3fcc664.png"
  },
  {
    id: "8",
    name: "Boutique Art Hotel",
    country: "Spain",
    city: "Bilbao",
    pricePerMonth: 1850,
    availableMonths: ["October", "November", "December"],
    dayRange: 16,
    mealPlan: "Breakfast",
    propertyType: "Boutique Hotel",
    propertyStyle: "Artistic",
    category: 5,
    theme: "Art & Culture",
    activities: ["Art Galleries", "Cultural Tours"],
    mainImageUrl: "/lovable-uploads/0f02fa32-9a3a-45b3-8a03-f1e73db23b18.png"
  },

  // BRACKET 4: More than $2,000 (2 hotels)
  {
    id: "9",
    name: "Ultra Luxury Palace",
    country: "Spain",
    city: "Marbella",
    pricePerMonth: 2800,
    availableMonths: ["January", "February", "March"],
    dayRange: 16,
    mealPlan: "Full Board",
    propertyType: "Palace",
    propertyStyle: "Palace",
    category: 5,
    theme: "Ultra Luxury",
    activities: ["Private Butler", "Helicopter Tours"],
    mainImageUrl: "/lovable-uploads/0f500031-cb6c-4b8d-ade2-551a627a0626.png"
  },
  {
    id: "10",
    name: "Exclusive Villa Resort",
    country: "Portugal",
    city: "Madeira",
    pricePerMonth: 3200,
    availableMonths: ["April", "May", "June"],
    dayRange: 32,
    mealPlan: "All Inclusive",
    propertyType: "Villa",
    propertyStyle: "Exclusive",
    category: 5,
    theme: "Exclusive Experience",
    activities: ["Private Chef", "Yacht Access"],
    mainImageUrl: "/lovable-uploads/104ca835-26ab-45f6-ad0f-8df52ad85b44.png"
  }
];

// MOCK DATA FOR OTHER FILTERS (NOT USED YET)
export const mockCountries = ["Spain", "Portugal"];
export const mockCities = ["Madrid", "Barcelona", "Valencia", "Seville", "Bilbao", "Marbella", "Porto", "Algarve", "Sintra", "Madeira"];
export const mockPropertyTypes = ["Hotel", "Hostel", "Resort", "Lodge", "Boutique Hotel", "Palace", "Villa"];
export const mockPropertyStyles = ["Modern", "Traditional", "Business", "Beach", "Luxury", "Mountain", "Artistic", "Palace", "Exclusive"];
export const mockThemes = [
  { id: "1", name: "Budget Travel" },
  { id: "2", name: "Backpacker" },
  { id: "3", name: "Cultural" },
  { id: "4", name: "Business Travel" },
  { id: "5", name: "Beach & Sun" },
  { id: "6", name: "Urban Luxury" },
  { id: "7", name: "Wellness" },
  { id: "8", name: "Art & Culture" },
  { id: "9", name: "Ultra Luxury" },
  { id: "10", name: "Exclusive Experience" }
];
export const mockActivities = ["City Tours", "Walking Tours", "Museums", "Conference Rooms", "Water Sports", "Beach Activities", "Spa", "Fine Dining", "Hiking", "Yoga", "Art Galleries", "Cultural Tours", "Private Butler", "Helicopter Tours", "Private Chef", "Yacht Access"];
