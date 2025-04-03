
import React, { useState, useEffect } from "react";
import { History, Loader2, Star, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function HistoryContent() {
  const [pastStays, setPastStays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchPastStays = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        const today = new Date().toISOString().split('T')[0];
        
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            id,
            check_in,
            check_out,
            total_price,
            status,
            hotels (
              id,
              name,
              city,
              country,
              main_image_url
            )
          `)
          .eq('user_id', user.id)
          .lt('check_out', today)
          .order('check_out', { ascending: false });
        
        if (error) throw error;
        
        setPastStays(data || []);
      } catch (error) {
        console.error("Error fetching past stays:", error);
        toast({
          title: "Error loading history",
          description: "We couldn't load your stay history. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPastStays();
  }, [user, toast]);
  
  // Helper function to format dates for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Helper function to calculate days between dates
  const calculateDays = (checkIn, checkOut) => {
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    return days;
  };
  
  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-6">Stay History</h2>
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-6 h-6 animate-spin text-fuchsia-500" />
          <span className="ml-2">Loading your stay history...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-6">Stay History</h2>
      
      {pastStays.length > 0 ? (
        <div className="space-y-6">
          {pastStays.map((stay) => (
            <div key={stay.id} className="border border-fuchsia-900/20 rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <img 
                    src={stay.hotels?.main_image_url || "/placeholder.svg"} 
                    alt={stay.hotels?.name} 
                    className="w-full h-full object-cover aspect-video"
                  />
                </div>
                
                <div className="p-4 flex-1">
                  <h3 className="font-bold text-lg mb-1">{stay.hotels?.name || 'Unknown Hotel'}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {stay.hotels ? `${stay.hotels.city}, ${stay.hotels.country}` : 'Unknown Location'}
                  </p>
                  
                  <div className="flex mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
                    <div className="bg-fuchsia-950/30 p-2 rounded">
                      <p className="text-xs text-muted-foreground">Check-in</p>
                      <p className="font-medium">{formatDate(stay.check_in)}</p>
                    </div>
                    <div className="bg-fuchsia-950/30 p-2 rounded">
                      <p className="text-xs text-muted-foreground">Check-out</p>
                      <p className="font-medium">{formatDate(stay.check_out)}</p>
                    </div>
                    <div className="bg-fuchsia-950/30 p-2 rounded">
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="font-medium">{calculateDays(stay.check_in, stay.check_out)} days</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3">
                    <div>
                      <span className="block text-lg font-bold">
                        ${stay.total_price}
                      </span>
                      <span className="text-xs text-muted-foreground">total price</span>
                    </div>
                    
                    <button className="px-4 py-2 bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-200 text-sm rounded">
                      Book Again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-fuchsia-950/30 flex items-center justify-center">
            <History className="w-8 h-8 text-fuchsia-400" />
          </div>
          <h3 className="text-lg font-bold mb-2">No stay history</h3>
          <p className="text-muted-foreground mb-6">You don't have any past stays with us yet.</p>
          <a href="/" className="inline-block py-2 px-4 rounded-lg bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-200 text-sm font-medium transition-colors">
            Browse Hotels
          </a>
        </div>
      )}
    </div>
  );
}
