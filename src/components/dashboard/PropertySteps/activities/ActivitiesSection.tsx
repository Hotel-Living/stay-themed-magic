
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
          // Verify each activity has a valid UUID id
          const validUUIDRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
          const validActivities = data.filter(activity => {
            const isValid = activity && activity.id && 
                            typeof activity.id === 'string' && 
                            validUUIDRegex.test(activity.id);
            
            if (!isValid) {
              console.warn("Skipping activity with invalid ID:", activity);
            }
            return isValid;
          });
          
          setActivities(validActivities);
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
    // Skip if activity has no id or invalid id
    if (!activity || !activity.id) return acc;
    
    const validUUIDRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!validUUIDRegex.test(activity.id)) {
      console.error(`Invalid activity ID detected during grouping: ${activity.id}`);
      return acc;
    }
    
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
    
    // Verify if all selected activities are valid UUIDs
    if (selectedActivities && selectedActivities.length > 0) {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      const invalidIds = selectedActivities.filter(id => !id || !uuidRegex.test(id));
      
      if (invalidIds.length > 0) {
        console.error("Found invalid activity IDs:", invalidIds);
      }
    }
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
                    {categoryActivities.map(activity => {
                      // Skip rendering if activity ID is invalid
                      if (!activity.id) return null;
                      
                      const validUUIDRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
                      if (!validUUIDRegex.test(activity.id)) {
                        console.error(`Skipping rendering of activity with invalid ID: ${activity.id}`);
                        return null;
                      }
                      
                      return (
                        <label key={activity.id} className="flex items-start">
                          <input 
                            type="checkbox" 
                            checked={selectedActivities.includes(activity.id)}
                            onChange={(e) => {
                              console.log(`Activity change - ID: ${activity.id}, Name: ${activity.name}, Checked: ${e.target.checked}`);
                              onActivityChange(activity.id, e.target.checked);
                            }}
                            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                          />
                          <span className="text-sm">{activity.name}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            ))
          )}
          
          {/* Custom Activities Section - TEMPORARILY DISABLED */}
          {/* Note: This section was causing UUID validation issues and has been disabled */}
          <div className="mt-6 border-t border-fuchsia-800/30 pt-4">
            <h3 className="text-sm font-medium uppercase mb-4">Custom Activities (Temporarily Unavailable)</h3>
            <div className="p-4 bg-fuchsia-900/20 rounded-md text-center">
              <p className="text-sm text-fuchsia-200">
                Custom activities are temporarily disabled for maintenance.
                Please select from the available activities above.
              </p>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export { ActivitiesSection };
