
import React from 'react';
import { LengthOfStayFilterEN } from './LengthOfStayFilter.en';
import { LengthOfStayFilterES } from './LengthOfStayFilter.es';
import { LengthOfStayFilterPT } from './LengthOfStayFilter.pt';
import { LengthOfStayFilterRO } from './LengthOfStayFilter.ro';
import { CategoryFilterEN } from './CategoryFilter.en';
import { CategoryFilterES } from './CategoryFilter.es';
import { CategoryFilterPT } from './CategoryFilter.pt';
import { CategoryFilterRO } from './CategoryFilter.ro';
import { useTranslation } from '@/hooks/useTranslation';

interface SecondaryFilterPanelProps {
  activeLength: string | null;
  onLengthChange: (value: string | null) => void;
  activeCategory: string | null;
  onCategoryChange: (value: string | null) => void;
}

const durationOptions = [29, 22, 15, 8];

export function SecondaryFilterPanel({
  activeLength,
  onLengthChange,
  activeCategory,
  onCategoryChange
}: SecondaryFilterPanelProps) {
  const { language } = useTranslation();

  const renderLengthOfStayFilter = () => {
    switch (language) {
      case 'es':
        return (
          <LengthOfStayFilterES
            activeLength={activeLength}
            onChange={onLengthChange}
          />
        );
      case 'pt':
        return (
          <LengthOfStayFilterPT
            activeLength={activeLength}
            onChange={onLengthChange}
          />
        );
      case 'ro':
        return (
          <LengthOfStayFilterRO
            activeLength={activeLength}
            onChange={onLengthChange}
          />
        );
      default:
        return (
          <LengthOfStayFilterEN
            activeLength={activeLength}
            onChange={onLengthChange}
          />
        );
    }
  };

  const renderCategoryFilter = () => {
    switch (language) {
      case 'es':
        return (
          <CategoryFilterES
            activeCategory={activeCategory}
            onChange={onCategoryChange}
          />
        );
      case 'pt':
        return (
          <CategoryFilterPT
            activeCategory={activeCategory}
            onChange={onCategoryChange}
          />
        );
      case 'ro':
        return (
          <CategoryFilterRO
            activeCategory={activeCategory}
            onChange={onCategoryChange}
          />
        );
      default:
        return (
          <CategoryFilterEN
            activeCategory={activeCategory}
            onChange={onCategoryChange}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      {renderLengthOfStayFilter()}
      {renderCategoryFilter()}
    </div>
  );
}
