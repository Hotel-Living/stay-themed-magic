
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { ActivityFilterEN } from "./ActivityFilter.en";
import { ActivityFilterES } from "./ActivityFilter.es";
import { ActivityFilterPT } from "./ActivityFilter.pt";
import { ActivityFilterRO } from "./ActivityFilter.ro";

interface ActivityFilterProps {
  activeActivities: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function ActivityFilter({ 
  activeActivities, 
  onChange 
}: ActivityFilterProps) {
  const { language } = useTranslation();
  
  if (language === 'en') return <ActivityFilterEN activeActivities={activeActivities} onChange={onChange} />;
  if (language === 'es') return <ActivityFilterES activeActivities={activeActivities} onChange={onChange} />;
  if (language === 'pt') return <ActivityFilterPT activeActivities={activeActivities} onChange={onChange} />;
  if (language === 'ro') return <ActivityFilterRO activeActivities={activeActivities} onChange={onChange} />;
  
  // Default fallback to English
  return <ActivityFilterEN activeActivities={activeActivities} onChange={onChange} />;
}
