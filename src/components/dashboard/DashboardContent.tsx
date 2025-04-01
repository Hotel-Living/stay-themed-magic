
import React from 'react';
import { ArrowUp, BarChart2, Building, Calendar, Star, Users, Clock, Sparkles, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatCard from './StatCard';
import ActionCard from './ActionCard';
import ReviewItem from './ReviewItem';
import BookingItem from './BookingItem';
import { useReviewNotifications } from '@/hooks/useReviewNotifications';
import { Button } from '@/components/ui/button';

export const DashboardContent = () => {
  const navigate = useNavigate();
  const { notifications, newNotificationsCount, loading: notificationsLoading } = useReviewNotifications();
  
  const stats = [
    {
      title: 'Total Bookings',
      value: '32',
      change: '+12%',
      trend: 'up',
      icon: <Calendar className="w-4 h-4" />
    },
    {
      title: 'Revenue',
      value: '$8,320',
      change: '+18%',
      trend: 'up',
      icon: <BarChart2 className="w-4 h-4" />
    },
    {
      title: 'Avg. Rating',
      value: '4.8',
      change: '+0.3',
      trend: 'up',
      icon: <Star className="w-4 h-4" />
    },
    {
      title: 'Guests',
      value: '64',
      change: '+24%',
      trend: 'up',
      icon: <Users className="w-4 h-4" />
    }
  ];

  const actions = [
    {
      title: 'Add Property',
      description: 'List a new hotel or apartment.',
      icon: <Building className="w-5 h-5" />,
      onClick: () => navigate('/add-property')
    },
    {
      title: 'View Bookings',
      description: 'Manage upcoming and past reservations.',
      icon: <Calendar className="w-5 h-5" />,
      onClick: () => navigate('/bookings')
    },
    {
      title: 'View Analytics',
      description: 'See detailed performance metrics.',
      icon: <BarChart2 className="w-5 h-5" />,
      onClick: () => navigate('/analytics')
    },
    {
      title: 'Manage Reviews',
      description: 'Respond to guest feedback.',
      icon: <MessageSquare className="w-5 h-5" />,
      onClick: () => document.querySelector('[data-tab="reviews"]')?.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      )
    }
  ];

  const recentBookings = [
    {
      name: 'John Smith',
      dates: 'Mar 15 - Apr 15, 2023',
      property: 'Luxury Villa',
      amount: '$1,200',
      status: 'confirmed'
    },
    {
      name: 'Jane Doe',
      dates: 'Apr 1 - Apr 30, 2023',
      property: 'Beachfront Apartment',
      amount: '$980',
      status: 'pending'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action, i) => (
            <ActionCard key={i} {...action} />
          ))}
        </div>
      </div>

      {/* Two Column Layout for Reviews and Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reviews with Notifications */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Reviews</h2>
            {newNotificationsCount > 0 && (
              <div className="bg-fuchsia-500 text-white text-xs px-2 py-1 rounded-full">
                {newNotificationsCount} new
              </div>
            )}
          </div>
          
          {notificationsLoading ? (
            <div className="animate-pulse space-y-4 py-4">
              <div className="h-20 bg-fuchsia-500/10 rounded"></div>
              <div className="h-20 bg-fuchsia-500/10 rounded"></div>
            </div>
          ) : notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.slice(0, 3).map((notification, i) => (
                <div key={i} className={`${notification.isNew ? 'border-l-2 border-fuchsia-500 pl-3' : ''}`}>
                  <ReviewItem
                    name="Guest"
                    rating={notification.rating}
                    property={notification.hotelName}
                    comment="Click to view full review and respond"
                    date={new Date(notification.timestamp).toLocaleDateString()}
                  />
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full mt-2" 
                onClick={() => document.querySelector('[data-tab="reviews"]')?.dispatchEvent(
                  new MouseEvent('click', { bubbles: true })
                )}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Manage Reviews
              </Button>
            </div>
          ) : (
            <div className="text-center py-8 text-foreground/60">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No reviews yet</p>
            </div>
          )}
        </div>

        {/* Recent Bookings */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
          {recentBookings.length > 0 ? (
            <div className="space-y-4">
              {recentBookings.map((booking, i) => (
                <BookingItem key={i} {...booking} />
              ))}
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => document.querySelector('[data-tab="bookings"]')?.dispatchEvent(
                  new MouseEvent('click', { bubbles: true })
                )}
              >
                <Calendar className="w-4 h-4 mr-2" />
                View All Bookings
              </Button>
            </div>
          ) : (
            <div className="text-center py-8 text-foreground/60">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No bookings yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
