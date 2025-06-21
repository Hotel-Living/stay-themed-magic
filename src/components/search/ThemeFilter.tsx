
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { ThemeFilterEN } from "./ThemeFilter.en";
import { ThemeFilterES } from "./ThemeFilter.es";
import { ThemeFilterPT } from "./ThemeFilter.pt";
import { ThemeFilterRO } from "./ThemeFilter.ro";
import { Theme } from "@/utils/themes";

interface ThemeFilterProps {
  activeTheme: Theme | null;
  onChange: (value: Theme | null) => void;
}

export function ThemeFilter({ activeTheme, onChange }: ThemeFilterProps) {
  const { language } = useTranslation();
  
  if (language === 'en') return <ThemeFilterEN activeTheme={activeTheme} onChange={onChange} />;
  if (language === 'es') return <ThemeFilterES activeTheme={activeTheme} onChange={onChange} />;
  if (language === 'pt') return <ThemeFilterPT activeTheme={activeTheme} onChange={onChange} />;
  if (language === 'ro') return <ThemeFilterRO activeTheme={activeTheme} onChange={onChange} />;
  
  // Default fallback to English
  return <ThemeFilterEN activeTheme={activeTheme} onChange={onChange} />;
}
