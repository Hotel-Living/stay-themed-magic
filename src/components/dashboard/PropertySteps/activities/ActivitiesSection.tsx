
import React from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { HierarchicalActivitySelector } from "@/components/filters/HierarchicalActivitySelector";
import { useTranslation } from "@/hooks/useTranslation";

interface ActivitiesSectionProps {
  selectedActivities: string[];
  onActivityChange: (activity: string, isChecked: boolean) => void;
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({
  selectedActivities,
  onActivityChange
}) => {
  const { t } = useTranslation();
  
  return (
    <Collapsible defaultOpen={false} className="w-full">
      <div className="bg-[#6c0686]">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2">
          <label className="block text-xl font-bold text-foreground/90 uppercase">{t('dashboard.activities')}</label>
          <ChevronDown className="h-5 w-5 text-white" />
        </CollapsibleTrigger>
      </div>
      
      <CollapsibleContent>
        <p className="text-sm text-foreground/90 mb-4">
          Select activities available at your hotel or in the surrounding area
        </p>
        
        <div className="bg-[#5A1876]/20 rounded-lg p-4 border border-fuchsia-800/20 max-h-96 overflow-y-auto">
          <HierarchicalActivitySelector
            selectedActivities={selectedActivities}
            onActivitySelect={onActivityChange}
            allowMultiple={true}
            className="space-y-1"
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
