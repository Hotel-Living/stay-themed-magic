import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { sortedThemeCategories } from "./themes/themeData";
import ThemeCategory from "./themes/ThemeCategory";
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import StepFour from "./StepFour";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  const [selectedActivities, setSelectedActivities] = useState<string[]>(formData.activities || []);
  
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

  const handleActivityChange = (activity: string, isChecked: boolean) => {
    setSelectedActivities(prev => {
      if (isChecked) {
        return [...prev, activity];
      }
      return prev.filter(a => a !== activity);
    });
  };

  const activityCategories = {
    'Sports': [
      'Tennis', 'Golf', 'Swimming', 'Hiking', 'Cycling', 'Yoga', 'Gym'
    ],
    'Arts & Culture': [
      'Painting Classes', 'Cooking Classes', 'Photography Tours', 
      'Local Crafts', 'Dance Classes', 'Music Lessons'
    ],
    'Wellness': [
      'Spa Services', 'Meditation', 'Massage', 'Hot Springs'
    ],
    'Entertainment': [
      'Board Games', 'Movie Nights', 'Live Music', 'Wine Tasting'
    ],
    'Nature & Adventure': [
      'Bird Watching', 'Garden Tours', 'Nature Walks', 'Stargazing'
    ]
  };
  
  return (
    <div className="space-y-8">
      {/* Affinities Section */}
      <Collapsible className="w-full">
        <div className="bg-[#6c0686]">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2">
            <label className="block text-2xl font-bold text-foreground/90 uppercase">
              AFFINITIES
            </label>
            <ChevronDown className="h-5 w-5 text-white" />
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent>
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
        </CollapsibleContent>
      </Collapsible>

      {/* Activities Section */}
      <div className="mt-8 space-y-6">
        <Collapsible className="w-full">
          <div className="bg-fuchsia-900/10">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2">
              <h2 className="text-xl font-bold">ACTIVITIES</h2>
              <ChevronDown className="h-5 w-5 text-white" />
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent className="space-y-6">
            {/* Activities Categories */}
            <div className="bg-fuchsia-900/10 rounded-lg p-4">
              <h3 className="text-sm font-medium mb-4 uppercase">Select Available Activities</h3>
              
              {Object.entries(activityCategories).map(([category, activities]) => (
                <Collapsible key={category} className="w-full mb-4">
                  <CollapsibleTrigger className="flex items-center justify-between w-full">
                    <h4 className="text-sm font-medium text-fuchsia-200">{category}</h4>
                    <ChevronDown className="h-4 w-4 text-fuchsia-200" />
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 ml-2 mt-2">
                      {activities.map((activity) => (
                        <div key={activity} className="flex items-center space-x-2">
                          <input 
                            type="checkbox"
                            id={`activity-${activity}`}
                            checked={selectedActivities.includes(activity)}
                            onChange={(e) => handleActivityChange(activity, e.target.checked)}
                            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4"
                          />
                          <label 
                            htmlFor={`activity-${activity}`}
                            className="text-sm text-white"
                          >
                            {activity}
                          </label>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>

            {/* Custom Activities Section */}
            <Collapsible className="w-full">
              <div className="bg-fuchsia-900/10 rounded-lg">
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4">
                  <h3 className="text-sm font-medium uppercase">Add Custom Activities</h3>
                  <ChevronDown className="h-4 w-4 text-white" />
                </CollapsibleTrigger>
                
                <CollapsibleContent className="p-4 pt-0">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="activity-name">Activity Name</Label>
                      <Input id="activity-name" placeholder="e.g. Local Pottery Workshop" className="bg-fuchsia-950/30" />
                    </div>
                    <div>
                      <Label htmlFor="activity-description">Description</Label>
                      <Textarea id="activity-description" placeholder="Describe the activity..." className="bg-fuchsia-950/30" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="activity-duration">Duration (hours)</Label>
                        <Input id="activity-duration" type="number" min="0.5" step="0.5" placeholder="2" className="bg-fuchsia-950/30" />
                      </div>
                      <div>
                        <Label htmlFor="activity-price">Price ($)</Label>
                        <Input id="activity-price" type="number" min="0" placeholder="25" className="bg-fuchsia-950/30" />
                      </div>
                    </div>
                    <button className="w-full py-2 text-sm bg-fuchsia-900/30 hover:bg-fuchsia-900/50 border border-fuchsia-500/30 rounded-lg uppercase">
                      Add Custom Activity
                    </button>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </CollapsibleContent>
        </Collapsible>
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
