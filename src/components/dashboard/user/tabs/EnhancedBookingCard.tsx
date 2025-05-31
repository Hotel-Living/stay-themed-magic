
import React from "react";
import { Calendar, MapPin, Clock, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDate } from "../../utils/dateUtils";

interface EnhancedBookingCardProps {
  booking: any;
  onViewDetails: () => void;
}

export const EnhancedBookingCard = ({ booking, onViewDetails }: EnhancedBookingCardProps) => {
  const calculateDuration = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const duration = calculateDuration(booking.check_in, booking.check_out);

  return (
    <div className="border border-fuchsia-900/20 rounded-lg p-6 bg-fuchsia-500/10 hover:bg-fuchsia-500/15 transition-colors">
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
          </div>

          {/* Booking Info Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-fuchsia-950/30 p-3 rounded">
              <div className="flex items-center mb-1">
                <Calendar className="w-3 h-3 text-fuchsia-300 mr-1" />
                <span className="text-xs text-fuchsia-200">Check-in</span>
              </div>
              <p className="font-medium text-sm text-white">{formatDate(booking.check_in)}</p>
            </div>
            
            <div className="bg-fuchsia-950/30 p-3 rounded">
              <div className="flex items-center mb-1">
                <Calendar className="w-3 h-3 text-fuchsia-300 mr-1" />
                <span className="text-xs text-fuchsia-200">Check-out</span>
              </div>
              <p className="font-medium text-sm text-white">{formatDate(booking.check_out)}</p>
            </div>
            
            <div className="bg-fuchsia-950/30 p-3 rounded">
              <div className="flex items-center mb-1">
                <Clock className="w-3 h-3 text-fuchsia-300 mr-1" />
                <span className="text-xs text-fuchsia-200">Duration</span>
              </div>
              <p className="font-medium text-sm text-white">{duration} days</p>
            </div>
            
            <div className="bg-fuchsia-950/30 p-3 rounded">
              <div className="flex items-center mb-1">
                <CreditCard className="w-3 h-3 text-fuchsia-300 mr-1" />
                <span className="text-xs text-fuchsia-200">Total</span>
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
              className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
              size="sm"
            >
              View Full Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
