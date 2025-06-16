
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
  const { t, isReady } = useTranslation();
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

  // Fixed translation mapping - now correctly using activities.* keys that exist
  const getTranslatedThemeName = (name: string) => {
    const affinityTranslations: { [key: string]: string } = {
      // Main category names - corrected to use activities.* keys
      "Art": t('activities.art'),
      "ART": t('activities.art'),
      "Fanatics": t('activities.fanatics'),
      "FANS": t('activities.fanatics'),
      "Sports": t('activities.sports'), 
      "SPORTS": t('activities.sports'),
      "Food & Drinks": t('activities.foodDrinks'),
      "FOOD & DRINKS": t('activities.foodDrinks'),
      "Music": t('activities.music'),
      "MUSIC": t('activities.music'),
      "Health and Wellness": t('activities.healthWellness'),
      "HEALTH AND WELLNESS": t('activities.healthWellness'),
      "Learning & Talks": t('activities.learningTalks'),
      "EDUCATION": t('activities.learningTalks'),
      "Tech & Science": t('activities.techScience'),
      "SCIENCE AND KNOWLEDGE": t('activities.techScience'),
      "Science and Technology": t('activities.techScience'),
      "Language Activities": t('activities.languageActivities'),
      "LANGUAGES": t('activities.languageActivities'),
      "Interior": t('activities.interior'),
      "HOBBIES": t('activities.interior'),
      "BUSINESS": t('activities.interior'),
      "LIFESTYLE": t('activities.interior'),
      "NATURE": t('activities.interior'),
      "Personal Development": t('activities.interior'),
      "Relationships": t('activities.interior'),
      "Games & Entertainment": t('activities.gamesEntertainment'),
      "ENTERTAINMENT": t('activities.gamesEntertainment'),
      
      // Art subcategories
      "Painting": t('activities.painting'),
      "Sculpture": t('activities.sculpture'),
      "Photography": t('activities.photography'),
      "Cinema & Film Art": t('activities.cinemaFilmArt'),
      "Street Art & Murals": t('activities.streetArtMurals'),
      "Illustration & Comics": t('activities.illustrationComics'),
      "Calligraphy & Typography": t('activities.calligraphyTypography'),
      "Architecture as Art": t('activities.architectureAsArt'),
      "Performance Art": t('activities.performanceArt'),
      "Installation Art": t('activities.installationArt'),
      "Ceramics & Pottery": t('activities.ceramicsPottery'),
      "Art History & Movements": t('activities.artHistoryMovements'),
      
      // Music subcategories
      "Classical Music": t('activities.classicalMusic'),
      "Jazz & Blues": t('activities.jazzBlues'),
      "World Music": t('activities.worldMusic'),
      "Latin Music": t('activities.latinMusic'),
      "Contemporary & Pop Music": t('activities.contemporaryPopMusic'),
      "Folk & Traditional Music": t('activities.folkTraditionalMusic'),
      "Opera & Vocal Arts": t('activities.operaVocalArts'),
      "Instrumental Performance": t('activities.instrumentalPerformance'),
      "Music Appreciation & History": t('activities.musicAppreciationHistory'),
      
      // Sports subcategories
      "Martial Arts": t('activities.martialArts'),
      "Team Sports": t('activities.teamSports'),
      "Tennis & Racket Sports": t('activities.tennisRacketSports'),
      "Winter Sports": t('activities.winterSports'),
      "Adventure Sports": t('activities.adventureSports'),
      "Watersports": t('activities.watersports'),
      "Swimming": t('activities.swimming'),
      "Cycling": t('activities.cycling'),
      "Running & Jogging": t('activities.runningJogging'),
      "Climbing & Bouldering": t('activities.climbingBouldering'),
      
      // Fan subcategories
      "Musical Icons": t('activities.musicalIcons'),
      "Movie Legends": t('activities.movieLegends'),
      "Writers & Thinkers": t('activities.writersThinkers'),
      "Artists": t('activities.artists'),
      "Spiritual or Historic Figures": t('activities.spiritualHistoricFigures'),
      
      // Food & Health subcategories
      "Cooking & Food": t('activities.cookingFood'),
      "Wellness & Care": t('activities.wellnessCare')
    };

    const translatedText = affinityTranslations[name];
    console.log(`Affinity Translation Mapping: "${name}" -> "${translatedText}"`);
    return translatedText || name;
  };

  // Don't render until i18n is ready to avoid English fallbacks
  if (loading || !isReady) {
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
