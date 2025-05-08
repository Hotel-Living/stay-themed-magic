
import React, { useState, useEffect } from "react";
import { ChevronRight, Info } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface StayRatesSettingsSectionProps {
  currency: string;
  setCurrency: (code: string) => void;
  enablePriceIncrease: boolean;
  setEnablePriceIncrease: (enabled: boolean) => void;
  priceIncreaseCap: number;
  setPriceIncreaseCap: (cap: number) => void;
}

const currencies = [{
  code: "USD",
  symbol: "$",
  name: "US Dollar"
}, {
  code: "EUR",
  symbol: "€",
  name: "Euro"
}, {
  code: "GBP",
  symbol: "£",
  name: "British Pound"
}, {
  code: "JPY",
  symbol: "¥",
  name: "Japanese Yen"
}, {
  code: "CNY",
  symbol: "¥",
  name: "Chinese Yuan"
}];

export function StayRatesSettingsSection({
  currency,
  setCurrency,
  enablePriceIncrease,
  setEnablePriceIncrease,
  priceIncreaseCap,
  setPriceIncreaseCap
}: StayRatesSettingsSectionProps) {
  // Add a separate state for visual rendering with a small delay
  const [visibleBlock, setVisibleBlock] = useState(enablePriceIncrease);

  // Effect to handle delayed visibility changes
  useEffect(() => {
    if (enablePriceIncrease) {
      const timeout = setTimeout(() => setVisibleBlock(true), 10);
      return () => clearTimeout(timeout);
    } else {
      setVisibleBlock(false);
    }
  }, [enablePriceIncrease]);

  return (
    <>
      <Collapsible className="w-full" defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
          <label className="block text-lg font-medium text-foreground/90 mb-3 uppercase">4-1 GENERAL SETTINGS</label>
          <ChevronRight className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="bg-[#5A1876]/20 rounded-lg p-4 border border-fuchsia-800/30 mb-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="currency">
                <AccordionTrigger className="py-2 px-0 hover:no-underline">
                  <span className="text-sm font-medium uppercase">CURRENCY</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {currencies.map(curr => <button key={curr.code} className={`py-1 px-2 text-sm border rounded-lg transition-colors ${currency === curr.code ? "bg-fuchsia-500/20 border-fuchsia-500/50" : "border-fuchsia-500/30 hover:bg-fuchsia-500/10"}`} onClick={() => setCurrency(curr.code)}>
                        {curr.symbol} {curr.code}
                      </button>)}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="price-increase" className="border-t border-fuchsia-800/30 mt-2 pt-2">
                <AccordionTrigger className="py-2 px-0 hover:no-underline">
                  <span className="text-sm font-medium uppercase">DYNAMIC PRICING</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={enablePriceIncrease} 
                        onChange={() => setEnablePriceIncrease(!enablePriceIncrease)}
                        className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2" 
                      />
                      <span className="text-sm">ENABLE DYNAMIC PRICING BASED ON NIGHTS SOLD</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-4 h-4 ml-2 text-foreground/60" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-sm">
                            <p>
                              When enabled, prices will automatically increase based on the number of nights booked in a month.
                              The price increases by 1% for every X nights sold, where X depends on the total available nights.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </label>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Dynamic pricing content moved COMPLETELY outside both Accordion and Collapsible */}
      {typeof enablePriceIncrease !== "undefined" && (
        <div 
          className={`dynamic-pricing-content overflow-hidden transition-transform duration-300 origin-top ${
            visibleBlock ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 h-0"
          }`}
        >
          <div className="pricing-content-inner bg-[#5A1876]/20 rounded-lg p-4 border border-fuchsia-800/30 mb-6">
            <div>
              <label className="block text-sm mb-1 uppercase flex items-center justify-between">
                <span>MAXIMUM PRICE INCREASE</span>
                <span className="text-fuchsia-400">{priceIncreaseCap}%</span>
              </label>
              <Slider value={[priceIncreaseCap]} onValueChange={values => setPriceIncreaseCap(values[0])} min={5} max={50} step={1} className="w-full" />
              <p className="text-xs text-foreground/70 mt-1">
                This is the maximum percentage that prices can increase due to demand.
              </p>
            </div>
            
            <div className="bg-fuchsia-900/20 p-3 rounded-lg border border-fuchsia-800/30 mt-4">
              <h4 className="text-sm font-medium mb-2">How Dynamic Pricing Works</h4>
              <p className="text-xs text-foreground/80 mb-2">
                The price increases by 1% for every X nights sold in a month, where X is calculated as:
              </p>
              <div className="bg-fuchsia-950/50 p-2 rounded-md text-center text-sm font-mono mb-2">
                X = (Total nights in month) ÷ {priceIncreaseCap}
              </div>
              <p className="text-xs text-foreground/80">
                For example, with 30 rooms × 30 days = 900 total nights and a maximum increase of {priceIncreaseCap}%, 
                the price would increase by 1% for every {Math.round(900 / priceIncreaseCap)} nights sold.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
