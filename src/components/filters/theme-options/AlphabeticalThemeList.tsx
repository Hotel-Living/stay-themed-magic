
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
    { key: "art", translationKey: "affinities.art" },
    { key: "business", translationKey: "affinities.business" },
    { key: "culture", translationKey: "affinities.culture" },
    { key: "education", translationKey: "affinities.education" },
    { key: "entertainment", translationKey: "affinities.entertainment" },
    { key: "foodAndDrinks", translationKey: "affinities.foodAndDrinks" },
    { key: "healthAndWellness", translationKey: "affinities.healthAndWellness" },
    { key: "history", translationKey: "affinities.history" },
    { key: "hobbies", translationKey: "affinities.hobbies" },
    { key: "languages", translationKey: "affinities.languages" },
    { key: "lifestyle", translationKey: "affinities.lifestyle" },
    { key: "nature", translationKey: "affinities.nature" },
    { key: "personalDevelopment", translationKey: "affinities.personalDevelopment" },
    { key: "relationships", translationKey: "affinities.relationships" },
    { key: "scienceAndTechnology", translationKey: "affinities.scienceAndTechnology" },
    { key: "socialImpact", translationKey: "affinities.socialImpact" },
    { key: "sports", translationKey: "affinities.sports" }
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
      affinity => t(affinity.translationKey).toLowerCase().includes(query)
    );
    
    setFilteredAffinities(filtered);
  }, [themeQuery, t]);
  
  // Handle theme selection
  const handleThemeClick = (affinity: typeof affinityCategories[0]) => {
    onChange({ 
      id: affinity.key.toLowerCase(), 
      name: t(affinity.translationKey),
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
            name: t(affinity.translationKey), 
            category: "GENERAL",
            level: 1
          }}
          isActive={activeTheme?.name === t(affinity.translationKey)}
          onClick={() => handleThemeClick(affinity)}
        />
      ))}
    </div>
  );
}
