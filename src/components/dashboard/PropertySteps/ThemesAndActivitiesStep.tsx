import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { sortedThemeCategories } from "./themes/themeData";
import ThemeCategory from "./themes/ThemeCategory";
import { useToast } from "@/hooks/use-toast";
import StepFour from "./StepFour";

interface ThemesAndActivitiesStepProps {
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function ThemesAndActivitiesStep({
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {}
}: ThemesAndActivitiesStepProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [selectedThemes, setSelectedThemes] = useState<string[]>(formData.themes || []);
  const { toast } = useToast();
  
  const handleThemeSelection = (themeId: string, isSelected: boolean) => {
    setSelectedThemes(prev => {
      let newThemes;
      if (isSelected) {
        if (!prev.includes(themeId)) {
          toast({
            title: "Theme selected",
            description: "The theme has been added to your selection"
          });
        }
        newThemes = [...prev.filter(id => id !== themeId), themeId];
      } else {
        newThemes = prev.filter(id => id !== themeId);
      }
      
      if (updateFormData) {
        updateFormData('themes', newThemes);
      }
      
      return newThemes;
    });
  };

  useEffect(() => {
    const isValid = selectedThemes.length > 0;
    onValidationChange(isValid);
  }, [selectedThemes, onValidationChange]);
  
  return (
    <div className="space-y-8">
      <div>
        <label className="block text-2xl font-bold text-foreground/90 mb-2 uppercase bg-[#6c0686]">
          AFFINITIES
        </label>
        
        <p className="text-sm text-foreground/90 mb-4">
          Make your hotel stand out from the competition boosting it with group affinities to attract your best and perfect guests
        </p>
        
        <Link 
          to="/themes-information" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors mb-4 bg-[#e108fd]/80 hover:bg-[#e108fd]"
        >
          More Information
        </Link>
        
        <div>
          <div className="grid grid-cols-1 gap-0.5">
            {sortedThemeCategories.map(category => (
              <ThemeCategory 
                key={category.category} 
                category={category} 
                isOpen={openCategory === category.category} 
                toggleCategory={setOpenCategory} 
                openSubmenus={{[openSubmenu || '']: !!openSubmenu}} 
                toggleSubmenu={setOpenSubmenu}
                onThemeSelect={handleThemeSelection} 
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <StepFour 
          onValidationChange={onValidationChange}
          formData={formData}
          updateFormData={updateFormData}
        />
      </div>
    </div>
  );
}
