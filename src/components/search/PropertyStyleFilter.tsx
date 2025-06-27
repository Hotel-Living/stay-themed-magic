
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { PropertyStyleFilterEN } from "./PropertyStyleFilter.en";
import { PropertyStyleFilterES } from "./PropertyStyleFilter.es";
import { PropertyStyleFilterPT } from "./PropertyStyleFilter.pt";
import { PropertyStyleFilterRO } from "./PropertyStyleFilter.ro";

interface PropertyStyleFilterProps {
  activePropertyStyle: string | null;
  onChange: (value: string) => void;
}

export function PropertyStyleFilter({ activePropertyStyle, onChange }: PropertyStyleFilterProps) {
  const { language } = useTranslation();
  
  if (language === 'en') return <PropertyStyleFilterEN activePropertyStyle={activePropertyStyle} onChange={onChange} />;
  if (language === 'es') return <PropertyStyleFilterES activePropertyStyle={activePropertyStyle} onChange={onChange} />;
  if (language === 'pt') return <PropertyStyleFilterPT activePropertyStyle={activePropertyStyle} onChange={onChange} />;
  if (language === 'ro') return <PropertyStyleFilterRO activePropertyStyle={activePropertyStyle} onChange={onChange} />;
  
  // Default fallback to English
  return <PropertyStyleFilterEN activePropertyStyle={activePropertyStyle} onChange={onChange} />;
}
