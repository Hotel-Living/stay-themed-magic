
import { HotelAvailableMonthsProps } from "@/types/hotel";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "lucide-react";

export function HotelAvailableMonths({ months, isLoading }: HotelAvailableMonthsProps & { isLoading?: boolean }) {
  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }
  
  if (!months || months.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          Available Months
          <Calendar className="w-5 h-5 text-fuchsia-400" />
        </h2>
        <p className="text-foreground/60 italic">No available months at the moment.</p>
      </div>
    );
  }
  
  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        Available Months
        <Calendar className="w-5 h-5 text-fuchsia-400" />
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {months.map(month => (
          <div 
            key={month} 
            className="text-center p-3 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 hover:bg-fuchsia-500/20 transition-colors"
          >
            <span className="font-medium">{month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
