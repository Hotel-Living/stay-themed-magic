import React from 'react';

interface NoResultsFallbackProps {
  searchQuery: string;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
  onClearSearch?: () => void;
}

export function NoResultsFallback({ 
  searchQuery, 
  suggestions = [],
  onSuggestionClick,
  onClearSearch 
}: NoResultsFallbackProps) {
  return (
    <div className="text-center py-8 px-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-foreground mb-2">
          No results found for "{searchQuery}"
        </h3>
        <p className="text-muted-foreground">
          Try adjusting your search terms or browse our suggestions below.
        </p>
      </div>

      {suggestions.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3">
            Try these instead:
          </h4>
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick?.(suggestion)}
                className="px-3 py-1 text-sm bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-md transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 justify-center">
        <button
          onClick={onClearSearch}
          className="px-4 py-2 text-sm border border-border rounded-md hover:bg-muted/50 transition-colors"
        >
          Clear search
        </button>
      </div>
    </div>
  );
}