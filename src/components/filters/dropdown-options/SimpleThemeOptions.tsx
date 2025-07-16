
import React from "react";
import { FilterState } from "../FilterTypes";
import { useTranslation } from "@/hooks/useTranslation";

interface SimpleThemeOptionsProps {
  type: keyof FilterState;
  fontSize: string;
}

export const SimpleThemeOptions: React.FC<SimpleThemeOptionsProps> = ({ type, fontSize }) => {
  const { t } = useTranslation('filters');
  
  const themeCategories = [
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
  
  return (
    <div className="grid grid-cols-1">
      {themeCategories.map((category) => (
        <button
          key={category.key}
          onClick={() => document.dispatchEvent(new CustomEvent('updateFilter', { 
            detail: { key: 'theme', value: { id: category.key.toLowerCase(), name: t(category.translationKey.replace('filters.', '')) } } 
          }))}
          className={`text-left px-3 py-2 rounded-md ${fontSize} font-bold transition-colors hover:bg-[#460F54]`}
        >
          {t(category.translationKey.replace('filters.', ''))}
        </button>
      ))}
    </div>
  );
}
