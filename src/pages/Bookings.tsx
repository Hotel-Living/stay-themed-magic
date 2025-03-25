
import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { Starfield } from "@/components/Starfield";
import { useRealtimeBookings } from "@/hooks/useRealtimeBookings";
import BookingsContent from "@/components/dashboard/BookingsContent";
import { toast } from "@/hooks/use-toast";

export default function Bookings() {
  const { user } = useAuth();
  const { bookings, isLoading, error, isReconnecting, reconnect } = useRealtimeBookings();

  useEffect(() => {
    document.title = "My Bookings | Hotel-Living";
    
    if (error) {
      toast({
        title: "Error loading bookings",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
          
          {isReconnecting && (
            <div className="mb-4 p-2 bg-amber-500/20 text-amber-300 rounded-md flex items-center justify-between">
              <span>Reconnecting to real-time updates...</span>
              <button 
                onClick={reconnect}
                className="text-xs bg-amber-500/30 hover:bg-amber-500/50 px-2 py-1 rounded-md transition-colors"
              >
                Retry Now
              </button>
            </div>
          )}
          
          <BookingsContent 
            bookings={bookings} 
            isLoading={isLoading} 
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
