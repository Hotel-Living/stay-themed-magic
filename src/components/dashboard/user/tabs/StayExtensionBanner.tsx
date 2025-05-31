
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Clock, ArrowRight } from 'lucide-react';
import { useStayExtension } from '@/hooks/useStayExtension';
import { StayExtensionModal } from './StayExtensionModal';

export const StayExtensionBanner = () => {
  const { eligibleBookings, isLoading, calculateExtensionOptions } = useStayExtension();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading || eligibleBookings.length === 0) {
    return null;
  }

  const handleExtendStay = (booking: any) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const extensionOptions = selectedBooking ? calculateExtensionOptions(selectedBooking) : [];

  return (
    <>
      <div className="mb-6">
        {eligibleBookings.map((booking) => {
          const options = calculateExtensionOptions(booking);
          
          if (options.length === 0) return null;

          return (
            <div
              key={booking.id}
              className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-4 mb-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-amber-400" />
                    <h3 className="font-semibold text-amber-200">Want to stay longer?</h3>
                  </div>
                  
                  <p className="text-sm text-amber-100 mb-3">
                    Your stay at <strong>{booking.hotels?.name}</strong> ends in {booking.daysUntilCheckout} day{booking.daysUntilCheckout !== 1 ? 's' : ''}.
                    Extend your stay and only pay the difference to upgrade to a longer duration.
                  </p>
                  
                  <div className="text-xs text-amber-200">
                    Available extensions: {options.map(opt => `${opt.duration} days (+$${opt.priceDifference})`).join(', ')}
                  </div>
                </div>
                
                <Button
                  onClick={() => handleExtendStay(booking)}
                  className="bg-amber-600 hover:bg-amber-700 text-white ml-4"
                  size="sm"
                >
                  Extend Stay
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedBooking && (
        <StayExtensionModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          booking={selectedBooking}
          extensionOptions={extensionOptions}
        />
      )}
    </>
  );
};
