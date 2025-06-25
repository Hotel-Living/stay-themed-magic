
import { FilterItem } from "./FilterItem";
import { useTranslation } from "@/hooks/useTranslation";

interface CheckboxFilterProps {
  title: string;
  options: Array<{ value: string; label: string }> | string[];
  selectedOptions: string[];
  onChange: (value: string, isChecked: boolean) => void;
  translationKey?: string;
}

export function CheckboxFilter({ title, options, selectedOptions, onChange, translationKey }: CheckboxFilterProps) {
  const { t } = useTranslation();
  
  // Handle both array formats for backward compatibility
  const normalizedOptions = options.map(option => 
    typeof option === 'string' 
      ? { value: option, label: option }
      : option
  );

  // Fix for translation keys that return objects instead of strings
  let displayTitle = title;
  if (translationKey) {
    try {
      const translatedTitle = t(translationKey);
      // If the translation returns an object, try to access the title property
      if (typeof translatedTitle === 'object' && translatedTitle !== null) {
        displayTitle = t(`${translationKey}.title`) || title;
      } else {
        displayTitle = translatedTitle;
      }
    } catch (error) {
      console.warn('Translation error for key:', translationKey);
      displayTitle = title;
    }
  }

  return (
    <FilterItem title={displayTitle}>
      {normalizedOptions.map(option => (
        <label key={option.value} className="flex items-start">
          <input 
            type="checkbox" 
            checked={selectedOptions.includes(option.value)}
            onChange={(e) => onChange(option.value, e.target.checked)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm">{option.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
