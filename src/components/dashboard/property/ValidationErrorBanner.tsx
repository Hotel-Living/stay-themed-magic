
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useTranslation } from "@/hooks/useTranslation";

interface ValidationErrorBannerProps {
  errorFields: string[];
}

export default function ValidationErrorBanner({ errorFields }: ValidationErrorBannerProps) {
  const { t } = useTranslation();
  
  return (
    <div className="bg-red-900/50 border border-red-600/30 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="text-red-100 font-medium mb-2">{t('validation.pleaseCompleteAllRequiredFields')}</h4>
          <ul className="text-red-200 text-sm space-y-1">
            {errorFields.map((field, index) => (
              <li key={index}>• {field}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
