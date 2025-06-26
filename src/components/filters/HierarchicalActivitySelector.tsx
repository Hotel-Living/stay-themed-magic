
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { HierarchicalActivitySelectorEN } from "./HierarchicalActivitySelector.en";
import { HierarchicalActivitySelectorES } from "./HierarchicalActivitySelector.es";
import { HierarchicalActivitySelectorPT } from "./HierarchicalActivitySelector.pt";
import { HierarchicalActivitySelectorRO } from "./HierarchicalActivitySelector.ro";

interface HierarchicalActivitySelectorProps {
  selectedActivities: string[];
  onActivitySelect: (activityId: string, isSelected: boolean) => void;
  allowMultiple?: boolean;
  className?: string;
  searchQuery?: string;
}

export const HierarchicalActivitySelector: React.FC<HierarchicalActivitySelectorProps> = ({
  selectedActivities,
  onActivitySelect,
  allowMultiple = true,
  className = "",
  searchQuery = ""
}) => {
  const { language } = useTranslation();
  
  if (language === 'en') return <HierarchicalActivitySelectorEN selectedActivities={selectedActivities} onActivitySelect={onActivitySelect} allowMultiple={allowMultiple} className={className} searchQuery={searchQuery} />;
  if (language === 'es') return <HierarchicalActivitySelectorES selectedActivities={selectedActivities} onActivitySelect={onActivitySelect} allowMultiple={allowMultiple} className={className} searchQuery={searchQuery} />;
  if (language === 'pt') return <HierarchicalActivitySelectorPT selectedActivities={selectedActivities} onActivitySelect={onActivitySelect} allowMultiple={allowMultiple} className={className} searchQuery={searchQuery} />;
  if (language === 'ro') return <HierarchicalActivitySelectorRO selectedActivities={selectedActivities} onActivitySelect={onActivitySelect} allowMultiple={allowMultiple} className={className} searchQuery={searchQuery} />;
  
  // Default fallback to English
  return <HierarchicalActivitySelectorEN selectedActivities={selectedActivities} onActivitySelect={onActivitySelect} allowMultiple={allowMultiple} className={className} searchQuery={searchQuery} />;
};
