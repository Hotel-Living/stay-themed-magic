
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

export const LoadingState: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-600 mx-auto mb-4"></div>
        <p className="text-gray-600">{t('loadingMap')}</p>
      </div>
    </div>
  );
};
