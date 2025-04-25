import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import DirectThemes from "./themes/DirectThemes";
import { AffinitiesSection } from "./themes/AffinitiesSection";
import { ActivitiesSection } from "./activities/ActivitiesSection";
import { supabase } from "@/integrations/supabase/client";
import { filterValidUuids } from "@/utils/validation";

// Simple primitive type for form data
type FormValues = {
  themes: string[];
  activities: string[];
};

interface ThemesAndActivitiesStepProps {
  onValidationChange?: (isValid: boolean) => void;
  formData?: FormValues;
  updateFormData: (field: string, value: string[]) => void;
}

export default function ThemesAndActivitiesStep({
  onValidationChange = () => {},
  formData = { themes: [], activities: [] },
  updateFormData
}: ThemesAndActivitiesStepProps) {
  // @ts-ignore TS2589: bypass deep type instantiation
  const { setValue } = useForm<any>();
  const [selectedThemes, setSelectedThemes] = useState<string[]>(formData.themes || []);
  const [selectedActivities, setSelectedActivities] = useState<string[]>(formData.activities || []);
  const [isValid, setIsValid] = useState(false);
  const { toast } = useToast();
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [directThemes, setDirectThemes] = useState<{ id: string; name: string }[]>([]);

  // Load direct themes from the database
  useEffect(() => {
    const fetchDirectThemes = async () => {
      try {
        const { data, error } = await supabase
          .from('themes')
          .select('id, name')
          .eq('category', 'Featured')
          .order('name');
          
        if (error) {
          console.error("Error fetching direct themes:", error);
          toast({
            title: "Error loading themes",
            description: "There was a problem loading themes. Please try again.",
            variant: "destructive"
          });
          return;
        }
        
        if (data) {
          setDirectThemes(data);
        }
      } catch (err) {
        console.error("Error in fetchDirectThemes:", err);
      }
    };
    
    fetchDirectThemes();
  }, []);

  // Update local state when formData changes
  useEffect(() => {
    setSelectedThemes(formData.themes || []);
    setSelectedActivities(formData.activities || []);
  }, [formData.themes, formData.activities]);

  useEffect(() => {
    const validThemes = filterValidUuids(selectedThemes);
    const validActivities = filterValidUuids(selectedActivities);
    
    // Directly update form data with primitive arrays
    updateFormData('themes', validThemes);
    updateFormData('activities', validActivities);
    
    const valid = validThemes.length > 0 && validActivities.length > 0;
    setIsValid(valid);
    onValidationChange(valid);
  }, [selectedThemes, selectedActivities]);

  const handleThemeSelect = (themeId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedThemes(prev => [...prev, themeId]);
    } else {
      setSelectedThemes(prev => prev.filter(id => id !== themeId));
    }
  };

  const handleActivityChange = (activityId: string, isChecked: boolean) => {
    setSelectedActivities(prev => 
      isChecked 
        ? [...prev, activityId]
        : prev.filter(a => a !== activityId)
    );
  };

  return (
    <div className="space-y-6 max-w-[80%]">
      <div className="space-y-8">
        <DirectThemes 
          themes={directThemes}
          selectedThemes={selectedThemes} 
          onThemeSelect={handleThemeSelect}
        />
        
        <AffinitiesSection 
          selectedThemes={selectedThemes}
          onThemeSelect={handleThemeSelect}
          openCategory={openCategory}
          setOpenCategory={setOpenCategory}
          openSubmenu={openSubmenu}
          setOpenSubmenu={setOpenSubmenu}
        />
        
        <ActivitiesSection 
          selectedActivities={selectedActivities}
          onActivityChange={handleActivityChange}
        />
      </div>
    </div>
  );
}
