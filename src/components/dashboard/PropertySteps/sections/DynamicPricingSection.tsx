
import React from "react";
import { ChevronRight, Info } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDynamicPricing } from "@/hooks/useDynamicPricing";
import { useCurrency } from "@/context/CurrencyContext";

export function DynamicPricingSection() {
  const { 
    enableDynamicPricing, 
    setEnableDynamicPricing,
    dynamicPricingPercentage,
    setDynamicPricingPercentage,
    calculateExamplePrices
  } = useDynamicPricing();
  
  const { formatPrice } = useCurrency();
  const examplePrices = calculateExamplePrices();

  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
        <label className="block text-sm font-medium text-foreground/90">
          DYNAMIC PRICING
        </label>
        <ChevronRight className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-4 mt-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="enableDynamicPricing"
              checked={enableDynamicPricing}
              onChange={(e) => setEnableDynamicPricing(e.target.checked)}
              className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50"
            />
            <label htmlFor="enableDynamicPricing" className="text-sm font-medium">
              Enable automatic price increases as rooms get booked
            </label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-help">
                    <Info className="w-4 h-4 text-fuchsia-400" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>When enabled, room prices will automatically increase as inventory decreases. The percentage increase is divided equally among all available rooms.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          {enableDynamicPricing && (
            <>
              <div>
                <label className="block text-sm mb-1">
                  Total price increase percentage (%)
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help ml-1">
                          <Info className="w-4 h-4 text-fuchsia-400 inline" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>This percentage will be divided equally among all available rooms. For example, with 10 rooms and 20%, each room booked will increase the price by 2%.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </label>
                <input 
                  type="number" 
                  value={dynamicPricingPercentage}
                  onChange={(e) => setDynamicPricingPercentage(Number(e.target.value))}
                  className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2"
                  min="0"
                  max="100"
                  placeholder="e.g., 20"
                />
              </div>
              
              <div className="bg-fuchsia-950/40 rounded-lg p-4 border border-fuchsia-800/30">
                <h4 className="text-sm font-medium mb-2">Example: How prices will increase for 10 rooms with a base price of $100</h4>
                <div className="grid grid-cols-5 gap-2 text-xs">
                  {examplePrices.map((item) => (
                    <div key={item.roomNumber} className="bg-fuchsia-950/30 p-2 rounded text-center">
                      <div className="font-medium">Room {item.roomNumber}</div>
                      <div>{formatPrice(item.price)}</div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-fuchsia-300/70 mt-2">
                  * Each price is calculated as: Base Price + (Base Price × Percentage Increase ÷ Total Rooms × Rooms Booked)
                </p>
              </div>
            </>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
