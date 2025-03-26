
import React, { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, PlusCircle, InfoCircle } from "lucide-react";
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
import { useCurrency } from "@/context/CurrencyContext";

export default function RoomsAndPricingStep() {
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const mealPlans = ["Breakfast only", "Half board", "Full board", "All inclusive"];
  const roomTypes = ["Single", "Double", "Suite", "Apartment"];
  const { formatPrice } = useCurrency();
  
  // Add state for dynamic pricing
  const [enableDynamicPricing, setEnableDynamicPricing] = useState(false);
  const [dynamicPricingPercentage, setDynamicPricingPercentage] = useState(20);

  // Calculate dynamic pricing example
  const calculateExamplePrices = () => {
    const totalRooms = 10;
    const basePrice = 100;
    const percentagePerRoom = dynamicPricingPercentage / totalRooms;
    
    return Array.from({ length: totalRooms }, (_, index) => {
      const multiplier = 1 + (percentagePerRoom * index / 100);
      return {
        roomNumber: index + 1,
        price: basePrice * multiplier
      };
    });
  };

  const examplePrices = calculateExamplePrices();
  
  return (
    <div className="space-y-6">
      <div>
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
            <label className="block text-sm font-medium text-foreground/90">
              LENGTH OF STAYS
            </label>
            <ChevronRight className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-sm mb-1">Minimum stay (nights)</label>
                <input 
                  type="number" 
                  className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2"
                  min="1"
                  placeholder="e.g., 7"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Maximum stay (nights)</label>
                <input 
                  type="number" 
                  className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2"
                  min="1"
                  placeholder="e.g., 90"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      <div>
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
            <label className="block text-sm font-medium text-foreground/90">
              PRICING
            </label>
            <ChevronRight className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-sm mb-1">Base price per night</label>
                <div className="relative">
                  <input 
                    type="number" 
                    className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2 pl-7"
                    placeholder="0.00"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Weekly discount (%)</label>
                <input 
                  type="number" 
                  className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2"
                  min="0"
                  max="100"
                  placeholder="e.g., 10"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Monthly discount (%)</label>
                <input 
                  type="number" 
                  className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2"
                  min="0"
                  max="100"
                  placeholder="e.g., 20"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Cleaning fee</label>
                <div className="relative">
                  <input 
                    type="number" 
                    className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2 pl-7"
                    placeholder="0.00"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      <div>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-400">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4" />
                          <path d="M12 8h.01" />
                        </svg>
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
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-400 inline">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4" />
                                <path d="M12 8h.01" />
                              </svg>
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
      </div>
      
      <div>
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
            <label className="block text-sm font-medium text-foreground/90">
              CHECK-IN/OUT POLICY
            </label>
            <ChevronRight className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-sm mb-1">Check-in time</label>
                <input 
                  type="time" 
                  className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2"
                  defaultValue="14:00"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Check-out time</label>
                <input 
                  type="time" 
                  className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2"
                  defaultValue="11:00"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm mb-1">Preferred Weekday for all Check-ins/outs</label>
                <Select>
                  <SelectTrigger className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30">
                    <SelectValue placeholder="Select a weekday" />
                  </SelectTrigger>
                  <SelectContent>
                    {weekdays.map((day) => (
                      <SelectItem key={day} value={day.toLowerCase()}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      <div>
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
            <label className="block text-sm font-medium text-foreground/90">
              MEALS
            </label>
            <ChevronRight className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-1 gap-4 mt-2">
              <div>
                <label className="block text-sm mb-1">Meal plans offered</label>
                <div className="space-y-2">
                  {mealPlans.map((plan) => (
                    <label key={plan} className="flex items-start">
                      <input 
                        type="checkbox" 
                        className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                      />
                      <span className="text-sm">{plan}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      <div>
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left mb-2">
            <label className="block text-sm font-medium text-foreground/90">
              ROOM TYPES
            </label>
            <ChevronRight className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-1 gap-4 mt-2">
              <div className="space-y-4">
                {roomTypes.map((roomType) => (
                  <div key={roomType} className="bg-fuchsia-950/30 rounded-lg p-4 border border-fuchsia-800/30">
                    <h4 className="font-medium mb-3">{roomType}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-1">Price per night</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2 pl-7"
                            placeholder="0.00"
                          />
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Number of rooms</label>
                        <input 
                          type="number" 
                          className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-2"
                          min="0"
                          placeholder="e.g., 5"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex items-center">
                  <PlusCircle className="w-5 h-5 mr-2 text-fuchsia-400" />
                  <span className="text-fuchsia-400 font-medium">Add new room type</span>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}

