
import { Button } from "@/components/ui/button";

interface SearchErrorProps {
  onRefresh: () => void;
}

export function SearchError({ onRefresh }: SearchErrorProps) {
  return (
    <div className="glass-card rounded-xl p-6 mt-4 text-center">
      <p className="text-red-400">Error loading hotels. Please try again.</p>
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-4"
        onClick={onRefresh}
      >
        Refresh
      </Button>
    </div>
  );
}
