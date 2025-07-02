
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { RoomFeaturesFilterEN } from "./RoomFeaturesFilter.en";
import { RoomFeaturesFilterES } from "./RoomFeaturesFilter.es";
import { RoomFeaturesFilterPT } from "./RoomFeaturesFilter.pt";
import { RoomFeaturesFilterRO } from "./RoomFeaturesFilter.ro";

interface RoomFeaturesFilterProps {
  activeRoomFeatures: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function RoomFeaturesFilter({ activeRoomFeatures, onChange }: RoomFeaturesFilterProps) {
  const { language } = useTranslation();
  
  if (language === 'en') return <RoomFeaturesFilterEN activeRoomFeatures={activeRoomFeatures} onChange={onChange} />;
  if (language === 'es') return <RoomFeaturesFilterES activeRoomFeatures={activeRoomFeatures} onChange={onChange} />;
  if (language === 'pt') return <RoomFeaturesFilterPT activeRoomFeatures={activeRoomFeatures} onChange={onChange} />;
  if (language === 'ro') return <RoomFeaturesFilterRO activeRoomFeatures={activeRoomFeatures} onChange={onChange} />;
  
  // Default fallback to English
  return <RoomFeaturesFilterEN activeRoomFeatures={activeRoomFeatures} onChange={onChange} />;
}
