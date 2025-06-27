
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { HotelServicesFilterEN } from "./HotelServicesFilter.en";
import { HotelServicesFilterES } from "./HotelServicesFilter.es";
import { HotelServicesFilterPT } from "./HotelServicesFilter.pt";
import { HotelServicesFilterRO } from "./HotelServicesFilter.ro";

interface HotelServicesFilterProps {
  activeHotelServices: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function HotelServicesFilter({ activeHotelServices, onChange }: HotelServicesFilterProps) {
  const { language } = useTranslation();
  
  if (language === 'en') return <HotelServicesFilterEN activeHotelServices={activeHotelServices} onChange={onChange} />;
  if (language === 'es') return <HotelServicesFilterES activeHotelServices={activeHotelServices} onChange={onChange} />;
  if (language === 'pt') return <HotelServicesFilterPT activeHotelServices={activeHotelServices} onChange={onChange} />;
  if (language === 'ro') return <HotelServicesFilterRO activeHotelServices={activeHotelServices} onChange={onChange} />;
  
  // Default fallback to English
  return <HotelServicesFilterEN activeHotelServices={activeHotelServices} onChange={onChange} />;
}
