
import React, { useState, useEffect } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ActivitiesSectionProps {
  selectedActivities: string[];
  onActivityChange: (activity: string, isChecked: boolean) => void;
}

interface ActivityCategory {
  name: string;
  activities: Activity[];
}

interface Activity {
  id: string;
  name: string;
  category: string;
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({
  selectedActivities,
  onActivityChange,
}) => {
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [activityCategories, setActivityCategories] = useState<ActivityCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('activities')
        .select('id, name, category')
        .order('name');
      
      if (error) {
        console.error("Error fetching activities:", error);
        toast({
          title: "Error loading activities",
          description: "There was a problem loading activities. Please try again.",
          variant: "destructive"
        });
        return;
      }

      if (data) {
        // Group by category
        const groupedActivities: {[key: string]: Activity[]} = {};
        
        data.forEach(activity => {
          const category = activity.category || 'Other';
          if (!groupedActivities[category]) {
            groupedActivities[category] = [];
          }
          groupedActivities[category].push(activity);
        });
        
        // Convert to array of categories
        const categoriesArray: ActivityCategory[] = Object.keys(groupedActivities).map(key => ({
          name: key,
          activities: groupedActivities[key]
        }));
        
        setActivityCategories(categoriesArray);
        console.log("Fetched activities:", categoriesArray);
      }
    } catch (err) {
      console.error("Error in fetchActivities:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

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
          
          {isLoading ? (
            <div className="flex justify-center p-4">
              <div className="animate-pulse text-fuchsia-300">Loading activities...</div>
            </div>
          ) : activityCategories.length > 0 ? (
            activityCategories.map((category) => (
              <div key={category.name} className="bg-[#860493]/50 rounded-sm mb-1">
                <div 
                  className="flex items-center justify-between cursor-pointer px-2 py-1"
                  onClick={() => toggleCategory(category.name)}
                >
                  <span className="text-sm font-medium text-fuchsia-200">{category.name}</span>
                  <ChevronRight 
                    className={`h-4 w-4 transition-transform ${openCategories.includes(category.name) ? 'rotate-90' : ''}`} 
                  />
                </div>
                
                {openCategories.includes(category.name) && (
                  <div className="space-y-1 ml-3 py-1">
                    {category.activities.map(activity => (
                      <label key={activity.id} className="flex items-start">
                        <input 
                          type="checkbox" 
                          checked={selectedActivities.includes(activity.id)}
                          onChange={(e) => onActivityChange(activity.id, e.target.checked)}
                          className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                        />
                        <span className="text-sm">{activity.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-fuchsia-300 p-4">
              No activities found. Please check your database configuration.
            </div>
          )}
          
          {/* Add Custom Activities Section - Now integrated within the main Activities block */}
          <div className="mt-6 border-t border-fuchsia-800/30 pt-4">
            <h3 className="text-sm font-medium uppercase mb-4">Add Custom Activity</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium leading-none text-white">Activity Name</label>
                <input
                  type="text"
                  placeholder="e.g. Local Pottery Workshop"
                  className="flex h-9 w-full rounded-md border border-input bg-fuchsia-950/30 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white"
                />
              </div>
              <div>
                <label className="text-sm font-medium leading-none text-white">Description</label>
                <textarea
                  placeholder="Describe the activity..."
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-fuchsia-950/30 px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium leading-none text-white">Duration (hours)</label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    placeholder="2"
                    className="flex h-9 w-full rounded-md border border-input bg-fuchsia-950/30 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium leading-none text-white">Price ($)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="25"
                    className="flex h-9 w-full rounded-md border border-input bg-fuchsia-950/30 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white"
                  />
                </div>
              </div>
              <button className="w-full py-2 text-sm bg-fuchsia-900/30 hover:bg-fuchsia-900/50 border border-fuchsia-500/30 rounded-lg uppercase">
                Add Custom Activity
              </button>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
