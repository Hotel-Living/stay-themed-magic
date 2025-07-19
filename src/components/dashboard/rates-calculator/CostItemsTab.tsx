
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

export const CostItemsTab: React.FC = () => {
  const { t } = useTranslation("dashboard/common");
  
  return (
    <div className="space-y-4 text-white/90">
      <h3 className="text-lg font-bold text-center mb-4">{t('mealsModelTitle')}</h3>
      
      <div className="space-y-4">
        <p className="text-sm">{t('mealsContent.description')}</p>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('mealsContent.practicalApproach.title')}</p>
          <p className="text-sm">{t('mealsContent.practicalApproach.description')}</p>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('mealsContent.operationalAdvantages.title')}</p>
          <div className="ml-4 text-sm space-y-1">
            {(t('mealsContent.operationalAdvantages.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
              <p key={index}>• {item}</p>
            ))}
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="font-semibold text-fuchsia-300">{t('mealsContent.costEfficiency.title')}</p>
          <p className="text-sm">{t('mealsContent.costEfficiency.description')}</p>
          <div className="ml-4 text-sm space-y-1">
            {(t('mealsContent.costEfficiency.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
              <p key={index}>• {item}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
