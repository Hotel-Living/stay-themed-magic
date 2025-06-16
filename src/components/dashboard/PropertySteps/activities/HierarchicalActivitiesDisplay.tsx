
import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useHierarchicalActivities } from "@/hooks/useHierarchicalActivities";

interface HierarchicalActivitiesDisplayProps {
  selectedActivities: string[];
  onActivityChange: (activity: string, isChecked: boolean) => void;
}

export const HierarchicalActivitiesDisplay: React.FC<HierarchicalActivitiesDisplayProps> = ({
  selectedActivities,
  onActivityChange
}) => {
  const { t } = useTranslation();
  const { activities, loading } = useHierarchicalActivities();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const getTranslatedActivityName = (name: string) => {
    // Create a comprehensive mapping for ALL activity translations
    const activityTranslations: { [key: string]: string } = {
      // Main categories
      "Interior": t('activities.interior'),
      "Art & Creativity": t('activities.artCreativity'),
      "Cinema & Media": t('activities.cinemaMedia'),
      "Cooking & Food": t('activities.cookingFood'),
      "Fitness & Movement": t('activities.fitnessMovement'),
      "Games & Entertainment": t('activities.gamesEntertainment'),
      "Language Activities": t('activities.languageActivities'),
      "Learning & Talks": t('activities.learningTalks'),
      "Mind & Balance": t('activities.mindBalance'),
      "Music & Stage": t('activities.musicStage'),
      "Tech & Science": t('activities.techScience'),
      "Wellness & Care": t('activities.wellnessCare'),
      
      // Art subcategories
      "Art": t('activities.art'),
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
      
      // Fan categories
      "Fanatics": t('activities.fanatics'),
      "Musical Icons": t('activities.musicalIcons'),
      "Movie Legends": t('activities.movieLegends'),
      "Writers & Thinkers": t('activities.writersThinkers'),
      "Artists": t('activities.artists'),
      "Spiritual or Historic Figures": t('activities.spiritualHistoricFigures'),
      
      // Sports categories
      "Sports": t('activities.sports'),
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
      "Martial Arts (karate, judo, taekwondo, etc.)": t('activities.martialArtsKarateJudoTaekwondo'),
      "Team Sports (soccer, basketball, volleyball, etc.)": t('activities.teamSportsSoccerBasketballVolleyball'),
      
      // Music categories
      "Music": t('activities.music'),
      "Classical Music (Mozart, Beethoven, Bach, etc.)": t('activities.classicalMusic'),
      "Jazz & Blues": t('activities.jazzBlues'),
      "World Music": t('activities.worldMusic'),
      "Latin Music": t('activities.latinMusic'),
      "Contemporary & Pop Music": t('activities.contemporaryPopMusic'),
      "Folk & Traditional Music": t('activities.folkTraditionalMusic'),
      "Opera & Vocal Arts": t('activities.operaVocalArts'),
      "Instrumental Performance": t('activities.instrumentalPerformance'),
      "Music Appreciation & History": t('activities.musicAppreciationHistory'),
      
      // Food & Health categories
      "Food & Drinks": t('activities.foodDrinks'),
      "Health and Wellness": t('activities.healthWellness')
    };

    return activityTranslations[name] || name;
  };

  if (loading) {
    return <div>{t('common.loading')}</div>;
  }

  return (
    <div className="space-y-4">
      {activities.map((category) => (
        <div key={category.id}>
          <button
            type="button"
            onClick={() => toggleCategory(category.id)}
            className="flex items-center space-x-2 text-white hover:text-white/80"
          >
            {expandedCategories[category.id] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            <span>{getTranslatedActivityName(category.name)}</span>
          </button>
          {expandedCategories[category.id] && (
            <div className="ml-6 mt-2 space-y-2">
              {category.children && category.children.length > 0 ? (
                <div className="space-y-1">
                  {category.children.map((activity) => (
                    <label key={activity.id} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={selectedActivities.includes(activity.id)}
                        onChange={(e) => onActivityChange(activity.id, e.target.checked)}
                        className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50"
                      />
                      <span className="text-sm text-white/80">{getTranslatedActivityName(activity.name)}</span>
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
  );
};
