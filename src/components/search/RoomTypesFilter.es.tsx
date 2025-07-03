import React from "react";
import { FilterItem } from "./FilterItem";

interface RoomTypesFilterESProps {
  activeRoomTypes: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function RoomTypesFilterES({ activeRoomTypes, onChange }: RoomTypesFilterESProps) {
  const roomTypeOptions = [
    { value: "singleRoom", label: "Habitación Individual" },
    { value: "doubleRoom", label: "Habitación Doble" }
  ];

  const handleRoomTypeChange = (value: string) => {
    // For radio behavior: if clicking the same option, deselect it; otherwise select the new one
    if (selectedValue === value) {
      onChange(value, false);
    } else {
      // Clear current selection and set new one
      if (selectedValue) {
        onChange(selectedValue, false);
      }
      onChange(value, true);
    }
  };

  const selectedValue = activeRoomTypes.length > 0 ? activeRoomTypes[0] : null;

  return (
    <FilterItem title="TIPO HABITACIÓN" defaultOpen={true}>
      {roomTypeOptions.map(option => (
        <label key={option.value} className="flex items-start cursor-pointer hover:bg-fuchsia-800/30 p-2 rounded">
          <input 
            type="radio" 
            name="roomType"
            checked={selectedValue === option.value}
            onChange={() => handleRoomTypeChange(option.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-3 mt-0.5" 
          />
          <span className="text-sm text-white">{option.label}</span>
        </label>
      ))}
      {selectedValue && (
        <button
          onClick={() => activeRoomTypes.forEach(type => onChange(type, false))}
          className="text-xs text-white/70 hover:text-white underline mt-2 ml-2"
        >
          Limpiar selección
        </button>
      )}
    </FilterItem>
  );
}