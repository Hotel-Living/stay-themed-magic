
import { PostgrestError } from "@supabase/supabase-js";
import { toast } from "@/hooks/use-toast";

/**
 * Handles Supabase errors and displays appropriate toasts
 */
export const handleSupabaseError = (error: PostgrestError | null, customMessage?: string) => {
  console.error("Supabase error:", error);
  
  if (!error) return;

  // Common error codes and their user-friendly messages
  const errorMessages: Record<string, string> = {
    "23505": "This record already exists.",
    "23503": "This action references a record that doesn't exist.",
    "42P01": "The requested resource could not be found.",
    "42501": "You don't have permission to perform this action.",
    "22P02": "Invalid input format.",
    "23502": "Required information is missing.",
  };

  const message = errorMessages[error.code] || customMessage || error.message || "An unexpected error occurred";
  
  toast({
    title: "Error",
    description: message,
    variant: "destructive",
  });
};
