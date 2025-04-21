
import React, { useState } from "react";
import { ChevronRight, Info } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";

export default function StayRatesStep() {
  const [ratesFilled, setRatesFilled] = useState(false);
  const [rates, setRates] = useState({});

  // Settings state moved to new section
  const [currency, setCurrency] = useState("USD");
  const [enablePriceIncrease, setEnablePriceIncrease] = useState(false);
  const [priceIncreasePercentage, setPriceIncreasePercentage] = useState(20);
  const [priceIncreaseCap, setPriceIncreaseCap] = useState(20);

  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "CNY", symbol: "¥", name: "Chinese Yuan" }
  ];

  // Example room types and stay options
  const roomTypes = ["Single", "Double", "Suite", "Apartment"];
  const stayOptions = ["8 days", "16 days", "24 days", "32 days"];
  const mealOptions = ["Breakfast only", "Half board", "Full board", "All inclusive", "No Meals Included"];

  const handleRateChange = (roomType, stayLength, mealOption, value) => {
    const key = `${roomType}-${stayLength}-${mealOption}`;
    setRates(prev => ({
      ...prev,
      [key]: value
    }));

    // Check if at least one rate has been entered
    if (value) {
      setRatesFilled(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Settings Section */}
      <div>
        <Collapsible className="w-full" defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
            <label className="block text-lg font-medium text-foreground/90 mb-3 uppercase">
              SETTINGS
            </label>
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
                      {currencies.map((curr) => (
                        <button
                          key={curr.code}
                          className={`py-1 px-2 text-sm border rounded-lg transition-colors ${
                            currency === curr.code
                              ? "bg-fuchsia-500/20 border-fuchsia-500/50"
                              : "border-fuchsia-500/30 hover:bg-fuchsia-500/10"
                          }`}
                          onClick={() => setCurrency(curr.code)}
                        >
                          {curr.symbol} {curr.code}
                        </button>
                      ))}
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
                      
                      {enablePriceIncrease && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm mb-1 uppercase flex items-center justify-between">
                              <span>MAXIMUM PRICE INCREASE</span>
                              <span className="text-fuchsia-400">{priceIncreaseCap}%</span>
                            </label>
                            <Slider
                              value={[priceIncreaseCap]}
                              onValueChange={(values) => setPriceIncreaseCap(values[0])}
                              min={5}
                              max={50}
                              step={1}
                              className="w-full"
                            />
                            <p className="text-xs text-foreground/70 mt-1">
                              This is the maximum percentage that prices can increase due to demand.
                            </p>
                          </div>
                          
                          <div className="bg-fuchsia-900/20 p-3 rounded-lg border border-fuchsia-800/30">
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
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      {/* Stay Rates section */}
      <div>
        <Collapsible className="w-full" defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
            <label className="block text-lg font-medium text-foreground/90 mb-3 uppercase">
              STAYS RATES
            </label>
            <ChevronRight className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="bg-[#5A1876]/20 rounded-lg p-4 border border-fuchsia-800/30 mb-6">
              <h3 className="text-sm font-medium mb-2 uppercase">IMPORTANT NOTICE</h3>
              <p className="text-xs text-foreground/80">
                All rates are set <span className="font-bold">PER PERSON</span>. Rates will be displayed to customers accordingly.
              </p>
              
              {enablePriceIncrease && (
                <div className="mt-3 pt-3 border-t border-fuchsia-800/30">
                  <h3 className="text-sm font-medium mb-2 uppercase flex items-center">
                    <Info className="w-4 h-4 mr-1 text-fuchsia-400" />
                    DYNAMIC PRICING ENABLED
                  </h3>
                  <p className="text-xs text-foreground/80">
                    These are base rates. Actual prices will dynamically increase up to +{priceIncreaseCap}% based on demand.
                  </p>
                </div>
              )}
            </div>
            
            <div className="space-y-6">              
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse">
                  <thead className="bg-fuchsia-900/30">
                    <tr>
                      <th className="p-2 text-left text-xs font-medium uppercase">ROOM TYPE</th>
                      <th className="p-2 text-left text-xs font-medium uppercase">STAY LENGTH</th>
                      <th className="p-2 text-left text-xs font-medium uppercase">MEAL PLAN</th>
                      <th className="p-2 text-left text-xs font-medium uppercase">PRICE PER PERSON</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-fuchsia-800/20">
                    {roomTypes.map(roomType => 
                      stayOptions.map(stayOption => 
                        mealOptions.map((mealOption, idx) => {
                          const rateKey = `${roomType}-${stayOption}-${mealOption}`;
                          
                          return (
                            <tr key={rateKey} className={idx % 2 === 0 ? "bg-fuchsia-900/10" : ""}>
                              <td className="p-2 text-xs">{roomType}</td>
                              <td className="p-2 text-xs">{stayOption}</td>
                              <td className="p-2 text-xs">{mealOption}</td>
                              <td className="p-2">
                                <div className="relative">
                                  <input 
                                    type="number" 
                                    className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-1 text-xs text-black"
                                    placeholder="0.00"
                                    required
                                    value={rates[rateKey] || ""}
                                    onChange={(e) => handleRateChange(roomType, stayOption, mealOption, e.target.value)}
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )
                    )}
                  </tbody>
                </table>
              </div>
              
              {!ratesFilled && (
                <p className="text-red-400 text-xs mt-1">Please enter at least one rate</p>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
