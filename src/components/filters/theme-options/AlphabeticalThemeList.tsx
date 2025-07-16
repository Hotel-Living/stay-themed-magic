
import { useState, useEffect } from "react";
import { Theme } from "@/utils/themes";
import { ThemeButton } from "./ThemeButton";
import { useTranslation } from "@/hooks/useTranslation";

interface AlphabeticalThemeListProps {
  activeTheme: Theme | null;
  onChange: (value: Theme) => void;
  themeQuery: string;
}

export function AlphabeticalThemeList({ 
  activeTheme, 
  onChange, 
  themeQuery 
}: AlphabeticalThemeListProps) {
  const { t } = useTranslation('filters');
  
  // These are the affinity categories with their translation keys
  const affinityCategories = [
    { key: "art", translationKey: "filters.affinities.art" },
    { key: "business", translationKey: "filters.affinities.business" },
    { key: "culture", translationKey: "filters.affinities.culture" },
    { key: "education", translationKey: "filters.affinities.education" },
    { key: "entertainment", translationKey: "filters.affinities.entertainment" },
    { key: "foodAndDrinks", translationKey: "filters.affinities.foodAndDrinks" },
    { key: "healthAndWellness", translationKey: "filters.affinities.healthAndWellness" },
    { key: "history", translationKey: "filters.affinities.history" },
    { key: "hobbies", translationKey: "filters.affinities.hobbies" },
    { key: "languages", translationKey: "filters.affinities.languages" },
    { key: "lifestyle", translationKey: "filters.affinities.lifestyle" },
    { key: "nature", translationKey: "filters.affinities.nature" },
    { key: "personalDevelopment", translationKey: "filters.affinities.personalDevelopment" },
    { key: "relationships", translationKey: "filters.affinities.relationships" },
    { key: "scienceAndTechnology", translationKey: "filters.affinities.scienceAndTechnology" },
    { key: "socialImpact", translationKey: "filters.affinities.socialImpact" },
    { key: "sports", translationKey: "filters.affinities.sports" }
  ];
  
  // Filter affinities based on search query
  const [filteredAffinities, setFilteredAffinities] = useState(affinityCategories);
  
  useEffect(() => {
    if (!themeQuery) {
      setFilteredAffinities(affinityCategories);
      return;
    }
    
    const query = themeQuery.toLowerCase();
    const filtered = affinityCategories.filter(
      affinity => t(affinity.translationKey.replace('filters.', '')).toLowerCase().includes(query)
    );
    
    setFilteredAffinities(filtered);
  }, [themeQuery, t]);
  
  // Handle theme selection
  const handleThemeClick = (affinity: typeof affinityCategories[0]) => {
    onChange({ 
      id: affinity.key.toLowerCase(), 
      name: t(affinity.translationKey.replace('filters.', '')),
      category: "GENERAL",
      level: 1
    });
  };
  
  if (filteredAffinities.length === 0) {
    return (
      <div className="text-center py-2 text-sm text-fuchsia-300">
        No affinities match your search
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 gap-1 mt-2">
      {filteredAffinities.map(affinity => (
        <ThemeButton
          key={affinity.key}
          theme={{ 
            id: affinity.key.toLowerCase(), 
            name: t(affinity.translationKey.replace('filters.', '')), 
            category: "GENERAL",
            level: 1
          }}
          isActive={activeTheme?.name === t(affinity.translationKey.replace('filters.', ''))}
          onClick={() => handleThemeClick(affinity)}
        />
      ))}
    </div>
  );
}
