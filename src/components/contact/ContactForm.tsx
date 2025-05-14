
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
  recipientEmail = "",
  onSubmitSuccess
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
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
        message: data.message,
        recipientEmail: recipientEmail || undefined
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
              <FormLabel className="text-white">Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your name" 
                  {...field} 
                  className="bg-[#3A0952]/30 border-[#8017B0] text-white placeholder:text-white/60" 
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
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your email address" 
                  {...field} 
                  className="bg-[#3A0952]/30 border-[#8017B0] text-white placeholder:text-white/60" 
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
              <FormLabel className="text-white">Message</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us about yourself and how you'd like to contribute" 
                  {...field} 
                  className="bg-[#3A0952]/30 border-[#8017B0] text-white placeholder:text-white/60 min-h-[120px]" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Render file upload component if provided */}
        {renderFileUpload && renderFileUpload()}
        
        <Button 
          type="submit" 
          className="w-full bg-[#8017B0] hover:bg-[#9028C1] text-white transition-all duration-300" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </Form>
  );
}
