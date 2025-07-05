
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { SquareFilter } from "./SquareFilter";
import { useFiltersByCategory } from "@/hooks/useFiltersByCategory";

interface RoomTypesFilterProps {
  activeRoomTypes: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function RoomTypesFilter({ activeRoomTypes, onChange }: RoomTypesFilterProps) {
  const { t } = useTranslation();
  const { data: roomTypeOptions = [], isLoading } = useFiltersByCategory('room_types');

  console.log(`🏠 RoomTypesFilter: Loading=${isLoading}, Options=`, roomTypeOptions);

  // Transform the data to the format expected by SquareFilter
  const formattedOptions = roomTypeOptions.map(option => ({
    value: option.value,
    label: option.value // Could be enhanced with translations later
  }));

  console.log(`🏠 RoomTypesFilter: Formatted options=`, formattedOptions);

  return (
    <SquareFilter
      title={t("filters.roomTypes")}
      options={formattedOptions}
      selectedOptions={activeRoomTypes}
      onChange={onChange}
      loading={isLoading}
    />
  );
}
