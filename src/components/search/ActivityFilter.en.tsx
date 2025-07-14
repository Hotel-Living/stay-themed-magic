
import { useState } from "react";
import { FilterItem } from "./FilterItem";
import { useActivitiesDataWithLanguage } from "@/hooks/useActivitiesDataWithLanguage";
import { Search } from "lucide-react";

interface ActivityFilterENProps {
  activeActivities: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function ActivityFilterEN({ 
  activeActivities, 
  onChange 
}: ActivityFilterENProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: activityOptions = [], isLoading } = useActivitiesDataWithLanguage();

  const handleContainerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Filter activities based on search query
  const filteredActivities = (activityOptions || []).filter(activity =>
    activity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleActivityToggle = (activityName: string) => {
    const isCurrentlySelected = activeActivities.includes(activityName);
    onChange(activityName, !isCurrentlySelected);
  };

  return (
    <FilterItem title="ACTIVITIES">
      <div 
        className="bg-fuchsia-950/30 rounded-lg max-h-96 overflow-y-auto" 
        onClick={handleContainerClick}
      >
        {/* Search Input */}
        <div className="p-2 border-b border-fuchsia-800/30" onClick={handleSearchClick}>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-fuchsia-300" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              onClick={handleSearchClick}
              className="w-full pl-8 pr-3 py-1.5 bg-fuchsia-900/30 border border-fuchsia-700/50 rounded-md text-sm text-white placeholder:text-fuchsia-300/70 focus:outline-none focus:border-fuchsia-500"
            />
          </div>
        </div>
        
        {/* Activities List */}
        <div className="p-2 space-y-1">
          {isLoading ? (
            <div className="text-fuchsia-300 text-sm p-2">Loading activities...</div>
          ) : (
            filteredActivities.map((activity) => (
              <label key={activity.id} className="flex items-start cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
                <input
                  type="checkbox"
                  checked={activeActivities.includes(activity.name)}
                  onChange={() => handleActivityToggle(activity.name)}
                  className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5"
                />
                <span className="text-sm text-white">{activity.name}</span>
              </label>
            ))
          )}
        </div>
      </div>
    </FilterItem>
  );
}
