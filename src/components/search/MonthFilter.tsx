
import { FilterItem } from "./FilterItem";
import { months } from "../filters/FilterUtils";
import { useTranslation } from "@/hooks/useTranslation";

interface MonthFilterProps {
  activeMonth: string | null;
  onChange: (value: string) => void;
}

export function MonthFilter({ activeMonth, onChange }: MonthFilterProps) {
  const { t } = useTranslation();

  return (
    <FilterItem title={t('filters.month').toUpperCase()}>
      <div className="grid grid-cols-2 gap-2">
        {months.map((month) => (
          <label key={month.value} className="flex items-start">
            <input 
              type="radio" 
              name="month"
              checked={activeMonth === month.value}
              onChange={() => onChange(month.value)}
              className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
            />
            <span className="text-sm">{t(month.translationKey)}</span>
          </label>
        ))}
      </div>
    </FilterItem>
  );
}
