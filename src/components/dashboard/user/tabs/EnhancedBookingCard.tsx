
import React from "react";
import { Calendar, MapPin, Clock, CreditCard, Star, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDate } from "../../utils/dateUtils";

interface EnhancedBookingCardProps {
  booking: any;
  onViewDetails: () => void;
  onRateStay?: () => void;
  onRebookStay?: () => void;
  hasReview?: boolean;
  isPastStay?: boolean;
  isNextStay?: boolean;
}

export const EnhancedBookingCard = ({ 
  booking, 
  onViewDetails, 
  onRateStay, 
  onRebookStay,
  hasReview = false, 
  isPastStay = false,
  isNextStay = false
}: EnhancedBookingCardProps) => {
  const calculateDuration = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getTimeUntilCheckIn = (checkInDate: string) => {
    const now = new Date();
    const checkIn = new Date(checkInDate);
    const diffTime = checkIn.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));

    if (diffDays === 0) {
      return "Your stay begins today!";
    } else if (diffDays === 1 && diffHours <= 24) {
      return "Starts in a few hours";
    } else if (diffDays === 1) {
      return "Starts tomorrow";
    } else {
      return `Starts in ${diffDays} days`;
    }
  };

  const duration = calculateDuration(booking.check_in, booking.check_out);

  return (
    <div className="relative">
      {/* Next Stay Label */}
      {isNextStay && (
        <div className="mb-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-200 border border-amber-500/30">
            ✨ Next Stay
          </span>
        </div>
      )}
      
      <div className={cn(
        "border rounded-lg p-6 transition-all duration-300",
        isNextStay 
          ? "border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-yellow-500/5 shadow-lg shadow-amber-500/20" 
          : "border-fuchsia-900/20 bg-fuchsia-500/10 hover:bg-fuchsia-500/15"
      )}>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Hotel Image */}
          <div className="lg:w-48 h-32 flex-shrink-0">
            {booking.hotels?.main_image_url ? (
              <img 
                src={booking.hotels.main_image_url} 
                alt={booking.hotels?.name || 'Hotel'} 
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-full bg-fuchsia-950/30 rounded-lg flex items-center justify-center">
                <MapPin className="w-8 h-8 text-fuchsia-400" />
              </div>
            )}
          </div>

          {/* Booking Details */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="font-bold text-xl text-white mb-1">
                {booking.hotels?.name || 'Unknown Hotel'}
              </h3>
              <div className="flex items-center text-fuchsia-200 mb-3">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{booking.hotels ? `${booking.hotels.city}, ${booking.hotels.country}` : 'Unknown Location'}</span>
              </div>
              
              {/* Time until check-in for next stay */}
              {isNextStay && (
                <div className="mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-500/20 text-amber-200 border border-amber-500/30">
                    <Clock className="w-3 h-3 mr-1" />
                    {getTimeUntilCheckIn(booking.check_in)}
                  </span>
                </div>
              )}
            </div>

            {/* Booking Info Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className={cn(
                "p-3 rounded",
                isNextStay ? "bg-amber-950/30" : "bg-fuchsia-950/30"
              )}>
                <div className="flex items-center mb-1">
                  <Calendar className={cn(
                    "w-3 h-3 mr-1",
                    isNextStay ? "text-amber-300" : "text-fuchsia-300"
                  )} />
                  <span className={cn(
                    "text-xs",
                    isNextStay ? "text-amber-200" : "text-fuchsia-200"
                  )}>Check-in</span>
                </div>
                <p className="font-medium text-sm text-white">{formatDate(booking.check_in)}</p>
              </div>
              
              <div className={cn(
                "p-3 rounded",
                isNextStay ? "bg-amber-950/30" : "bg-fuchsia-950/30"
              )}>
                <div className="flex items-center mb-1">
                  <Calendar className={cn(
                    "w-3 h-3 mr-1",
                    isNextStay ? "text-amber-300" : "text-fuchsia-300"
                  )} />
                  <span className={cn(
                    "text-xs",
                    isNextStay ? "text-amber-200" : "text-fuchsia-200"
                  )}>Check-out</span>
                </div>
                <p className="font-medium text-sm text-white">{formatDate(booking.check_out)}</p>
              </div>
              
              <div className={cn(
                "p-3 rounded",
                isNextStay ? "bg-amber-950/30" : "bg-fuchsia-950/30"
              )}>
                <div className="flex items-center mb-1">
                  <Clock className={cn(
                    "w-3 h-3 mr-1",
                    isNextStay ? "text-amber-300" : "text-fuchsia-300"
                  )} />
                  <span className={cn(
                    "text-xs",
                    isNextStay ? "text-amber-200" : "text-fuchsia-200"
                  )}>Duration</span>
                </div>
                <p className="font-medium text-sm text-white">{duration} days</p>
              </div>
              
              <div className={cn(
                "p-3 rounded",
                isNextStay ? "bg-amber-950/30" : "bg-fuchsia-950/30"
              )}>
                <div className="flex items-center mb-1">
                  <CreditCard className={cn(
                    "w-3 h-3 mr-1",
                    isNextStay ? "text-amber-300" : "text-fuchsia-300"
                  )} />
                  <span className={cn(
                    "text-xs",
                    isNextStay ? "text-amber-200" : "text-fuchsia-200"
                  )}>Total</span>
                </div>
                <p className="font-medium text-sm text-white">${booking.total_price}</p>
              </div>
            </div>
          </div>

          {/* Status and Actions */}
          <div className="lg:w-48 flex flex-col justify-between">
            <div className="mb-4">
              <span className={cn(
                "px-3 py-1 text-xs rounded-full font-medium",
                booking.status === 'confirmed' 
                  ? "bg-green-500/20 text-green-300" 
                  : booking.status === 'pending'
                  ? "bg-amber-500/20 text-amber-300"
                  : "bg-red-500/20 text-red-300"
              )}>
                {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1) || 'Confirmed'}
              </span>
            </div>
            
            <div className="space-y-2">
              <Button 
                onClick={onViewDetails}
                className={cn(
                  "w-full text-white",
                  isNextStay 
                    ? "bg-amber-600 hover:bg-amber-700" 
                    : "bg-fuchsia-600 hover:bg-fuchsia-700"
                )}
                size="sm"
              >
                View Full Details
              </Button>
              
              {/* Show Rate Your Stay button for past stays without reviews */}
              {isPastStay && onRateStay && (
                <Button 
                  onClick={onRateStay}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                  size="sm"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Rate Your Stay
                </Button>
              )}
              
              {/* Show Rebook button for past stays */}
              {isPastStay && onRebookStay && (
                <Button 
                  onClick={onRebookStay}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  size="sm"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Rebook This Stay
                </Button>
              )}
              
              {/* Show review status for past stays with reviews */}
              {isPastStay && hasReview && (
                <div className="w-full bg-green-500/20 text-green-300 text-center py-2 px-3 rounded text-sm">
                  ✓ Review submitted
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
