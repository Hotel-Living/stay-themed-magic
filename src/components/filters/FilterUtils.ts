// Countries
export const availableCountries = [
  { value: "Spain", label: "Spain 🇪🇸" },
  { value: "France", label: "France 🇫🇷" },
  { value: "Italy", label: "Italy 🇮🇹" },
  { value: "USA", label: "USA 🇺🇸" },
  { value: "Egypt", label: "Egypt 🇪🇬" },
  { value: "Turkey", label: "Turkey 🇹🇷" },
  { value: "UK", label: "United Kingdom 🇬🇧" },
  { value: "Germany", label: "Germany 🇩🇪" },
  { value: "Portugal", label: "Portugal 🇵🇹" },
  { value: "Greece", label: "Greece 🇬🇷" },
];

// Months
export const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

// Theme categories
export const themeCategories = [
  "Art", "Business", "Culture", "Education", "Entertainment", 
  "Food and Drinks", "Health and Wellness", "History", "Hobbies", 
  "Languages", "Lifestyle", "Nature", "Personal Development", 
  "Relationships", "Science and Technology", "Social Impact", "Sports"
];

// Price ranges
export const priceRanges = [
  { value: 1000, label: "Up to 1.000 $" },
  { value: 1500, label: "1.000 $ to 1.500 $" },
  { value: 2000, label: "1.500 $ to 2.000 $" },
  { value: 3000, label: "More than 2.000 $" }
];

// Length of stay options
export const stayLengths = [
  { value: "1-month", label: "1 Month" },
  { value: "3-months", label: "3 Months" },
  { value: "6-months", label: "6 Months" },
  { value: "1-year", label: "1 Year" },
  { value: "long-term", label: "Long Term" }
];

// Property types
export const propertyTypes = [
  "Hotel", 
  "Boutique Hotel", 
  "Resort", 
  "Villa", 
  "Apartment", 
  "Guesthouse", 
  "Hostel"
];

// Property styles
export const propertyStyles = [
  "Modern", 
  "Classic", 
  "Luxury", 
  "Budget", 
  "Boutique", 
  "Historic", 
  "Eco-friendly"
];

// Location types
export const locationTypes = [
  "Beach", 
  "Mountain", 
  "City Center", 
  "Countryside", 
  "Forest", 
  "Desert", 
  "Island"
];

// Categories
export const categories = [
  "5-star", 
  "4-star", 
  "3-star", 
  "Budget", 
  "Luxury", 
  "Family-friendly", 
  "Adults-only"
];

// Import theme data for filtering
import { allThemes, themeCategories as themeCategoriesToFilter } from '@/utils/themes';

// Function to filter themes based on search query
export const filterThemesByQuery = (query: string) => {
  if (!query || query.trim() === '') {
    return allThemes;
  }
  
  const lowercaseQuery = query.toLowerCase();
  return allThemes.filter(theme => 
    theme.name.toLowerCase().includes(lowercaseQuery) || 
    (theme.category && theme.category.toLowerCase().includes(lowercaseQuery))
  );
};
