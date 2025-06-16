
import React from 'react';
import { useTranslation } from 'react-i18next';
import HierarchicalActivitiesDisplay from '../activities/HierarchicalActivitiesDisplay';

const AffinitiesSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="affinities-section">
      <h2>2.1 - {t('affinities.title')}</h2>
      <p>{t('affinities.description')}</p>

      <HierarchicalActivitiesDisplay
        titleKey="activities.art"
        subcategories={[
          { key: 'painting' },
          { key: 'sculpture' },
          { key: 'photography' },
          { key: 'cinemaFilmArt' },
          { key: 'streetArtMurals' },
          { key: 'illustrationComics' },
          { key: 'calligraphyTypography' },
          { key: 'architectureAsArt' },
          { key: 'performanceArt' },
          { key: 'installationArt' },
          { key: 'ceramicsPottery' },
          { key: 'artHistoryMovements' },
        ]}
      />

      <HierarchicalActivitiesDisplay
        titleKey="activities.music"
        subcategories={[
          { key: 'classicalMusic' },
          { key: 'jazzBlues' },
          { key: 'worldMusic' },
          { key: 'latinMusic' },
          { key: 'contemporaryPopMusic' },
          { key: 'folkTraditionalMusic' },
          { key: 'operaVocalArts' },
          { key: 'instrumentalPerformance' },
          { key: 'musicAppreciationHistory' },
        ]}
      />

      <HierarchicalActivitiesDisplay
        titleKey="activities.foodDrinks"
        subcategories={[
          { key: 'worldCuisines' },
          { key: 'cookingClasses' },
          { key: 'beveragesTasting' },
        ]}
      />

      <HierarchicalActivitiesDisplay
        titleKey="activities.fanatics"
        subcategories={[
          { key: 'musicalIcons' },
          { key: 'movieLegends' },
          { key: 'writersThinkers' },
          { key: 'artists' },
          { key: 'spiritualHistoricFigures' },
        ]}
      />

      <HierarchicalActivitiesDisplay
        titleKey="activities.sports"
        subcategories={[
          { key: 'martialArts' },
          { key: 'teamSports' },
          { key: 'tennisRacketSports' },
          { key: 'winterSports' },
          { key: 'adventureSports' },
          { key: 'watersports' },
          { key: 'swimming' },
          { key: 'cycling' },
          { key: 'runningJogging' },
          { key: 'climbingBouldering' },
          { key: 'martialArtsKarateJudoTaekwondo' },
          { key: 'teamSportsSoccerBasketballVolleyball' },
        ]}
      />
    </div>
  );
};

export default AffinitiesSection;
