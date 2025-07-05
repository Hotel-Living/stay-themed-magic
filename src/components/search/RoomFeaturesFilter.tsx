
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { SquareFilter } from "./SquareFilter";
import { useFiltersByCategory } from "@/hooks/useFiltersByCategory";

interface RoomFeaturesFilterProps {
  activeRoomFeatures: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function RoomFeaturesFilter({ activeRoomFeatures, onChange }: RoomFeaturesFilterProps) {
  const { t } = useTranslation();
  const { data: roomFeatureOptions = [], isLoading } = useFiltersByCategory('room_features');

  console.log(`🛏️ RoomFeaturesFilter: Loading=${isLoading}, Options=`, roomFeatureOptions);

  // Transform the data to the format expected by SquareFilter
  const formattedOptions = roomFeatureOptions.map(option => ({
    value: option.value,
    label: option.value
  }));

  console.log(`🛏️ RoomFeaturesFilter: Formatted options=`, formattedOptions);

  return (
    <SquareFilter
      title={t("filters.roomFeatures")}
      options={formattedOptions}
      selectedOptions={activeRoomFeatures}
      onChange={onChange}
      loading={isLoading}
    />
  );
}
