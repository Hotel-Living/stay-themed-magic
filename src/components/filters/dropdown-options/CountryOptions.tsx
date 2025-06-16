
import React from "react";
import { FilterState } from "../FilterTypes";
import { availableCountries } from "../FilterUtils";
import { useTranslation } from "@/hooks/useTranslation";

interface CountryOptionsProps {
  type: keyof FilterState;
  fontSize: string;
}

export const CountryOptions: React.FC<CountryOptionsProps> = ({ type, fontSize }) => {
  const { t } = useTranslation();
  
  return (
    <>
      {availableCountries.map((country) => (
        <button
          key={country.value}
          onClick={() => {
            console.log("CountryOptions - Country filter selected:", country.value);
            console.log("CountryOptions - Event type:", type);
            document.dispatchEvent(new CustomEvent('updateFilter', { 
              detail: { key: type, value: country.value } 
            }));
          }}
          className={`w-full text-left px-3 py-2 rounded-md ${fontSize} font-bold transition-colors hover:bg-[#460F54]`} 
        >
          {t(country.translationKey)}
        </button>
      ))}
    </>
  );
};
