
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useTranslation } from "@/hooks/useTranslation";

export default function ImportantNotice() {
  const { t } = useTranslation();
  
  return (
    <div className="bg-blue-900/50 border border-blue-600/30 rounded-lg p-4 mt-6">
      <div className="flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="text-blue-100 font-medium mb-1">{t('validation.important')}</h4>
          <p className="text-blue-200 text-sm">
            {t('validation.allFieldsMarkedRequired')}
          </p>
        </div>
      </div>
    </div>
  );
}
