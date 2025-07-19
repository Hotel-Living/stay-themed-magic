
import React from 'react';
import { FilterState } from '@/components/filters/FilterTypes';
import { FilterSidebar } from '@/components/search/FilterSidebar';
import { SecondFilterSidebar } from '@/components/search/SecondFilterSidebar';

interface SearchProps {
  activeFilters: FilterState;
  handleFilterChange: (key: keyof FilterState, value: any) => void;
  handleArrayFilterChange: (key: keyof FilterState, value: string, isSelected: boolean) => void;
  onResetAllFilters: () => void;
}

export default function Search({
  activeFilters,
  handleFilterChange,
  handleArrayFilterChange,
  onResetAllFilters
}: SearchProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Desktop Filter Sidebar - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterSidebar
              activeFilters={activeFilters}
              handleFilterChange={handleFilterChange}
              handleArrayFilterChange={handleArrayFilterChange}
              onResetAllFilters={onResetAllFilters}
            />
          </div>

          {/* Main Content Area */}
          <div className="col-span-1 lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold mb-6">Search Results</h1>
              {/* Search results content goes here */}
              <p className="text-gray-500">Search results will be displayed here.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Button - Only visible on mobile */}
      <SecondFilterSidebar
        activeFilters={activeFilters}
        handleFilterChange={handleFilterChange}
        handleArrayFilterChange={handleArrayFilterChange}
        onResetAllFilters={onResetAllFilters}
      />
    </div>
  );
}
