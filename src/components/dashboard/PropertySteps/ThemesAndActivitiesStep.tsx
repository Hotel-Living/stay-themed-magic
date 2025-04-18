
import React, { useState, useEffect } from "react";
import { useThemes } from "@/hooks/useThemes";
import DirectThemes from "./themes/DirectThemes";
import ThemeCategory from "./themes/ThemeCategory";
import { themeCategories } from "./themes/themeData";

interface ThemesAndActivitiesStepProps {
  onValidationChange: (isValid: boolean, data?: any) => void;
  initialData?: {
    themes?: string[];
    activities?: string[];
  };
}

export default function ThemesAndActivitiesStep({
  onValidationChange,
  initialData,
}: ThemesAndActivitiesStepProps) {
  const [selectedThemes, setSelectedThemes] = useState<string[]>(
    initialData?.themes || []
  );
  const [selectedActivities, setSelectedActivities] = useState<string[]>(
    initialData?.activities || []
  );
  const { data: allThemes, isLoading } = useThemes();

  // Organize themes by type
  const featuredThemes = themeCategories.find(
    (cat) => cat.id === "featured"
  )?.themes || [];
  const popularThemes = themeCategories.find(
    (cat) => cat.id === "popular"
  )?.themes || [];

  // Handle theme selection
  const handleThemeSelect = (themeId: string) => {
    setSelectedThemes((prev) => {
      if (prev.includes(themeId)) {
        return prev.filter((id) => id !== themeId);
      } else {
        return [...prev, themeId];
      }
    });
  };

  // Handle activity selection
  const handleActivitySelect = (activityId: string, isSelected: boolean) => {
    setSelectedActivities((prev) => {
      if (isSelected) {
        if (!prev.includes(activityId)) {
          return [...prev, activityId];
        }
        return prev;
      } else {
        return prev.filter((id) => id !== activityId);
      }
    });
  };

  // Validate when selections change
  useEffect(() => {
    const isValid =
      selectedThemes.length > 0 && selectedActivities.length > 0;
    
    // Pass validation state and data to parent
    onValidationChange(isValid, {
      themes: selectedThemes,
      activities: selectedActivities,
    });
  }, [selectedThemes, selectedActivities, onValidationChange]);

  if (isLoading) {
    return <div>Loading themes...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Featured Themes Section */}
      <div>
        <h3 className="text-lg font-medium mb-4">Featured Themes</h3>
        <p className="text-sm mb-4">
          Select the themes that best describe your property's unique
          characteristics.
        </p>

        <DirectThemes
          themes={featuredThemes}
          onThemeSelect={handleThemeSelect}
          selectedThemes={selectedThemes}
        />
      </div>

      {/* Popular Themes Section */}
      <div>
        <h3 className="text-lg font-medium mb-4">Popular Themes</h3>
        <p className="text-sm mb-4">
          Select additional themes that apply to your property.
        </p>

        <DirectThemes
          themes={popularThemes}
          onThemeSelect={handleThemeSelect}
          selectedThemes={selectedThemes}
        />
      </div>

      {/* All Theme Categories */}
      <div>
        <h3 className="text-lg font-medium mb-4">All Themes</h3>
        <p className="text-sm mb-4">Browse all available themes by category.</p>

        <div className="space-y-4">
          {themeCategories
            .filter((cat) => cat.id !== "featured" && cat.id !== "popular")
            .map((category) => (
              <ThemeCategory
                key={category.id}
                category={category}
                selectedThemes={selectedThemes}
                onThemeSelect={handleThemeSelect}
              />
            ))}
        </div>
      </div>

      {/* Activities Section */}
      <div>
        <h3 className="text-lg font-medium mb-4">Activities</h3>
        <p className="text-sm mb-4">
          Select the activities available at or near your property.
        </p>

        <div className="space-y-4">
          {themeCategories
            .filter((cat) => cat.id === "activities")
            .map((category) => (
              <ThemeCategory
                key={category.id}
                category={category}
                selectedThemes={selectedActivities}
                onThemeSelect={handleActivitySelect}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
