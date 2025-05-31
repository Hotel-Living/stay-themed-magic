
import React from 'react';
import { ArrowUp, BarChart2, Building, Calendar, Star, Users, Clock, Sparkles, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../StatCard';
import ActionCard from '../../ActionCard';
import { useReviewNotifications } from '@/hooks/useReviewNotifications';
import { Button } from '@/components/ui/button';
import { RecommendedHotels } from '@/components/dashboard/user/RecommendedHotels';
import { FirstTimeUserBanner } from '@/components/dashboard/user/FirstTimeUserBanner';
import { useFirstBookingMode } from '@/hooks/useFirstBookingMode';
import { useSavedHotelsCount } from '@/components/dashboard/hooks/useSavedHotelsCount';

export const DashboardContent = () => {
  const navigate = useNavigate();
  const { isFirstTimeUser, loading: firstTimeLoading } = useFirstBookingMode();
  const { savedHotelsCount, isLoading: savedHotelsLoading } = useSavedHotelsCount();
  const {
    notifications,
    newNotificationsCount,
    loading: notificationsLoading
  } = useReviewNotifications();
  
  const stats = [{
    title: 'Total Bookings',
    value: '0',
    change: '0%',
    trend: 'neutral',
    icon: <Calendar className="w-4 h-4" />
  }, {
    title: 'Saved Hotels',
    value: savedHotelsLoading ? '...' : savedHotelsCount.toString(),
    change: '0%',
    trend: 'neutral',
    icon: <Star className="w-4 h-4" />
  }, {
    title: 'Reviews Written',
    value: '0',
    change: '0%',
    trend: 'neutral',
    icon: <MessageSquare className="w-4 h-4" />
  }, {
    title: 'Free Nights',
    value: '0',
    change: '0',
    trend: 'neutral',
    icon: <Sparkles className="w-4 h-4" />
  }];
  
  const actions = [{
    title: 'Browse Hotels',
    description: 'Discover amazing places to stay.',
    icon: <Building className="w-5 h-5" />,
    onClick: () => navigate('/hotels')
  }, {
    title: 'My Bookings',
    description: 'View and manage your reservations.',
    icon: <Calendar className="w-5 h-5" />,
    onClick: () => {} // This will be handled by tab switching
  }, {
    title: 'Saved Hotels',
    description: 'See your favorite properties.',
    icon: <Star className="w-5 h-5" />,
    onClick: () => {} // This will be handled by tab switching
  }, {
    title: 'Write Review',
    description: 'Share your experience with others.',
    icon: <MessageSquare className="w-5 h-5" />,
    onClick: () => {} // This will be handled by tab switching
  }];
  
  return (
    <div className="space-y-8">
      {/* First Time User Banner */}
      {!firstTimeLoading && isFirstTimeUser && (
        <FirstTimeUserBanner />
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => <StatCard key={i} {...stat} />)}
      </div>

      {/* Welcome Message */}
      <div className="glass-card rounded-2xl p-6 border border-fuchsia-500/20 bg-[#7a0486]">
        <h2 className="text-xl font-semibold mb-2">Welcome to Hotel-Living!</h2>
        <p className="text-foreground/80 mb-4">
          Discover amazing hotels tailored to your preferences. Update your affinities in your profile to get personalized recommendations.
        </p>
      </div>

      {/* Recommended Hotels Section */}
      <RecommendedHotels />

      {/* Quick Actions */}
      <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action, i) => <ActionCard key={i} {...action} />)}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="glass-card rounded-2xl p-6 bg-[#5d0478]">
          <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
          
          <div className="text-center py-8 text-foreground/60 bg-[#a54afe]">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No bookings yet</p>
            <p className="text-sm mt-2">Start exploring hotels to make your first booking</p>
          </div>
        </div>

        {/* Saved Hotels */}
        <div className="glass-card rounded-2xl p-6 bg-[#5d0478]">
          <h2 className="text-xl font-semibold mb-4">Saved Hotels</h2>
          
          <div className="text-center py-8 text-foreground/60 bg-[#a54afe]">
            <Star className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>{savedHotelsCount > 0 ? `${savedHotelsCount} saved hotels` : 'No saved hotels yet'}</p>
            <p className="text-sm mt-2">Save hotels you like to easily find them later</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
