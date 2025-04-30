
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

// Define the form validation schema
const advertisingFormSchema = z.object({
  contactName: z.string().min(2, { message: "Contact name must be at least 2 characters." }),
  contactEmail: z.string().email({ message: "Please enter a valid email address." }),
  availableMonths: z.array(z.string()).min(2, { message: "Please select at least 2 months." }),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms to continue." }),
  }),
});

// Define the form values type
type AdvertisingFormValues = z.infer<typeof advertisingFormSchema>;

// Available months for selection
const availableMonths = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

export default function AdvertisingContent() {
  const { toast } = useToast();
  const { profile, user } = useAuth();
  
  // Set up the form
  const form = useForm<AdvertisingFormValues>({
    resolver: zodResolver(advertisingFormSchema),
    defaultValues: {
      contactName: profile?.first_name ? `${profile.first_name} ${profile.last_name || ""}` : "",
      contactEmail: user?.email || "",
      availableMonths: [],
      termsAccepted: false as any, // Use type assertion to bypass the type check initially
    },
  });

  // Form submission handler
  function onSubmit(data: AdvertisingFormValues) {
    console.log("Advertising form submitted:", data);
    
    toast({
      title: "Promotion request submitted!",
      description: "We'll review your request and contact you soon.",
    });
    
    form.reset({
      ...form.getValues(),
      availableMonths: [],
      termsAccepted: false as any, // Use type assertion to bypass the type check
    });
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
        <div className="flex items-center gap-3 mb-4">
          <Megaphone className="w-6 h-6 text-fuchsia-300" />
          <h2 className="text-2xl font-bold">Advertising Promotion</h2>
        </div>
      </div>

      {/* Slogans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          "Get One Month of Free Advertising on Hotel Living",
          "Let your hotel be seen — for free.",
          "Exchange 3 nights. Get 30 days of visibility.",
          "Guests bring value. And movement."
        ].map((slogan, index) => (
          <div 
            key={index} 
            className="glass-card rounded-lg p-4 bg-[#5d0478] text-center flex items-center justify-center h-24"
          >
            <p className="font-semibold text-fuchsia-100">{slogan}</p>
          </div>
        ))}
      </div>

      {/* Main Promotion Text */}
      <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
        <h3 className="text-xl font-semibold mb-4 text-fuchsia-100">Our Promotion Offer</h3>
        
        <div className="space-y-4 text-fuchsia-100">
          <p>
            In exchange for just three nights of free accommodation at your hotel, we offer you one full month of featured advertising on our portal — in the most visible and high-traffic zones.
          </p>
          
          <p>
            These three nights can be offered in any month of the year, and you don't need to specify exact dates. Simply choosing two or three months of availability is enough.
          </p>
          
          <p>
            These promotional guests will not only give visibility and activity to your hotel, but potential extra revenue (restaurant, services, reviews) and valuable movement and exposure — far more attractive than having empty rooms.
          </p>
        </div>
      </div>

      {/* Signup Form */}
      <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
        <h3 className="text-xl font-semibold mb-6">Join this Promotion</h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Contact Name */}
            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
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
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Available Months */}
            <FormField
              control={form.control}
              name="availableMonths"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Available Months for Free Nights</FormLabel>
                    <FormDescription className="text-fuchsia-300">
                      Select at least 2 months when you can offer the free nights.
                    </FormDescription>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {availableMonths.map((month) => (
                      <FormField
                        key={month}
                        control={form.control}
                        name="availableMonths"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={month}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(month)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, month])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== month
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {month}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Terms Acceptance */}
            <FormField
              control={form.control}
              name="termsAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I understand and agree to provide 3 free nights in exchange for 1 month of advertising
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-fuchsia-600 hover:bg-fuchsia-700"
            >
              <Check className="mr-2 h-4 w-4" /> Submit Promotion Request
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
