
import React from "react";
import { Search } from "lucide-react";

interface FilterButtonProps {
  hasActiveFilters: boolean;
  onClearAllFilters: () => void;
  onSearch: () => void;
  searchBgColor: string;
  searchHoverBgColor: string;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  hasActiveFilters,
  onClearAllFilters,
  onSearch,
  searchBgColor,
  searchHoverBgColor
}) => {
  // New method to handle theme category
  const handleAddThemeCategory = () => {
    // Open a dialog to add new theme category
    // This would typically be implemented with a modal
    console.log("Opening add theme category dialog");
    
    // Show a simple alert with black text for now
    const themeDialog = document.createElement('div');
    themeDialog.className = "fixed inset-0 flex items-center justify-center z-50";
    themeDialog.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50" onclick="this.parentNode.remove()"></div>
      <div class="bg-white p-6 rounded-lg shadow-xl z-10 max-w-md w-full">
        <h3 class="text-xl font-semibold text-black mb-4">Add Theme Category</h3>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
          <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Enter category name">
        </div>
        <div class="flex justify-end space-x-2">
          <button class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md" onclick="this.closest('.fixed').remove()">Cancel</button>
          <button class="px-4 py-2 bg-[#AACAFE] text-[#3300B0] rounded-md">Add Category</button>
        </div>
      </div>
    `;
    document.body.appendChild(themeDialog);
  };

  return <div className="flex gap-2 w-full justify-between">
      {hasActiveFilters && 
        <button 
          onClick={onClearAllFilters} 
          className="px-4 py-2 rounded-lg bg-[#AACAFE]/80 text-[#3300B0] hover:bg-[#AACAFE]/60 text-sm transition-colors"
        >
          Clear All
        </button>
      }
      
      <button 
        onClick={onSearch}
        className={`px-4 py-2 rounded-lg ${searchBgColor} text-[#3300B0] ${searchHoverBgColor} text-sm transition-colors ml-auto`}
      >
        <Search className="w-4 h-4 inline mr-1" />
        Search
      </button>
    </div>;
};
