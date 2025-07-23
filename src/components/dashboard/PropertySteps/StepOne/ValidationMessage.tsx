
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface ValidationMessageProps {
  errors: Record<string, string>;
}

export default function ValidationMessage({ errors }: ValidationMessageProps) {
  const { t } = useTranslation();
  const hasErrors = Object.keys(errors).length > 0;

  if (!hasErrors) return null;

  return (
    <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mt-4">
      <p className="text-red-300 text-sm">
        {t('dashboard.completeAllRequiredFields')}
      </p>
    </div>
  );
}
