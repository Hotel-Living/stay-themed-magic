
import { FilterItem } from "./FilterItem";

interface RoomTypesFilterProps {
  selectedRoomTypes: string[];
  onChange: (roomTypes: string[]) => void;
}

export function RoomTypesFilter({ selectedRoomTypes, onChange }: RoomTypesFilterProps) {
  const roomTypes = [
    { value: "single", label: "Single Room" },
    { value: "double", label: "Double Room" },
    { value: "suite", label: "Suite" },
    { value: "apartment", label: "Apartment" },
    { value: "studio", label: "Studio" }
  ];

  const handleRoomTypeClick = (roomTypeValue: string) => {
    const isSelected = selectedRoomTypes.includes(roomTypeValue);
    let newRoomTypes: string[];
    
    if (isSelected) {
      newRoomTypes = selectedRoomTypes.filter(type => type !== roomTypeValue);
    } else {
      newRoomTypes = [...selectedRoomTypes, roomTypeValue];
    }
    
    onChange(newRoomTypes);
  };

  return (
    <FilterItem title="ROOM TYPES">
      {roomTypes.map(option => (
        <label key={option.value} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={selectedRoomTypes.includes(option.value)}
            onChange={() => handleRoomTypeClick(option.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm font-bold text-white">{option.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
