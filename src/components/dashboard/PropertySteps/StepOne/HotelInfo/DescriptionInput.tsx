
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface DescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function DescriptionInput({ value, onChange, error }: DescriptionInputProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground/90 uppercase">
        {t('basicInfo.description')} *
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('basicInfo.enterDetailedDescription')}
        rows={4}
        className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-vertical"
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}
