
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Booking, Hotel } from "@/integrations/supabase/types-custom";
import { useToast } from "@/hooks/use-toast";
import { handleSupabaseError } from "@/utils/errorHandling";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Building, Calendar, Check, Clock, X } from "lucide-react";

export default function Bookings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<(Booking & { hotel: Hotel })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            hotel:hotels(*)
          `)
          .eq('user_id', user.id)
          .order('check_in', { ascending: false });

        if (error) {
          throw error;
        }

        // Cast the data to the correct type to ensure TypeScript compatibility
        const typedData = data as unknown as (Booking & { hotel: Hotel })[];
        setBookings(typedData || []);
      } catch (error) {
        handleSupabaseError(error as any, "Error loading your bookings");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Check className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <X className="w-4 h-4" />;
      case 'completed':
        return <Check className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId)
        .eq('user_id', user?.id);

      if (error) {
        throw error;
      }

      // Update the local state
      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' } 
          : booking
      ));

      toast({
        title: "Booking Cancelled",
        description: "Your booking has been successfully cancelled.",
      });
    } catch (error) {
      handleSupabaseError(error as any, "Error cancelling your booking");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : bookings.length === 0 ? (
            <div className="bg-secondary rounded-lg p-8 text-center">
              <Building className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Bookings Found</h3>
              <p className="text-muted-foreground mb-6">You don't have any bookings yet.</p>
              <Link 
                to="/search" 
                className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
              >
                Explore Hotels
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-secondary border border-border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="aspect-video md:aspect-square relative overflow-hidden">
                      <img 
                        src={booking.hotel.main_image_url || '/placeholder.svg'} 
                        alt={booking.hotel.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    
                    <div className="p-6 md:col-span-2">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold">
                          <Link to={`/hotel/${booking.hotel_id}`} className="hover:text-primary">
                            {booking.hotel.name}
                          </Link>
                        </h3>
                        <span 
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}
                        >
                          {getStatusIcon(booking.status)}
                          <span className="ml-1">
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        {booking.hotel.address}, {booking.hotel.city}, {booking.hotel.country}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center">
                          <Calendar className="w-5 h-5 mr-2 text-muted-foreground" />
                          <div>
                            <div className="text-sm font-medium">Check-in</div>
                            <div className="text-sm text-muted-foreground">
                              {format(new Date(booking.check_in), 'MMM d, yyyy')}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Calendar className="w-5 h-5 mr-2 text-muted-foreground" />
                          <div>
                            <div className="text-sm font-medium">Check-out</div>
                            <div className="text-sm text-muted-foreground">
                              {format(new Date(booking.check_out), 'MMM d, yyyy')}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-muted-foreground">Total Price</div>
                          <div className="text-xl font-bold">${booking.total_price}</div>
                        </div>
                        
                        {booking.status === 'pending' || booking.status === 'confirmed' ? (
                          <button
                            onClick={() => cancelBooking(booking.id)}
                            className="inline-flex items-center px-4 py-2 border border-destructive text-destructive rounded-md hover:bg-destructive/10 transition"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel Booking
                          </button>
                        ) : booking.status === 'completed' ? (
                          <Link
                            to={`/review/${booking.hotel_id}`}
                            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
                          >
                            Write a Review
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-secondary py-6 px-4 border-t border-border">
        <div className="container max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Hotel-Living.com. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
