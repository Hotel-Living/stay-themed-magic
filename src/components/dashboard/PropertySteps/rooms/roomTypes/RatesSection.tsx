
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RatesSectionProps {
  stayLengths: number[];
  rates: Record<number, number>;
  onRateChange: (duration: number, value: string) => void;
}

export default function RatesSection({
  stayLengths,
  rates,
  onRateChange
}: RatesSectionProps) {
  return (
    <div className="w-full">      
      {stayLengths.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          {stayLengths.map(duration => (
            <div key={duration}>
              <Label className="text-lg font-medium text-white mb-2 block">{duration} Days</Label>
              <Input 
                className="w-full bg-fuchsia-950/50 border border-white rounded-lg p-3 text-white text-base"
                type="number"
                min="0"
                value={rates[duration] || ""}
                onChange={(e) => onRateChange(duration, e.target.value)}
                placeholder={`Rate for ${duration} days`}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white text-base">No stay durations have been configured. Please configure stay durations in the Length of Stay section.</p>
      )}
    </div>
  );
}
