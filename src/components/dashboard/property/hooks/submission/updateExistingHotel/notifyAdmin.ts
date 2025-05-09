
import { supabase } from "@/integrations/supabase/client";

/**
 * Sends notification to admin about pending hotel changes
 */
export const notifyAdmin = async (hotelName: string): Promise<void> => {
  try {
    await supabase.functions.invoke('send-notification', {
      body: {
        type: 'message',
        recipient: 'admin@hotel-living.com',
        data: {
          sender: 'Hotel Living System',
          hotelName: hotelName,
          message: `Hotel '${hotelName}' has submitted changes that require your approval.`
        }
      }
    });
  } catch (notifyError) {
    console.warn("Error sending admin notification:", notifyError);
    // Continue despite notification error
  }
};
