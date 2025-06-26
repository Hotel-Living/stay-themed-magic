

import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { NewLengthOfStayFilterEN } from "./NewLengthOfStayFilter.en";
import { NewLengthOfStayFilterES } from "./NewLengthOfStayFilter.es";
import { NewLengthOfStayFilterPT } from "./NewLengthOfStayFilter.pt";
import { NewLengthOfStayFilterRO } from "./NewLengthOfStayFilter.ro";

interface NewLengthOfStayFilterProps {
  activeLength: string | null;
  onChange: (value: string | null) => void;
}

export function NewLengthOfStayFilter({ activeLength, onChange }: NewLengthOfStayFilterProps) {
  const { language } = useTranslation();
  
  if (language === 'en') return <NewLengthOfStayFilterEN activeLength={activeLength} onChange={onChange} />;
  if (language === 'es') return <NewLengthOfStayFilterES activeLength={activeLength} onChange={onChange} />;
  if (language === 'pt') return <NewLengthOfStayFilterPT activeLength={activeLength} onChange={onChange} />;
  if (language === 'ro') return <NewLengthOfStayFilterRO activeLength={activeLength} onChange={onChange} />;
  
  // Default fallback to English
  return <NewLengthOfStayFilterEN activeLength={activeLength} onChange={onChange} />;
}

