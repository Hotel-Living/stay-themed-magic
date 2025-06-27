
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { DayRangeFilterEN } from "./DayRangeFilter.en";
import { DayRangeFilterES } from "./DayRangeFilter.es";
import { DayRangeFilterPT } from "./DayRangeFilter.pt";
import { DayRangeFilterRO } from "./DayRangeFilter.ro";

interface DayRangeFilterProps {
  activeDayRange: number | null;
  onChange: (value: number | null) => void;
}

export function DayRangeFilter({ activeDayRange, onChange }: DayRangeFilterProps) {
  const { language } = useTranslation();
  
  if (language === 'en') return <DayRangeFilterEN activeDayRange={activeDayRange} onChange={onChange} />;
  if (language === 'es') return <DayRangeFilterES activeDayRange={activeDayRange} onChange={onChange} />;
  if (language === 'pt') return <DayRangeFilterPT activeDayRange={activeDayRange} onChange={onChange} />;
  if (language === 'ro') return <DayRangeFilterRO activeDayRange={activeDayRange} onChange={onChange} />;
  
  // Default fallback to English
  return <DayRangeFilterEN activeDayRange={activeDayRange} onChange={onChange} />;
}
