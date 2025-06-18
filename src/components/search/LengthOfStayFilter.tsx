
import { FilterItem } from "./FilterItem";
import { useTranslation } from "@/hooks/useTranslation";

interface LengthOfStayFilterProps {
  activeLength: string | null;
  onChange: (value: string) => void;
}

export function LengthOfStayFilter({ activeLength, onChange }: LengthOfStayFilterProps) {
  const { t } = useTranslation();

  // These options should match what's available in RoomsAndPricingStep.tsx
  const lengthOfStayOptions = [
    { value: "8 days", label: t('filters.stayLengths.8days') },
    { value: "16 days", label: t('filters.stayLengths.16days') },
    { value: "24 days", label: t('filters.stayLengths.24days') },
    { value: "32 days", label: t('filters.stayLengths.32days') }
  ];

  return (
    <FilterItem title={t('filters.lengthOfStay').toUpperCase()}>
      {lengthOfStayOptions.map(option => (
        <label key={option.value} className="flex items-start">
          <input 
            type="radio" 
            name="lengthOfStay"
            checked={activeLength === option.value}
            onChange={() => onChange(option.value)}
            className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm">{option.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
