
import React from "react";
import { AlertCircle } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface ErrorStateProps {
  onRetry: () => void;
  error?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ onRetry, error }) => {
  const { t } = useTranslation();

  return (
    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">{error || t('mapError')}</p>
        <button 
          onClick={onRetry}
          className="px-4 py-2 bg-fuchsia-600 text-white rounded hover:bg-fuchsia-700"
        >
          {t('dashboard.retry')}
        </button>
      </div>
    </div>
  );
};
