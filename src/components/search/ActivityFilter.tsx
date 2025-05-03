
import { FilterItem } from "./FilterItem";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ActivityFilterProps {
  activeActivities: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

interface ActivityItem {
  id: string;
  name: string;
  category?: string;
}

export function ActivityFilter({ 
  activeActivities, 
  onChange 
}: ActivityFilterProps) {
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [dbActivities, setDbActivities] = useState<ActivityItem[]>([]);
  const [categorizedActivities, setCategorizedActivities] = useState<Record<string, ActivityItem[]>>({});
  const [loading, setLoading] = useState(true);

  // Fetch activities from the database
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data, error } = await supabase
          .from('activities')
          .select('*')
          .order('name');
        
        if (error) {
          throw error;
        }

        const activities = data as ActivityItem[];
        setDbActivities(activities);
        
        // Categorize activities
        const categorized: Record<string, ActivityItem[]> = {};
        activities.forEach(activity => {
          const category = activity.category || 'Other';
          if (!categorized[category]) {
            categorized[category] = [];
          }
          categorized[category].push(activity);
        });
        
        setCategorizedActivities(categorized);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Fallback activity categories if DB fetch fails
  const activityCategories = {
    'Sports': ['Tennis', 'Golf', 'Swimming', 'Hiking', 'Cycling', 'Yoga', 'Gym'],
    'Arts & Culture': ['Painting Classes', 'Cooking Classes', 'Photography Tours', 'Local Crafts', 'Dance Classes', 'Music Lessons'],
    'Wellness': ['Spa Services', 'Meditation', 'Massage', 'Hot Springs'],
    'Entertainment': ['Board Games', 'Movie Nights', 'Live Music', 'Wine Tasting'],
    'Nature & Adventure': ['Bird Watching', 'Garden Tours', 'Nature Walks', 'Stargazing']
  };

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const hasDbActivities = Object.keys(categorizedActivities).length > 0;

  return (
    <FilterItem title="ACTIVITIES">
      <div className="space-y-2">
        {loading ? (
          <div className="p-2 text-sm">Loading activities...</div>
        ) : hasDbActivities ? (
          // Render activities from database
          Object.entries(categorizedActivities).map(([category, activities]) => (
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
                  {activities.map(activity => (
                    <label key={activity.id} className="flex items-start">
                      <input 
                        type="checkbox" 
                        checked={activeActivities.includes(activity.id)}
                        onChange={(e) => onChange(activity.id, e.target.checked)}
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
          // Fallback to hardcoded activities
          Object.entries(activityCategories).map(([category, activities]) => (
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
                  {activities.map(activity => (
                    <label key={activity} className="flex items-start">
                      <input 
                        type="checkbox" 
                        checked={activeActivities.includes(activity)}
                        onChange={(e) => onChange(activity, e.target.checked)}
                        className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                      />
                      <span className="text-sm">{activity}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </FilterItem>
  );
}

