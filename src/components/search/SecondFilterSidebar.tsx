
import React, { useState } from 'react';
import { X, Filter } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { FilterState } from '@/components/filters/FilterTypes';
import { SecondaryFilterPanel } from './SecondaryFilterPanel';

interface SecondFilterSidebarProps {
  activeFilters: FilterState;
  handleFilterChange: (key: keyof FilterState, value: any) => void;
  handleArrayFilterChange: (key: keyof FilterState, value: string, isSelected: boolean) => void;
  onResetAllFilters: () => void;
}

export function SecondFilterSidebar({
  activeFilters,
  handleFilterChange,
  handleArrayFilterChange,
  onResetAllFilters
}: SecondFilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t, isReady } = useTranslation('filters');

  // Don't render until translations are ready
  if (!isReady) {
    return (
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg border border-gray-200">
          <Filter className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg border border-gray-200 hover:bg-white transition-colors"
        >
          <Filter className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative ml-auto h-full w-80 bg-gradient-to-b from-[#460F54] to-[#300A38] shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-white font-semibold">Filters</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
              <SecondaryFilterPanel
                activeFilters={activeFilters}
                handleFilterChange={handleFilterChange}
                handleArrayFilterChange={handleArrayFilterChange}
                onResetAllFilters={onResetAllFilters}
              />
              
              <button
                onClick={() => {
                  onResetAllFilters();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm"
              >
                {t('resetFilters')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
