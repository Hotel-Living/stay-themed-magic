
import { cn } from "@/lib/utils";
import { durations } from "@/utils/booking";

interface BookingDurationSelectorProps {
  duration: number;
  setDuration: (duration: number) => void;
}

export function BookingDurationSelector({ duration, setDuration }: BookingDurationSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">Duration (days)</label>
      <div className="grid grid-cols-4 gap-2">
        {durations.map(durationOption => (
          <button
            key={durationOption.id}
            type="button"
            className={cn(
              "rounded-lg border py-2 text-center transition-all",
              duration === durationOption.value
                ? "border-fuchsia-500 bg-fuchsia-500/20 text-fuchsia-200"
                : "border-border hover:border-fuchsia-500/50 hover:bg-fuchsia-500/10"
            )}
            onClick={() => setDuration(durationOption.value)}
          >
            {durationOption.value}
          </button>
        ))}
      </div>
    </div>
  );
}
