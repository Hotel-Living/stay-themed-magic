
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface FilterActionsProps {
  onClearAll?: () => void;
  hasActiveFilters: boolean;
  onSearch?: () => void;
}

export function FilterActions({ 
  onClearAll, 
  hasActiveFilters,
  onSearch
}: FilterActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="h-7 px-2 text-xs text-foreground/70 hover:text-foreground"
        >
          <X className="h-3 w-3 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
}
