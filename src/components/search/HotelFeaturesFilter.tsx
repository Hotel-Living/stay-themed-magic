
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { HotelFeaturesFilterEN } from "./HotelFeaturesFilter.en";
import { HotelFeaturesFilterES } from "./HotelFeaturesFilter.es";
import { HotelFeaturesFilterPT } from "./HotelFeaturesFilter.pt";
import { HotelFeaturesFilterRO } from "./HotelFeaturesFilter.ro";

interface HotelFeaturesFilterProps {
  activeHotelFeatures: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function HotelFeaturesFilter({ activeHotelFeatures, onChange }: HotelFeaturesFilterProps) {
  const { language } = useTranslation();
  
  if (language === 'en') return <HotelFeaturesFilterEN activeHotelFeatures={activeHotelFeatures} onChange={onChange} />;
  if (language === 'es') return <HotelFeaturesFilterES activeHotelFeatures={activeHotelFeatures} onChange={onChange} />;
  if (language === 'pt') return <HotelFeaturesFilterPT activeHotelFeatures={activeHotelFeatures} onChange={onChange} />;
  if (language === 'ro') return <HotelFeaturesFilterRO activeHotelFeatures={activeHotelFeatures} onChange={onChange} />;
  
  // Default fallback to English
  return <HotelFeaturesFilterEN activeHotelFeatures={activeHotelFeatures} onChange={onChange} />;
}
