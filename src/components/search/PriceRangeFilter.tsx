
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { PriceRangeFilterEN } from "./PriceRangeFilter.en";
import { PriceRangeFilterES } from "./PriceRangeFilter.es";
import { PriceRangeFilterPT } from "./PriceRangeFilter.pt";
import { PriceRangeFilterRO } from "./PriceRangeFilter.ro";

interface PriceRangeFilterProps {
  activePriceRange: [number, number];
  onChange: (value: [number, number]) => void;
}

export function PriceRangeFilter({ activePriceRange, onChange }: PriceRangeFilterProps) {
  const { language } = useTranslation();
  
  if (language === 'en') return <PriceRangeFilterEN activePriceRange={activePriceRange} onChange={onChange} />;
  if (language === 'es') return <PriceRangeFilterES activePriceRange={activePriceRange} onChange={onChange} />;
  if (language === 'pt') return <PriceRangeFilterPT activePriceRange={activePriceRange} onChange={onChange} />;
  if (language === 'ro') return <PriceRangeFilterRO activePriceRange={activePriceRange} onChange={onChange} />;
  
  // Default fallback to English
  return <PriceRangeFilterEN activePriceRange={activePriceRange} onChange={onChange} />;
}
