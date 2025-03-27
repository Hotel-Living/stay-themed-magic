
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export type NotificationType = 'review' | 'booking' | 'message';

export interface NotificationData {
  [key: string]: any;
}

export function useSendNotification() {
  const [isSending, setIsSending] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { toast } = useToast();

  // Listen for online/offline status changes
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const sendNotification = async (
    type: NotificationType, 
    recipient: string, 
    data: NotificationData
  ) => {
    setIsSending(true);
    
    try {
      // Check network status first
      if (!isOnline) {
        console.warn('Notification queued: Network offline');
        toast({
          title: 'Network offline',
          description: 'Your notification will be sent when the connection is restored',
          variant: 'warning',
        });
        
        // Store in local storage for later sending
        try {
          const pendingNotifications = JSON.parse(localStorage.getItem('pendingNotifications') || '[]');
          pendingNotifications.push({ type, recipient, data, timestamp: Date.now() });
          localStorage.setItem('pendingNotifications', JSON.stringify(pendingNotifications));
        } catch (storageError) {
          console.error('Error storing notification for later:', storageError);
        }
        
        return { success: false, offline: true };
      }
      
      // This is a mock implementation in development. In production, it would call an API endpoint.
      // For example:
      // const response = await fetch('/api/notifications', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ type, recipient, data }),
      // });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500)); // Reduced from 1000ms
      
      console.log(`Notification sent: Type=${type}, Recipient=${recipient}, Data=`, data);
      
      return { success: true };
    } catch (error) {
      console.error('Error sending notification:', error);
      toast({
        title: 'Notification failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
      // Return a default response instead of throwing
      return { success: false, error };
    } finally {
      setIsSending(false);
    }
  };

  // Function to attempt sending any pending notifications when coming back online
  useEffect(() => {
    if (isOnline) {
      try {
        const pendingNotifications = JSON.parse(localStorage.getItem('pendingNotifications') || '[]');
        if (pendingNotifications.length > 0) {
          toast({
            title: 'Reconnected',
            description: `Sending ${pendingNotifications.length} pending notification(s)`,
          });
          
          // Process pending notifications
          pendingNotifications.forEach(async (notification: any) => {
            await sendNotification(notification.type, notification.recipient, notification.data);
          });
          
          // Clear pending notifications
          localStorage.setItem('pendingNotifications', '[]');
        }
      } catch (error) {
        console.error('Error processing pending notifications:', error);
      }
    }
  }, [isOnline]);

  return { sendNotification, isSending, isOnline };
}
