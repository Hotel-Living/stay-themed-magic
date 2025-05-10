
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { referralFormSchema, ReferralFormValues } from "./schema";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ReferralPreview } from "./ReferralPreview";

const ReferralForm = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  
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
  async function onSubmit(data: ReferralFormValues) {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to submit a hotel referral.",
        variant: "destructive",
      });
      return;
    }
    
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
    }
  }

  return (
    <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
      <h3 className="text-xl font-semibold mb-6">Recommend a Hotel</h3>
      
      {/* Message Preview */}
      <ReferralPreview />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Hotel Name */}
          <FormField
            control={form.control}
            name="hotelName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hotel Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the hotel name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* City */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the hotel's city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact Name */}
          <FormField
            control={form.control}
            name="contactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Person</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the name of a contact person at the hotel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact Email */}
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter contact email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact Phone */}
          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Phone (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter contact phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Additional Info */}
          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Information (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Any additional details or notes about the hotel" 
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-fuchsia-600 hover:bg-fuchsia-700"
          >
            <Check className="mr-2 h-4 w-4" /> Submit Hotel Referral
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ReferralForm;
