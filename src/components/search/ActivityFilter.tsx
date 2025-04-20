
import { FilterItem } from "./FilterItem";

interface ActivityFilterProps {
  activeActivities: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function ActivityFilter({ 
  activeActivities, 
  onChange 
}: ActivityFilterProps) {
  return (
    <FilterItem title="ACTIVITIES">
      {['Sports', 'Arts & Culture', 'Wellness', 'Entertainment', 'Nature & Adventure'].map(category => (
        <div key={category} className="mb-2">
          <div className="text-sm font-medium mb-1 text-fuchsia-200">{category}</div>
          <div className="space-y-1 ml-2">
            {/* We'll fetch these dynamically in the parent component */}
            <label className="flex items-start">
              <input 
                type="checkbox" 
                checked={activeActivities.includes(category)}
                onChange={(e) => onChange(category, e.target.checked)}
                className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
              />
              <span className="text-sm">{category}</span>
            </label>
          </div>
        </div>
      ))}
    </FilterItem>
  );
}
