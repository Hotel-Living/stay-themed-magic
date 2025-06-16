
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, Info } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useHierarchicalThemes } from "@/hooks/useHierarchicalThemes";

interface AffinitiesSectionProps {
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
  selectedThemes?: string[];
  onThemeSelect?: (themeId: string, isSelected: boolean) => void;
  openCategory?: string | null;
  setOpenCategory?: (category: string | null) => void;
  openSubmenu?: string | null;
  setOpenSubmenu?: (submenu: string | null) => void;
}

export const AffinitiesSection: React.FC<AffinitiesSectionProps> = ({
  formData = {},
  updateFormData = () => {},
  selectedThemes = [],
  onThemeSelect = () => {},
  openCategory = null,
  setOpenCategory = () => {},
  openSubmenu = null,
  setOpenSubmenu = () => {}
}) => {
  const { t } = useTranslation();
  const { themes, loading } = useHierarchicalThemes();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [selectedAffinities, setSelectedAffinities] = useState<string[]>(selectedThemes);

  useEffect(() => {
    if (formData.selectedAffinities) {
      setSelectedAffinities(formData.selectedAffinities);
    }
  }, [formData.selectedAffinities]);

  useEffect(() => {
    setSelectedAffinities(selectedThemes);
  }, [selectedThemes]);

  const toggleCategory = (categoryId: string) => {
    if (setOpenCategory) {
      setOpenCategory(openCategory === categoryId ? null : categoryId);
    } else {
      setExpandedCategories(prev => ({
        ...prev,
        [categoryId]: !prev[categoryId]
      }));
    }
  };

  const isExpanded = (categoryId: string) => {
    return openCategory ? openCategory === categoryId : expandedCategories[categoryId];
  };

  const handleThemeSelection = (themeId: string, isSelected: boolean) => {
    onThemeSelect(themeId, isSelected);
    
    if (isSelected) {
      setSelectedAffinities(prev => [...prev, themeId]);
    } else {
      setSelectedAffinities(prev => prev.filter(id => id !== themeId));
    }
  };

  // Enhanced function to get the translated name for themes using proper affinity keys
  const getTranslatedThemeName = (name: string) => {
    // Create a comprehensive mapping for affinity translations using proper affinity keys
    const affinityTranslations: { [key: string]: string } = {
      // Main categories
      "Personal Development": t('affinities.personalDevelopment'),
      "Relationships": t('affinities.relationships'),
      "Science and Technology": t('affinities.scienceTechnology'),
      
      // Art subcategories - use affinity keys, not activity keys
      "Art": t('affinities.art'),
      "Painting": t('affinities.painting'),
      "Sculpture": t('affinities.sculpture'),
      "Photography": t('affinities.photography'),
      "Cinema & Film Art": t('affinities.cinemaFilmArt'),
      "Street Art & Murals": t('affinities.streetArtMurals'),
      "Illustration & Comics": t('affinities.illustrationComics'),
      "Calligraphy & Typography": t('affinities.calligraphyTypography'),
      "Architecture as Art": t('affinities.architectureAsArt'),
      "Performance Art": t('affinities.performanceArt'),
      "Installation Art": t('affinities.installationArt'),
      "Ceramics & Pottery": t('affinities.ceramicsPottery'),
      "Art History & Movements": t('affinities.artHistoryMovements'),
      
      // Music related
      "Music": t('affinities.music'),
      "Classical Music": t('affinities.classicalMusic'),
      "Jazz & Blues": t('affinities.jazzBlues'),
      "World Music": t('affinities.worldMusic'),
      "Latin Music": t('affinities.latinMusic'),
      "Contemporary & Pop Music": t('affinities.contemporaryPopMusic'),
      "Folk & Traditional Music": t('affinities.folkTraditionalMusic'),
      "Opera & Vocal Arts": t('affinities.operaVocalArts'),
      "Instrumental Performance": t('affinities.instrumentalPerformance'),
      "Music Appreciation & History": t('affinities.musicAppreciationHistory'),
      
      // Sports related
      "Sports": t('affinities.sports'),
      "Martial Arts": t('affinities.martialArts'),
      "Team Sports": t('affinities.teamSports'),
      "Tennis & Racket Sports": t('affinities.tennisRacketSports'),
      "Winter Sports": t('affinities.winterSports'),
      "Adventure Sports": t('affinities.adventureSports'),
      "Watersports": t('affinities.watersports'),
      "Swimming": t('affinities.swimming'),
      "Cycling": t('affinities.cycling'),
      "Running & Jogging": t('affinities.runningJogging'),
      "Climbing & Bouldering": t('affinities.climbingBouldering'),
      
      // Fan categories - these are the ones that were showing in English
      "Fanatics": t('affinities.fanatics'),
      "Musical Icons": t('affinities.musicalIcons'),
      "Movie Legends": t('affinities.movieLegends'),
      "Writers & Thinkers": t('affinities.writersThinkers'),
      "Artists": t('affinities.artists'),
      "Spiritual or Historic Figures": t('affinities.spiritualHistoricFigures'),
      
      // Food & Health categories
      "Food & Drinks": t('affinities.foodDrinks'),
      "Health and Wellness": t('affinities.healthWellness'),
      "Cooking & Food": t('affinities.cookingFood'),
      "Wellness & Care": t('affinities.wellnessCare')
    };

    const translatedText = affinityTranslations[name];
    console.log(`Translating "${name}" to "${translatedText}"`);
    return translatedText || name;
  };

  if (loading) {
    return <div>{t('common.loading')}</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">2.1- {t('affinities.title')}</h3>
        <p className="text-white/80 text-sm mb-4">
          {t('affinities.description')}
        </p>
        
        <button
          type="button"
          className="flex items-center space-x-2 px-4 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 mb-6"
        >
          <Info className="w-4 h-4" />
          <span>{t('affinities.moreInformation')}</span>
        </button>
        
        <div className="space-y-3">
          {themes.map((category) => (
            <div key={category.id}>
              <button
                type="button"
                onClick={() => toggleCategory(category.id)}
                className="flex items-center space-x-2 text-white hover:text-white/80 font-medium"
              >
                {isExpanded(category.id) ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                <span>{getTranslatedThemeName(category.name)}</span>
              </button>
              
              {isExpanded(category.id) && (
                <div className="ml-6 mt-2 space-y-2">
                  {category.children && category.children.length > 0 ? (
                    <div className="space-y-1">
                      {category.children.map((theme) => (
                        <label key={theme.id} className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            checked={selectedAffinities.includes(theme.id)}
                            onChange={(e) => handleThemeSelection(theme.id, e.target.checked)}
                            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50"
                          />
                          <span className="text-sm text-white/80">{getTranslatedThemeName(theme.name)}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white/60 text-sm">{t('common.noOptionsAvailable')}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
