
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

export function ImportantNotice() {
  const { t } = useTranslation();
  
  return (
    <div className="bg-amber-950/30 p-4 rounded-lg border border-amber-700/30 mb-6">
      <h3 className="font-medium mb-2 uppercase text-base text-amber-300">{t('dashboard.importantNotice.title')}</h3>
      <p className="text-xs text-amber-200/80">
        {t('dashboard.importantNotice.description')}
      </p>
    </div>
  );
}
