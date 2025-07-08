
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { SquareFilter } from "./SquareFilter";
import { useFiltersByCategoryWithLanguage } from "@/hooks/useFiltersByCategoryWithLanguage";

interface RoomFeaturesFilterProps {
  activeRoomFeatures: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function RoomFeaturesFilter({ activeRoomFeatures, onChange }: RoomFeaturesFilterProps) {
  const { t } = useTranslation('filters');
  const { data: roomFeatureOptions = [], isLoading } = useFiltersByCategoryWithLanguage('room_features');

  console.log(`🛏️ RoomFeaturesFilter: Loading=${isLoading}, Options=`, roomFeatureOptions);

  // Transform the data to the format expected by SquareFilter
  const formattedOptions = roomFeatureOptions.map(option => ({
    value: option.value,
    label: option.value
  }));

  console.log(`🛏️ RoomFeaturesFilter: Formatted options=`, formattedOptions);

  return (
    <SquareFilter
      title={t("roomFeatures")}
      options={formattedOptions}
      selectedOptions={activeRoomFeatures}
      onChange={onChange}
      loading={isLoading}
    />
  );
}
