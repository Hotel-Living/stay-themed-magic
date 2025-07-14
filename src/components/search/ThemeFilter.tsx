
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { SimpleAffinityFilter } from "./SimpleAffinityFilter";
import { Theme } from "@/utils/themes";

interface ThemeFilterProps {
  activeTheme: Theme | null;
  onChange: (value: Theme | null) => void;
}

export function ThemeFilter({ activeTheme, onChange }: ThemeFilterProps) {
  const { t } = useTranslation('filters');

  const handleAffinityChange = (value: string | null) => {
    if (value) {
      // Create a simple theme object from the affinity name
      onChange({
        id: value,
        name: value,
        level: 1,
        category: 'AFFINITY'
      } as Theme);
    } else {
      onChange(null);
    }
  };

  return (
    <SimpleAffinityFilter
      activeAffinity={activeTheme?.name || null}
      onChange={handleAffinityChange}
      title={t("filters.affinity")}
    />
  );
}
