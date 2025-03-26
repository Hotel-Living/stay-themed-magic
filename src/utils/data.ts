
// Define theme types
export interface Theme {
  id: string;
  name: string;
  category: string;
  description?: string;
}

// Theme category types
export interface ThemeCategory {
  category: string;
  themes: Theme[];
}

// All available themes for filtering
export const allThemes: Theme[] = [
  // Nature themes
  { id: "beach", name: "Beach", category: "Nature" },
  { id: "mountain", name: "Mountain", category: "Nature" },
  { id: "forest", name: "Forest", category: "Nature" },
  { id: "lake", name: "Lake", category: "Nature" },
  { id: "island", name: "Island", category: "Nature" },
  { id: "desert", name: "Desert", category: "Nature" },
  { id: "countryside", name: "Countryside", category: "Nature" },
  
  // Experience themes
  { id: "luxury", name: "Luxury", category: "Experience" },
  { id: "spa", name: "Spa & Wellness", category: "Experience" },
  { id: "romantic", name: "Romantic", category: "Experience" },
  { id: "family", name: "Family-friendly", category: "Experience" },
  { id: "adventure", name: "Adventure", category: "Experience" },
  { id: "solo", name: "Solo Traveler", category: "Experience" },
  { id: "digital-nomad", name: "Digital Nomad", category: "Experience" },
  
  // Accommodation types
  { id: "resort", name: "Resort", category: "Accommodation" },
  { id: "boutique", name: "Boutique Hotel", category: "Accommodation" },
  { id: "villa", name: "Villa", category: "Accommodation" },
  { id: "apartment", name: "Apartment", category: "Accommodation" },
  { id: "cabin", name: "Cabin", category: "Accommodation" },
  { id: "glamping", name: "Glamping", category: "Accommodation" },
  
  // Activity themes
  { id: "culture", name: "Cultural", category: "Activity" },
  { id: "food", name: "Culinary", category: "Activity" },
  { id: "nightlife", name: "Nightlife", category: "Activity" },
  { id: "shopping", name: "Shopping", category: "Activity" },
  { id: "sports", name: "Sports", category: "Activity" },
  { id: "water-sports", name: "Water Sports", category: "Activity" },
  { id: "wildlife", name: "Wildlife", category: "Activity" },
  
  // Special themes
  { id: "pet-friendly", name: "Pet-friendly", category: "Special" },
  { id: "sustainable", name: "Eco-friendly", category: "Special" },
  { id: "historical", name: "Historical", category: "Special" },
  { id: "modern", name: "Modern", category: "Special" },
  { id: "all-inclusive", name: "All-inclusive", category: "Special" },
];

// Organize themes by category for the dropdown
export const themeCategories: ThemeCategory[] = [
  {
    category: "Nature",
    themes: allThemes.filter(theme => theme.category === "Nature"),
  },
  {
    category: "Experience",
    themes: allThemes.filter(theme => theme.category === "Experience"),
  },
  {
    category: "Accommodation",
    themes: allThemes.filter(theme => theme.category === "Accommodation"),
  },
  {
    category: "Activity",
    themes: allThemes.filter(theme => theme.category === "Activity"),
  },
  {
    category: "Special",
    themes: allThemes.filter(theme => theme.category === "Special"),
  },
];
