
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { PriceRangeFilterEN } from "./PriceRangeFilter.en";
import { PriceRangeFilterES } from "./PriceRangeFilter.es";
import { PriceRangeFilterPT } from "./PriceRangeFilter.pt";
import { PriceRangeFilterRO } from "./PriceRangeFilter.ro";

interface PriceRangeFilterProps {
  activePrice: number | null;
  onChange: (value: number | null) => void;
}

export function PriceRangeFilter({ activePrice, onChange }: PriceRangeFilterProps) {
  const { language } = useTranslation();
  
  if (language === 'en') return <PriceRangeFilterEN activePrice={activePrice} onChange={onChange} />;
  if (language === 'es') return <PriceRangeFilterES activePrice={activePrice} onChange={onChange} />;
  if (language === 'pt') return <PriceRangeFilterPT activePrice={activePrice} onChange={onChange} />;
  if (language === 'ro') return <PriceRangeFilterRO activePrice={activePrice} onChange={onChange} />;
  
  // Default fallback to English
  return <PriceRangeFilterEN activePrice={activePrice} onChange={onChange} />;
}
