
import { Button } from "@/components/ui/button";
import { FilterState } from "@/components/FilterSection";

interface EmptySearchProps {
  onClearFilters: () => void;
}

export function EmptySearch({ onClearFilters }: EmptySearchProps) {
  return (
    <div className="glass-card rounded-xl p-6 mt-4 text-center">
      <p className="text-white/70">No hotels match your current filters.</p>
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-4"
        onClick={onClearFilters}
      >
        Clear filters
      </Button>
    </div>
  );
}
