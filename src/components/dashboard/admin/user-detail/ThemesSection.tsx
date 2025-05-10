
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ThemeWithCategory } from "./hooks/user-data/useUserThemes";
import { ThemeTag } from "@/components/ThemeTag";

interface ThemesSectionProps {
  themes: ThemeWithCategory[];
  loading?: boolean;
  pagination?: {
    page: number;
    totalThemes: number;
    hasMore: boolean;
    setPage: (page: number) => void;
    pageSize: number;
  };
}

export const ThemesSection = ({ 
  themes, 
  loading = false,
  pagination 
}: ThemesSectionProps) => {
  if (loading) {
    return (
      <div className="py-4 text-center">
        <div className="animate-pulse flex space-x-2 justify-center">
          <div className="h-2.5 w-2.5 bg-gray-300 rounded-full"></div>
          <div className="h-2.5 w-2.5 bg-gray-300 rounded-full"></div>
          <div className="h-2.5 w-2.5 bg-gray-300 rounded-full"></div>
        </div>
        <p className="mt-2 text-sm text-gray-500">Loading themes...</p>
      </div>
    );
  }

  if (themes.length === 0) {
    return <p className="text-center py-4 text-gray-500">No preferred themes found for this user.</p>;
  }

  // Group themes by category
  const themesByCategory = themes.reduce((acc, theme) => {
    const category = theme.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(theme);
    return acc;
  }, {} as Record<string, ThemeWithCategory[]>);

  return (
    <div className="space-y-6">
      {/* Display themes grouped by category */}
      {Object.entries(themesByCategory).map(([category, categoryThemes]) => (
        <div key={category} className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">{category}</h4>
          <div className="flex flex-wrap gap-2">
            {categoryThemes.map((theme) => (
              <ThemeTag 
                key={theme.id} 
                theme={theme}
                size="md"
              />
            ))}
          </div>
        </div>
      ))}
      
      {/* Pagination controls if enabled */}
      {pagination && (
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.page === 1}
            onClick={() => pagination.setPage(pagination.page - 1)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          
          <span className="text-sm text-gray-500">
            {pagination.pageSize * (pagination.page - 1) + 1} - {Math.min(pagination.pageSize * pagination.page, pagination.totalThemes)} of {pagination.totalThemes}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            disabled={!pagination.hasMore}
            onClick={() => pagination.setPage(pagination.page + 1)}
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};
