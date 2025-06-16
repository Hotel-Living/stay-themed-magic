
import React from 'react';
import { ArrowUp, BarChart2, Building, Calendar, Star, Users, Clock, Sparkles, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatCard from './StatCard';
import ActionCard from './ActionCard';
import { useReviewNotifications } from '@/hooks/useReviewNotifications';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

export const DashboardContent = () => {
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const {
    notifications,
    newNotificationsCount,
    loading: notificationsLoading
  } = useReviewNotifications();

  const stats = [{
    title: language === 'es' ? t('dashboard.totalBookings') : 'Total Bookings',
    value: '0',
    change: '0%',
    trend: 'neutral',
    icon: <Calendar className="w-4 h-4" />
  }, {
    title: language === 'es' ? t('dashboard.revenue') : 'Revenue',
    value: '$0',
    change: '0%',
    trend: 'neutral',
    icon: <BarChart2 className="w-4 h-4" />
  }, {
    title: language === 'es' ? t('dashboard.avgRating') : 'Avg. Rating',
    value: '0.0',
    change: '0.0',
    trend: 'neutral',
    icon: <Star className="w-4 h-4" />
  }, {
    title: language === 'es' ? t('dashboard.guests') : 'Guests',
    value: '0',
    change: '0%',
    trend: 'neutral',
    icon: <Users className="w-4 h-4" />
  }];

  const actions = [{
    title: language === 'es' ? t('dashboard.addPropertyAction') : 'Add Property',
    description: language === 'es' ? t('dashboard.addPropertyDescription') : 'List a new hotel or apartment.',
    icon: <Building className="w-5 h-5" />,
    onClick: () => navigate('/add-property')
  }, {
    title: language === 'es' ? t('dashboard.viewBookingsAction') : 'View Bookings',
    description: language === 'es' ? t('dashboard.viewBookingsDescription') : 'Manage upcoming and past reservations.',
    icon: <Calendar className="w-5 h-5" />,
    onClick: () => navigate('/bookings')
  }, {
    title: language === 'es' ? t('dashboard.viewAnalyticsAction') : 'View Analytics',
    description: language === 'es' ? t('dashboard.viewAnalyticsDescription') : 'See detailed performance metrics.',
    icon: <BarChart2 className="w-5 h-5" />,
    onClick: () => navigate('/analytics')
  }, {
    title: language === 'es' ? t('dashboard.manageReviewsAction') : 'Manage Reviews',
    description: language === 'es' ? t('dashboard.manageReviewsDescription') : 'Respond to guest feedback.',
    icon: <MessageSquare className="w-5 h-5" />,
    onClick: () => document.querySelector('[data-tab="reviews"]')?.dispatchEvent(new MouseEvent('click', {
      bubbles: true
    }))
  }];

  return <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => <StatCard key={i} {...stat} />)}
      </div>

      {/* Welcome Message for New Hotel Owners */}
      <div className="glass-card rounded-2xl p-6 border border-fuchsia-500/20 bg-[#7a0486]">
        <h2 className="text-xl font-semibold mb-2">
          {language === 'es' ? t('dashboard.welcomeToHotelLiving') : 'Welcome to Hotel-Living!'}
        </h2>
        <p className="text-foreground/80 mb-4">
          {language === 'es' ? t('dashboard.thankYouForRegistering') : 'Thank you for registering as a hotel partner. To get started, add your first property using the "Add Property" option below.'}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
        <h2 className="text-xl font-semibold mb-4">
          {language === 'es' ? t('dashboard.quickActions') : 'Quick Actions'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action, i) => <ActionCard key={i} {...action} />)}
        </div>
      </div>

      {/* Two Column Layout for Reviews and Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reviews with Notifications */}
        <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {language === 'es' ? t('dashboard.recentReviews') : 'Recent Reviews'}
            </h2>
          </div>
          
          <div className="text-center py-8 text-foreground/60 bg-[#9939f9]">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>{language === 'es' ? t('dashboard.noReviewsYet') : 'No reviews yet'}</p>
            <p className="text-sm mt-2">
              {language === 'es' ? t('dashboard.reviewsWillAppear') : 'Reviews will appear here once guests rate your properties'}
            </p>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="glass-card rounded-2xl p-6 bg-[#5d0478]">
          <h2 className="text-xl font-semibold mb-4">
            {language === 'es' ? t('dashboard.recentBookings') : 'Recent Bookings'}
          </h2>
          
          <div className="text-center py-8 text-foreground/60 bg-[#a54afe]">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>{language === 'es' ? t('dashboard.noBookingsYet') : 'No bookings yet'}</p>
            <p className="text-sm mt-2">
              {language === 'es' ? t('dashboard.bookingsWillAppear') : 'Bookings will appear here once guests make reservations'}
            </p>
          </div>
        </div>
      </div>
    </div>;
};

export default DashboardContent;
