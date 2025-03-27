
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export type NotificationType = 'review' | 'booking' | 'message';

export interface NotificationData {
  [key: string]: any;
}

export function useSendNotification() {
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const sendNotification = async (
    type: NotificationType, 
    recipient: string, 
    data: NotificationData
  ) => {
    setIsSending(true);
    
    try {
      // This is a mock implementation. In a real app, you would call an API endpoint.
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

  return { sendNotification, isSending };
}
