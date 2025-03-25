
import React, { useState } from 'react';
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Booking } from '@/integrations/supabase/types-custom';
import { useCancelBooking } from '@/hooks/bookings/useCancelBooking';
import BookingDetails from './bookings/BookingDetails';
import BookingStatusBadge from './bookings/BookingStatusBadge';
import CancelBookingDialog from './bookings/CancelBookingDialog';

interface BookingItemProps {
  booking: Booking;
  name: string;
  dates: string;
  property: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
}

const BookingItem = ({ booking, name, dates, property, status }: BookingItemProps) => {
  const [expandDetails, setExpandDetails] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const { cancelBooking, isDeleting } = useCancelBooking();

  // Calculate dates and durations
  const checkInDate = new Date(booking.check_in);
  const checkOutDate = new Date(booking.check_out);
  const daysUntilCheckIn = Math.ceil((checkInDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const stayDuration = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Determine if the booking can be cancelled
  const canCancel = status !== 'cancelled' && status !== 'completed' && daysUntilCheckIn > 1;

  // Handler for booking cancellation
  const handleCancelBooking = async () => {
    const success = await cancelBooking(booking.id);
    if (success) {
      setShowCancelDialog(false);
    }
  };

  return (
    <>
      <div className={cn(
        "glass-card transition-all duration-300 rounded-xl overflow-hidden",
        expandDetails ? "p-0" : "p-4"
      )}>
        <div 
          className="flex items-start p-4 cursor-pointer"
          onClick={() => setExpandDetails(!expandDetails)}
        >
          <div className="w-10 h-10 rounded-full bg-fuchsia-500/20 flex-shrink-0 flex items-center justify-center mr-3">
            <Calendar className="w-5 h-5 text-fuchsia-300" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{name}</p>
            <p className="text-sm text-foreground/70 truncate">{property}</p>
            <p className="text-xs text-foreground/60">{dates}</p>
          </div>
          <BookingStatusBadge status={status} />
        </div>
        
        {expandDetails && (
          <BookingDetails
            booking={booking}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            daysUntilCheckIn={daysUntilCheckIn}
            stayDuration={stayDuration}
            canCancel={canCancel}
            onCancelClick={() => setShowCancelDialog(true)}
          />
        )}
      </div>
      
      <CancelBookingDialog
        open={showCancelDialog}
        onOpenChange={setShowCancelDialog}
        onConfirm={handleCancelBooking}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default BookingItem;
