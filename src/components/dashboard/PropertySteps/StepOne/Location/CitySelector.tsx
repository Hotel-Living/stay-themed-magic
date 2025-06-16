
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface CitySelectorProps {
  value: string;
  onChange: (value: string) => void;
  country: string;
  onBlur?: () => void;
  hasError?: boolean;
  errorMessage?: string;
  error?: string;
  touched?: boolean;
  onCustomClick?: () => void;
}

export default function CitySelector({ 
  value, 
  onChange, 
  country, 
  onBlur,
  hasError,
  errorMessage,
  error,
  touched,
  onCustomClick 
}: CitySelectorProps) {
  const { t } = useTranslation();

  const finalError = errorMessage || error;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground/90 uppercase">
        {t('location.city')} *
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={t('location.enterCityName')}
          className="flex-1 px-3 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
        />
        <button
          type="button"
          onClick={onCustomClick}
          className="px-4 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 transition-colors"
        >
          {t('location.custom')}
        </button>
      </div>
      {finalError && <p className="text-red-400 text-xs">{finalError}</p>}
    </div>
  );
}
