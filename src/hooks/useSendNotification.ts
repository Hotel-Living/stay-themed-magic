
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { handleApiError } from "@/utils/errorHandling";

type NotificationType = 'booking' | 'review' | 'message';

export function useSendNotification() {
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const sendNotification = async (
    type: NotificationType, 
    recipient: string, 
    data: Record<string, any>
  ) => {
    setIsSending(true);
    
    try {
      // Validate inputs
      if (!recipient || !recipient.includes('@')) {
        throw new Error("Invalid email recipient");
      }
      
      if (!type || !['booking', 'review', 'message'].includes(type)) {
        throw new Error("Invalid notification type");
      }
      
      const { data: response, error } = await supabase.functions.invoke('send-notification', {
        body: { type, recipient, data }
      });
      
      if (error) throw error;
      
      console.log("Notification sent:", response);
      toast({
        title: "Notification Sent",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} notification sent to ${recipient}`
      });
      
      return response;
    } catch (error: any) {
      console.error("Error sending notification:", error);
      
      // Handle specific error cases
      if (error.message?.includes("network") || error.message?.includes("fetch")) {
        toast({
          title: "Network Error",
          description: "Unable to connect to notification service. Please check your internet connection.",
          variant: "destructive"
        });
      } else if (error.message?.includes("email")) {
        toast({
          title: "Email Error",
          description: error.message || "There was a problem with the recipient email address",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error Sending Notification",
          description: error.message || "Failed to send notification",
          variant: "destructive"
        });
      }
      
      return null;
    } finally {
      setIsSending(false);
    }
  };

  return { sendNotification, isSending };
}
