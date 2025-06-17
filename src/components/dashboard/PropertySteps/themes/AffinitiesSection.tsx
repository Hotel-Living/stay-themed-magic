
import React from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { HierarchicalThemeSelector } from "@/components/filters/HierarchicalThemeSelector";
import { useTranslation } from "@/hooks/useTranslation";

interface AffinitiesSectionProps {
  openCategory: string | null;
  setOpenCategory: (category: string | null) => void;
  openSubmenu: string | null;
  setOpenSubmenu: (submenu: string | null) => void;
  onThemeSelect: (themeId: string, isSelected: boolean) => void;
  selectedThemes: string[];
}

export const AffinitiesSection: React.FC<AffinitiesSectionProps> = ({
  onThemeSelect,
  selectedThemes
}) => {
  const { t } = useTranslation();
  
  return (
    <Collapsible defaultOpen={false} className="w-full">
      <div className="bg-[#6c0686]">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2">
          <label className="block text-xl font-bold text-foreground/90 uppercase">{t('dashboard.affinities')}</label>
          <ChevronDown className="h-5 w-5 text-white" />
        </CollapsibleTrigger>
      </div>
      
      <CollapsibleContent>
        <p className="text-sm text-foreground/90 mb-4">
          Make your hotel stand out from the competition boosting it with group affinities to attract your best and perfect guests
        </p>
        
        <Link 
          to="/themes-information" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center rounded-lg text-white text-sm font-medium transition-colors mb-4 bg-[#e108fd]/80 hover:bg-[#e108fd] my-0 mx-0 px-[11px] py-[2px]"
        >
          More Information
        </Link>
        
        <div className="bg-[#5A1876]/20 rounded-lg p-4 border border-fuchsia-800/20 max-h-96 overflow-y-auto">
          <HierarchicalThemeSelector
            selectedThemes={selectedThemes}
            onThemeSelect={onThemeSelect}
            allowMultiple={true}
            className="space-y-2"
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
