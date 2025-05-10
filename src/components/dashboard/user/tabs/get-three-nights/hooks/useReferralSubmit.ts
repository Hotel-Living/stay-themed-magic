
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ReferralFormValues } from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { referralFormSchema } from "../schema";

export const useReferralSubmit = () => {
  const { toast } = useToast();
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
      additionalInfo: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data: ReferralFormValues) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to submit a hotel referral.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Insert the data into the hotel_referrals table
      const { error } = await supabase.from("hotel_referrals").insert({
        user_id: user.id,
        hotel_name: data.hotelName,
        contact_name: data.contactName,
        contact_email: data.contactEmail,
        contact_phone: data.contactPhone,
        additional_info: data.additionalInfo,
        city: data.city,
      });

      if (error) {
        console.error("Error submitting hotel referral:", error);
        toast({
          title: "Error saving referral",
          description: error.message || "Failed to submit your referral. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Referral submitted!",
        description: "Thank you for your referral. We'll contact the hotel and notify you of the outcome.",
      });
      
      form.reset();
    } catch (err) {
      console.error("Unexpected error:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
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
