
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Gift, Hotel } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";

// Define the form validation schema
const referralFormSchema = z.object({
  hotelName: z.string().min(2, { message: "Hotel name must be at least 2 characters." }),
  contactName: z.string().min(2, { message: "Contact name must be at least 2 characters." }),
  contactEmail: z.string().email({ message: "Please enter a valid email address." }),
  contactPhone: z.string().optional(),
  additionalInfo: z.string().optional(),
});

// Define the form values type
type ReferralFormValues = z.infer<typeof referralFormSchema>;

export default function GetThreeNightsContent() {
  const { toast } = useToast();
  
  // Set up the form
  const form = useForm<ReferralFormValues>({
    resolver: zodResolver(referralFormSchema),
    defaultValues: {
      hotelName: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      additionalInfo: "",
    },
  });

  // Form submission handler
  function onSubmit(data: ReferralFormValues) {
    console.log("Referral form submitted:", data);
    
    // Here you would typically send the data to your backend
    // For now, we'll just show a success message
    
    toast({
      title: "Referral submitted!",
      description: "Thank you for your referral. We'll contact the hotel and notify you of the outcome.",
    });
    
    form.reset();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
        <div className="flex items-center gap-3 mb-4">
          <Gift className="w-6 h-6 text-fuchsia-300" />
          <h2 className="text-2xl font-bold">Get Three Free Hotel Nights</h2>
        </div>
      </div>

      {/* Slogans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          "One referral. Three nights on us.",
          "You connect. We reward."
        ].map((slogan, index) => (
          <div 
            key={index} 
            className="glass-card rounded-lg p-4 bg-[#5d0478] text-center flex items-center justify-center h-24"
          >
            <p className="font-semibold text-fuchsia-100">{slogan}</p>
          </div>
        ))}
      </div>

      {/* Main Text */}
      <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
        <h3 className="text-xl font-semibold mb-4 text-fuchsia-100">How It Works</h3>
        
        <div className="space-y-4 text-fuchsia-100">
          <p>
            Simply introduce us to any hotel.
            If that hotel joins our platform within the next 15 days, you'll receive three complimentary nights at any of our featured promotional hotels.
            That's all it takes — a simple introduction.
          </p>
          
          <p>
            With just one small gesture, you make a difference:
          </p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li>You earn yourself a well-deserved free getaway.</li>
            <li>You offer a hotel a new horizon and opportunity.</li>
            <li>And you help our community grow and thrive.</li>
          </ul>
          
          <p>
            It's a win for everyone — and a perfect way to experience what Hotel Living is all about: comfort, connection, and a new way of life.
          </p>
          
          <p>
            It's our way of saying thank you for helping us grow — and for bringing more people into a lifestyle of freedom and hospitality.
          </p>
        </div>
      </div>

      {/* Hotel Referral Form */}
      <div className="glass-card rounded-2xl p-6 bg-[#7a0486]">
        <h3 className="text-xl font-semibold mb-6">Refer a Hotel</h3>
        
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
    </div>
  );
}
