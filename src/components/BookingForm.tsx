
import { useState, useEffect } from "react";
import { durations } from "@/utils/booking";
import { CalendarIcon, Check, Loader2, Info } from "lucide-react";
import { format, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { calculateDynamicPrice, formatCurrency } from "@/utils/dynamicPricing";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  
  // Dynamic pricing state
  const [nightsSold, setNightsSold] = useState<number>(0);
  const [totalNights, setTotalNights] = useState<number>(0);
  const [dynamicPrice, setDynamicPrice] = useState<number>(pricePerMonth);
  const [priceIncrease, setPriceIncrease] = useState<number>(0);
  
  const endDate = startDate ? addDays(startDate, duration) : null;
  
  // Calculate dynamic pricing whenever relevant factors change
  useEffect(() => {
    // For demo purposes, simulate the month having 30 rooms x 30 days = 900 total nights
    const simulatedTotalNights = 900;
    
    // Simulate some nights already sold (this would come from the database in production)
    const simulatedNightsSold = Math.floor(Math.random() * 400); // Random number between 0-400
    
    setNightsSold(simulatedNightsSold);
    setTotalNights(simulatedTotalNights);
    
    // Calculate price based on the daily rate (monthly price / 30) and apply dynamic pricing
    const dailyPrice = pricePerMonth / 30;
    const dynamicDailyPrice = calculateDynamicPrice(
      dailyPrice,
      simulatedTotalNights,
      simulatedNightsSold
    );
    
    // Calculate percentage increase
    const percentIncrease = ((dynamicDailyPrice / dailyPrice) - 1) * 100;
    setPriceIncrease(Math.round(percentIncrease));
    
    // Set the total price for the stay
    setDynamicPrice(dynamicDailyPrice * duration);
  }, [pricePerMonth, duration]);
  
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
              
              {/* Dynamic pricing info */}
              <div className="rounded-lg bg-fuchsia-950/50 p-3 border border-fuchsia-800/30">
                <div className="flex items-center justify-between text-sm text-fuchsia-200 mb-1">
                  <span>Dynamic pricing</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button type="button">
                          <Info className="w-4 h-4 ml-1 text-fuchsia-400" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>This hotel uses dynamic pricing based on demand. Prices increase as more nights are booked.</p>
                        <p className="mt-1">Currently {nightsSold} of {totalNights} nights have been booked this month.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="w-full bg-fuchsia-900/30 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-fuchsia-400 to-fuchsia-600 h-full rounded-full"
                    style={{ width: `${Math.min(priceIncrease * 5, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-1 text-xs text-fuchsia-300">
                  <span>Base price</span>
                  <span>+{priceIncrease}% (max +20%)</span>
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
                    <span className="text-gradient">{formatCurrency(dynamicPrice)}</span>
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
