
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, X, Calendar, TrendingDown, MapPin } from 'lucide-react';
import { useUserDashboardNotifications } from '@/hooks/useUserDashboardNotifications';
import { useNavigate } from 'react-router-dom';

export const NotificationsContent: React.FC = () => {
  const { notifications, loading, removeNotification } = useUserDashboardNotifications();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="glass-card rounded-2xl p-6">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fuchsia-400 mx-auto"></div>
            <p className="mt-4 text-foreground/60">Loading your notifications...</p>
          </div>
        </div>
      </div>
    );
  }

  const handleHotelClick = (hotelId: string) => {
    navigate(`/hotel/${hotelId}`);
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Bell className="w-6 h-6 text-fuchsia-400" />
          Your Notifications
        </h2>
        
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No active notifications</h3>
            <p className="text-foreground/60 mb-6">
              You haven't set up any hotel notifications yet. Visit hotel detail pages to enable alerts for availability and price changes.
            </p>
            <Button onClick={() => navigate('/search')} className="bg-fuchsia-600 hover:bg-fuchsia-700">
              Browse Hotels
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card key={notification.id} className="bg-fuchsia-950/30 border-fuchsia-500/20">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      {notification.hotel.main_image_url && (
                        <img
                          src={notification.hotel.main_image_url}
                          alt={notification.hotel.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <h3 
                          className="font-semibold text-white cursor-pointer hover:text-fuchsia-300 transition-colors"
                          onClick={() => handleHotelClick(notification.hotel_id)}
                        >
                          {notification.hotel.name}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-foreground/60 mb-2">
                          <MapPin className="w-3 h-3" />
                          {notification.hotel.city}, {notification.hotel.country}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="flex items-center gap-1">
                            {notification.type === 'availability' ? (
                              <>
                                <Calendar className="w-3 h-3" />
                                Availability Alert
                              </>
                            ) : (
                              <>
                                <TrendingDown className="w-3 h-3" />
                                Price Drop Alert
                              </>
                            )}
                          </Badge>
                          <span className="text-xs text-foreground/50">
                            Since {new Date(notification.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeNotification(notification.id)}
                      className="text-foreground/60 hover:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
