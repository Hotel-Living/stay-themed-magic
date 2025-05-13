import { toast as sonnerToast } from "sonner";

// Create a hook interface that's compatible with the existing usage pattern
export const useToast = () => {
  return {
    toast: sonnerToast,
    toasts: [] // This maintains compatibility with the Toaster component
  };
};

// Export toast directly for cases where it's used without the hook
export const toast = sonnerToast;
