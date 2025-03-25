
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CompareEmpty() {
  return (
    <div className="glass-card rounded-xl p-6 text-center">
      <h2 className="text-xl font-semibold mb-3 text-white">No hotels to compare</h2>
      <p className="text-white/70 mb-4">
        Add some hotels to comparison from the search results first.
      </p>
      <Button asChild>
        <Link to="/search">Go to search</Link>
      </Button>
    </div>
  );
}
