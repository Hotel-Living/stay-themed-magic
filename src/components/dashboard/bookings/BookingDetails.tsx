
import React from 'react';
import { Button } from "@/components/ui/button";
import { Booking } from '@/integrations/supabase/types-custom';

interface BookingDetailsProps {
  booking: Booking;
  daysUntilCheckIn: number;
  stayDuration: number;
  checkInDate: Date;
  checkOutDate: Date;
  canCancel: boolean;
  onCancelClick: () => void;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({
  booking,
  daysUntilCheckIn,
  stayDuration,
  checkInDate,
  checkOutDate,
  canCancel,
  onCancelClick
}) => {
  return (
    <div className="p-4 pt-0 border-t border-fuchsia-800/20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="text-xs text-fuchsia-300 mb-1">Check-in</h4>
          <p className="text-sm">{checkInDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          {daysUntilCheckIn > 0 && <p className="text-xs text-fuchsia-400 mt-1">{daysUntilCheckIn} days from now</p>}
        </div>
        
        <div>
          <h4 className="text-xs text-fuchsia-300 mb-1">Check-out</h4>
          <p className="text-sm">{checkOutDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p className="text-xs text-fuchsia-400 mt-1">{stayDuration} day stay</p>
        </div>
        
        <div>
          <h4 className="text-xs text-fuchsia-300 mb-1">Booking ID</h4>
          <p className="text-sm font-mono">{booking.id.slice(0, 8)}</p>
        </div>
        
        <div>
          <h4 className="text-xs text-fuchsia-300 mb-1">Total Price</h4>
          <p className="text-sm">${booking.total_price.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 mt-4">
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={(e) => {
            e.stopPropagation();
            window.open(`/hotel/${booking.hotel_id}`, '_blank');
          }}
        >
          View Hotel
        </Button>
        
        {canCancel && (
          <Button
            variant="destructive"
            size="sm"
            className="text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onCancelClick();
            }}
          >
            Cancel Booking
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;
