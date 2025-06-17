
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

export default function ImportantNotice() {
  const { t } = useTranslation();
  
  return (
    <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mt-6">
      <h3 className="text-red-300 font-bold mb-2">{t('dashboard.important')}</h3>
      <p className="text-red-300 text-sm">
        {t('dashboard.importantNote')}
      </p>
    </div>
  );
}
