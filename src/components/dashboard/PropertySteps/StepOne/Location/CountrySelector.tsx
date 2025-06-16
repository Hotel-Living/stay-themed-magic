
import React from "react";
import { Country } from "country-state-city";
import { useTranslation } from "@/hooks/useTranslation";

interface CountrySelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function CountrySelector({ value, onChange, error }: CountrySelectorProps) {
  const { t } = useTranslation();
  const countries = Country.getAllCountries();

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground/90 uppercase">
        {t('location.country')} *
      </label>
      <div className="flex gap-2">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
        >
          <option value="">{t('location.selectACountry')}</option>
          {countries.map(country => (
            <option key={country.isoCode} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="px-4 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 transition-colors"
        >
          {t('location.custom')}
        </button>
      </div>
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}
