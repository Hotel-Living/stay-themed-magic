
import React, { useState, useEffect } from "react";
import { Calendar, CalendarCheck, Building, Clock, BellRing, Star, ChevronRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardCard from "../DashboardCard";
import ActivityItem from "../ActivityItem";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function DashboardContent() {
  const [upcomingStay, setUpcomingStay] = useState(null);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [completedStaysCount, setCompletedStaysCount] = useState(0);
  const [savedHotelsCount, setSavedHotelsCount] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
          const checkIn = new Date(booking.check_in);
          const checkOut = new Date(booking.check_out);
          const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
          
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
        // Normally you'd have a dedicated activities table
        const recentItems = [];
        
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
              time: formatTimeAgo(booking.created_at)
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
            recentItems.push({
              icon: <Star className="w-5 h-5" />,
              title: "Hotel saved",
              description: `You saved ${favorite.hotels?.name || 'a hotel'} to your favorites.`,
              time: formatTimeAgo(favorite.created_at)
            });
          });
        }
        
        // Sort activities by time
        recentItems.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
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
  
  // Helper function to format dates for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Helper function to calculate time ago
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'just now';
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`;
    
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
    
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`;
    
    const years = Math.floor(days / 365);
    return `${years} year${years !== 1 ? 's' : ''} ago`;
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-fuchsia-500" />
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard title="Upcoming Stay" value={bookingsCount.toString()} icon={<Calendar className="w-6 h-6" />} color="fuchsia" />
        <DashboardCard title="Completed Stays" value={completedStaysCount.toString()} icon={<CalendarCheck className="w-6 h-6" />} color="cyan" />
        <DashboardCard title="Saved Hotels" value={savedHotelsCount.toString()} icon={<Building className="w-6 h-6" />} color="amber" />
      </div>
      
      {/* Upcoming Stay */}
      <div className="glass-card rounded-2xl overflow-hidden mb-8">
        <div className="p-6 border-b border-fuchsia-900/20 bg-[#5c0869]">
          <h2 className="text-xl font-bold">Upcoming Stay</h2>
        </div>
        
        <div className="p-6 bg-[#5c0869]">
          {upcomingStay ? (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img src="/placeholder.svg" alt={upcomingStay.hotelName} className="w-full aspect-video object-cover rounded-lg" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2">{upcomingStay.hotelName}</h3>
                <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-fuchsia-400 text-fuchsia-400" />
                    ))}
                  </div>
                  <span>{upcomingStay.location}</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-fuchsia-950/30 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Check-in</p>
                    <p className="font-medium">{formatDate(upcomingStay.checkIn)}</p>
                  </div>
                  <div className="bg-fuchsia-950/30 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Check-out</p>
                    <p className="font-medium">{formatDate(upcomingStay.checkOut)}</p>
                  </div>
                  <div className="bg-fuchsia-950/30 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Duration</p>
                    <p className="font-medium">{upcomingStay.days} days</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <button className="rounded-lg px-4 py-2 bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-200 text-sm font-medium transition-colors">
                    View Details
                  </button>
                  <button className="rounded-lg px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground/80 text-sm font-medium transition-colors">
                    Contact Hotel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-fuchsia-950/30 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-fuchsia-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">No upcoming stays</h3>
              <p className="text-muted-foreground mb-6">Book your next thematic hotel experience.</p>
              <Link to="/" className="inline-flex items-center gap-2 py-2 px-4 rounded-lg bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-200 text-sm font-medium transition-colors">
                Browse Hotels <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Recent Activities */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-fuchsia-900/20 bg-[#5c0869]">
          <h2 className="text-xl font-bold">Recent Activity</h2>
        </div>
        
        <div className="divide-y divide-fuchsia-900/10">
          {recentActivities.length > 0 ? (
            recentActivities.map((activity, index) => (
              <ActivityItem 
                key={index}
                icon={activity.icon} 
                title={activity.title} 
                description={activity.description} 
                time={activity.time} 
              />
            ))
          ) : (
            <div className="text-center py-8">
              <Clock className="w-8 h-8 mx-auto mb-3 text-fuchsia-400/50" />
              <h3 className="text-lg font-bold mb-2">No recent activity</h3>
              <p className="text-muted-foreground">Your recent actions will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
