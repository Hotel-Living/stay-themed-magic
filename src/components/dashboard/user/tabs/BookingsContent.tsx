
import React, { useState, useEffect } from "react";
import { Calendar, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function BookingsContent() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('bookings')
          .select('*, hotels(name, city, country)')
          .eq('user_id', user.id)
          .order('check_in', { ascending: true });
        
        if (error) throw error;
        
        setBookings(data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast({
          title: "Error loading bookings",
          description: "We couldn't load your bookings. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBookings();
  }, [user, toast]);
  
  // Helper function to format dates for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-6">My Bookings</h2>
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-6 h-6 animate-spin text-fuchsia-500" />
          <span className="ml-2">Loading your bookings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-6">My Bookings</h2>
      
      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="border border-fuchsia-900/20 rounded-lg p-4 bg-fuchsia-500/10">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-fuchsia-500/20 flex-shrink-0 flex items-center justify-center mr-3">
                  <Calendar className="w-5 h-5 text-fuchsia-300" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{booking.hotels?.name || 'Unknown Hotel'}</h3>
                  <p className="text-muted-foreground">{booking.hotels ? `${booking.hotels.city}, ${booking.hotels.country}` : 'Unknown Location'}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    <div className="bg-fuchsia-950/30 p-2 rounded">
                      <p className="text-xs text-muted-foreground">Check-in</p>
                      <p className="font-medium">{formatDate(booking.check_in)}</p>
                    </div>
                    <div className="bg-fuchsia-950/30 p-2 rounded">
                      <p className="text-xs text-muted-foreground">Check-out</p>
                      <p className="font-medium">{formatDate(booking.check_out)}</p>
                    </div>
                    <div className="bg-fuchsia-950/30 p-2 rounded">
                      <p className="text-xs text-muted-foreground">Status</p>
                      <p className="font-medium capitalize">{booking.status || 'Confirmed'}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <button className="px-3 py-1 bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-200 text-sm rounded">
                      View Details
                    </button>
                    <button className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded">
                      Contact Hotel
                    </button>
                  </div>
                </div>
                
                <div className="hidden md:block text-right">
                  <span className="block text-lg font-bold">${booking.total_price}</span>
                  <span className="text-sm text-muted-foreground">Total</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-fuchsia-950/30 flex items-center justify-center">
            <Calendar className="w-8 h-8 text-fuchsia-400" />
          </div>
          <h3 className="text-lg font-bold mb-2">No bookings yet</h3>
          <p className="text-muted-foreground mb-6">You don't have any bookings at the moment.</p>
          <a href="/" className="inline-block py-2 px-4 rounded-lg bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-200 text-sm font-medium transition-colors">
            Browse Hotels
          </a>
        </div>
      )}
    </div>
  );
}
