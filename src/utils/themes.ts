
import { Theme, ThemeCategory } from './theme-types';
import { useThemes } from '@/hooks/useThemes';

// Re-export the useThemes hook for backward compatibility
export { useThemes };

// Dummy allThemes array for backward compatibility
// This will be replaced by the database fetch
export const allThemes: Theme[] = [];

// Dummy themeCategories for backward compatibility
// This will be replaced by the database fetch
export const themeCategories: ThemeCategory[] = [];

// Fix the re-export syntax for TypeScript with isolatedModules enabled
export type { Theme, ThemeCategory } from './theme-types';
