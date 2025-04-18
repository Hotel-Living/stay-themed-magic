
// Define theme interface
export interface Theme {
  id: string;
  name: string;
  isAddOption?: boolean;
}

// Define category interface
export interface ThemeCategory {
  id: string;
  name: string;
  themes?: Theme[];
  subcategories?: {
    name: string;
    themes?: Theme[];
    submenus?: {
      name: string;
      options: {
        id: string;
        name: string;
        suboptions?: string[];
        isAddOption?: boolean;
      }[];
    }[];
  }[];
}

// Featured themes
const featuredThemes: Theme[] = [
  { id: "digital-nomads", name: "Digital Nomads" },
  { id: "senior-living", name: "Senior Living" },
  { id: "extended-stay", name: "Extended Stay" },
  { id: "pet-friendly", name: "Pet Friendly" },
  { id: "family-friendly", name: "Family Friendly" },
  { id: "add-featured", name: "Add New Featured Theme", isAddOption: true }
];

// Popular themes
const popularThemes: Theme[] = [
  { id: "beach-access", name: "Beach Access" },
  { id: "mountain-view", name: "Mountain View" },
  { id: "city-center", name: "City Center" },
  { id: "countryside", name: "Countryside" },
  { id: "historic", name: "Historic" },
  { id: "add-popular", name: "Add New Popular Theme", isAddOption: true }
];

// Location themes
const locationThemes: Theme[] = [
  { id: "beachfront", name: "Beachfront" },
  { id: "lakefront", name: "Lakefront" },
  { id: "downtown", name: "Downtown" },
  { id: "rural", name: "Rural" },
  { id: "suburban", name: "Suburban" },
  { id: "resort", name: "Resort Area" },
  { id: "add-location", name: "Add New Location", isAddOption: true }
];

// Style themes
const styleThemes: Theme[] = [
  { id: "modern", name: "Modern" },
  { id: "classic", name: "Classic" },
  { id: "rustic", name: "Rustic" },
  { id: "boutique", name: "Boutique" },
  { id: "luxury", name: "Luxury" },
  { id: "budget", name: "Budget" },
  { id: "add-style", name: "Add New Style", isAddOption: true }
];

// Activities
const activities: Theme[] = [
  { id: "swimming", name: "Swimming" },
  { id: "hiking", name: "Hiking" },
  { id: "biking", name: "Biking" },
  { id: "fishing", name: "Fishing" },
  { id: "skiing", name: "Skiing" },
  { id: "golfing", name: "Golfing" },
  { id: "yoga", name: "Yoga" },
  { id: "cooking-classes", name: "Cooking Classes" },
  { id: "wine-tasting", name: "Wine Tasting" },
  { id: "sightseeing", name: "Sightseeing" },
  { id: "add-activity", name: "Add New Activity", isAddOption: true }
];

// Theme categories
export const themeCategories: ThemeCategory[] = [
  {
    id: "featured",
    name: "Featured Themes",
    themes: featuredThemes
  },
  {
    id: "popular",
    name: "Popular Themes",
    themes: popularThemes
  },
  {
    id: "location",
    name: "Location & Setting",
    themes: locationThemes
  },
  {
    id: "style",
    name: "Property Style",
    themes: styleThemes
  },
  {
    id: "target-guests",
    name: "Target Guests",
    subcategories: [
      {
        name: "Age Groups",
        themes: [
          { id: "family", name: "Family" },
          { id: "adults-only", name: "Adults Only" },
          { id: "senior-friendly", name: "Senior Friendly" },
          { id: "youth", name: "Youth" }
        ]
      },
      {
        name: "Trip Types",
        themes: [
          { id: "business", name: "Business" },
          { id: "leisure", name: "Leisure" },
          { id: "extended-stay", name: "Extended Stay" },
          { id: "short-term", name: "Short Term" }
        ]
      }
    ]
  },
  {
    id: "amenities",
    name: "Special Amenities",
    subcategories: [
      {
        name: "Wellness",
        themes: [
          { id: "spa", name: "Spa" },
          { id: "sauna", name: "Sauna" },
          { id: "fitness-center", name: "Fitness Center" },
          { id: "yoga-studio", name: "Yoga Studio" }
        ]
      },
      {
        name: "Dining",
        themes: [
          { id: "gourmet", name: "Gourmet Restaurant" },
          { id: "all-inclusive", name: "All-Inclusive" },
          { id: "breakfast-included", name: "Breakfast Included" },
          { id: "kitchen", name: "In-Room Kitchen" }
        ]
      }
    ]
  },
  {
    id: "activities",
    name: "Activities",
    themes: activities
  }
];

// Export all themes as a flattened array for search functionality
export const allThemes: Theme[] = [
  ...featuredThemes,
  ...popularThemes,
  ...locationThemes,
  ...styleThemes,
  ...activities,
  // Add themes from subcategories
  ...(themeCategories
    .filter(cat => cat.subcategories)
    .flatMap(cat => 
      cat.subcategories?.flatMap(subcat => 
        subcat.themes || []
      ) || []
    )
  )
].filter(theme => !theme.isAddOption);
