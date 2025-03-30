
import { allThemes } from "@/utils/themes";

// Available country options
export const availableCountries = [
  { value: "spain", label: "Spain 🇪🇸" },
  { value: "france", label: "France 🇫🇷" },
  { value: "italy", label: "Italy 🇮🇹" },
  { value: "usa", label: "USA 🇺🇸" },
  { value: "egypt", label: "Egypt 🇪🇬" },
  { value: "turkey", label: "Turkey 🇹🇷" }
];

// Available month options
export const months = [
  "january", "february", "march", "april", "may", "june", 
  "july", "august", "september", "october", "november", "december"
];

// Available price range options
export const priceRanges = [
  { value: 1000, label: "Up to 1.000 $" },
  { value: 1500, label: "1.000 $ to 1.500 $" },
  { value: 2000, label: "1.500 $ to 2.000 $" },
  { value: 3000, label: "More than 2.000 $" }
];

// Filter themes by search query
export const filterThemesByQuery = (query: string) => {
  return allThemes.filter(theme => 
    theme.name.toLowerCase().includes(query.toLowerCase()) ||
    theme.category.toLowerCase().includes(query.toLowerCase())
  );
};
