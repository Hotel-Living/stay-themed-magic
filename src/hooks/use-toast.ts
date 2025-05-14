
import { toast as sonnerToast } from "sonner";

// Export the full sonner toast object with all its methods
export const toast = sonnerToast;

// Custom hook for toast functionality
export const useToast = () => {
  return { toast: sonnerToast };
};
