import { useState, useEffect } from "react";
import { durations } from "@/utils/booking";
import { CalendarIcon, Check, Loader2, Info, Building } from "lucide-react";
import { format, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { 
  calculateDynamicPrice, 
  formatCurrency, 
  calculateTotalNightsInMonth,
  calculateNightsSold
} from "@/utils/dynamicPricing";
import { 
  Room, 
  StayRequest 
} from "@/types/booking";
import { assignRoom } from "@/utils/roomAssignmentLogic";
import { generateSampleBookings } from "@/utils/bookingManagement";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RoomAvailabilityCalendar } from "@/components/booking/RoomAvailabilityCalendar";
import { BookingCalendarSelector } from "./booking/BookingCalendarSelector";
import { BookingDurationSelector } from "./booking/BookingDurationSelector";
import { RoomTypeSelector } from "./booking/RoomTypeSelector";
import { BookingSummaryCard } from "./booking/BookingSummaryCard";
import { BookingSuccessMessage } from "./booking/BookingSuccessMessage";

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
  
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoomType, setSelectedRoomType] = useState("single");
  const [newBooking, setNewBooking] = useState<{
    roomId: string;
    startDate: Date;
    endDate: Date;
  } | null>(null);
  
  const [nightsSold, setNightsSold] = useState<number>(0);
  const [totalNights, setTotalNights] = useState<number>(0);
  const [dynamicPrice, setDynamicPrice] = useState<number>(pricePerMonth);
  const [priceIncrease, setPriceIncrease] = useState<number>(0);
  
  const endDate = startDate ? addDays(startDate, duration) : null;
  
  useEffect(() => {
    const sampleRooms = generateSampleBookings();
    setRooms(sampleRooms);
  }, []);
  
  useEffect(() => {
    if (!startDate) return;
    
    const month = startDate.getMonth();
    const year = startDate.getFullYear();
    
    const totalRooms = 30;
    
    const totalAvailableNights = calculateTotalNightsInMonth(totalRooms, year, month);
    setTotalNights(totalAvailableNights);
    
    const allBookings = rooms.flatMap(room => 
      room.bookings.map(booking => ({
        startDate: booking.startDate,
        endDate: booking.endDate
      }))
    );
    const soldNights = calculateNightsSold(allBookings, year, month);
    setNightsSold(soldNights);
    
    const dailyPrice = pricePerMonth / 30;
    const dynamicDailyPrice = calculateDynamicPrice(
      dailyPrice,
      totalAvailableNights,
      soldNights
    );
    
    const percentIncrease = ((dynamicDailyPrice / dailyPrice) - 1) * 100;
    setPriceIncrease(Math.round(percentIncrease));
    
    setDynamicPrice(dynamicDailyPrice * duration);
  }, [pricePerMonth, duration, startDate, rooms]);
  
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
    
    const stayRequest: StayRequest = {
      startDate,
      endDate: endDate!,
      duration
    };
    
    setTimeout(() => {
      const { roomId, isNewRoom } = assignRoom(stayRequest, rooms, selectedRoomType);
      
      const newBookingId = `booking-${Date.now()}`;
      const bookingToAdd = {
        id: newBookingId,
        roomId,
        startDate,
        endDate: endDate!,
        duration
      };
      
      setRooms(prevRooms => {
        if (isNewRoom) {
          return [
            ...prevRooms,
            {
              id: roomId,
              roomTypeId: selectedRoomType,
              bookings: [bookingToAdd]
            }
          ];
        } else {
          return prevRooms.map(room => 
            room.id === roomId
              ? { ...room, bookings: [...room.bookings, bookingToAdd] }
              : room
          );
        }
      });
      
      setNewBooking({
        roomId,
        startDate,
        endDate: endDate!
      });
      
      setLoading(false);
      setBooked(true);
      
      toast({
        title: "Booking confirmed!",
        description: `Your stay at ${hotelName} has been booked in ${roomId}.`,
      });
    }, 1500);
  };
  
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4">Book your stay</h3>
        
        {booked ? (
          <BookingSuccessMessage
            hotelName={hotelName}
            onReset={() => setBooked(false)}
          />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <BookingCalendarSelector
                startDate={startDate}
                setStartDate={setStartDate}
              />
              <BookingDurationSelector
                duration={duration}
                setDuration={setDuration}
              />
              <RoomTypeSelector
                selectedRoomType={selectedRoomType}
                setSelectedRoomType={setSelectedRoomType}
              />
              
              {startDate && (
                <RoomAvailabilityCalendar 
                  rooms={rooms.filter(room => room.roomTypeId === selectedRoomType)} 
                  highlightNewBooking={newBooking}
                />
              )}
              
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
              
              {startDate && (
                <BookingSummaryCard
                  startDate={startDate}
                  endDate={endDate!}
                  duration={duration}
                  dynamicPrice={dynamicPrice}
                />
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
