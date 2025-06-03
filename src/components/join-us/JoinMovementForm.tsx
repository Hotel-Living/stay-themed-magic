
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters"
  }),
  email: z.string().email({
    message: "Please enter a valid email address"
  }),
  tier: z.string().min(1, {
    message: "Please select a tier"
  }),
  motivation: z.string().max(600, {
    message: "Message must not exceed 600 characters"
  }).min(10, {
    message: "Please tell us more about yourself (at least 10 characters)"
  })
});

type FormValues = z.infer<typeof formSchema>;

const tierOptions = [
  { value: "glow", label: "Glow (Tier 4) – Field Operations" },
  { value: "bridge", label: "Bridge (Tier 3) – Team Leaders" },
  { value: "drive", label: "Drive (Tier 2) – Strategic Expansion" },
  { value: "summit", label: "Summit (Tier 1) – Advisory" }
];

export function JoinMovementForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      tier: "",
      motivation: ""
    }
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      // Store in Supabase if available
      try {
        const { error: dbError } = await supabase
          .from("join_requests")
          .insert([
            {
              full_name: data.fullName,
              email: data.email,
              tier: data.tier,
              motivation: data.motivation,
            },
          ]);

        if (dbError) {
          console.error("Database insertion failed:", dbError);
        }
      } catch (dbError) {
        console.error("Database not available:", dbError);
      }

      // Send email notification
      const emailData = {
        name: data.fullName,
        email: data.email,
        message: `Tier: ${tierOptions.find(t => t.value === data.tier)?.label}\n\nMotivation:\n${data.motivation}`,
        recipientEmail: "contact@hotel-living.com"
      };

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      form.reset();
      setShowConfirmation(true);
      
      toast.success("Your application has been sent! We'll get back to you soon.");
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to send your application. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (showConfirmation) {
    return (
      <div className="max-w-2xl mx-auto bg-[#4b0456] p-8 rounded-lg mt-8">
        <div className="text-center p-8 bg-white/10 rounded-lg border border-white/20">
          <h2 className="text-3xl font-bold text-[#FFF9B0] mb-4">Thank you!</h2>
          <p className="text-slate-50 text-lg leading-relaxed">
            We've received your request and will get back to you shortly. You're one step closer to being part of the Hotel-Living movement!
          </p>
          <Button 
            onClick={() => setShowConfirmation(false)}
            className="mt-6 bg-[#FFF9B0] hover:bg-[#FFF9B0]/90 text-[#4b0456] font-semibold py-3"
          >
            Submit Another Application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-[#4b0456] p-8 rounded-lg mt-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#FFF9B0]">
        JOIN THE MOVEMENT – EXPRESS YOUR INTEREST
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-50">Full Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Your full name" 
                    {...field} 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-50">Email Address</FormLabel>
                <FormControl>
                  <Input 
                    type="email"
                    placeholder="your.email@example.com" 
                    {...field} 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tier"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-50">Choose your Tier</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white placeholder:text-white/60">
                      <SelectValue placeholder="Select your preferred tier" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#4b0456] border-white/20">
                    {tierOptions.map((option) => (
                      <SelectItem 
                        key={option.value} 
                        value={option.value}
                        className="text-white hover:bg-white/10 focus:bg-white/10"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="motivation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-50">Tell us more about yourself or your motivation</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Share your motivation, experience, or why you want to join the Hotel-Living movement..." 
                    {...field} 
                    rows={5}
                    maxLength={600}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 resize-none"
                  />
                </FormControl>
                <div className="text-right text-white/60 text-sm">
                  {field.value?.length || 0}/600 characters
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#FFF9B0] hover:bg-[#FFF9B0]/90 text-[#4b0456] font-semibold py-3 text-lg"
          >
            {isSubmitting ? 'SENDING YOUR APPLICATION...' : 'SEND YOUR APPLICATION'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
