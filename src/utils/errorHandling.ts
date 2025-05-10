
import { PostgrestError } from "@supabase/supabase-js";
import { type Toast } from "@/hooks/use-toast";

interface ApiError {
  message?: string;
}

export const handleApiError = (
  error: PostgrestError | ApiError | unknown,
  defaultMessage: string = "An error occurred",
  toast?: Toast
) => {
  // Extract error message
  let errorMessage = defaultMessage;

  if (error && typeof error === 'object') {
    if ('message' in error && error.message) {
      errorMessage = error.message as string;
    } else if ('error' in error && error.error) {
      errorMessage = error.error as string;
    }
  }

  // Log the error for debugging
  console.error("API Error:", errorMessage, error);

  // Display toast notification if toast function is provided
  if (toast) {
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive"
    });
  }

  return errorMessage;
};
