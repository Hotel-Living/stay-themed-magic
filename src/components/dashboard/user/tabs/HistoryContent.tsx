
import React, { useState, useEffect } from "react";
import { History, Loader2, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { formatDate, calculateDaysBetween } from "../../utils/dateUtils";

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
          .select('*, hotels(name, city, country)')
          .eq('user_id', user.id)
          .lt('check_out', today)
          .order('check_out', { ascending: false });
        
        if (error) throw error;
        
        setPastStays(data || []);
      } catch (error) {
        console.error("Error fetching stay history:", error);
        toast({
          title: "Error loading stay history",
          description: "We couldn't load your stay history. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPastStays();
  }, [user, toast]);
  
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
          {pastStays.map((stay) => {
            const days = calculateDaysBetween(stay.check_in, stay.check_out);
            
            return (
              <div key={stay.id} className="border border-fuchsia-900/20 rounded-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="md:w-1/4">
                      <img 
                        src="/placeholder.svg" 
                        alt={stay.hotels?.name || "Hotel"} 
                        className="aspect-video object-cover rounded-lg w-full"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{stay.hotels?.name || 'Unknown Hotel'}</h3>
                      <p className="text-muted-foreground mb-2">{stay.hotels ? `${stay.hotels.city}, ${stay.hotels.country}` : 'Unknown Location'}</p>
                      
                      <div className="flex space-x-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star}
                            className="w-4 h-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Dates</p>
                          <p className="font-medium">{formatDate(stay.check_in)} - {formatDate(stay.check_out)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Duration</p>
                          <p className="font-medium">{days} days</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Total</p>
                          <p className="font-medium">${stay.total_price}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-200 text-sm rounded">
                          Book Again
                        </button>
                        <button className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded">
                          Leave Review
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-fuchsia-950/30 flex items-center justify-center">
            <History className="w-8 h-8 text-fuchsia-400" />
          </div>
          <h3 className="text-lg font-bold mb-2">No stay history</h3>
          <p className="text-muted-foreground mb-6">You don't have any past stays.</p>
          <a href="/" className="inline-block py-2 px-4 rounded-lg bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-200 text-sm font-medium transition-colors">
            Browse Hotels
          </a>
        </div>
      )}
    </div>
  );
}
