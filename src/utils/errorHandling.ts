
import { PostgrestError } from "@supabase/supabase-js";
import { toast } from "@/hooks/use-toast";

interface ApiError {
  message?: string;
}

export const handleApiError = (
  error: PostgrestError | ApiError | unknown,
  defaultMessage: string = "An error occurred"
) => {
  // Extract error message
  let errorMessage = defaultMessage;
  
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'object' && error !== null) {
    const possibleError = error as { message?: string, error?: string };
    errorMessage = possibleError.message || possibleError.error || defaultMessage;
  }
  
  // Log the error for debugging
  console.error("API Error:", errorMessage, error);

  // Display toast notification
  toast({
    title: "Error",
    description: errorMessage,
    variant: "destructive"
  });

  return errorMessage;
};
