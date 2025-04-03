
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { RecentActivity, UpcomingStay } from "../types/dashboard";
import { Clock, Star } from "lucide-react";
import { formatTimeAgo, calculateDaysBetween } from "../utils/dateUtils";

export const useDashboardData = () => {
  const [upcomingStay, setUpcomingStay] = useState<UpcomingStay | null>(null);
  const [bookingsCount, setBookingsCount] = useState<number>(0);
  const [completedStaysCount, setCompletedStaysCount] = useState<number>(0);
  const [savedHotelsCount, setSavedHotelsCount] = useState<number>(0);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // Fetch upcoming bookings
        const today = new Date().toISOString().split('T')[0];
        const { data: upcomingBookings, error: bookingsError } = await supabase
          .from('bookings')
          .select('*, hotels(name, city, country)')
          .eq('user_id', user.id)
          .gte('check_in', today)
          .order('check_in', { ascending: true })
          .limit(1);
          
        if (bookingsError) throw bookingsError;
        
        // Set upcoming stay if exists
        if (upcomingBookings && upcomingBookings.length > 0) {
          const booking = upcomingBookings[0];
          const days = calculateDaysBetween(booking.check_in, booking.check_out);
          
          setUpcomingStay({
            hotelId: booking.hotel_id,
            hotelName: booking.hotels?.name || 'Unknown Hotel',
            location: booking.hotels ? `${booking.hotels.city}, ${booking.hotels.country}` : 'Unknown Location',
            checkIn: booking.check_in,
            checkOut: booking.check_out,
            days: days
          });
        }
        
        // Count all bookings
        const { count: totalBookings, error: countError } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .gte('check_in', today);
          
        if (countError) throw countError;
        setBookingsCount(totalBookings || 0);
        
        // Count completed stays
        const { count: completedCount, error: completedError } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .lt('check_out', today);
          
        if (completedError) throw completedError;
        setCompletedStaysCount(completedCount || 0);
        
        // Count saved hotels (favorites)
        const { count: favoritesCount, error: favoritesError } = await supabase
          .from('favorites')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);
          
        if (favoritesError) throw favoritesError;
        setSavedHotelsCount(favoritesCount || 0);
        
        // For simplicity, we'll create recent activities based on user actions
        const recentItems: RecentActivity[] = [];
        
        // Add booking activities
        const { data: recentBookings, error: recentBookingsError } = await supabase
          .from('bookings')
          .select('created_at, hotels(name)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(3);
          
        if (!recentBookingsError && recentBookings) {
          recentBookings.forEach(booking => {
            recentItems.push({
              icon: <Clock className="w-5 h-5" />,
              title: "Booking confirmed",
              description: `Your booking at ${booking.hotels?.name || 'a hotel'} has been confirmed.`,
              time: formatTimeAgo(booking.created_at),
              created_at: booking.created_at
            });
          });
        }
        
        // Add favorite activities
        const { data: recentFavorites, error: recentFavoritesError } = await supabase
          .from('favorites')
          .select('created_at, hotels(name)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(3);
          
        if (!recentFavoritesError && recentFavorites) {
          recentFavorites.forEach(favorite => {
            if (favorite.hotels) {
              recentItems.push({
                icon: <Star className="w-5 h-5" />,
                title: "Hotel saved",
                description: `You saved ${favorite.hotels.name || 'a hotel'} to your favorites.`,
                time: formatTimeAgo(favorite.created_at),
                created_at: favorite.created_at
              });
            }
          });
        }
        
        // Sort activities by time
        recentItems.sort((a, b) => {
          if (a.created_at && b.created_at) {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          }
          return 0;
        });
        
        setRecentActivities(recentItems.slice(0, 3));
        
      } catch (error) {
        console.error("Error fetching user dashboard data:", error);
        toast({
          title: "Error loading dashboard",
          description: "We couldn't load your dashboard data. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [user, toast]);

  return {
    upcomingStay,
    bookingsCount,
    completedStaysCount,
    savedHotelsCount,
    recentActivities,
    isLoading
  };
};
