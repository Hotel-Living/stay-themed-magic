
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useHotelActions = (
  onSuccess: () => Promise<void>
) => {
  const { toast } = useToast();

  const handleApprove = async (hotelId: string) => {
    const { error } = await supabase
      .from('hotels')
      .update({ status: 'approved' })
      .eq('id', hotelId);

    if (error) {
      toast.error("Failed to approve hotel");
      return;
    }

    toast.success("Hotel has been approved");
    onSuccess();
  };

  const handleReject = async (hotelId: string, reason: string) => {
    const { error } = await supabase
      .from('hotels')
      .update({ 
        status: 'rejected',
        rejection_reason: reason 
      })
      .eq('id', hotelId);

    if (error) {
      toast.error("Failed to reject hotel");
      return;
    }

    toast.success("Hotel has been rejected");
    onSuccess();
  };

  const handleDelete = async (hotelId: string) => {
    const { error } = await supabase
      .from('hotels')
      .delete()
      .eq('id', hotelId);

    if (error) {
      toast.error("Failed to delete hotel");
      return;
    }

    toast.success("Hotel has been deleted");
    onSuccess();
  };

  return {
    handleApprove,
    handleReject,
    handleDelete
  };
};
