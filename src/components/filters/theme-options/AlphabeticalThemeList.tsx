
import { useState, useEffect } from "react";
import { Theme } from "@/utils/themes";
import { ThemeButton } from "./ThemeButton";

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
  // These are the affinity categories displayed alphabetically
  const affinityCategories = [
    "Art", "Business", "Culture", "Education", "Entertainment", 
    "Food and Drinks", "Health and Wellness", "History", "Hobbies", 
    "Languages", "Lifestyle", "Nature", "Personal Development", 
    "Relationships", "Science and Technology", "Social Impact", "Sports"
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
      affinity => affinity.toLowerCase().includes(query)
    );
    
    setFilteredAffinities(filtered);
  }, [themeQuery]);
  
  // Handle theme selection
  const handleThemeClick = (affinity: string) => {
    onChange({ 
      id: affinity.toLowerCase(), 
      name: affinity,
      category: ""  // We don't need category for this simplified list
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
          key={affinity}
          theme={{ id: affinity.toLowerCase(), name: affinity, category: "" }}
          isActive={activeTheme?.name === affinity}
          onClick={() => handleThemeClick(affinity)}
        />
      ))}
    </div>
  );
}
