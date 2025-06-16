
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface PropertyTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function PropertyTypeSelector({ value, onChange, error }: PropertyTypeSelectorProps) {
  const { t } = useTranslation();

  const propertyTypes = [
    { value: 'hotel', label: t('propertyTypes.hotel') },
    { value: 'resort', label: t('propertyTypes.resort') },
    { value: 'aparthotel', label: t('propertyTypes.aparthotel') },
    { value: 'guesthouse', label: t('propertyTypes.guesthouse') },
    { value: 'hostel', label: t('propertyTypes.hostel') },
    { value: 'villa', label: t('propertyTypes.villa') },
    { value: 'apartment', label: t('propertyTypes.apartment') },
    { value: 'house', label: t('propertyTypes.house') }
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground/90 uppercase">
        {t('basicInfo.propertyType')} *
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
      >
        <option value="">{t('basicInfo.selectPropertyType')}</option>
        {propertyTypes.map(type => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}
