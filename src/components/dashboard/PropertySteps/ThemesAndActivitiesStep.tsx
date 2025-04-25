
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import DirectThemes from "./themes/DirectThemes";
import { AffinitiesSection } from "./themes/AffinitiesSection";
import { ActivitiesSection } from "./activities/ActivitiesSection";
import { supabase } from "@/integrations/supabase/client";

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
  const [selectedThemes, setSelectedThemes] = useState<string[]>(formData.themes || []);
  const [selectedActivities, setSelectedActivities] = useState<string[]>(formData.activities || []);
  const [isValid, setIsValid] = useState(false);
  const { toast } = useToast();
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [directThemes, setDirectThemes] = useState<any[]>([]);

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
    if (formData.themes && formData.themes.length > 0) {
      setSelectedThemes(formData.themes);
    }
    
    if (formData.activities && formData.activities.length > 0) {
      setSelectedActivities(formData.activities);
    }
  }, [formData.themes, formData.activities]);

  // Update parent form data when local state changes
  useEffect(() => {
    // Validate that each theme ID is a valid UUID before updating form data
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const validThemes = selectedThemes.filter(themeId => themeId && uuidRegex.test(themeId));
    const validActivities = selectedActivities.filter(activityId => activityId && uuidRegex.test(activityId));
    
    updateFormData('themes', validThemes);
    updateFormData('activities', validActivities);
    
    // Validate - at least one theme and one activity must be selected
    const valid = validThemes.length > 0 && validActivities.length > 0;
    setIsValid(valid);
    onValidationChange(valid);
  }, [selectedThemes, selectedActivities, updateFormData, onValidationChange]);

  const handleThemeSelect = (themeId: string, isSelected: boolean) => {
    // Ensure themeId is a valid UUID before adding it
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (themeId && uuidRegex.test(themeId)) {
      if (isSelected) {
        setSelectedThemes(prev => [...prev, themeId]);
      } else {
        setSelectedThemes(prev => prev.filter(id => id !== themeId));
      }
    } else if (isSelected) {
      toast({
        title: "Invalid Theme ID",
        description: "The selected theme has an invalid ID format and cannot be added.",
        variant: "destructive"
      });
    }
  };

  const handleActivityChange = (activityId: string, isChecked: boolean) => {
    // Ensure activityId is a valid UUID before adding it
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (activityId && uuidRegex.test(activityId)) {
      setSelectedActivities(prev => 
        isChecked 
          ? [...prev, activityId]
          : prev.filter(a => a !== activityId)
      );
    } else if (isChecked) {
      toast({
        title: "Invalid Activity ID",
        description: "The selected activity has an invalid ID format and cannot be added.",
        variant: "destructive"
      });
    }
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
