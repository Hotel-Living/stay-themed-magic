
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, Info } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

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
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [selectedAffinities, setSelectedAffinities] = useState<string[]>(selectedThemes);

  const affinityCategories = [
    { key: 'art', label: t('affinities.art') },
    { key: 'fans', label: t('affinities.fans') },
    { key: 'sports', label: t('affinities.sports') },
    { key: 'foodAndDrinks', label: t('affinities.foodAndDrinks') },
    { key: 'music', label: t('affinities.music') },
    { key: 'healthAndWellness', label: t('affinities.healthAndWellness') },
    { key: 'education', label: t('affinities.education') },
    { key: 'technology', label: t('affinities.technology') }
  ];

  useEffect(() => {
    if (formData.selectedAffinities) {
      setSelectedAffinities(formData.selectedAffinities);
    }
  }, [formData.selectedAffinities]);

  useEffect(() => {
    setSelectedAffinities(selectedThemes);
  }, [selectedThemes]);

  const toggleCategory = (categoryKey: string) => {
    if (setOpenCategory) {
      setOpenCategory(openCategory === categoryKey ? null : categoryKey);
    } else {
      setExpandedCategories(prev => ({
        ...prev,
        [categoryKey]: !prev[categoryKey]
      }));
    }
  };

  const isExpanded = (categoryKey: string) => {
    return openCategory ? openCategory === categoryKey : expandedCategories[categoryKey];
  };

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
          {affinityCategories.map((category) => (
            <div key={category.key}>
              <button
                type="button"
                onClick={() => toggleCategory(category.key)}
                className="flex items-center space-x-2 text-white hover:text-white/80 font-medium"
              >
                {isExpanded(category.key) ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                <span>{category.label}</span>
              </button>
              
              {isExpanded(category.key) && (
                <div className="ml-6 mt-2 space-y-2">
                  {/* Subcategories would be listed here */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
