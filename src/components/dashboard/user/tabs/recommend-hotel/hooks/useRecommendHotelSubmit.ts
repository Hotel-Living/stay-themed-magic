
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { RecommendHotelFormValues } from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recommendHotelSchema } from "../schema";

export const useRecommendHotelSubmit = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Set up the form
  const form = useForm<RecommendHotelFormValues>({
    resolver: zodResolver(recommendHotelSchema),
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
  const onSubmit = async (data: RecommendHotelFormValues) => {
    if (!user) {
      toast.error("You must be logged in to submit a hotel recommendation");
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
        console.error("Error submitting hotel recommendation:", error);
        toast.error("Failed to submit your recommendation", {
          description: error.message || "Please try again"
        });
        return;
      }
      
      toast.success("Recommendation submitted!", {
        description: "Thank you for your recommendation. We'll contact the hotel and notify you of the outcome."
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
