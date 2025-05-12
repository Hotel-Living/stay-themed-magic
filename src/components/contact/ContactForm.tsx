
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
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  renderFileUpload?: () => React.ReactNode;
  files?: File[];
}

export function ContactForm({ renderFileUpload, files = [] }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    
    try {
      // Ensure all required fields are present in the submission
      const submission = {
        name: data.name,
        email: data.email,
        message: data.message
      };
      
      const result = await submitJoinUsForm(submission, files);
      
      if (result) {
        toast({
          title: "Success",
          description: "Your message has been sent! We'll get back to you soon."
        });
        form.reset();
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
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
          className="w-full bg-[#8017B0] hover:bg-[#9028C1] text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );
}
