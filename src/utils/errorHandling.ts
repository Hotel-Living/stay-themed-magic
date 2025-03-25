
import { PostgrestError } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// Type guard to check if error is PostgrestError
function isPostgrestError(error: unknown): error is PostgrestError {
  return typeof error === 'object' && error !== null && 'code' in error && 'message' in error;
}

// Type guard to check if error is ApiError
function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'message' in error;
}

/**
 * Handle auth-related errors
 */
export function handleAuthError(error: unknown): void {
  if (isPostgrestError(error)) {
    const errorMessage = getAuthErrorMessage(error.code, error.message);
    toast({
      title: "Authentication Error",
      description: errorMessage,
      variant: "destructive",
    });
    console.error(`Auth error (${error.code}):`, error.message);
  } else if (isApiError(error)) {
    toast({
      title: "Authentication Error",
      description: error.message,
      variant: "destructive",
    });
    console.error("Auth error:", error.message);
  } else {
    toast({
      title: "Authentication Error",
      description: "An unexpected error occurred. Please try again.",
      variant: "destructive",
    });
    console.error("Unexpected auth error:", error);
  }
}

/**
 * Handle API-related errors
 */
export function handleApiError(error: unknown, title = "Error"): void {
  if (isPostgrestError(error)) {
    toast({
      title,
      description: error.message,
      variant: "destructive",
    });
    console.error(`API error (${error.code}):`, error.message);
  } else if (isApiError(error)) {
    toast({
      title,
      description: error.message,
      variant: "destructive",
    });
    console.error("API error:", error.message);
  } else if (error instanceof Error) {
    toast({
      title,
      description: error.message,
      variant: "destructive",
    });
    console.error("Error:", error.message);
  } else {
    toast({
      title,
      description: "An unexpected error occurred. Please try again.",
      variant: "destructive",
    });
    console.error("Unexpected error:", error);
  }
}

/**
 * Get more user-friendly auth error messages
 */
function getAuthErrorMessage(code?: string, fallbackMessage?: string): string {
  if (!code) return fallbackMessage || "Authentication failed";
  
  switch (code) {
    case "P0001":
      return "Invalid credentials. Please check your email and password.";
    case "22P02":
      return "Invalid input format. Please check your information.";
    case "23505":
      return "This email is already registered. Please use a different email or try to log in.";
    case "42501":
      return "You don't have permission to perform this action.";
    case "42P01":
      return "The requested resource doesn't exist.";
    default:
      return fallbackMessage || "Authentication failed. Please try again.";
  }
}
