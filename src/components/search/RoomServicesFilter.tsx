
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { RoomServicesFilterEN } from "./RoomServicesFilter.en";
import { RoomServicesFilterES } from "./RoomServicesFilter.es";
import { RoomServicesFilterPT } from "./RoomServicesFilter.pt";
import { RoomServicesFilterRO } from "./RoomServicesFilter.ro";

interface RoomServicesFilterProps {
  activeRoomServices: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function RoomServicesFilter({ activeRoomServices, onChange }: RoomServicesFilterProps) {
  const { language } = useTranslation();
  
  if (language === 'en') return <RoomServicesFilterEN activeRoomServices={activeRoomServices} onChange={onChange} />;
  if (language === 'es') return <RoomServicesFilterES activeRoomServices={activeRoomServices} onChange={onChange} />;
  if (language === 'pt') return <RoomServicesFilterPT activeRoomServices={activeRoomServices} onChange={onChange} />;
  if (language === 'ro') return <RoomServicesFilterRO activeRoomServices={activeRoomServices} onChange={onChange} />;
  
  // Default fallback to English
  return <RoomServicesFilterEN activeRoomServices={activeRoomServices} onChange={onChange} />;
}
