
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitJoinUsForm } from "@/services/joinUsService";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Updated the schema to ensure all fields are required to match JoinUsSubmission interface
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export function JoinUsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Diagnostic logging
    console.log("🔄 NEW BUTTON: Starting form submission...", values);
    console.log("🔄 NEW BUTTON: Payload being sent:", {
      name: values.name,
      email: values.email,
      message: values.message,
      recipientEmail: "grand_soiree@yahoo.com"
    });
    
    try {
      // Submit the form with the new endpoint
      const success = await submitJoinUsForm({
        name: values.name,
        email: values.email,
        message: values.message,
        recipientEmail: "grand_soiree@yahoo.com"
      }, []);
      
      console.log("✅ NEW BUTTON: Edge function response received:", success);
      
      if (success) {
        form.reset();
        console.log("✅ NEW BUTTON: Form submission confirmed successful");
        // Show success toast only if function confirms delivery
        toast.success("Your message has been sent successfully! We'll be in touch soon.", {
          style: {
            background: "#8017B0",
            color: "white",
            border: "1px solid #6B1A96"
          }
        });
      } else {
        console.log("❌ NEW BUTTON: Edge function returned failure");
        toast.error("Failed to send your message. Please try again.", {
          style: {
            background: "#dc2626",
            color: "white",
            border: "1px solid #b91c1c"
          }
        });
      }
    } catch (error) {
      console.error("❌ NEW BUTTON: Exception caught:", error);
      console.error("❌ NEW BUTTON: Error details:", {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      
      toast.error("Something went wrong. Please try again later.", {
        style: {
          background: "#dc2626",
          color: "white", 
          border: "1px solid #b91c1c"
        }
      });
    } finally {
      setIsSubmitting(false);
      console.log("🔄 NEW BUTTON: Form submission process completed");
    }
  }

  return (
    <div className="mb-16 bg-[#8017B0]/90 p-6 rounded-xl border border-[#3300B0]/30 shadow-lg">
      <div className="flex items-center mb-6">
        <Heart className="h-6 w-6 text-[#FFF9B0] mr-2" />
        <h2 className="text-xl font-bold text-[#FFF9B0]">APPLY TO JOIN</h2>
      </div>
      
      <p className="text-white mb-6">Please, email us at contact@hotel-living.com.</p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" className="bg-white/10 text-white border-[#3300B0]/30" {...field} />
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
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" className="bg-white/10 text-white border-[#3300B0]/30" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Message</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about yourself and how you'd like to contribute" 
                    className="bg-white/10 text-white border-[#3300B0]/30 min-h-[120px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <p className="text-[#8017B0] text-sm font-medium mb-2">
            Please, email us directly at contact@hotel-living.com.
          </p>
          
          <Button 
            type="submit" 
            className="bg-[#FFF9B0] text-[#8017B0] hover:bg-yellow-300 mt-2 font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
