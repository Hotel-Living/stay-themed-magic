
import { useState } from "react";
import { FilterItem } from "./FilterItem";
import { HierarchicalActivitySelector } from "@/components/filters/HierarchicalActivitySelector";
import { Search } from "lucide-react";

interface ActivityFilterESProps {
  activeActivities: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function ActivityFilterES({ 
  activeActivities, 
  onChange 
}: ActivityFilterESProps) {
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <FilterItem title="ACTIVIDADES">
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
              placeholder="Buscar"
              value={searchQuery}
              onChange={handleSearchChange}
              onClick={handleSearchClick}
              className="w-full pl-8 pr-3 py-1.5 bg-fuchsia-900/30 border border-fuchsia-700/50 rounded-md text-sm text-white placeholder:text-fuchsia-300/70 focus:outline-none focus:border-fuchsia-500"
            />
          </div>
        </div>
        
        <HierarchicalActivitySelector
          selectedActivities={activeActivities}
          onActivitySelect={onChange}
          allowMultiple={true}
          className="space-y-1"
          searchQuery={searchQuery}
        />
      </div>
    </FilterItem>
  );
}
