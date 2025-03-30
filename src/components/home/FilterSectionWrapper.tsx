
import { useState } from 'react';
import { FilterSection, FilterState } from '@/components/filters';
import { themeCategories } from '@/components/dashboard/PropertySteps/ThemesAndActivitiesStep';

// Flatten the themes from the complex nested structure to use in filters
const extractAllThemes = () => {
  const allThemes: string[] = [];
  
  // Process all categories and their nested structures
  themeCategories.forEach(category => {
    // Handle categories with direct themes
    if (category.themes) {
      category.themes
        .filter(theme => !theme.isAddOption)
        .forEach(theme => allThemes.push(theme.name));
    }
    
    // Handle categories with subcategories
    if (category.subcategories) {
      category.subcategories.forEach(subcategory => {
        // Handle subcategories with direct themes
        if (subcategory.themes) {
          subcategory.themes
            .filter(theme => !theme.isAddOption)
            .forEach(theme => allThemes.push(theme.name));
        }
        
        // Handle subcategories with submenus
        if (subcategory.submenus) {
          subcategory.submenus.forEach(submenu => {
            // Process each option in the submenu
            submenu.options
              .filter(option => !option.isAddOption)
              .forEach(option => {
                // Add the option name
                allThemes.push(option.name);
                
                // Add suboptions if they exist
                if (option.suboptions) {
                  option.suboptions.forEach(suboption => {
                    allThemes.push(suboption);
                  });
                }
              });
          });
        }
      });
    }
  });
  
  return allThemes;
};

interface FilterSectionWrapperProps {
  onFilterChange: (filters: FilterState) => void;
  availableThemes?: string[];
}

export function FilterSectionWrapper({ onFilterChange }: FilterSectionWrapperProps) {
  // Use all themes from the property steps
  const allPropertyThemes = extractAllThemes();
  
  return (
    <section className="py-0 px-4">
      <div className="container max-w-6xl mx-auto">
        <FilterSection 
          onFilterChange={onFilterChange} 
          showSearchButton={true} 
          placeholders={{
            month: "Month?",
            country: "Country?",
            theme: "Theme?",
            priceRange: "Price per Month?"
          }}
          useCollapsibleThemes={true}
          expandedLayout={true}
          compactSpacing={true}
          useBoldLabels={true}
          usePurpleFilterBackground={true}
          availableThemes={allPropertyThemes}
        />
      </div>
    </section>
  );
}
