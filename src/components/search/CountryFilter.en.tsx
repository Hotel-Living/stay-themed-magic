
import React from "react";
import { FilterItem } from "./FilterItem";
import { useFilterData } from "@/hooks/useFilterData";

interface CountryFilterENProps {
  activeCountry: string | null;
  onChange: (value: string | null) => void;
}

export function CountryFilterEN({ activeCountry, onChange }: CountryFilterENProps) {
  const { countries, loading } = useFilterData();

  const handleCountryClick = (countryCode: string) => {
    const isCurrentlySelected = activeCountry === countryCode;
    onChange(isCurrentlySelected ? null : countryCode);
  };

  if (loading) {
    return (
      <FilterItem title="COUNTRY">
        <div className="text-white text-sm">Loading countries...</div>
      </FilterItem>
    );
  }

  return (
    <FilterItem title="COUNTRY">
      <div className="max-h-48 overflow-y-auto">
        {countries.map(country => (
          <label key={country.code} className="flex items-center mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
            <input 
              type="checkbox" 
              checked={activeCountry === country.code}
              onChange={() => handleCountryClick(country.code)}
              className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2" 
            />
            <span className="text-sm font-bold text-white flex items-center">
              <span className="mr-2">{country.flag}</span>
              {country.name}
            </span>
          </label>
        ))}
      </div>
    </FilterItem>
  );
}
