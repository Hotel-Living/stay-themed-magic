
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

export const NotificationSettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    booking_confirmations: true,
    booking_reminders: true,
    special_offers: false,
    newsletter: false,
    account_updates: true,
    security_alerts: true,
  });

  const handleCheckboxChange = (id: string) => {
    setNotifications(prev => ({
      ...prev,
      [id]: !prev[id as keyof typeof prev]
    }));
  };

  const handleSubmit = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Preferences updated",
        description: "Your notification preferences have been saved.",
      });
    }, 800);
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-fuchsia-300 mb-3">Email Notifications</h4>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <Checkbox
                  id="booking_confirmations"
                  checked={notifications.booking_confirmations}
                  onCheckedChange={() => handleCheckboxChange('booking_confirmations')}
                  className="w-4 h-4 text-fuchsia-600 border-gray-300 rounded focus:ring-fuchsia-500"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="booking_confirmations" className="text-sm font-medium">Booking Confirmations</label>
                <p className="text-xs text-muted-foreground">Receive emails when your booking is confirmed.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <Checkbox
                  id="booking_reminders"
                  checked={notifications.booking_reminders}
                  onCheckedChange={() => handleCheckboxChange('booking_reminders')}
                  className="w-4 h-4 text-fuchsia-600 border-gray-300 rounded focus:ring-fuchsia-500"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="booking_reminders" className="text-sm font-medium">Booking Reminders</label>
                <p className="text-xs text-muted-foreground">Receive reminder emails before your upcoming stay.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <Checkbox
                  id="special_offers"
                  checked={notifications.special_offers}
                  onCheckedChange={() => handleCheckboxChange('special_offers')}
                  className="w-4 h-4 text-fuchsia-600 border-gray-300 rounded focus:ring-fuchsia-500"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="special_offers" className="text-sm font-medium">Special Offers</label>
                <p className="text-xs text-muted-foreground">Receive emails about special deals and promotions.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <Checkbox
                  id="newsletter"
                  checked={notifications.newsletter}
                  onCheckedChange={() => handleCheckboxChange('newsletter')}
                  className="w-4 h-4 text-fuchsia-600 border-gray-300 rounded focus:ring-fuchsia-500"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="newsletter" className="text-sm font-medium">Newsletter</label>
                <p className="text-xs text-muted-foreground">Receive our monthly newsletter with travel tips and updates.</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-fuchsia-300 mb-3">System Notifications</h4>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <Checkbox
                  id="account_updates"
                  checked={notifications.account_updates}
                  onCheckedChange={() => handleCheckboxChange('account_updates')}
                  className="w-4 h-4 text-fuchsia-600 border-gray-300 rounded focus:ring-fuchsia-500"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="account_updates" className="text-sm font-medium">Account Updates</label>
                <p className="text-xs text-muted-foreground">Receive notifications about important account updates.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <Checkbox
                  id="security_alerts"
                  checked={notifications.security_alerts}
                  onCheckedChange={() => handleCheckboxChange('security_alerts')}
                  className="w-4 h-4 text-fuchsia-600 border-gray-300 rounded focus:ring-fuchsia-500"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="security_alerts" className="text-sm font-medium">Security Alerts</label>
                <p className="text-xs text-muted-foreground">Receive notifications about security-related events.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-lg transition-colors"
          >
            {isLoading ? 'Saving...' : 'Save Preferences'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
