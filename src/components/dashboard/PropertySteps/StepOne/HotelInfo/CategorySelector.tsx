
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface CategorySelectorProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  hasError?: boolean;
  errorMessage?: string;
  error?: string;
}

export default function CategorySelector({ 
  value, 
  onChange, 
  onBlur,
  hasError,
  errorMessage,
  error 
}: CategorySelectorProps) {
  const { t } = useTranslation();

  const finalError = errorMessage || error;

  const categories = [
    { value: 'luxury', label: t('categories.luxury') },
    { value: 'boutique', label: t('categories.boutique') },
    { value: 'business', label: t('categories.business') },
    { value: 'family', label: t('categories.family') },
    { value: 'romantic', label: t('categories.romantic') },
    { value: 'adventure', label: t('categories.adventure') },
    { value: 'wellness', label: t('categories.wellness') },
    { value: 'budget', label: t('categories.budget') }
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground/90 uppercase">
        {t('basicInfo.category')} *
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className="w-full px-3 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
      >
        <option value="">{t('basicInfo.selectHotelCategory')}</option>
        {categories.map(category => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
      {finalError && <p className="text-red-400 text-xs">{finalError}</p>}
    </div>
  );
}
