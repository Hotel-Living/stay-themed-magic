
import { Theme, ThemeCategory } from './theme-types';
import { foodAndDrinksCategory } from './theme-categories/food-drinks';
import { artCategory, cultureCategory } from './theme-categories/arts-culture';
import { sportsCategory, danceCategory } from './theme-categories/sports-activities';
import { languagesCategory } from './theme-categories/education';
import { musicCategory, gamesCategory, literatureCategory } from './theme-categories/entertainment';
import { technologyCategory, sciencesCategory } from './theme-categories/technology-science';
import { cookingExperiences } from './theme-lists/cooking-experiences';
import { foodPreferences } from './theme-lists/food-preferences';

// Theme categories with subcategories, submenus, and options
export const themeCategories: ThemeCategory[] = [
  foodAndDrinksCategory,
  sportsCategory,
  artCategory,
  cultureCategory,
  musicCategory,
  languagesCategory,
  danceCategory,
  technologyCategory,
  sciencesCategory,
  literatureCategory,
  gamesCategory
];

// Create a flat list of all themes for easier access
export const allThemes: Theme[] = [
  ...cookingExperiences,
  ...foodPreferences,
  // Food & Drinks World Cuisines
  { id: "spanish-cuisine", name: "Spanish Cuisine", category: "FOODS & DRINKS" },
  { id: "castilian-cuisine", name: "Castilian Cuisine", category: "FOODS & DRINKS" },
  { id: "andalusian-cuisine", name: "Andalusian Cuisine", category: "FOODS & DRINKS" },
  { id: "basque-cuisine", name: "Basque Cuisine", category: "FOODS & DRINKS" },
  { id: "galician-cuisine", name: "Galician Cuisine", category: "FOODS & DRINKS" },
  { id: "catalonian-cuisine", name: "Catalonian Cuisine", category: "FOODS & DRINKS" },
  { id: "french-cuisine", name: "French Cuisine", category: "FOODS & DRINKS" },
  { id: "italian-cuisine", name: "Italian Cuisine", category: "FOODS & DRINKS" },
  { id: "toscana-cuisine", name: "Toscana Cuisine", category: "FOODS & DRINKS" },
  
  // Flatten all themes from categories
  ...sportsCategory.themes || [],
  ...artCategory.themes || [],
  ...cultureCategory.themes || [],
  ...musicCategory.themes || [],
  ...danceCategory.themes || [],
  ...technologyCategory.themes || [],
  ...sciencesCategory.themes || [],
  ...literatureCategory.themes || [],
  ...gamesCategory.themes || [],
  
  // Add languages themes
  ...(languagesCategory.subcategories?.flatMap(sub => sub.themes || []) || [])
].filter((theme): theme is Theme => theme !== undefined);

// Fix the re-export syntax for TypeScript with isolatedModules enabled
export type { Theme, ThemeCategory } from './theme-types';
