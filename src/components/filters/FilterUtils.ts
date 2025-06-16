// Import translation utilities
import { useTranslation } from "@/hooks/useTranslation";

// Countries - Updated to use ISO codes that match the database
export const availableCountries = [
  { value: "ES", label: "Spain 🇪🇸", translationKey: "filters.countries.spain" },
  { value: "FR", label: "France 🇫🇷", translationKey: "filters.countries.france" },
  { value: "IT", label: "Italy 🇮🇹", translationKey: "filters.countries.italy" },
  { value: "US", label: "USA 🇺🇸", translationKey: "filters.countries.usa" },
  { value: "EG", label: "Egypt 🇪🇬", translationKey: "filters.countries.egypt" },
  { value: "TR", label: "Turkey 🇹🇷", translationKey: "filters.countries.turkey" },
  { value: "GB", label: "United Kingdom 🇬🇧", translationKey: "filters.countries.unitedKingdom" },
  { value: "DE", label: "Germany 🇩🇪", translationKey: "filters.countries.germany" },
  { value: "PT", label: "Portugal 🇵🇹", translationKey: "filters.countries.portugal" },
  { value: "GR", label: "Greece 🇬🇷", translationKey: "filters.countries.greece" },
];

// Months with translation keys
export const months = [
  { value: "january", translationKey: "filters.months.january" },
  { value: "february", translationKey: "filters.months.february" },
  { value: "march", translationKey: "filters.months.march" },
  { value: "april", translationKey: "filters.months.april" },
  { value: "may", translationKey: "filters.months.may" },
  { value: "june", translationKey: "filters.months.june" },
  { value: "july", translationKey: "filters.months.july" },
  { value: "august", translationKey: "filters.months.august" },
  { value: "september", translationKey: "filters.months.september" },
  { value: "october", translationKey: "filters.months.october" },
  { value: "november", translationKey: "filters.months.november" },
  { value: "december", translationKey: "filters.months.december" },
];

// Theme categories
export const themeCategories = [
  "Art", "Business", "Culture", "Education", "Entertainment", 
  "Food and Drinks", "Health and Wellness", "History", "Hobbies", 
  "Languages", "Lifestyle", "Nature", "Personal Development", 
  "Relationships", "Science and Technology", "Social Impact", "Sports"
];

// Price ranges with translation keys
export const priceRanges = [
  { value: 1000, label: "Up to 1.000 $", translationKey: "filters.priceRanges.upTo1000" },
  { value: 1500, label: "1.000 $ to 1.500 $", translationKey: "filters.priceRanges.1000to1500" },
  { value: 2000, label: "1.500 $ to 2.000 $", translationKey: "filters.priceRanges.1500to2000" },
  { value: 3000, label: "More than 2.000 $", translationKey: "filters.priceRanges.moreThan2000" }
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
