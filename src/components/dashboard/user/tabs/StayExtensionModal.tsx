
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { formatDate } from '../../utils/dateUtils';

interface ExtensionOption {
  duration: number;
  newPrice: number;
  priceDifference: number;
  available: boolean;
}

interface StayExtensionModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: any;
  extensionOptions: ExtensionOption[];
}

export const StayExtensionModal = ({ 
  isOpen, 
  onClose, 
  booking, 
  extensionOptions 
}: StayExtensionModalProps) => {
  const [selectedOption, setSelectedOption] = useState<ExtensionOption | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleExtension = async () => {
    if (!selectedOption || !user) return;

    try {
      setIsProcessing(true);

      // Calculate new check-out date
      const checkInDate = new Date(booking.check_in);
      const newCheckOutDate = new Date(checkInDate);
      newCheckOutDate.setDate(checkInDate.getDate() + selectedOption.duration);

      // Create new booking for the extended stay
      const { data: newBooking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          hotel_id: booking.hotel_id,
          check_in: booking.check_in,
          check_out: newCheckOutDate.toISOString().split('T')[0],
          total_price: selectedOption.newPrice,
          status: 'confirmed'
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

      // Record the extension
      const { error: extensionError } = await supabase
        .from('stay_extensions')
        .insert({
          original_booking_id: booking.id,
          new_booking_id: newBooking.id,
          original_duration: booking.duration,
          new_duration: selectedOption.duration,
          original_price: booking.total_price,
          new_price: selectedOption.newPrice,
          price_difference: selectedOption.priceDifference,
          status: 'confirmed'
        });

      if (extensionError) throw extensionError;

      // Cancel the original booking
      const { error: cancelError } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', booking.id);

      if (cancelError) throw cancelError;

      toast({
        title: "Stay Extended Successfully!",
        description: `Your stay has been extended to ${selectedOption.duration} days. You'll pay an additional $${selectedOption.priceDifference}.`
      });

      onClose();
      window.location.reload(); // Refresh to show updated bookings
    } catch (error) {
      console.error('Error extending stay:', error);
      toast({
        title: "Extension Failed",
        description: "There was an error extending your stay. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateNewCheckOut = (duration: number) => {
    const checkInDate = new Date(booking.check_in);
    const newCheckOutDate = new Date(checkInDate);
    newCheckOutDate.setDate(checkInDate.getDate() + duration);
    return formatDate(newCheckOutDate.toISOString().split('T')[0]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Extend Your Stay
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-fuchsia-950/30 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">{booking.hotels?.name}</h3>
            <div className="text-sm text-fuchsia-200 space-y-1">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Current: {formatDate(booking.check_in)} - {formatDate(booking.check_out)}
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Paid: ${booking.total_price}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-fuchsia-200">
              Choose your new stay duration:
            </p>
            
            {extensionOptions.map((option) => (
              <div
                key={option.duration}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedOption?.duration === option.duration
                    ? 'border-fuchsia-500 bg-fuchsia-500/10'
                    : 'border-fuchsia-900/20 hover:border-fuchsia-500/50'
                }`}
                onClick={() => setSelectedOption(option)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{option.duration} days</div>
                    <div className="text-sm text-fuchsia-200">
                      Until {calculateNewCheckOut(option.duration)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-400">
                      +${option.priceDifference}
                    </div>
                    <div className="text-sm text-fuchsia-200">
                      Total: ${option.newPrice}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedOption && (
            <div className="bg-amber-950/30 p-4 rounded-lg">
              <div className="text-sm text-amber-200">
                <strong>Summary:</strong> Extend from {booking.duration} to {selectedOption.duration} days.
                Pay only ${selectedOption.priceDifference} more to upgrade.
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleExtension}
              disabled={!selectedOption || isProcessing}
              className="flex-1 bg-fuchsia-600 hover:bg-fuchsia-700"
            >
              {isProcessing ? 'Processing...' : 'Extend Stay'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
