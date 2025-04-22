
import { Loader2 } from "lucide-react";

export const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-full w-full">
    <Loader2 className="h-8 w-8 text-fuchsia-500 animate-spin mb-2" />
    <p className="text-white/70 text-sm">Loading Google Maps...</p>
  </div>
);
