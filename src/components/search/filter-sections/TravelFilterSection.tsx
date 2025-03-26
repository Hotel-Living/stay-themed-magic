
import React from 'react';
import { CountryFilter } from '../CountryFilter';
import { MonthFilter } from '../MonthFilter';
import { ThemeFilter } from '../ThemeFilter';
import { LengthOfStayFilter } from '../LengthOfStayFilter';
import { LocationFilter } from '../LocationFilter';
import { Theme } from '@/utils/data';

interface TravelFilterSectionProps {
  activeFilters: {
    country: string | null;
    month: string | null;
    theme: string | Theme | null;
    lengthOfStay: string | null;
    location: string | null;
  };
  handleFilterChange: (key: string, value: any) => void;
}

export function TravelFilterSection({ 
  activeFilters, 
  handleFilterChange 
}: TravelFilterSectionProps) {
  return (
    <>
      <div className="border-t border-foreground/10 pt-4">
        <CountryFilter 
          activeCountry={activeFilters.country} 
          onChange={(value) => handleFilterChange('country', value)} 
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <MonthFilter 
          activeMonth={activeFilters.month} 
          onChange={(value) => handleFilterChange('month', value)} 
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <ThemeFilter 
          activeTheme={activeFilters.theme} 
          onChange={(value) => handleFilterChange('theme', value)} 
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <LocationFilter 
          activeLocation={activeFilters.location} 
          onChange={(value) => handleFilterChange('location', value)} 
        />
      </div>
      
      <div className="border-t border-foreground/10 pt-4">
        <LengthOfStayFilter 
          activeLength={activeFilters.lengthOfStay} 
          onChange={(value) => handleFilterChange('lengthOfStay', value)} 
        />
      </div>
    </>
  );
}
