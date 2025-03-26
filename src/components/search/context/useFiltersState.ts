
import { useState, useCallback } from 'react';
import { SearchFilterState, PaginationState, DEFAULT_FILTERS } from './types';

export function useFiltersState() {
  const [filters, setFilters] = useState<SearchFilterState>(DEFAULT_FILTERS);
  const [pagination, setPagination] = useState<PaginationState>({ page: 1, limit: 10 });
  const [sortOption, setSortOption] = useState('relevance');

  const handleFilterChange = useCallback((key: keyof SearchFilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    // Reset to page 1 when filters change
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  const handleArrayFilterChange = useCallback((key: keyof SearchFilterState, value: string[]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    // Reset to page 1 when filters change
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setPagination(prev => ({ ...prev, page }));
  }, []);

  const handleSortChange = useCallback((option: string) => {
    setSortOption(option);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  return {
    filters,
    pagination,
    sortOption,
    handleFilterChange,
    handleArrayFilterChange,
    handlePageChange,
    handleSortChange,
    handleClearFilters
  };
}
