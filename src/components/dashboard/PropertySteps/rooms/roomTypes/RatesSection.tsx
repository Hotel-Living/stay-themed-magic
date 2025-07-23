
import React from "react";
import RateInput from "./rates/RateInput";
import RateLabel from "./rates/RateLabel";

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
              <RateLabel duration={duration} />
              <RateInput 
                duration={duration}
                value={rates[duration] || 0}
                onRateChange={onRateChange}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white text-base">
          No stay durations have been configured. Please configure stay durations in the Length of Stay section.
        </p>
      )}
    </div>
  );
}
