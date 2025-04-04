
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

export default function StayRatesStep() {
  const [currency, setCurrency] = useState("USD");
  const [enablePriceIncrease, setEnablePriceIncrease] = useState(false);
  const [priceIncreasePercentage, setPriceIncreasePercentage] = useState(20);
  const [ratesFilled, setRatesFilled] = useState(false);
  const [rates, setRates] = useState({});

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
            </div>
            
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div>
                <div className="flex items-center mb-2">
                  <label className="block text-sm uppercase whitespace-nowrap mr-3">SELECT CURRENCY:</label>
                  <div className="flex items-center flex-wrap gap-1">
                    {currencies.map((curr) => (
                      <button
                        key={curr.code}
                        className={`py-0.5 px-1.5 text-xs border rounded-md transition-colors ${
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
                </div>
              </div>
              
              <div className="space-y-4">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={enablePriceIncrease}
                    onChange={() => setEnablePriceIncrease(!enablePriceIncrease)}
                    className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2" 
                  />
                  <span className="text-sm uppercase">ENABLE AUTOMATIC PRICE INCREASE PER BOOKING</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4 ml-2 text-foreground/60" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>
                          When enabled, prices will automatically increase as rooms are booked. 
                          The percentage is divided by the number of available rooms and applied after each booking.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </label>
                
                {enablePriceIncrease && (
                  <div>
                    <label className="block text-sm mb-1 uppercase">PRICE INCREASE PERCENTAGE</label>
                    <div className="flex items-center">
                      <input 
                        type="number" 
                        value={priceIncreasePercentage}
                        onChange={(e) => setPriceIncreasePercentage(Number(e.target.value))}
                        min="1"
                        max="100"
                        className="w-24 bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2 mr-2"
                      />
                      <span className="text-sm">%</span>
                    </div>
                    <p className="text-xs text-foreground/70 mt-1">
                      Example: With 10 rooms and 20% increase, each booking will raise the price by 2%.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-sm font-medium uppercase">RATE TABLE</h3>
              
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
                                    className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-1 pl-6 text-xs"
                                    placeholder="0.00"
                                    required
                                    value={rates[rateKey] || ""}
                                    onChange={(e) => handleRateChange(roomType, stayOption, mealOption, e.target.value)}
                                  />
                                  <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs">
                                    {currencies.find(c => c.code === currency)?.symbol}
                                  </span>
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
