
import { z } from "zod";

// Define the form validation schema
export const referralFormSchema = z.object({
  hotelName: z.string().min(2, { message: "Hotel name must be at least 2 characters." }),
  contactName: z.string().min(2, { message: "Contact name must be at least 2 characters." }),
  contactEmail: z.string().email({ message: "Please enter a valid email address." }),
  contactPhone: z.string().optional(),
  additionalInfo: z.string().optional(),
});

// Define the form values type
export type ReferralFormValues = z.infer<typeof referralFormSchema>;
