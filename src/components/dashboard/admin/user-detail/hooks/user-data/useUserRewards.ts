
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useUserRewards = (userId: string | undefined) => {
  const [rewards, setRewards] = useState<any[]>([]);
  const [freeNightsCount, setFreeNightsCount] = useState(0);
  const [usedFreeNights, setUsedFreeNights] = useState(0);
  const [remainingFreeNights, setRemainingFreeNights] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isGranting, setIsGranting] = useState(false);
  const { toast } = useToast();

  const fetchUserRewards = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from("user_rewards")
        .select("*")
        .eq("user_id", userId)
        .eq("reward_type", "free_night");
      
      if (error) throw error;
      
      // Calculate total free nights by summing the quantity field
      const totalFreeNights = data?.reduce((sum, reward) => sum + (reward.quantity || 1), 0) || 0;
      
      // Calculate used nights
      const usedNights = data?.reduce((sum, reward) => 
        sum + (reward.is_used ? (reward.quantity || 1) : 0), 0) || 0;
      
      // Calculate remaining nights
      const remainingNights = totalFreeNights - usedNights;
      
      setRewards(data || []);
      setFreeNightsCount(totalFreeNights);
      setUsedFreeNights(usedNights);
      setRemainingFreeNights(remainingNights);
      
    } catch (error: any) {
      console.error("Error fetching user rewards:", error);
      toast({
        title: "Error",
        description: "Failed to fetch user rewards information",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const grantFreeNight = async (quantity: number = 1) => {
    if (!userId) return;
    
    try {
      setIsGranting(true);
      
      // Insert new reward record
      const { error } = await supabase
        .from("user_rewards")
        .insert({
          user_id: userId,
          reward_type: "free_night",
          source: "manual_admin",
          quantity,
          is_used: false
        });
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Successfully granted ${quantity} free night${quantity !== 1 ? 's' : ''} to the user.`,
      });
      
      // Refresh rewards data
      await fetchUserRewards();
      
    } catch (error: any) {
      console.error("Error granting free night:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to grant free night",
        variant: "destructive"
      });
    } finally {
      setIsGranting(false);
    }
  };

  const markRewardAsUsed = async (rewardId: string, bookingId?: string) => {
    try {
      setIsGranting(true);
      
      const { error } = await supabase
        .from("user_rewards")
        .update({
          is_used: true,
          used_at: new Date().toISOString(),
          booking_id: bookingId || null
        })
        .eq("id", rewardId);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Successfully marked the free night reward as used.",
      });
      
      // Refresh rewards data
      await fetchUserRewards();
      
    } catch (error: any) {
      console.error("Error marking reward as used:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update reward status",
        variant: "destructive"
      });
    } finally {
      setIsGranting(false);
    }
  };

  const markRewardAsUnused = async (rewardId: string) => {
    try {
      setIsGranting(true);
      
      const { error } = await supabase
        .from("user_rewards")
        .update({
          is_used: false,
          used_at: null,
          booking_id: null
        })
        .eq("id", rewardId);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Successfully marked the free night reward as unused.",
      });
      
      // Refresh rewards data
      await fetchUserRewards();
      
    } catch (error: any) {
      console.error("Error marking reward as unused:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update reward status",
        variant: "destructive"
      });
    } finally {
      setIsGranting(false);
    }
  };

  const removeFreeNight = async (rewardId: string) => {
    try {
      setIsGranting(true);
      
      const { error } = await supabase
        .from("user_rewards")
        .delete()
        .eq("id", rewardId);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Successfully removed the free night reward.",
      });
      
      // Refresh rewards data
      await fetchUserRewards();
      
    } catch (error: any) {
      console.error("Error removing free night:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to remove free night",
        variant: "destructive"
      });
    } finally {
      setIsGranting(false);
    }
  };

  useEffect(() => {
    fetchUserRewards();
  }, [userId, toast]);

  return { 
    rewards, 
    freeNightsCount,
    usedFreeNights,
    remainingFreeNights,
    loading, 
    isGranting,
    grantFreeNight,
    markRewardAsUsed,
    markRewardAsUnused,
    removeFreeNight,
    refreshRewards: fetchUserRewards
  };
};
