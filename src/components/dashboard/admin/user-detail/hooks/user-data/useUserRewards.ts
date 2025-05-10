
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useUserRewards = (userId: string | undefined) => {
  const [rewards, setRewards] = useState<any[]>([]);
  const [freeNightsCount, setFreeNightsCount] = useState(0);
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
      
      setRewards(data || []);
      setFreeNightsCount(totalFreeNights);
      
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
          quantity
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
    loading, 
    isGranting,
    grantFreeNight,
    removeFreeNight,
    refreshRewards: fetchUserRewards
  };
};
