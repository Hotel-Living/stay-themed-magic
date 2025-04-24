
import React from "react";
import { Label } from "@/components/ui/label";

interface RateLabelProps {
  duration: number;
}

export default function RateLabel({ duration }: RateLabelProps) {
  return (
    <Label className="text-lg font-medium text-white mb-2 block">
      {duration} Days
    </Label>
  );
}
