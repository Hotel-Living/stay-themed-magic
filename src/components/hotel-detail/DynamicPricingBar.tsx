// RUTA: src/components/hotel-detail/DynamicPricingBar.tsx

import React from "react";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const DynamicPricingBar = () => {
  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center gap-2">
        <span className="font-medium text-sm text-gray-800">Dynamic pricing</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-4 h-4 text-gray-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs max-w-xs">
                This property utilizes dynamic pricing based on real-time demand. As availability decreases, rates may rise. Secure your reservation today to enjoy the lowest available rate.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Texto visible y discreto */}
      <p className="text-xs text-gray-500 max-w-prose leading-snug">
        Prices at this hotel increase progressively as availability decreases. Book early to secure the best rate.
      </p>
    </div>
  );
};
