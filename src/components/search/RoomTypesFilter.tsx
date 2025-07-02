
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { RoomTypesFilterEN } from "./RoomTypesFilter.en";
import { RoomTypesFilterES } from "./RoomTypesFilter.es";
import { RoomTypesFilterPT } from "./RoomTypesFilter.pt";
import { RoomTypesFilterRO } from "./RoomTypesFilter.ro";

interface RoomTypesFilterProps {
  activeRoomTypes: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function RoomTypesFilter({ activeRoomTypes, onChange }: RoomTypesFilterProps) {
  const { language } = useTranslation();
  
  if (language === 'en') return <RoomTypesFilterEN activeRoomTypes={activeRoomTypes} onChange={onChange} />;
  if (language === 'es') return <RoomTypesFilterES activeRoomTypes={activeRoomTypes} onChange={onChange} />;
  if (language === 'pt') return <RoomTypesFilterPT activeRoomTypes={activeRoomTypes} onChange={onChange} />;
  if (language === 'ro') return <RoomTypesFilterRO activeRoomTypes={activeRoomTypes} onChange={onChange} />;
  
  // Default fallback to English
  return <RoomTypesFilterEN activeRoomTypes={activeRoomTypes} onChange={onChange} />;
}
