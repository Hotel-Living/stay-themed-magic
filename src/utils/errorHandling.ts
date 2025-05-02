
import { PostgrestError } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

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
    "42702": "Column reference is ambiguous.",
    "P0001": "Access violation detected in row security policy."
  };

  const message = errorMessages[error.code] || customMessage || error.message || "An unexpected error occurred";
  
  // Using the toast directly can cause issues in non-component contexts
  // So we use a more flexible approach
  const { toast } = require("@/hooks/use-toast");
  
  toast({
    title: "Error",
    description: message,
    variant: "destructive",
  });
};

/**
 * Converts a Supabase error to a user-friendly message
 */
export const getErrorMessage = (error: PostgrestError | null, customMessage?: string): string => {
  if (!error) return customMessage || "Unknown error";

  // Common error codes and their user-friendly messages
  const errorMessages: Record<string, string> = {
    "23505": "This record already exists.",
    "23503": "This action references a record that doesn't exist.",
    "42P01": "The requested resource could not be found.",
    "42501": "You don't have permission to perform this action.",
    "22P02": "Invalid input format.",
    "23502": "Required information is missing.",
  };

  return errorMessages[error.code] || customMessage || error.message || "An unexpected error occurred";
};
