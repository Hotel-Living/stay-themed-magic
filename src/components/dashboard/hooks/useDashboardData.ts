
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
    
    try {
      // Fetch recent bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          id,
          created_at,
          hotel_id
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(2);
      
      if (bookingsError) throw bookingsError;
      
      if (bookingsData && bookingsData.length > 0) {
        // For each booking, fetch the hotel details separately
        for (const booking of bookingsData) {
          const { data: hotelData, error: hotelError } = await supabase
            .from('hotels')
            .select('name')
            .eq('id', booking.hotel_id)
            .single();
          
          if (!hotelError && hotelData) {
            activities.push({
              iconName: "Calendar",
              title: "New Booking",
              description: `You booked ${hotelData.name || 'a hotel'}`,
              time: formatDistanceToNow(new Date(booking.created_at), { addSuffix: true }),
              created_at: booking.created_at
            });
          } else {
            // Add activity even if hotel details are unavailable
            activities.push({
              iconName: "Calendar",
              title: "New Booking",
              description: "You booked a hotel",
              time: formatDistanceToNow(new Date(booking.created_at), { addSuffix: true }),
              created_at: booking.created_at
            });
          }
        }
      }
      
      // Fetch recent saved hotels
      const { data: favoritesData, error: favoritesError } = await supabase
        .from('favorites')
        .select(`
          id,
          created_at,
          hotel_id
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(2);
      
      if (favoritesError) throw favoritesError;
      
      if (favoritesData && favoritesData.length > 0) {
        // For each favorite, fetch the hotel details separately
        for (const favorite of favoritesData) {
          const { data: hotelData, error: hotelError } = await supabase
            .from('hotels')
            .select('name')
            .eq('id', favorite.hotel_id)
            .single();
          
          if (!hotelError && hotelData) {
            activities.push({
              iconName: "Building",
              title: "Saved Hotel",
              description: `You saved ${hotelData.name || 'a hotel'} to your favorites`,
              time: formatDistanceToNow(new Date(favorite.created_at), { addSuffix: true }),
              created_at: favorite.created_at
            });
          } else {
            // Add activity even if hotel details are unavailable
            activities.push({
              iconName: "Building",
              title: "Saved Hotel",
              description: "You saved a hotel to your favorites",
              time: formatDistanceToNow(new Date(favorite.created_at), { addSuffix: true }),
              created_at: favorite.created_at
            });
          }
        }
      }
      
      // Sort all activities by created_at date
      activities.sort((a, b) => {
        if (!a.created_at || !b.created_at) return 0;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
      
      // Take the most recent 5
      setRecentActivities(activities.slice(0, 5));
    } catch (error) {
      console.error("Error fetching recent activities:", error);
      // Set an empty array in case of an error
      setRecentActivities([]);
    }
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
