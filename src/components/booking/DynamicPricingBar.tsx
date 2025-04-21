
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface DynamicPricingBarProps {
  nightsSold: number;
  totalNights: number;
  priceIncrease: number;
}

export function DynamicPricingBar({ nightsSold, totalNights, priceIncrease }: DynamicPricingBarProps) {
  return (
    <div className="rounded-lg bg-fuchsia-950/50 p-3 border border-fuchsia-800/30">
      <div className="flex items-center justify-between text-sm text-fuchsia-200 mb-1">
        <span>Dynamic pricing</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button">
                <Info className="w-4 h-4 ml-1 text-fuchsia-400" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>This hotel uses dynamic pricing based on demand. Prices increase as more nights are booked.</p>
              <p className="mt-1">Currently {nightsSold} of {totalNights} nights have been booked this month.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="w-full bg-fuchsia-900/30 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-gradient-to-r from-fuchsia-400 to-fuchsia-600 h-full rounded-full"
          style={{ width: `${Math.min(priceIncrease * 5, 100)}%` }}
        ></div>
      </div>
      <div className="flex justify-between items-center mt-1 text-xs text-fuchsia-300">
        <span>Base price</span>
        <span>+{priceIncrease}% (max +20%)</span>
      </div>
    </div>
  );
}
