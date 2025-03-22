
import { useState } from "react";
import { durations } from "@/utils/data";
import { CalendarIcon, Check, Loader2 } from "lucide-react";
import { format, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface BookingFormProps {
  hotelId: string;
  hotelName: string;
  pricePerMonth: number;
}

export function BookingForm({ hotelId, hotelName, pricePerMonth }: BookingFormProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [duration, setDuration] = useState<number>(8);
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const { toast } = useToast();
  
  const endDate = startDate ? addDays(startDate, duration) : null;
  const totalPrice = (pricePerMonth / 30) * duration;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate) {
      toast({
        title: "Please select a check-in date",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setBooked(true);
      
      toast({
        title: "Booking confirmed!",
        description: `Your stay at ${hotelName} has been booked successfully.`,
      });
    }, 1500);
  };
  
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4">Book your stay</h3>
        
        {booked ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-fuchsia-500/20 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-fuchsia-400" />
            </div>
            <h4 className="text-lg font-bold mb-2">Booking confirmed!</h4>
            <p className="text-muted-foreground mb-4">
              Your stay at {hotelName} has been booked.
            </p>
            <button
              type="button"
              onClick={() => setBooked(false)}
              className="w-full bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-200 font-medium rounded-lg px-4 py-2.5 transition-colors"
            >
              Book another stay
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Check-in date */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Check-in date</label>
                <button
                  type="button"
                  className={cn(
                    "w-full flex items-center justify-between rounded-lg border border-border bg-background/50 p-3 text-left transition hover:border-fuchsia-500/50",
                    !startDate && "text-muted-foreground"
                  )}
                  onClick={() => {
                    // In a real app, this would open a date picker
                    const today = new Date();
                    today.setDate(today.getDate() + 14); // 2 weeks from now
                    setStartDate(today);
                  }}
                >
                  {startDate ? format(startDate, "MMMM d, yyyy") : "Select date"}
                  <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              
              {/* Duration */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Duration (days)</label>
                <div className="grid grid-cols-4 gap-2">
                  {durations.map(days => (
                    <button
                      key={days}
                      type="button"
                      className={cn(
                        "rounded-lg border py-2 text-center transition-all",
                        duration === days
                          ? "border-fuchsia-500 bg-fuchsia-500/20 text-fuchsia-200"
                          : "border-border hover:border-fuchsia-500/50 hover:bg-fuchsia-500/10"
                      )}
                      onClick={() => setDuration(days)}
                    >
                      {days}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Summary */}
              {startDate && (
                <div className="rounded-lg bg-fuchsia-950/30 p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Check-in</span>
                    <span>{format(startDate, "MMM d, yyyy")}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Check-out</span>
                    <span>{format(endDate!, "MMM d, yyyy")}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Duration</span>
                    <span>{duration} days</span>
                  </div>
                  <div className="border-t border-fuchsia-900 my-2 pt-2"></div>
                  <div className="flex justify-between font-bold">
                    <span>Total price</span>
                    <span className="text-gradient">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading || !startDate}
                className={cn(
                  "w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg px-4 py-3 transition-colors",
                  (loading || !startDate) && "opacity-70 cursor-not-allowed"
                )}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Book now"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
