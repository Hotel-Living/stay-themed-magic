import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useUserDetailActions = (
  id: string | undefined,
  profile: any,
  setEditing: (editing: boolean) => void,
  handleSaveUserDetails: () => Promise<void>,
  resendVerificationEmail: (email: string) => Promise<{ success: boolean; message: string }>,
  grantFreeNight: (quantity: number) => Promise<void>,
  removeFreeNight: (rewardId: string) => Promise<void>,
  markRewardAsUsed: (rewardId: string) => Promise<void>,
  markRewardAsUnused: (rewardId: string) => Promise<void>
) => {
  const { toast } = useToast();

  const handleCancelEdit = () => {
    if (profile) {
      // Reset form to original profile data with all required fields
      return {
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        phone: profile.phone || "",
        email: profile.email || "",
        is_hotel_owner: profile.is_hotel_owner || false,
        is_active: profile.is_active !== false // Default to true if field doesn't exist
      };
    }
    setEditing(false);
    return null;
  };

  // Ensure all handler functions explicitly return Promise<void>
  const handleSave = async (): Promise<void> => {
    try {
      await handleSaveUserDetails();
      toast({
        title: "Success",
        description: "User information updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update user information",
        variant: "destructive"
      });
    }
  };

  const handleResendVerification = async (): Promise<void> => {
    if (!profile?.email) {
      toast({
        title: "Error",
        description: "User email is not available",
        variant: "destructive"
      });
      return;
    }

    try {
      const result = await resendVerificationEmail(profile.email);
      
      if (result.success) {
        toast({
          title: "Success",
          description: "Verification email sent successfully",
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to resend verification email",
        variant: "destructive"
      });
    }
  };

  const handleGrantFreeNight = async (quantity: number): Promise<void> => {
    try {
      await grantFreeNight(quantity);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to grant free night",
        variant: "destructive"
      });
    }
  };

  const handleRemoveFreeNight = async (rewardId: string): Promise<void> => {
    try {
      await removeFreeNight(rewardId);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to remove free night",
        variant: "destructive"
      });
    }
  };

  const handleMarkRewardAsUsed = async (rewardId: string): Promise<void> => {
    try {
      await markRewardAsUsed(rewardId);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to mark reward as used",
        variant: "destructive"
      });
    }
  };

  const handleMarkRewardAsUnused = async (rewardId: string): Promise<void> => {
    try {
      await markRewardAsUnused(rewardId);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to mark reward as unused",
        variant: "destructive"
      });
    }
  };

  return {
    handleCancelEdit,
    handleSave,
    handleResendVerification,
    handleGrantFreeNight,
    handleRemoveFreeNight,
    handleMarkRewardAsUsed,
    handleMarkRewardAsUnused
  };
};
