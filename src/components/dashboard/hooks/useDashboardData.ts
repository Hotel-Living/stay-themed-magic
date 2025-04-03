
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { RecentActivity, UpcomingStay } from "../types/dashboard";

export function useDashboardData() {
  const [upcomingStay, setUpcomingStay] = useState<UpcomingStay | null>(null);
  const [bookingsCount, setBookingsCount] = useState<number>(0);
  const [completedStaysCount, setCompletedStaysCount] = useState<number>(0);
  const [savedHotelsCount, setSavedHotelsCount] = useState<number>(0);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const { user } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch counts from different tables
        await Promise.all([
          fetchBookingsCount(),
          fetchCompletedStays(),
          fetchSavedHotelsCount(),
          fetchUpcomingStay(),
          fetchRecentActivities()
        ]);
        
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast({
          title: "Error loading dashboard",
          description: "We couldn't load some of your dashboard data. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [user]);
  
  const fetchBookingsCount = async () => {
    if (!user) return;
    
    const { count, error } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);
    
    if (error) throw error;
    
    setBookingsCount(count || 0);
  };
  
  const fetchCompletedStays = async () => {
    if (!user) return;
    
    const { count, error } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('status', 'completed');
    
    if (error) throw error;
    
    setCompletedStaysCount(count || 0);
  };
  
  const fetchSavedHotelsCount = async () => {
    if (!user) return;
    
    const { count, error } = await supabase
      .from('favorites')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);
    
    if (error) throw error;
    
    setSavedHotelsCount(count || 0);
  };
  
  const fetchUpcomingStay = async () => {
    if (!user) return;
    
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        id,
        check_in,
        check_out,
        hotels:hotel_id (
          id,
          name,
          city,
          country
        )
      `)
      .eq('user_id', user.id)
      .eq('status', 'confirmed')
      .gte('check_in', today)
      .order('check_in', { ascending: true })
      .limit(1);
    
    if (error) throw error;
    
    if (data && data.length > 0 && data[0].hotels) {
      const booking = data[0];
      const checkIn = new Date(booking.check_in);
      const checkOut = new Date(booking.check_out);
      
      // Calculate number of days
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setUpcomingStay({
        hotelId: booking.hotels.id,
        hotelName: booking.hotels.name,
        location: `${booking.hotels.city}, ${booking.hotels.country}`,
        checkIn: booking.check_in,
        checkOut: booking.check_out,
        days: diffDays
      });
    } else {
      setUpcomingStay(null);
    }
  };
  
  const fetchRecentActivities = async () => {
    if (!user) return;
    
    const activities: RecentActivity[] = [];
    
    // Fetch recent bookings
    const { data: bookingsData, error: bookingsError } = await supabase
      .from('bookings')
      .select(`
        id,
        created_at,
        hotels:hotel_id (
          name
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(2);
    
    if (bookingsError) throw bookingsError;
    
    if (bookingsData) {
      bookingsData.forEach(booking => {
        activities.push({
          iconName: "Calendar",
          title: "New Booking",
          description: `You booked ${booking.hotels?.name || 'a hotel'}`,
          time: formatDistanceToNow(new Date(booking.created_at), { addSuffix: true }),
          created_at: booking.created_at
        });
      });
    }
    
    // Fetch recent saved hotels
    const { data: favoritesData, error: favoritesError } = await supabase
      .from('favorites')
      .select(`
        id,
        created_at,
        hotels:hotel_id (
          name
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(2);
    
    if (favoritesError) throw favoritesError;
    
    if (favoritesData) {
      favoritesData.forEach(favorite => {
        activities.push({
          iconName: "Building",
          title: "Saved Hotel",
          description: `You saved ${favorite.hotels?.name || 'a hotel'} to your favorites`,
          time: formatDistanceToNow(new Date(favorite.created_at), { addSuffix: true }),
          created_at: favorite.created_at
        });
      });
    }
    
    // Sort all activities by created_at date
    activities.sort((a, b) => {
      if (!a.created_at || !b.created_at) return 0;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
    
    // Take the most recent 5
    setRecentActivities(activities.slice(0, 5));
  };
  
  return {
    upcomingStay,
    bookingsCount,
    completedStaysCount,
    savedHotelsCount,
    recentActivities,
    isLoading
  };
}
