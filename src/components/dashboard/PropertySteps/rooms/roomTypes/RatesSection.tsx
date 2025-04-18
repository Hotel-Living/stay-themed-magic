
import React from "react";
import { Input } from "@/components/ui/input";

interface RatesSectionProps {
  stayLengths: number[];
  rates: Record<number, number>;
  onRateChange: (duration: number, value: string) => void;
  error?: string;
}

export default function RatesSection({
  stayLengths,
  rates,
  onRateChange,
  error
}: RatesSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">RATES PER PERSON</h3>
      </div>
      
      <div className={`bg-fuchsia-950/50 p-4 rounded-lg border ${error ? 'border-red-400' : 'border-white/20'}`}>
        <div className="space-y-4">
          {stayLengths.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {stayLengths.map(duration => (
                <div key={duration} className="flex items-center">
                  <label className="text-sm w-24">{duration} days</label>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm">$</span>
                    <Input 
                      type="number"
                      className="bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-1 pl-8 text-sm text-white"
                      placeholder="0"
                      value={rates[duration] || ""}
                      onChange={(e) => onRateChange(duration, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-4">
              <p>Please select stay durations in the previous section first</p>
            </div>
          )}
          
          {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
}
