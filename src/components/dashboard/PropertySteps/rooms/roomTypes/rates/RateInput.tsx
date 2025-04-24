
import React from "react";
import { Input } from "@/components/ui/input";

interface RateInputProps {
  duration: number;
  value: number;
  onRateChange: (duration: number, value: string) => void;
}

export default function RateInput({ duration, value, onRateChange }: RateInputProps) {
  return (
    <div>
      <Input 
        className="w-full bg-fuchsia-950/50 border border-white rounded-lg p-3 text-white text-base"
        type="number"
        min="0"
        value={value || ""}
        onChange={(e) => onRateChange(duration, e.target.value)}
        placeholder={`Rate for ${duration} days`}
      />
    </div>
  );
}
