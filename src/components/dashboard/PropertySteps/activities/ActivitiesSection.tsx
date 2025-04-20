
import React from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface ActivitiesSectionProps {
  selectedActivities: string[];
  onActivityChange: (activity: string, isChecked: boolean) => void;
}

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

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({
  selectedActivities,
  onActivityChange,
}) => {
  return (
    <Collapsible defaultOpen={false} className="w-full">
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
            <Collapsible key={category} className="w-full mb-4" defaultOpen={false}>
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
                        onChange={(e) => onActivityChange(activity, e.target.checked)}
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
      </CollapsibleContent>
    </Collapsible>
  );
};
