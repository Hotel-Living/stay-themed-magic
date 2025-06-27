
import React from "react";
import { FilterItem } from "./FilterItem";
import { mockRoomTypes } from "@/components/simulation/MockFilterData";

interface RoomTypesFilterProps {
  activeRoomTypes: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function RoomTypesFilter({ activeRoomTypes, onChange }: RoomTypesFilterProps) {
  const handleRoomTypeClick = (roomType: string) => {
    const isCurrentlySelected = activeRoomTypes.includes(roomType);
    onChange(roomType, !isCurrentlySelected);
  };

  return (
    <FilterItem title="ROOM TYPES">
      <div className="max-h-48 overflow-y-auto">
        {mockRoomTypes.map(roomType => (
          <label key={roomType} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
            <input 
              type="checkbox" 
              checked={activeRoomTypes.includes(roomType)}
              onChange={() => handleRoomTypeClick(roomType)}
              className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
            />
            <span className="text-sm font-bold text-white">{roomType}</span>
          </label>
        ))}
      </div>
    </FilterItem>
  );
}
