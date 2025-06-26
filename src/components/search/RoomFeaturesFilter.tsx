
import { FilterItem } from "./FilterItem";

interface RoomFeaturesFilterProps {
  selectedRoomFeatures: string[];
  onChange: (roomFeatures: string[]) => void;
}

export function RoomFeaturesFilter({ selectedRoomFeatures, onChange }: RoomFeaturesFilterProps) {
  const roomFeatures = [
    { value: "balcony", label: "Balcony" },
    { value: "sea-view", label: "Sea View" },
    { value: "city-view", label: "City View" },
    { value: "kitchenette", label: "Kitchenette" },
    { value: "air-conditioning", label: "Air Conditioning" },
    { value: "minibar", label: "Minibar" },
    { value: "safe", label: "Safe" },
    { value: "desk", label: "Work Desk" }
  ];

  const handleFeatureClick = (featureValue: string) => {
    const isSelected = selectedRoomFeatures.includes(featureValue);
    let newFeatures: string[];
    
    if (isSelected) {
      newFeatures = selectedRoomFeatures.filter(feature => feature !== featureValue);
    } else {
      newFeatures = [...selectedRoomFeatures, featureValue];
    }
    
    onChange(newFeatures);
  };

  return (
    <FilterItem title="ROOM FEATURES">
      {roomFeatures.map(option => (
        <label key={option.value} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={selectedRoomFeatures.includes(option.value)}
            onChange={() => handleFeatureClick(option.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm font-bold text-white">{option.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
