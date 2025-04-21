
import { format } from "date-fns";
import { formatCurrency } from "@/utils/dynamicPricing";

interface BookingSummaryCardProps {
  startDate: Date;
  endDate: Date;
  duration: number;
  dynamicPrice: number;
}

export function BookingSummaryCard({ startDate, endDate, duration, dynamicPrice }: BookingSummaryCardProps) {
  return (
    <div className="rounded-lg bg-fuchsia-950/30 p-4">
      <div className="flex justify-between mb-2">
        <span className="text-muted-foreground">Check-in</span>
        <span>{format(startDate, "MMM d, yyyy")}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-muted-foreground">Check-out</span>
        <span>{format(endDate, "MMM d, yyyy")}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-muted-foreground">Duration</span>
        <span>{duration} days</span>
      </div>
      <div className="border-t border-fuchsia-900 my-2 pt-2"></div>
      <div className="flex justify-between font-bold">
        <span>Total price</span>
        <span className="text-gradient">{formatCurrency(dynamicPrice)}</span>
      </div>
    </div>
  );
}
