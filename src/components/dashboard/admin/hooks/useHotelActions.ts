
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
      toast({
        title: "Error",
        description: "Failed to approve hotel",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Hotel has been approved"
    });

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
      toast({
        title: "Error",
        description: "Failed to reject hotel",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Hotel has been rejected"
    });

    onSuccess();
  };

  const handleDelete = async (hotelId: string) => {
    const { error } = await supabase
      .from('hotels')
      .delete()
      .eq('id', hotelId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete hotel",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Hotel has been deleted"
    });

    onSuccess();
  };

  return {
    handleApprove,
    handleReject,
    handleDelete
  };
};
