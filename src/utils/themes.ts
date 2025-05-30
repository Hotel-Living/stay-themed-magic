
import { Theme, ThemeCategory } from './theme-types';
import { useThemes } from '@/hooks/useThemes';
import { useHierarchicalThemes } from '@/hooks/useHierarchicalThemes';

// Re-export the useThemes hook for backward compatibility
export { useThemes };

// Export the hierarchical themes hook
export { useHierarchicalThemes };

// Function to organize flat themes into hierarchical structure
export const organizeThemesHierarchically = (flatThemes: Theme[]): ThemeCategory[] => {
  const themeMap = new Map<string, Theme>();
  
  // Initialize all themes in the map
  flatThemes.forEach(theme => {
    themeMap.set(theme.id, {
      ...theme,
      children: []
    });
  });

  const rootThemes: ThemeCategory[] = [];

  // Build the hierarchy
  flatThemes.forEach(theme => {
    const themeNode = themeMap.get(theme.id)!;
    
    if (theme.parent_id && themeMap.has(theme.parent_id)) {
      // Add to parent's children
      const parent = themeMap.get(theme.parent_id)!;
      if (!parent.children) parent.children = [];
      parent.children.push(themeNode);
    } else if (theme.level === 1) {
      // Root level theme (category)
      rootThemes.push(themeNode as ThemeCategory);
    }
  });

  return rootThemes;
};

// Dummy arrays for backward compatibility
export const allThemes: Theme[] = [];
export const themeCategories: ThemeCategory[] = [];

// Fix the re-export syntax for TypeScript with isolatedModules enabled
export type { Theme, ThemeCategory } from './theme-types';
