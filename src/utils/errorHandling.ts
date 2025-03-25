
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
    "PGRST116": "Resource not found.",
    "P0001": "Database constraint violated.",
    "54000": "Statement timeout - the query took too long to execute.",
    "23514": "Check constraint violation.",
  };

  const message = errorMessages[error.code] || customMessage || error.message || "An unexpected error occurred";
  
  toast({
    title: "Error",
    description: message,
    variant: "destructive",
  });
  
  return message;
};

/**
 * Handles general application errors
 */
export const handleAppError = (error: any, defaultMessage = "An unexpected error occurred") => {
  console.error("Application error:", error);
  
  const errorMessage = error instanceof Error ? error.message : defaultMessage;
  
  toast({
    title: "Error",
    description: errorMessage,
    variant: "destructive",
  });
  
  return errorMessage;
};

/**
 * Formats validation errors into a user-friendly message
 */
export const formatValidationErrors = (errors: Record<string, string[]>): string => {
  const errorEntries = Object.entries(errors);
  if (errorEntries.length === 0) return "Validation failed";
  
  const [field, messages] = errorEntries[0];
  return `${field}: ${messages[0]}`;
};
