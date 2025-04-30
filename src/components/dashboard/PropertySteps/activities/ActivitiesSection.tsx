
import React, { useState, useEffect } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ActivitiesSectionProps {
  selectedActivities: string[];
  onActivityChange: (activityId: string, isChecked: boolean) => void;
}

interface Activity {
  id: string;
  name: string;
  category: string;
}

const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({
  selectedActivities,
  onActivityChange,
}) => {
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data, error } = await supabase
          .from('activities')
          .select('id, name, category')
          .order('name');
        
        if (error) {
          console.error("Error fetching activities:", error);
          toast({
            title: "Error loading activities",
            description: "Please try refreshing the page.",
            variant: "destructive",
          });
          return;
        }

        if (data && data.length > 0) {
          console.log("Fetched activities:", data);
          setActivities(data);
        } else {
          console.log("No activities found in the database");
        }
      } catch (error) {
        console.error("Exception fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [toast]);

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  // Group activities by category
  const groupedActivities = activities.reduce<Record<string, Activity[]>>((acc, activity) => {
    const category = activity.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(activity);
    return acc;
  }, {});

  // Debug selected activities
  useEffect(() => {
    console.log("Current selected activities (ActivitiesSection):", selectedActivities);
  }, [selectedActivities]);

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
          
          {loading ? (
            <p>Loading activities...</p>
          ) : activities.length === 0 ? (
            <p>No activities available. Please contact an administrator.</p>
          ) : (
            Object.entries(groupedActivities).map(([category, categoryActivities]) => (
              <div key={category} className="bg-[#860493]/50 rounded-sm mb-1">
                <div 
                  className="flex items-center justify-between cursor-pointer px-2 py-1"
                  onClick={() => toggleCategory(category)}
                >
                  <span className="text-sm font-medium text-fuchsia-200">{category}</span>
                  <ChevronRight 
                    className={`h-4 w-4 transition-transform ${openCategories.includes(category) ? 'rotate-90' : ''}`} 
                  />
                </div>
                
                {openCategories.includes(category) && (
                  <div className="space-y-1 ml-3 py-1">
                    {categoryActivities.map(activity => (
                      <label key={activity.id} className="flex items-start">
                        <input 
                          type="checkbox" 
                          checked={selectedActivities.includes(activity.id)}
                          onChange={(e) => {
                            console.log(`Activity ${activity.id} (${activity.name}) ${e.target.checked ? 'selected' : 'deselected'}`);
                            onActivityChange(activity.id, e.target.checked);
                          }}
                          className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                        />
                        <span className="text-sm">{activity.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))
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

export { ActivitiesSection };
