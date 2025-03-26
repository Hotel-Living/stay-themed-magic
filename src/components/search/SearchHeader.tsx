
import React from 'react';
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

interface SearchHeaderProps {
  count: number;
  isLoading: boolean;
  onSortChange: (option: string) => void;
}

export function SearchHeader({ count, isLoading, onSortChange }: SearchHeaderProps) {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value);
  };
  
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        {isLoading ? (
          <Skeleton className="h-8 w-40" />
        ) : (
          <h2 className="text-xl font-semibold">
            {count === 0 ? "No results found" : `${count} properties found`}
          </h2>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <select 
          className="bg-background border border-input rounded-md px-3 py-1 text-sm"
          onChange={handleSortChange}
          defaultValue="relevance"
        >
          <option value="relevance">Relevance</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="rating-high-low">Rating: High to Low</option>
          <option value="newest">Newest First</option>
        </select>
      </div>
    </div>
  );
}
