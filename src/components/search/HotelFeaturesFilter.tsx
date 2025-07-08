
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { SquareFilter } from "./SquareFilter";
import { useFiltersByCategoryWithLanguage } from "@/hooks/useFiltersByCategoryWithLanguage";

interface HotelFeaturesFilterProps {
  activeHotelFeatures: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function HotelFeaturesFilter({ activeHotelFeatures, onChange }: HotelFeaturesFilterProps) {
  const { t } = useTranslation('filters');
  const { data: hotelFeatureOptions = [], isLoading } = useFiltersByCategoryWithLanguage('hotel_features');

  console.log(`🏨 HotelFeaturesFilter: Loading=${isLoading}, Options=`, hotelFeatureOptions);

  // Transform the data to the format expected by SquareFilter
  const formattedOptions = hotelFeatureOptions.map(option => ({
    value: option.value,
    label: option.value
  }));

  console.log(`🏨 HotelFeaturesFilter: Formatted options=`, formattedOptions);

  return (
    <SquareFilter
      title={t("hotelFeatures")}
      options={formattedOptions}
      selectedOptions={activeHotelFeatures}
      onChange={onChange}
      loading={isLoading}
    />
  );
}
