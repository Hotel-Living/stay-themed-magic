
import React from 'react';
import { Button } from '@/components/ui/button';
import { List, Map } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export type ViewMode = 'list' | 'map';

interface ViewToggleProps {
  activeView: ViewMode;
  onChange: (view: ViewMode) => void;
}

export function ViewToggle({ activeView, onChange }: ViewToggleProps) {
  const { t } = useLanguage();
  
  return (
    <div className="flex bg-background/20 backdrop-blur-sm rounded-lg p-1 w-fit">
      <Button
        variant="ghost"
        size="sm"
        className={`flex items-center gap-1.5 ${
          activeView === 'list' 
            ? 'bg-fuchsia-600 text-white hover:bg-fuchsia-700' 
            : 'text-white/70 hover:text-white hover:bg-white/10'
        }`}
        onClick={() => onChange('list')}
      >
        <List className="h-4 w-4" />
        <span>{t("search.results.list")}</span>
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        className={`flex items-center gap-1.5 ${
          activeView === 'map' 
            ? 'bg-fuchsia-600 text-white hover:bg-fuchsia-700' 
            : 'text-white/70 hover:text-white hover:bg-white/10'
        }`}
        onClick={() => onChange('map')}
      >
        <Map className="h-4 w-4" />
        <span>{t("search.results.map")}</span>
      </Button>
    </div>
  );
}
