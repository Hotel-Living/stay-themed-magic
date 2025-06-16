
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface AddressInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function AddressInput({ value, onChange, error }: AddressInputProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground/90 uppercase">
        {t('dashboard.address')} *
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('dashboard.enterFullAddress')}
        className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}
