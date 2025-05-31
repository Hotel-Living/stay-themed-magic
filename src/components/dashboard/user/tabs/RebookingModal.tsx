
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, AlertCircle, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface RebookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: any;
}

export const RebookingModal = ({ isOpen, onClose, booking }: RebookingModalProps) => {
  const [isCheckingHotel, setIsCheckingHotel] = useState(false);
  const [hotelAvailable, setHotelAvailable] = useState(true);
  const [similarHotels, setSimilarHotels] = useState([]);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && booking) {
      checkHotelAvailability();
    }
  }, [isOpen, booking]);

  const checkHotelAvailability = async () => {
    if (!booking?.hotel_id) return;

    try {
      setIsCheckingHotel(true);

      const { data: hotel, error } = await supabase
        .from('hotels')
        .select('id, name, status')
        .eq('id', booking.hotel_id)
        .single();

      if (error || !hotel || hotel.status !== 'approved') {
        setHotelAvailable(false);
        await fetchSimilarHotels();
      } else {
        setHotelAvailable(true);
      }
    } catch (error) {
      console.error('Error checking hotel availability:', error);
      setHotelAvailable(false);
    } finally {
      setIsCheckingHotel(false);
    }
  };

  const fetchSimilarHotels = async () => {
    try {
      // Fetch hotels from the same city/country as the original booking
      const { data: hotels, error } = await supabase
        .from('hotels')
        .select('id, name, city, country, main_image_url, price_per_month')
        .eq('status', 'approved')
        .eq('city', booking.hotels?.city)
        .eq('country', booking.hotels?.country)
        .neq('id', booking.hotel_id)
        .limit(3);

      if (!error && hotels) {
        setSimilarHotels(hotels);
      }
    } catch (error) {
      console.error('Error fetching similar hotels:', error);
    }
  };

  const calculateDuration = () => {
    const checkIn = new Date(booking.check_in);
    const checkOut = new Date(booking.check_out);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleRebook = () => {
    if (!hotelAvailable) return;

    const duration = calculateDuration();
    
    // Create rebooking data to pass to the hotel page
    const rebookingData = {
      duration: duration,
      mealPlan: booking.meal_plan,
      guestCount: booking.guest_count
    };

    // Store in localStorage for the hotel page to pick up
    localStorage.setItem('rebookingData', JSON.stringify(rebookingData));

    // Navigate to the hotel page
    window.open(`/hotel/${booking.hotel_id}`, '_blank');
    
    toast({
      title: "Redirecting to Hotel",
      description: "Opening the booking form with your previous preferences pre-filled."
    });

    onClose();
  };

  const handleViewSimilarHotel = (hotelId: string) => {
    window.open(`/hotel/${hotelId}`, '_blank');
  };

  if (isCheckingHotel) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Checking Availability...
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fuchsia-500"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Rebook Your Stay
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {hotelAvailable ? (
            <>
              <div className="bg-fuchsia-950/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{booking.hotels?.name}</h3>
                <div className="text-sm text-fuchsia-200 space-y-1">
                  <div>Duration: {calculateDuration()} days</div>
                  <div>Previous total: ${booking.total_price}</div>
                  {booking.meal_plan && <div>Meal plan: {booking.meal_plan}</div>}
                </div>
              </div>

              <div className="bg-green-950/30 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-green-200">
                  Great news! This hotel is still available. We'll pre-fill the booking form with your previous preferences:
                </p>
                <ul className="text-sm text-green-200 mt-2 space-y-1 ml-4">
                  <li>• Same stay duration ({calculateDuration()} days)</li>
                  {booking.meal_plan && <li>• Same meal plan</li>}
                  {booking.guest_count && <li>• Same guest count</li>}
                </ul>
                <p className="text-xs text-green-300 mt-2">
                  You'll need to select new dates manually.
                </p>
              </div>

              <Button
                onClick={handleRebook}
                className="w-full bg-fuchsia-600 hover:bg-fuchsia-700"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Booking Form
              </Button>
            </>
          ) : (
            <>
              <div className="bg-red-950/30 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <h3 className="font-semibold text-red-200">Hotel No Longer Available</h3>
                </div>
                <p className="text-sm text-red-200">
                  This hotel is no longer active. Here are some similar hotels in the same area:
                </p>
              </div>

              {similarHotels.length > 0 ? (
                <div className="space-y-3">
                  {similarHotels.map((hotel: any) => (
                    <div
                      key={hotel.id}
                      className="border border-fuchsia-900/20 rounded-lg p-4 hover:bg-fuchsia-500/5 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{hotel.name}</h4>
                          <p className="text-sm text-fuchsia-200">
                            {hotel.city}, {hotel.country}
                          </p>
                          <p className="text-sm text-fuchsia-300">
                            From ${hotel.price_per_month}/month
                          </p>
                        </div>
                        <Button
                          onClick={() => handleViewSimilarHotel(hotel.id)}
                          size="sm"
                          className="bg-fuchsia-600 hover:bg-fuchsia-700"
                        >
                          View Hotel
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-fuchsia-200">
                    No similar hotels found in this area.
                  </p>
                  <Button
                    onClick={() => window.open('/', '_blank')}
                    className="mt-3 bg-fuchsia-600 hover:bg-fuchsia-700"
                  >
                    Browse All Hotels
                  </Button>
                </div>
              )}
            </>
          )}

          <Button
            variant="outline"
            onClick={onClose}
            className="w-full"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
