
import React from "react";
import { RadioFilter } from "./RadioFilter";

interface RoomTypesFilterESProps {
  activeRoomTypes: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function RoomTypesFilterES({ activeRoomTypes, onChange }: RoomTypesFilterESProps) {
  const roomTypeOptions = [
    { value: "singleRoom", label: "Habitación Individual" },
    { value: "doubleRoom", label: "Habitación Doble" }
  ];

  const handleRadioChange = (value: string | null) => {
    // Clear all selections first
    activeRoomTypes.forEach(type => onChange(type, false));
    // Add new selection if value is not null
    if (value) {
      onChange(value, true);
    }
  };

  const selectedValue = activeRoomTypes.length > 0 ? activeRoomTypes[0] : null;

  return (
    <RadioFilter
      title="TIPO HABITACIÓN"
      options={roomTypeOptions}
      selectedOption={selectedValue}
      onChange={handleRadioChange}
    />
  );
}
