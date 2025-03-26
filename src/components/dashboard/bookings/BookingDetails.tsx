
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Booking } from '@/integrations/supabase/types-custom';
import { Share2 } from 'lucide-react';
import { SocialShareButtons } from '@/components/SocialShareButtons';
import { useLanguage } from '@/context/LanguageContext';

interface BookingDetailsProps {
  booking: Booking;
  daysUntilCheckIn: number;
  stayDuration: number;
  checkInDate: Date;
  checkOutDate: Date;
  canCancel: boolean;
  onCancelClick: () => void;
  hotelName?: string; // Add hotelName as an optional prop
}

const BookingDetails: React.FC<BookingDetailsProps> = ({
  booking,
  daysUntilCheckIn,
  stayDuration,
  checkInDate,
  checkOutDate,
  canCancel,
  onCancelClick,
  hotelName = 'a great hotel' // Default value if not provided
}) => {
  const { t } = useLanguage();
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  // Create share message for the booking
  const shareTitle = `I'm staying at ${hotelName} with Hotel Living!`;
  const shareDescription = `I'll be checking in on ${checkInDate.toLocaleDateString()} for a ${stayDuration}-day stay.`;
  
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
      
      {/* Social sharing section */}
      {showShareOptions && (
        <div className="flex items-center justify-between border-t border-fuchsia-800/20 pt-4 mb-4">
          <span className="text-xs text-fuchsia-300">{t("share.shareBooking")}</span>
          <SocialShareButtons 
            title={shareTitle}
            description={shareDescription}
            size="sm"
          />
        </div>
      )}
      
      <div className="flex justify-end gap-2 mt-4">
        <Button
          variant="outline"
          size="sm"
          className="text-xs flex items-center gap-1"
          onClick={(e) => {
            e.stopPropagation();
            setShowShareOptions(!showShareOptions);
          }}
        >
          <Share2 className="w-3 h-3" />
          {t("share.share")}
        </Button>
        
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
