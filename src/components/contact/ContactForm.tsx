
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { submitJoinUsForm } from "@/services/joinUsService";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters"
  }),
  email: z.string().email({
    message: "Please enter a valid email address"
  }),
  phone: z.string().min(1, {
    message: "Phone number is required"
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters"
  })
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  renderFileUpload?: () => React.ReactNode;
  files?: File[];
  recipientEmail?: string;
  onSubmitSuccess?: (success: boolean) => void;
}

export function ContactForm({
  renderFileUpload,
  files = [],
  recipientEmail = "fernando_espineira@yahoo.com",
  onSubmitSuccess
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: ""
    }
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      // Ensure all required fields are present in the submission
      const submission = {
        name: data.name,
        email: data.email,
        message: `Phone: ${data.phone}\n\nMessage: ${data.message}`,
        recipientEmail: recipientEmail
      };

      toast.promise(submitJoinUsForm(submission, files), {
        loading: 'Sending your message...',
        success: () => {
          form.reset();
          if (onSubmitSuccess) {
            onSubmitSuccess(true);
          }
          return 'Your message has been sent! We\'ll get back to you soon.';
        },
        error: err => {
          console.error("Form submission error:", err);
          if (onSubmitSuccess) {
            onSubmitSuccess(false);
          }
          return 'Failed to send your message. Please try again later.';
        },
        finally: () => {
          setIsSubmitting(false);
        }
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to send your message. Please try again later.");
      setIsSubmitting(false);
      if (onSubmitSuccess) {
        onSubmitSuccess(false);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-50">Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your name" 
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
              <FormLabel className="text-slate-50">Email</FormLabel>
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-50">Phone</FormLabel>
              <FormControl>
                <Input 
                  type="tel"
                  placeholder="Your phone number" 
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
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-50">Message</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us how we can help you..." 
                  {...field} 
                  rows={5}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {renderFileUpload && renderFileUpload()}

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-[#FFF9B0] hover:bg-[#FFF9B0]/90 text-[#4b0456] font-semibold py-3"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </Form>
  );
}
