
import React from "react";
import { Label } from "@/components/ui/label";

// This file is now deprecated since the availability functionality has been moved to Step 3
// This empty component is kept temporarily to avoid breaking imports, but should be removed in a future cleanup

interface AvailabilitySectionProps {
  preferredWeekday: string;
  onAvailabilityChange: (dates: string[]) => void;
  selectedDates: string[];
}

export default function AvailabilitySection() {
  return (
    <div className="bg-fuchsia-900/30 p-4 rounded-lg">
      <p className="text-center text-amber-300">
        Availability is now configured in the main Accommodation Terms step.
      </p>
    </div>
  );
}
