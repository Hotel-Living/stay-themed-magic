
import { FilterItem } from "./FilterItem";
import { HierarchicalActivitySelector } from "@/components/filters/HierarchicalActivitySelector";

interface ActivityFilterProps {
  activeActivities: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function ActivityFilter({ 
  activeActivities, 
  onChange 
}: ActivityFilterProps) {
  const handleContainerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <FilterItem title="ACTIVITIES">
      <div 
        className="bg-fuchsia-950/30 rounded-lg p-4 max-h-96 overflow-y-auto" 
        onClick={handleContainerClick}
      >
        <HierarchicalActivitySelector
          selectedActivities={activeActivities}
          onActivitySelect={onChange}
          allowMultiple={true}
          className="space-y-1"
        />
      </div>
    </FilterItem>
  );
}
