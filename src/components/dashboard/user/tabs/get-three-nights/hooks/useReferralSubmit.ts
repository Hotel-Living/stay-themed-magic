
import { useState } from "react";
import { useToast, toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ReferralFormValues } from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { referralFormSchema } from "../schema";

export const useReferralSubmit = () => {
  const { toast: useToastRef } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Set up the form
  const form = useForm<ReferralFormValues>({
    resolver: zodResolver(referralFormSchema),
    defaultValues: {
      hotelName: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      city: "",
      referralDate: new Date(),
      additionalInfo: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data: ReferralFormValues) => {
    if (!user) {
      toast.error("You must be logged in to submit a hotel referral");
      return;
    }
    
    // Calculate the referral expiration date (15 days from referral date)
    const referralDate = new Date(data.referralDate);
    const expirationDate = new Date(referralDate);
    expirationDate.setDate(expirationDate.getDate() + 15);
    
    setIsSubmitting(true);
    
    try {
      // Insert the data into the hotel_referrals table with the referral program specific fields
      const { error } = await supabase.from("hotel_referrals").insert({
        user_id: user.id,
        hotel_name: data.hotelName,
        contact_name: data.contactName,
        contact_email: data.contactEmail,
        contact_phone: data.contactPhone,
        additional_info: data.additionalInfo,
        city: data.city,
        referral_type: "three_free_nights",
        referral_date: referralDate.toISOString(),
        expiration_date: expirationDate.toISOString(),
        reward_status: "pending"
      });

      if (error) {
        console.error("Error submitting hotel referral:", error);
        toast.error("Error saving referral", {
          description: error.message || "Failed to submit your referral. Please try again."
        });
        return;
      }
      
      toast.success("Referral submitted!", {
        description: `Thank you for your referral. The hotel must register by ${expirationDate.toLocaleDateString()} for you to receive three free nights.`
      });
      
      form.reset();
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred", {
        description: "Please try again later"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting,
  };
};
