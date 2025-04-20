
import { FilterItem } from "./FilterItem";

interface ActivityFilterProps {
  activeActivities: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function ActivityFilter({ 
  activeActivities, 
  onChange 
}: ActivityFilterProps) {
  const activityCategories = {
    'Sports': ['Tennis', 'Golf', 'Swimming', 'Hiking', 'Cycling', 'Yoga', 'Gym'],
    'Arts & Culture': ['Painting Classes', 'Cooking Classes', 'Photography Tours', 'Local Crafts', 'Dance Classes', 'Music Lessons'],
    'Wellness': ['Spa Services', 'Meditation', 'Massage', 'Hot Springs'],
    'Entertainment': ['Board Games', 'Movie Nights', 'Live Music', 'Wine Tasting'],
    'Nature & Adventure': ['Bird Watching', 'Garden Tours', 'Nature Walks', 'Stargazing']
  };

  return (
    <FilterItem title="ACTIVITIES">
      {Object.entries(activityCategories).map(([category, activities]) => (
        <div key={category} className="mb-2">
          <div className="text-sm font-medium mb-1 text-fuchsia-200">{category}</div>
          <div className="space-y-1 ml-2">
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
        </div>
      ))}
    </FilterItem>
  );
}
