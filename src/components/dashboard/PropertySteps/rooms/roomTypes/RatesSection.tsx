
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
    <div className="col-span-4 mt-2">
      <h4 className="font-medium text-white mb-2">RATES PER PERSON, NOT PER ROOM</h4>
      
      {stayLengths.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {stayLengths.map(duration => (
            <div key={duration} className="mb-2">
              <Label className="text-sm text-white">{duration} Days</Label>
              <Input 
                className="w-full bg-fuchsia-950/50 border border-white rounded-lg p-2 text-white mt-1"
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
        <p className="text-white text-sm">No stay durations have been configured. Please configure stay durations in the Length of Stay section.</p>
      )}
    </div>
  );
}
