
import React, { createContext, useContext } from 'react';
import { useFiltersState } from './useFiltersState';
import { SearchFiltersContextType } from './types';

const SearchFiltersContext = createContext<SearchFiltersContextType | undefined>(undefined);

export function SearchFiltersProvider({ children }: { children: React.ReactNode }) {
  const filtersState = useFiltersState();
  
  return (
    <SearchFiltersContext.Provider value={filtersState}>
      {children}
    </SearchFiltersContext.Provider>
  );
}

export function useSearchFilters() {
  const context = useContext(SearchFiltersContext);
  if (context === undefined) {
    throw new Error('useSearchFilters must be used within a SearchFiltersProvider');
  }
  return context;
}
