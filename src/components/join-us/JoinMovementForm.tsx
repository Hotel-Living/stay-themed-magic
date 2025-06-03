
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
import { Upload, X } from "lucide-react";

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
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      tier: "",
      motivation: ""
    }
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png', 'image/jpg'];
    
    const validFiles = selectedFiles.filter(file => {
      if (file.size > maxSize) {
        toast.error(`File ${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      if (!allowedTypes.includes(file.type)) {
        toast.error(`File ${file.name} has an invalid format. Please use PDF, DOC, DOCX, JPG, JPEG, or PNG.`);
        return false;
      }
      return true;
    });

    setFiles(prev => [...prev, ...validFiles]);
    // Reset the input value
    event.target.value = '';
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      // Send email notification with form data and files
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
      setFiles([]);
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

          {/* File Upload Section */}
          <div className="space-y-4">
            <FormLabel className="text-slate-50">Attach Files (Optional)</FormLabel>
            <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <Upload className="h-8 w-8 text-white/60" />
                <span className="text-white/80 text-sm">
                  Click to upload files or drag and drop
                </span>
                <span className="text-white/60 text-xs">
                  PDF, DOC, DOCX, JPG, JPEG, PNG (Max 10MB each)
                </span>
              </label>
            </div>

            {/* Display uploaded files */}
            {files.length > 0 && (
              <div className="space-y-2">
                <p className="text-slate-50 text-sm font-medium">Uploaded Files:</p>
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white/10 rounded-lg p-3 border border-white/20"
                  >
                    <span className="text-white text-sm truncate flex-1">
                      {file.name}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-white/60 hover:text-white hover:bg-white/10 ml-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

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
