
import React from "react";
import { Label } from "@/components/ui/label";
import AvailabilityDateSection from "../../AvailabilityDateSection";

interface AvailabilitySectionProps {
  preferredWeekday: string;
  onAvailabilityChange: (dates: string[]) => void;
  selectedDates: string[];
}

export default function AvailabilitySection({
  preferredWeekday,
  onAvailabilityChange,
  selectedDates
}: AvailabilitySectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">AVAILABILITY DATES</h3>
      <div className="grid grid-cols-4 items-start gap-4">
        <Label className="text-right text-sm text-white">Select Dates</Label>
        <div className="col-span-3">
          <AvailabilityDateSection 
            preferredWeekday={preferredWeekday}
            onAvailabilityChange={onAvailabilityChange}
            selectedDates={selectedDates}
          />
        </div>
      </div>
    </div>
  );
}
