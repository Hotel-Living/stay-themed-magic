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
  return <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField control={form.control} name="name" render={({
        field
      }) => <FormItem>
              
              <FormControl>
                
              </FormControl>
              <FormMessage />
            </FormItem>} />
        
        <FormField control={form.control} name="email" render={({
        field
      }) => <FormItem>
              
              <FormControl>
                
              </FormControl>
              <FormMessage />
            </FormItem>} />
        
        <FormField control={form.control} name="message" render={({
        field
      }) => <FormItem>
              
              <FormControl>
                
              </FormControl>
              <FormMessage />
            </FormItem>} />
        
        {/* Render file upload component if provided */}
        {renderFileUpload && renderFileUpload()}
        
        
      </form>
    </Form>;
}