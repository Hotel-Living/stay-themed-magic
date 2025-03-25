
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
    // Auth errors
    "401": "Your session has expired. Please sign in again.",
    "403": "You don't have permission to access this resource.",
    "400": "The request could not be processed. Please check your input.",
    "404": "The requested resource could not be found.",
    "422": "Validation error in the request data."
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
 * Handles authentication-specific errors
 */
export const handleAuthError = (error: any) => {
  console.error("Authentication error:", error);
  
  // Common auth error messages
  const errorMessages: Record<string, string> = {
    "user_not_found": "No user with this email address was found.",
    "invalid_credentials": "The email or password you entered is incorrect.",
    "email_taken": "This email is already registered. Please sign in instead.",
    "weak_password": "Password is too weak. Please use a stronger password.",
    "expired_token": "Your verification link has expired. Please request a new one.",
    "invalid_token": "The verification link is invalid. Please request a new one.",
    "email_not_confirmed": "Please verify your email address to continue.",
    "password_recovery_failed": "Failed to reset password. Please try again.",
  };

  let errorCode = error.message;
  if (error.error_description) {
    errorCode = error.error_description;
  } else if (error.code) {
    errorCode = error.code;
  }

  const message = errorMessages[errorCode] || 
                 (error.message?.includes("User already registered") ? "This email is already registered. Please sign in instead." : null) ||
                 error.message || 
                 "An authentication error occurred";
  
  toast({
    title: "Authentication Error",
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
