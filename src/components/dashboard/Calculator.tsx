
import { Calculator } from "lucide-react";

export default function CalculatorContent() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-6">Hotel-Living Calculator</h2>
      <p className="text-foreground/80 mb-4">Calculate potential revenue and occupancy for your properties.</p>
      <div className="text-center py-20 text-muted-foreground">
        <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>Calculator coming soon...</p>
      </div>
    </div>
  );
}
