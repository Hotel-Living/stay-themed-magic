
import { FilterItem } from "./FilterItem";
import { useDynamicFilterData } from "@/hooks/useDynamicFilterData";

interface RoomTypesFilterENProps {
  activeRoomTypes: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function RoomTypesFilterEN({ activeRoomTypes, onChange }: RoomTypesFilterENProps) {
  const { loading, error } = useDynamicFilterData();

  const roomTypes = [
    { value: "double", label: "Double Room" },
    { value: "single", label: "Single Room" }
  ];

  const handleRoomTypeClick = (roomTypeValue: string) => {
    const isCurrentlySelected = activeRoomTypes.includes(roomTypeValue);
    console.log("RoomTypesFilter - Room type toggled:", roomTypeValue, "->", !isCurrentlySelected);
    onChange(roomTypeValue, !isCurrentlySelected);
  };

  if (loading) {
    return (
      <FilterItem title="ROOM TYPES">
        <div className="text-sm text-fuchsia-300/70 px-3 py-2">Loading room types...</div>
      </FilterItem>
    );
  }

  if (error) {
    return (
      <FilterItem title="ROOM TYPES">
        <div className="text-sm text-fuchsia-300/70 px-3 py-2">Error loading room types</div>
      </FilterItem>
    );
  }

  return (
    <FilterItem title="ROOM TYPES">
      {roomTypes.map(roomType => (
        <label key={roomType.value} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={activeRoomTypes.includes(roomType.value)}
            onChange={() => handleRoomTypeClick(roomType.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm font-bold text-white">{roomType.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
